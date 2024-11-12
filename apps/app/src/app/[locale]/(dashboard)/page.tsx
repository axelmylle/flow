import { FeatureCard } from "@/components/feature-card";
import { JobMatchCard } from "@/components/jobs/job-match-card";
import { PageContent } from "@/components/layout/page-content";
import { ActionItemsCard } from "@/components/profile/action-items-card";
import { InviteClientCard } from "@/components/profile/invite-client-card";
import { Charts } from "@/components/shared/charts/charts";
import { ChartsEmptyState } from "@/components/shared/charts/empty-state";
// import { OverviewModal } from "@/components/modals/overview-modal";
// import { Widgets } from "@/components/widgets";
import { Cookies } from "@/utils/constants";
import { getTeamBankAccounts } from "@gigflow/supabase/cached-queries";
import { Card, CardContent } from "@gigflow/ui/card";
import { cn } from "@gigflow/ui/cn";
import { Icons } from "@gigflow/ui/icons";
import { MaxWidthWrapper } from "@gigflow/ui/max-width-wrapper";
import { startOfMonth, startOfYear, subMonths } from "date-fns";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";

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
  const tasks = [
    {
      display: "Complete your profile",
      cta: `/onboarding`,
      checked: false, //linksCount > 0,
    },
    {
      display: "Apply on your first job",
      cta: `/settings/domains`,
      checked: true, //domainsCount && domainsCount > 0,
    },
    {
      display: "Complete your first assessment",
      cta: `/assessments`,
      checked: true, //(users && users.length > 1) || (invites && invites.length > 0),
    },
  ];
  return (
    <PageContent title="Home">
      <div className="flex w-full items-center pt-3">
        <MaxWidthWrapper className="flex flex-col gap-y-3">
          <h2 className="text-2xl font-semibold"> Welcome, John! 👋</h2>

          {isEmpty && <ChartsEmptyState />}

          <div className={cn(isEmpty && "blur-[8px] opacity-20")}>
            {!isEmpty && (
              <Charts
                value={value}
                defaultValue={defaultValue}
                disabled={isEmpty}
                type={chartType}
                currency={searchParams.currency}
              />
            )}
          </div>
          {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InviteClientCard />
            <ActionItemsCard />
          </div> */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              description="Get paid on time and keep 100% of what you earn."
              action={{ label: "Send invoice", href: "/invoices" }}
              imageSrc="/assets/app-categories/payment.svg"
            />
            <FeatureCard
              description="Streamline your contract creation and client workflows."
              action={{ label: "Start project", href: "/jobs" }}
              imageSrc="/assets/app-categories/analytics.svg"
            />
          </div>
        </MaxWidthWrapper>
      </div>
    </PageContent>
  );
}
