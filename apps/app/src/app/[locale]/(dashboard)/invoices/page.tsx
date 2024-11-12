import { ErrorFallback } from "@/components/error-fallback";
import { InvoiceHeader } from "@/components/invoices/invoice-header";
import {
  InvoicePaymentScore,
  InvoicePaymentScoreSkeleton,
} from "@/components/invoices/invoice-payment-score";
import {
  InvoicesOpen,
  InvoicesOpenSkeleton,
} from "@/components/invoices/invoices-open";
import {
  InvoicesOverdue,
  InvoicesOverdueSkeleton,
} from "@/components/invoices/invoices-overdue";
import {
  InvoicesPaid,
  InvoicesPaidSkeleton,
} from "@/components/invoices/invoices-paid";
import { InvoicesTable } from "@/components/invoices/tables";
import { InvoiceSkeleton } from "@/components/invoices/tables/skeleton";
import { PageContent } from "@/components/layout/page-content";
import { getDefaultSettings } from "@gigflow/invoice/default";
import { MaxWidthWrapper } from "@gigflow/ui/max-width-wrapper";

import { InvoiceSummarySkeleton } from "@/components/invoice-summary";
import type { Metadata } from "next";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import { searchParamsCache } from "./search-params";

export const metadata: Metadata = {
  title: "Invoices | Gigflow",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const {
    q: query,
    sort,
    start,
    end,
    statuses,
    customers,
    page,
  } = searchParamsCache.parse(searchParams);

  const defaultSettings = await getDefaultSettings();

  const loadingKey = JSON.stringify({
    q: query,
    sort,
    start,
    end,
    statuses,
    customers,
    page,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
        <Suspense fallback={<InvoiceSummarySkeleton />}>
          <InvoicesOpen defaultCurrency={defaultSettings.currency} />
        </Suspense>
        <Suspense fallback={<InvoiceSummarySkeleton />}>
          <InvoicesOverdue defaultCurrency={defaultSettings.currency} />
        </Suspense>
        <Suspense fallback={<InvoiceSummarySkeleton />}>
          <InvoicesPaid defaultCurrency={defaultSettings.currency} />
        </Suspense>
        <Suspense fallback={<InvoicePaymentScoreSkeleton />}>
          <InvoicePaymentScore />
        </Suspense>
      </div>

      <InvoiceHeader />

      <ErrorBoundary errorComponent={ErrorFallback}>
        <Suspense fallback={<InvoiceSkeleton />} key={loadingKey}>
          <InvoicesTable
            query={query}
            sort={sort}
            start={start}
            end={end}
            statuses={statuses}
            customers={customers}
            page={page}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
