import AuthLayout from "@/components/layout/auth-layout";
import LoginForm from "./form";

// export const metadata = constructMetadata({
//   title: `Sign in to ${process.env.NEXT_PUBLIC_APP_NAME}`,
// });

export default function LoginPage() {
  return (
    <AuthLayout variant="login">
      <LoginForm />
    </AuthLayout>
  );
}
