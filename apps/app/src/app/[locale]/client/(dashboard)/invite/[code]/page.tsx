import {
  joinCompanyByInviteCode,
  joinTeamByInviteCode,
} from "@gigflow/supabase/mutations";
import { createClient } from "@gigflow/supabase/server";
import { Button } from "@gigflow/ui/button";
import { Icons } from "@gigflow/ui/icons";
import type { Metadata } from "next";
import { revalidateTag } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Join team | Midday",
};

export default async function InviteCode({
  params,
}: { params: { code: string } }) {
  const supabase = createClient();
  const { code } = params;

  if (code) {
    const user = await joinCompanyByInviteCode(supabase, code);

    if (user) {
      revalidateTag(`user_${user.id}`);
      revalidateTag(`teams_${user.id}`);

      if (!user.full_name) {
        redirect("/client/onboarding");
      }

      redirect("/");
    }
  }

  return (
    <div>
      <header className="w-full absolute left-0 right-0 flex justify-between items-center">
        <div className="ml-5 mt-4 md:ml-10 md:mt-10">
          <Link href="/">
            <Icons.Accounts />
          </Link>
        </div>

        <div className="mr-5 mt-4 md:mr-10 md:mt-10">
          <Suspense>{/* <UserMenu onlySignOut /> */}dsfsfs</Suspense>
        </div>
      </header>

      <div className="flex min-h-screen justify-center items-center overflow-hidden p-6 md:p-0">
        <div className="relative z-20 m-auto flex w-full max-w-[380px] flex-col">
          <div className="flex w-full flex-col relative">
            <div className="pb-4">
              <h1 className="font-medium pb-1 text-3xl">
                Invite link has expired
              </h1>
            </div>

            <p className="font-medium pb-1 text-2xl text-[#606060]">
              Notify the sender for a new one.
            </p>

            <div className="pointer-events-auto mt-6 flex flex-col mb-4">
              <Link href="/teams" className="w-full">
                <Button className="w-full">Go to teams</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
