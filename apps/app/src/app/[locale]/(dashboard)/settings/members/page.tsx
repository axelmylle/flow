import { PageContent } from "@/components/layout/page-content";
import { TeamMembers } from "@/components/users/team-members";
import { MaxWidthWrapper } from "@gigflow/ui/max-width-wrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Members | Gigflow",
};

export default async function Members() {
  return (
    <PageContent title="Members">
      <MaxWidthWrapper className="flex flex-col">
        <TeamMembers />
      </MaxWidthWrapper>
    </PageContent>
  );
}
