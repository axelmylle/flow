import AuthLayout from "@/components/layout/auth-layout";
import { getCompanyInviteQuery } from "@gigflow/supabase/queries";
import { createClient } from "@gigflow/supabase/server";
import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "../../../../(auth)/login/form";

export const metadata: Metadata = {
  title: "Join team | Midday",
};

export default async function InviteCode({
  params,
}: { params: { code: string } }) {
  const supabase = createClient();
  const { code } = params;
  const { data: inviteData } = await getCompanyInviteQuery(supabase, {
    code,
  });

  if (inviteData) {
    return (
      <AuthLayout variant="register">
        <div className="ml-5 mt-4 md:ml-10 md:mt-10">
          <Link href="/">{/* <Icons.Logo /> */}</Link>
          Invited to join company {inviteData.company?.name ?? "jds"}
        </div>
        <LoginForm />
      </AuthLayout>
    );
  }
  return <div>Not foound</div>;
}
