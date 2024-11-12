import { PageContent } from "@/components/layout/page-content";
import { ProfileHeaderTitle } from "@/components/profile/my-profile/profile-header-title";
import { ProfileSidebarCard } from "@/components/profile/my-profile/profile-sidebar-card";
import { getUser } from "@gigflow/supabase/cached-queries";
import { MaxWidthWrapper } from "@gigflow/ui/max-width-wrapper";
import { type ReactNode, Suspense } from "react";
import MyProfileHeader from "./header";

export default async function MyProfileLayout({
  children,
}: { children: ReactNode }) {
  const { data: user } = await getUser();
  return (
    <div className="grid gap-4">
      <PageContent title="My Profile">
        <MaxWidthWrapper>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-4 min-w-[340px]">
              <Suspense fallback={<div>Loading...</div>}>
                <ProfileSidebarCard user={user} />
              </Suspense>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <div className="flex gap-10 pt-0 flex-1 mb-8 min-w-0 relative lg:min-w-[440px] lg:max-w-[794px] lg:min-h-[700px] lg:mb-[58px] lg:mr-20 xl:min-w-[640px] xl:mr-28">
                <div className="grow w-full">
                  <ProfileHeaderTitle />
                  <MyProfileHeader />
                  {children}
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </PageContent>
    </div>
  );
}
