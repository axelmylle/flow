import { useFreelancerSearchParams } from "@/hooks/use-freelancer-search-params";
import { Cookies } from "@/utils/constants";
import { getFreelancers } from "@gigflow/supabase/cached-queries";
import { cookies } from "next/headers";
import { FreelancerDetailSheet } from "../profile/sheets/freelancer-detail-sheet";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { NoResults } from "./empty-states";

const pageSize = 50;
const maxItems = 100000;

type Props = {
  filter: any;
  page: number;
  sort: any;
  query: string | null;
};

export async function Table({ filter, page, sort, query }: Props) {
  const hasFilters = Object.values(filter).some((value) => value !== null);
  const initialColumnVisibility = JSON.parse(
    cookies().get(Cookies.TransactionsColumns)?.value || "[]",
  );

  // NOTE: When we have a filter we want to show all results so users can select
  // And handle all in once (export etc)
  const freelancers = await getFreelancers({
    to: hasFilters ? maxItems : pageSize,
    from: 0,

    filter,
    sort,
    searchQuery: query ?? undefined,
  });

  const { data, meta } = freelancers ?? {};

  async function loadMore({ from, to }: { from: number; to: number }) {
    "use server";

    return getFreelancers({
      to,
      from: from + 1,
      filter,
      sort,
      searchQuery: query ?? undefined,
    });
  }

  if (!data?.length) {
    if (query?.length) {
      return <NoResults hasFilters />;
    }

    return <NoResults hasFilters={hasFilters} />;
  }

  const hasNextPage = Boolean(
    meta?.count && meta.count / (page + 1) > pageSize,
  );

  return (
    <>
      <DataTable
        initialColumnVisibility={initialColumnVisibility}
        columns={columns}
        data={data}
        pageSize={pageSize}
        loadMore={loadMore}
        hasNextPage={hasNextPage}
        meta={meta}
        hasFilters={hasFilters}
        page={page}
        query={query}
      />
    </>
  );
}
