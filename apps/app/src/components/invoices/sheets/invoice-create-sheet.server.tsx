import { getDefaultSettings } from "@gigflow/invoice/default";
import {
  getCustomers,
  getInvoiceNumber,
  getInvoiceTemplates,
} from "@gigflow/supabase/cached-queries";
import { InvoiceCreateSheet } from "./invoice-create-sheet";

export async function InvoiceCreateSheetServer({ teamId }: { teamId: string }) {
  const [
    { data: templatesData = null },
    { data: customersData = null },
    invoiceNumber,
  ] = await Promise.all([
    getInvoiceTemplates(),
    getCustomers(),
    getInvoiceNumber(),
  ]);

  const defaultSettings = getDefaultSettings();

  // Filter out null values
  const template = templatesData
    ? Object.fromEntries(
        Object.entries(templatesData).filter(([_, value]) => value !== null),
      )
    : {};

  return (
    <InvoiceCreateSheet
      teamId={teamId}
      customers={customersData}
      template={template}
      invoiceNumber={invoiceNumber}
      defaultSettings={defaultSettings}
    />
  );
}
