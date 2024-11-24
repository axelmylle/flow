import { PageContent } from "@/components/layout/page-content";
import { OpenTrackerSheet } from "@/components/tracker/open-tracker-sheet";
import { Table } from "@/components/tracker/table";
import { Loading } from "@/components/tracker/table/loading";
import { TrackerCalendar } from "@/components/tracker/tracker-calendar";
import { TrackerSearchFilter } from "@/components/tracker/tracker-search-filter";
import {
  getCustomers,
  getTrackerRecordsByRange,
  getUser,
} from "@gigflow/supabase/cached-queries";
import { MaxWidthWrapper } from "@gigflow/ui/max-width-wrapper";
import { endOfMonth, formatISO, startOfMonth } from "date-fns";
import type { Metadata } from "next";
import { Suspense } from "react";
import { searchParamsCache } from "./search-params";

export const metadata: Metadata = {
  title: "Tracker | gigflow",
};

type Props = {
  searchParams: {
    statuses: string;
    sort: string;
    q: string;
    start?: string;
    end?: string;
    customers?: string[];
  };
};

export default async function Tracker({ searchParams }: Props) {
  const {
    sort: sortParams,
    statuses,
    customers,
  } = searchParamsCache.parse(searchParams);

  const sort = sortParams?.split(":") ?? ["status", "asc"];

  const currentDate =
    searchParams?.date ?? formatISO(new Date(), { representation: "date" });

  const [{ data: userData }, { data, meta }, { data: customersData }] =
    await Promise.all([
      getUser(),
      getTrackerRecordsByRange({
        from: formatISO(startOfMonth(new Date(currentDate)), {
          representation: "date",
        }),
        to: formatISO(endOfMonth(new Date(currentDate)), {
          representation: "date",
        }),
      }),
      getCustomers(),
    ]);

  return (
    <PageContent title="Time Tracker">
      <MaxWidthWrapper className="flex flex-col">
        <TrackerCalendar
          weekStartsOnMonday={userData?.week_starts_on_monday}
          timeFormat={userData?.time_format}
          data={data}
          meta={meta}
        />

        <div className="mt-14 mb-6 flex items-center justify-between space-x-4">
          <h2 className="text-md font-medium">Projects</h2>

          <div className="flex space-x-2">
            <TrackerSearchFilter customers={customersData} />
            <OpenTrackerSheet />
          </div>
        </div>

        <Suspense fallback={<Loading />}>
          <Table
            status={statuses}
            sort={sort}
            q={searchParams?.q}
            start={searchParams?.start}
            end={searchParams?.end}
            userId={userData?.id}
            customerIds={customers}
          />
        </Suspense>
      </MaxWidthWrapper>
    </PageContent>
  );
}
