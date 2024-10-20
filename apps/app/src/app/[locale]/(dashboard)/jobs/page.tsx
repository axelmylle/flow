import { PageContent } from "@/components/layout/page-content";
import { MaxWidthWrapper } from "@v1/ui/max-width-wrapper";
import PageClient from "./page-client";

export const metadata = {
  title: "Jobs",
};

export default async function Page() {
  return (
    <PageContent title="Jobs">
      <MaxWidthWrapper className="flex flex-col gap-y-3">
        <PageClient />
      </MaxWidthWrapper>
    </PageContent>
  );
}
