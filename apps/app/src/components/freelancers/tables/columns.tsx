"use client";

import { FormatAmount } from "@/components/format-amount";

import { AssignedUser } from "@/components/users/assigned-user";
import { formatTransactionDate } from "@/utils/format";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@gigflow/ui/alert-dialog";
import { Button } from "@gigflow/ui/button";
import { Checkbox } from "@gigflow/ui/checkbox";
import { cn } from "@gigflow/ui/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@gigflow/ui/dropdown-menu";
import { Icons } from "@gigflow/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@gigflow/ui/tooltip";
import type { ColumnDef } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { OpenFreelancerDetailSheet } from "../profile/open-freelancer-detail-sheet";

export type Transaction = {
  id: string;
  amount: number;
  status: "posted" | "excluded" | "included" | "pending" | "completed";
  frequency?: string;
  recurring?: boolean;
  manual?: boolean;
  date: string;
  category?: {
    slug: string;
    name: string;
    color: string;
  };
  name: string;
  description?: string;
  currency: string;
  method: string;
  attachments?: {
    id: string;
    path: string;
    name: string;
    type: string;
    size: number;
  }[];
  assigned?: {
    avatar_url: string;
    full_name: string;
  };
  bank_account?: {
    name: string;
    bank_connection: {
      logo_url: string;
    };
  };
};

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "date",
  //   header: "Date",
  //   cell: ({ row }) => {
  //     return formatTransactionDate(row.original.date);
  //   },
  // },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <TooltipProvider delayDuration={20}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className={cn(
                    row.original?.category?.slug === "income" &&
                      "text-[#00C969]",
                  )}
                >
                  <div className="flex space-x-2 items-center">
                    <span className="line-clamp-1 text-ellipsis max-w-[100px] md:max-w-none">
                      {row.original.name}
                    </span>

                    {row.original.status === "pending" && (
                      <div className="flex space-x-1 items-center border rounded-md text-[10px] py-1 px-2 h-[22px] text-[#878787]">
                        <span>Pending</span>
                      </div>
                    )}
                  </div>
                </span>
              </TooltipTrigger>

              {row.original?.description && (
                <TooltipContent
                  className="px-3 py-1.5 text-xs max-w-[380px]"
                  side="left"
                  sideOffset={10}
                >
                  {row.original.description}
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "headline",
    header: "Headline",
    cell: ({ row }) => {
      return (
        <span
          className={cn(
            "text-sm",
            row.original?.category?.slug === "income" && "text-[#00C969]",
          )}
        >
          {row.original.headline}
        </span>
      );
    },
  },

  {
    accessorKey: "assigned",
    header: "Assigned",
    cell: ({ row }) => {
      return (
        <AssignedUser
          fullName={row.original.user?.full_name}
          avatarUrl={row.original.user?.avatar_url}
        />
      );
    },
  },

  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row, table }) => {
      return <OpenFreelancerDetailSheet freelancerId={row.original.id} />;
    },
  },
];
