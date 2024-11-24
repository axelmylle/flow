import { getUser } from "@gigflow/supabase/cached-queries";
import { updateSession } from "@gigflow/supabase/middleware";
import { getUserQuery } from "@gigflow/supabase/queries";
import { createClient } from "@gigflow/supabase/server";
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
    !newUrl.pathname.includes("/report") &&
    !newUrl.pathname.includes("/i/")
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

  // Redirect based on user type if trying to access wrong prefix
  if (session) {
    const userData = await getUserQuery(supabase, session?.user?.id);
    const userType =
      userData?.data?.user_type || session?.user?.user_metadata?.user_type;
    const isCompany = userType === "Company";
    const shouldHaveClientPrefix = newUrl.pathname.startsWith("/client");
    const shouldHaveFreelancerPrefix =
      newUrl.pathname.startsWith("/freelancer");
    const isRootPath = newUrl.pathname === "/";

    // Handle root path redirects
    if (isRootPath) {
      return NextResponse.redirect(
        new URL(isCompany ? "/client" : "/freelancer", request.url),
      );
    }

    // Company users should use /client/ routes
    if (isCompany && !shouldHaveClientPrefix && !shouldHaveFreelancerPrefix) {
      const path = newUrl.pathname.replace(/^\/freelancer/, "");
      return NextResponse.redirect(new URL(`/client${path}`, request.url));
    }

    // Freelancer users should use /freelancer/ routes
    if (!isCompany && !shouldHaveClientPrefix && !shouldHaveFreelancerPrefix) {
      const path = newUrl.pathname.replace(/^\/client/, "");
      return NextResponse.redirect(new URL(`/freelancer${path}`, request.url));
    }

    // Prevent company users from accessing freelancer routes
    if (isCompany && shouldHaveFreelancerPrefix) {
      return NextResponse.redirect(new URL("/client", request.url));
    }

    // Prevent freelancer users from accessing company routes
    if (!isCompany && shouldHaveClientPrefix) {
      return NextResponse.redirect(new URL("/freelancer", request.url));
    }
  }

  //If authenticated but no full_name redirect to user setup page
  if (
    !newUrl.pathname.includes("/onboarding") &&
    !newUrl.pathname.includes("/client/invite") &&
    session &&
    !session?.user?.user_metadata?.isOnboarded
  ) {
    // Check if the URL contains an invite code
    const inviteCodeMatch = newUrl.pathname.includes("/invite");

    if (inviteCodeMatch) {
      return NextResponse.redirect(`${url.origin}${newUrl.pathname}`);
    }

    if (session?.user?.user_metadata?.user_type === "Company") {
      return NextResponse.redirect(`${url.origin}/client/onboarding/welcome`);
    }

    // if (userData?.data?.user_type === "Freelancer") {
    //   return NextResponse.redirect(
    //     `${url.origin}/freelancer/onboarding/welcome`,
    //   );
    // }
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
