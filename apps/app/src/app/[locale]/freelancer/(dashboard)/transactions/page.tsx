import { Cookies } from "@/utils/constants";

import { TransactionsSearchFilter } from "@/components/transactions/transactions-search-filter";
import {
  getCategories,
  getTeamBankAccounts,
  getTeamMembers,
  getUser,
} from "@gigflow/supabase/cached-queries";
import type { Metadata } from "next";

import { ErrorFallback } from "@/components/error-fallback";
import { PageContent } from "@/components/layout/page-content";
import { Table } from "@/components/transactions/tables";
import { NoAccounts } from "@/components/transactions/tables/empty-states";
import { Loading } from "@/components/transactions/tables/loading";
import { MaxWidthWrapper } from "@gigflow/ui/max-width-wrapper";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { searchParamsCache } from "./search-params";

export const metadata: Metadata = {
  title: "Transactions | Midday",
};

export default async function Transactions({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const {
    q: query,
    page,
    attachments,
    start,
    end,
    categories,
    assignees,
    statuses,
    recurring,
    accounts,
  } = searchParamsCache.parse(searchParams);

  // Move this in a suspense
  const [accountsData, categoriesData, teamMembersData, userData] =
    await Promise.all([
      getTeamBankAccounts(),
      getCategories(),
      getTeamMembers(),
      getUser(),
    ]);
  // console.log(accountsData, categoriesData, teamMembersData, userData);
  const filter = {
    attachments,
    start,
    end,
    categories,
    assignees,
    statuses,
    recurring,
    accounts,
  };

  const sort = searchParams?.sort?.split(":");
  const hideConnectFlow = cookies().has(Cookies.HideConnectFlow);

  const isOpen = Boolean(searchParams.step);
  const isEmpty = !accountsData?.data?.length && !isOpen;
  const loadingKey = JSON.stringify({
    page,
    filter,
    sort,
    query,
  });

  return (
    <PageContent title="Transactions">
      <div className="flex w-full items-center pt-3">
        <MaxWidthWrapper className="flex flex-col gap-y-3">
          <div className="flex justify-between pb-6">
            <TransactionsSearchFilter
              placeholder="Search or type filter"
              categories={[
                // ...categoriesData?.data?.map((category) => ({
                //   slug: category.slug,
                //   name: category.name,
                // })),
                {
                  // TODO, move this to the database
                  id: "uncategorized",
                  name: "Uncategorized",
                  slug: "uncategorized",
                },
              ]}
              accounts={accountsData?.data?.map((account) => ({
                id: account.id,
                name: account.name,
                currency: account.currency,
              }))}
              members={teamMembersData?.data?.map((member) => ({
                id: member?.user?.id,
                name: member.user?.full_name,
              }))}
            />
            {/* <TransactionsActions isEmpty={isEmpty} /> */}
          </div>

          {isEmpty ? (
            <div className="relative h-[calc(100vh-200px)] overflow-hidden">
              <NoAccounts />
              <Loading isEmpty />
            </div>
          ) : (
            <ErrorBoundary errorComponent={ErrorFallback}>
              <Suspense fallback={<Loading />} key={loadingKey}>
                <Table filter={filter} page={page} sort={sort} query={query} />
              </Suspense>
            </ErrorBoundary>
          )}
          {/*
      <TransactionsModal defaultOpen={isEmpty && !hideConnectFlow} />
      <CreateTransactionSheet
        categories={categoriesData?.data}
        userId={userData?.data?.id}
        accountId={accountsData?.data?.at(0)?.id}
        currency={accountsData?.data?.at(0)?.currency}
      /> */}
        </MaxWidthWrapper>
      </div>
    </PageContent>
  );
}
