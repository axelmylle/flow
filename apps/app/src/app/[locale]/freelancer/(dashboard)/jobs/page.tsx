import { PageContent } from "@/components/layout/page-content";
import {
  getJobs,
  getTrackerRecordsByRange,
  getUser,
} from "@gigflow/supabase/cached-queries";
import { MaxWidthWrapper } from "@gigflow/ui/max-width-wrapper";
import { endOfMonth, formatISO, startOfMonth } from "date-fns";
import { JobsEmptyState } from "./empty-state";
import PageClient from "./page-client";

export const metadata = {
  title: "Jobs",
};

export default async function Page() {
  const { data: jobsData } = await getJobs({
    from: 0,
    to: 10,
  });

  return (
    <PageContent title="Jobs">
      <MaxWidthWrapper className="flex flex-col gap-y-3">
        <PageClient />
      </MaxWidthWrapper>
    </PageContent>
  );
}
