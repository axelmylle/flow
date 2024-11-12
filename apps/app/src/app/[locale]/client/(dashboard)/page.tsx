import { JobMatchCard } from "@/components/jobs/job-match-card";
import { PageContent } from "@/components/layout/page-content";
import { InviteClientCard } from "@/components/profile/invite-client-card";
import { Charts } from "@/components/shared/charts/charts";
import { ChartsEmptyState } from "@/components/shared/charts/empty-state";
// import { OverviewModal } from "@/components/modals/overview-modal";
// import { Widgets } from "@/components/widgets";
import { Cookies } from "@/utils/constants";
import { getTeamBankAccounts } from "@gigflow/supabase/cached-queries";
import { cn } from "@gigflow/ui/cn";
import { MaxWidthWrapper } from "@gigflow/ui/max-width-wrapper";
import { startOfMonth, startOfYear, subMonths } from "date-fns";
import type { Metadata } from "next";
import { cookies } from "next/headers";

// NOTE: GoCardLess serverAction needs this currently
// (Fetch accounts takes up to 20s and default limit is 15s)
export const maxDuration = 30;

export const metadata: Metadata = {
  title: "Overview | v1",
};

const defaultValue = {
  from: subMonths(startOfMonth(new Date()), 12).toISOString(),
  to: new Date().toISOString(),
  period: "monthly",
};

export default async function Overview({ searchParams }) {
  const accounts = await getTeamBankAccounts();
  const chartType = cookies().get(Cookies.ChartType)?.value ?? "profit";

  const hideConnectFlow = cookies().has(Cookies.HideConnectFlow);

  const initialPeriod = cookies().has(Cookies.SpendingPeriod)
    ? JSON.parse(cookies().get(Cookies.SpendingPeriod)?.value)
    : {
        id: "this_year",
        from: startOfYear(new Date()).toISOString(),
        to: new Date().toISOString(),
      };

  const value = {
    ...(searchParams.from && { from: searchParams.from }),
    ...(searchParams.to && { to: searchParams.to }),
  };

  const isEmpty = !accounts?.data?.length;

  return (
    <PageContent title="Dashboard">
      <div className="flex w-full items-center pt-3">
        <MaxWidthWrapper className="flex flex-col gap-y-3">
          {isEmpty && <ChartsEmptyState />}

          <div className={cn(isEmpty && "blur-[8px] opacity-20")}>Company</div>
        </MaxWidthWrapper>
      </div>
    </PageContent>
  );
}
