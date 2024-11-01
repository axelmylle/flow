import AuthLayout from "@/components/layout/auth-layout";
import { Cookies } from "@/utils/constants";
import { cookies } from "next/headers";
import LoginForm from "./form";
import LoginPageClient from "./page-client";

// export const metadata = constructMetadata({
//   title: `Sign in to ${process.env.NEXT_PUBLIC_APP_NAME}`,
// });

export default function LoginPage({ searchParams }: { searchParams: any }) {
  return (
    <AuthLayout variant="login">
      <LoginPageClient />
    </AuthLayout>
  );
}
