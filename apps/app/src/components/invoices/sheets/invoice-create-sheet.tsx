"use client";

import type { InvoiceTemplate } from "@/actions/invoice/schema";
import { useInvoiceParams } from "@/hooks/use-invoice-params";
import type { Settings } from "@gigflow/invoice/default";
import { Sheet } from "@gigflow/ui/sheet";
import React from "react";
import type { Customer } from "../customer-details";
import { FormContext } from "../forms/form-context";
import { InvoiceSheetContent } from "./invoice-sheet-content";

type Props = {
  teamId: string;
  template: InvoiceTemplate;
  customers: Customer[];
  invoiceNumber: string;
  defaultSettings: Settings;
};

export function InvoiceCreateSheet({
  teamId,
  template,
  customers,
  invoiceNumber,
  defaultSettings,
}: Props) {
  const { setParams, type, invoiceId } = useInvoiceParams();
  const isOpen = Boolean(type === "create" || type === "edit");

  return (
    <FormContext
      template={template}
      invoiceNumber={invoiceNumber}
      isOpen={isOpen}
      id={invoiceId}
      defaultSettings={defaultSettings}
    >
      <Sheet open={isOpen} onOpenChange={() => setParams(null)}>
        <InvoiceSheetContent teamId={teamId} customers={customers} />
      </Sheet>
    </FormContext>
  );
}
