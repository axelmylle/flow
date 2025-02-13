"use client";

import type { Customer } from "@/components/invoices/customer-details";
import { useCustomerParams } from "@/hooks/use-customer-params";
import { createClient } from "@gigflow/supabase/client";
import { getCustomerQuery } from "@gigflow/supabase/queries";
import { Button } from "@gigflow/ui/button";
import { Icons } from "@gigflow/ui/icons";
import { Sheet, SheetContent, SheetHeader } from "@gigflow/ui/sheet";
import React, { useEffect, useState } from "react";
import { CustomerForm } from "../forms/customer-form";

export function CustomerEditSheet() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const { setParams, customerId } = useCustomerParams();

  const isOpen = Boolean(customerId);
  const supabase = createClient();

  useEffect(() => {
    async function fetchCustomer() {
      const { data } = await getCustomerQuery(supabase, customerId);

      if (data) {
        setCustomer(data);
      }
    }

    if (customerId) {
      fetchCustomer();
    }
  }, [customerId]);

  return (
    <Sheet open={isOpen} onOpenChange={() => setParams(null)}>
      <SheetContent style={{ maxWidth: 610 }} stack>
        <SheetHeader className="mb-6 flex justify-between items-center flex-row">
          <h2 className="text-xl">Edit Customer</h2>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setParams(null)}
            className="p-0 m-0 size-auto hover:bg-transparent"
          >
            <Icons.Close className="size-5" />
          </Button>
        </SheetHeader>

        <CustomerForm data={customer} />
      </SheetContent>
    </Sheet>
  );
}
