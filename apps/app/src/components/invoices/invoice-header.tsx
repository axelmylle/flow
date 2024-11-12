import { getCustomers } from "@gigflow/supabase/cached-queries";
import { InvoiceSearchFilter } from "./invoice-search-filter";
import { OpenInvoiceSheet } from "./open-invoice-sheet";

export async function InvoiceHeader() {
  const customers = await getCustomers();

  return (
    <div className="flex items-center justify-between">
      <InvoiceSearchFilter customers={customers?.data ?? []} />

      <div>
        <OpenInvoiceSheet />
      </div>
    </div>
  );
}
