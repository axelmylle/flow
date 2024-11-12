import { Icons } from "@gigflow/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@gigflow/ui/tooltip";

type Props = {
  fullfilled: boolean;
};

export function TransactionStatus({ fullfilled }: Props) {
  if (fullfilled) {
    return (
      <div className="flex justify-end">
        <Icons.Check />
      </div>
    );
  }

  return (
    <div className="flex justify-end">
      <TooltipProvider delayDuration={50}>
        <Tooltip>
          <TooltipTrigger>
            <Icons.AlertCircle className="size-4" />
          </TooltipTrigger>
          <TooltipContent
            className="px-3 py-1.5 text-xs"
            side="left"
            sideOffset={10}
          >
            Missing receipt
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
