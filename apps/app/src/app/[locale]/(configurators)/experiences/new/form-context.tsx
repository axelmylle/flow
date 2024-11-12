"use client";

import {
  type CreateExperienceFormValues,
  createExperienceSchema,
} from "@/actions/freelancer/experience/schema";
import type { InvoiceTemplate } from "@/actions/invoice/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { createClient } from "@gigflow/supabase/client";
import { FormProvider, useForm } from "react-hook-form";

type FormContextProps = {
  // id?: string | null;
  children: React.ReactNode;
  // template: InvoiceTemplate;
  // invoiceNumber: string;
  // defaultSettings: Settings;
  // isOpen: boolean;
};

export function FormContext({ children }: FormContextProps) {
  const supabase = createClient();

  const defaultValues: CreateExperienceFormValues = {
    title: "",
    company: "",
    description: "",
    thumbnail_url: "",
  };

  const form = useForm<CreateExperienceFormValues>({
    resolver: zodResolver(createExperienceSchema),
    defaultValues,
  });

  // useEffect(() => {
  //   // Reset the form when the sheet is opened
  //   form.reset(defaultValues);
  // }, [isOpen]);

  // useEffect(() => {
  //   async function fetchInvoice() {
  //     if (!id) return;
  //     const { data } = await getDraftInvoiceQuery(supabase, id);

  //     if (data) {
  //       form.reset(data);
  //     }
  //   }
  //   fetchInvoice();
  // }, [id]);

  return <FormProvider {...form}>{children}</FormProvider>;
}
