import { updateSession } from "@v1/supabase/middleware";
import { createClient } from "@v1/supabase/server";
import { createI18nMiddleware } from "next-international/middleware";
import { type NextRequest, NextResponse } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(
    request,
    I18nMiddleware(request),
  );
  const supabase = createClient();
  const url = new URL("/", request.url);
  const nextUrl = request.nextUrl;

  const pathnameLocale = nextUrl.pathname.split("/", 2)?.[1];

  // Remove the locale from the pathname
  const pathnameWithoutLocale = pathnameLocale
    ? nextUrl.pathname.slice(pathnameLocale.length + 1)
    : nextUrl.pathname;

  // Create a new URL without the locale in the pathname
  const newUrl = new URL(pathnameWithoutLocale || "/", request.url);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Not authenticated
  if (
    !session &&
    newUrl.pathname !== "/login" &&
    !newUrl.pathname.includes("/report")
  ) {
    const encodedSearchParams = `${newUrl.pathname.substring(1)}${
      newUrl.search
    }`;

    const url = new URL("/login", request.url);

    if (encodedSearchParams) {
      url.searchParams.append("return_to", encodedSearchParams);
    }

    return NextResponse.redirect(url);
  }

  //If authenticated but no full_name redirect to user setup page
  if (
    !newUrl.pathname.includes("/onboarding") &&
    !newUrl.pathname.includes("/client/invite") &&
    session &&
    !session?.user?.user_metadata?.isOnboarded
  ) {
    // Check if the URL contains an invite code
    const inviteCodeMatch = newUrl.pathname.startsWith("/client/invite/");

    if (inviteCodeMatch) {
      return NextResponse.redirect(`${url.origin}${newUrl.pathname}`);
    }

    if (session?.user?.user_metadata?.user_type === "Company") {
      return NextResponse.redirect(`${url.origin}/client/onboarding/welcome`);
    }

    if (session?.user?.user_metadata?.user_type === "Freelancer") {
      return NextResponse.redirect(`${url.origin}/onboarding/welcome`);
    }

    return NextResponse.redirect(`${url.origin}/onboarding/welcome`);
  }

  const { data: mfaData } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  // Enrolled for mfa but not verified
  if (
    mfaData &&
    mfaData.nextLevel === "aal2" &&
    mfaData.nextLevel !== mfaData.currentLevel &&
    newUrl.pathname !== "/mfa/verify"
  ) {
    return NextResponse.redirect(`${url.origin}/mfa/verify`);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|api|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
