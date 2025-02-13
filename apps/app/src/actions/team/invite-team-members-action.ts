"use server";

import { env } from "@/env.mjs";
import InviteEmail from "@gigflow/email/emails/invite";
import { getI18n } from "@gigflow/email/locales";
import { LogEvents } from "@gigflow/events/events";
// import { LogEvents } from "@gigflow/events/events";
import { render } from "@react-email/render";
import { revalidatePath as revalidatePathFunc } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { authActionClient } from "../safe-action";
import { inviteTeamMembersSchema } from "./schema";

const resend = new Resend(env.RESEND_API_KEY);

export const inviteTeamMembersAction = authActionClient
  .schema(inviteTeamMembersSchema)
  .metadata({
    name: "invite-team-members",
    track: {
      event: LogEvents.InviteTeamMembers.name,
      channel: LogEvents.InviteTeamMembers.channel,
    },
  })
  .action(
    async ({
      parsedInput: { invites, redirectTo, revalidatePath },
      ctx: { user, supabase },
    }) => {
      const { t } = getI18n({ locale: user.locale ?? "en" });

      const location = headers().get("x-vercel-ip-city") ?? "Unknown";
      const ip = headers().get("x-forwarded-for") ?? "127.0.0.1";

      const data = invites?.map((invite) => ({
        ...invite,
        team_id: user.team_id,
        invited_by: user.id,
      }));

      const { data: invtesData } = await supabase
        .from("user_invites")
        .upsert(data, {
          // onConflict: "email, team_id",
          ignoreDuplicates: false,
        })
        .select("email, code, user:invited_by(*), team:team_id(*)");

      const emails = invtesData?.map(async (invites) => ({
        from: "Acme <onboarding@resend.dev>",
        to: [invites.email],
        subject: "hi",
        html: await render(
          InviteEmail({
            invitedByEmail: invites.user.email,
            invitedByName: invites.user.full_name,
            email: invites.email,
            teamName: invites.team.name,
            inviteCode: invites.code,
            ip,
            location,
            locale: user.locale ?? "en",
          }),
        ),
      }));

      const htmlEmails = await Promise.all(emails);

      await resend.batch.send(htmlEmails);

      if (revalidatePath) {
        revalidatePathFunc(revalidatePath);
      }

      if (redirectTo) {
        redirect(redirectTo);
      }
    },
  );
