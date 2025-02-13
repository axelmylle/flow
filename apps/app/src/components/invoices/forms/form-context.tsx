"use client";

import {
  type InvoiceFormValues,
  type InvoiceTemplate,
  invoiceFormSchema,
} from "@/actions/invoice/schema";
import { useInvoiceParams } from "@/hooks/use-invoice-params";
import { UTCDate } from "@date-fns/utc";
import type { Settings } from "@gigflow/invoice/default";
import { createClient } from "@gigflow/supabase/client";
import { getDraftInvoiceQuery } from "@gigflow/supabase/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMonths } from "date-fns";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const defaultTemplate: InvoiceTemplate = {
  customer_label: "To",
  from_label: "From",
  invoice_no_label: "Invoice No",
  issue_date_label: "Issue Date",
  due_date_label: "Due Date",
  description_label: "Description",
  price_label: "Price",
  quantity_label: "Quantity",
  total_label: "Total",
  vat_label: "VAT",
  tax_label: "Sales Tax",
  payment_label: "Payment Details",
  payment_details: undefined,
  note_label: "Note",
  logo_url: undefined,
  currency: "USD",
  from_details: undefined,
  size: "a4",
  include_vat: true,
  discount_label: "Discount",
  include_discount: false,
  include_decimals: false,
  include_qr: true,
  date_format: "dd/MM/yyyy",
  include_tax: true,
  tax_rate: 0,
  delivery_type: "create",
};

type FormContextProps = {
  id?: string | null;
  children: React.ReactNode;
  template: InvoiceTemplate;
  invoiceNumber: string;
  defaultSettings: Settings;
  isOpen: boolean;
};

export function FormContext({
  id,
  children,
  template,
  invoiceNumber,
  defaultSettings,
  isOpen,
}: FormContextProps) {
  const supabase = createClient();
  const { lineItems, currency } = useInvoiceParams();
  const [isLoading, setLoading] = useState(false);

  const defaultValues = {
    id: uuidv4(),
    template: {
      ...defaultTemplate,
      size: defaultSettings.size ?? defaultTemplate.size,
      include_tax: defaultSettings.include_tax ?? defaultTemplate.include_tax,
      include_vat: defaultSettings.include_vat ?? defaultTemplate.include_vat,
      ...template,
    },
    customer_details: undefined,
    from_details: template.from_details ?? defaultTemplate.from_details,
    payment_details:
      template.payment_details ?? defaultTemplate.payment_details,
    note_details: undefined,
    customer_id: undefined,
    issue_date: new UTCDate(),
    due_date: addMonths(new UTCDate(), 1),
    invoice_number: invoiceNumber,
    line_items: [{ name: "", quantity: 0, price: 0, vat: 0 }],
    tax: undefined,
    token: undefined,
    discount: undefined,
    status: "draft",
  };

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset({
        ...defaultValues,
        template: {
          ...defaultValues.template,
          locale: navigator.language,
        },
      });
    }
  }, [isOpen]);

  useEffect(() => {
    async function fetchInvoice() {
      const { data } = await getDraftInvoiceQuery(supabase, id);

      if (data) {
        form.reset({
          ...data,
          template: {
            ...defaultValues.template,
            ...data.template,
          },
        });
      }

      setLoading(false);
    }

    if (id) {
      setLoading(true);
      fetchInvoice();
    }
  }, [id, isOpen]);

  // These values comes from the tracker table
  useEffect(() => {
    if (lineItems) {
      form.setValue("line_items", lineItems);
    }
  }, [lineItems]);

  useEffect(() => {
    if (currency) {
      form.setValue("template.currency", currency);
    }
  }, [currency]);

  if (isLoading) {
    return null;
  }

  return <FormProvider {...form}>{children}</FormProvider>;
}
