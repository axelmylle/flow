import { Cookies } from "@/utils/constants";
import { getUser } from "@gigflow/supabase/cached-queries";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { CustomerCreateSheet } from "./customers/sheets/customer-create-sheet";
import { CustomerEditSheet } from "./customers/sheets/customer-edit-sheet";
import { InvoiceCommentsSheet } from "./invoices/sheets/invoice-comments";
import { InvoiceCreateSheetServer } from "./invoices/sheets/invoice-create-sheet.server";
import { TrackerCreateSheet } from "./tracker/sheets/tracker-create-sheet";
import { TrackerScheduleSheet } from "./tracker/sheets/tracker-schedule-sheet";
import { TrackerSheetsServer } from "./tracker/sheets/tracker-sheets.server";
import { TrackerUpdateSheet } from "./tracker/sheets/tracker-update-sheet";

type Props = {
  defaultCurrency: string;
};

export async function GlobalSheets({ defaultCurrency }: Props) {
  const { data: userData } = await getUser();

  return (
    <div className="relative">
      {/* <Suspense fallback={null}>
        <TrackerSheetsServer
          teamId={userData?.team_id}
          userId={userData?.id}
          timeFormat={userData?.time_format}
          defaultCurrency={defaultCurrency}
        />
      </Suspense> */}

      <CustomerCreateSheet />
      <CustomerEditSheet />
      {/* <InvoiceCommentsSheet />

      <Suspense fallback={null}>
  
        <InvoiceCreateSheetServer teamId={userData?.team_id} />
      </Suspense> */}
    </div>
  );
}
