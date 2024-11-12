import { env } from "@/env.mjs";
import { Cookies } from "@/utils/constants";
import WelcomeEmail from "@gigflow/email/emails/welcome-email";
import { LogEvents } from "@gigflow/events/events";
import { setupAnalytics } from "@gigflow/events/server";
import { getSession } from "@gigflow/supabase/cached-queries";
import { createClient } from "@gigflow/supabase/server";
import { render } from "@react-email/render";
import { addYears } from "date-fns";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export const preferredRegion = ["fra1", "sfo1", "iad1"];

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");
  const client = requestUrl.searchParams.get("client");
  const returnTo = requestUrl.searchParams.get("return_to");
  const userType = requestUrl.searchParams.get("user_type");

  const provider = requestUrl.searchParams.get("provider");
  const mfaSetupVisited = cookieStore.has(Cookies.MfaSetupVisited);
  const invitedForCompanyCode = cookieStore.get(
    Cookies.InvitedForCompanyCode,
  )?.value;

  if (client === "desktop") {
    return NextResponse.redirect(`${requestUrl.origin}/verify?code=${code}`);
  }

  if (provider) {
    cookieStore.set(Cookies.PreferredSignInProvider, provider, {
      expires: addYears(new Date(), 1),
    });
  }

  console.log("-----------------code----------------", { code });
  console.log("-----------------code----------------", { userType });

  if (code) {
    const supabase = createClient(cookieStore);
    await supabase.auth.exchangeCodeForSession(code);

    const {
      data: { session },
    } = await getSession();
    console.log("-----------------code----------------", {
      id: session?.user?.id,
    });

    if (!session?.user.user_metadata.isOnboarded) {
      await supabase
        .from("users")
        .update({ user_type: userType })
        .eq("id", session?.user?.id);

      await supabase.auth.updateUser({
        data: {
          user_type: userType,
        },
      });

      if (userType === "Company") {
        await resend.emails.send({
          to: "info@studiokompleks.be",
          subject: "Company joined",
          from: "Create v1 <onboarding@resend.dev>",
          html: await render(
            WelcomeEmail({
              name: "company",
            }),
          ),
          headers: {
            "X-Entity-Ref-ID": nanoid(),
          },
        });
        return NextResponse.redirect(`${requestUrl.origin}/client/onboarding`);
      }

      if (userType === "Freelancer") {
        resend.emails.send({
          to: "info@studiokompleks.be",
          subject: "Freelancer joined",
          from: "Create v1 <onboarding@resend.dev>",
          html: await render(
            WelcomeEmail({
              name: "freelancer",
            }),
          ),
          headers: {
            "X-Entity-Ref-ID": nanoid(),
          },
        });
        return NextResponse.redirect(`${requestUrl.origin}/onboarding`);
      }
    }

    if (session) {
      const userId = session.user.id;

      const analytics = await setupAnalytics({
        userId,
        fullName: session?.user?.user_metadata?.full_name,
      });

      await analytics.track({
        event: LogEvents.SignIn.name,
        channel: LogEvents.SignIn.channel,
      });

      if (returnTo) {
        return NextResponse.redirect(`${requestUrl.origin}/${returnTo}`);
      }
    }
  }

  if (!mfaSetupVisited) {
    cookieStore.set(Cookies.MfaSetupVisited, "true", {
      expires: addYears(new Date(), 1),
    });

    return NextResponse.redirect(`${requestUrl.origin}/mfa/setup`);
  }

  if (returnTo) {
    return NextResponse.redirect(`${requestUrl.origin}/${returnTo}`);
  }

  return NextResponse.redirect(requestUrl.origin);
}
