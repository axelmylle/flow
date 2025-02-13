"use client";

import { cn } from "@gigflow/ui/cn";
import { TableCell, TableRow } from "@gigflow/ui/table";
import { type Row, flexRender } from "@tanstack/react-table";
import { useState } from "react";
import { InvoiceDetailsSheet } from "../invoice-details-sheet";
import type { Invoice } from "./columns";

type Props = {
  row: Row<Invoice>;
};

export function InvoiceRow({ row }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        className="hover:bg-transparent cursor-default h-[57px]"
        key={row.id}
      >
        {row.getVisibleCells().map((cell, index) => (
          <TableCell
            key={cell.id}
            className={cn(index === 2 && "w-[50px]")}
            onClick={() =>
              index !== row.getVisibleCells().length - 1 && setOpen(true)
            }
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>

      <InvoiceDetailsSheet
        data={row.original}
        isOpen={open}
        setOpen={setOpen}
      />
    </>
  );
}
