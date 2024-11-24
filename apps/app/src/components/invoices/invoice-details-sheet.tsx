import { Drawer, DrawerContent } from "@gigflow/ui/drawer";
import { useMediaQuery } from "@gigflow/ui/hooks";
import { Sheet, SheetContent } from "@gigflow/ui/sheet";
import React from "react";
import { InvoiceDetails } from "./invoice-details";
import type { Invoice } from "./tables/columns";

type Props = {
  setOpen: (open: boolean) => void;
  isOpen: boolean;
  data: Invoice;
};

export function InvoiceDetailsSheet({ setOpen, isOpen, data }: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetContent>
          <InvoiceDetails {...data} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open: boolean) => {
        if (!open) {
          setOpen(false);
        }
      }}
    >
      <DrawerContent className="p-6">
        <InvoiceDetails {...data} />
      </DrawerContent>
    </Drawer>
  );
}