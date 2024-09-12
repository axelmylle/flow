import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import Toolbar from "@/components/layout/toolbar/toolbar";
import UserSurveyPopup from "@/components/layout/user-survey";
import { getUser } from "@v1/supabase/queries";

import { MaxWidthWrapper } from "@v1/ui/max-width-wrapper";
import { SidebarLayout, SidebarTrigger } from "@v1/ui/sidebar";

import { cookies } from "next/headers";

export default async function Layout({
  children,
}: { children: React.ReactNode }) {
  // This is where your authenticated app lives, add a sidebar, header etc.
  const {
    data: { user },
  } = await getUser();
  return (
    <div>
      <SidebarLayout>
        <AppSidebar user={user} />
        <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
          <div className="h-full rounded-md border-2 border-dashed p-2">
            <SidebarTrigger />

            <MaxWidthWrapper>{children}</MaxWidthWrapper>
          </div>
        </main>
      </SidebarLayout>
      <UserSurveyPopup />

      <Toolbar show={["onboarding"]} />
    </div>
  );
}
