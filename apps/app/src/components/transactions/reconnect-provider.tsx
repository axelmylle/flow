import { reconnectGoCardLessLinkAction } from "@/actions/institutions/reconnect-gocardless-link";
import { useScript } from "@uidotdev/usehooks";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@v1/ui/tooltip";
import { useToast } from "@v1/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  provider: string;
  enrollmentId: string | null;
  institutionId: string;
  accessToken: string | null;
  onManualSync: () => void;
  variant?: "button" | "icon";
};

export function ReconnectProvider({
  id,
  provider,
  enrollmentId,
  institutionId,
  accessToken,
  onManualSync,
  variant,
}: Props) {
  const { toast } = useToast();
  const { theme } = useTheme();
  const [plaidToken, setPlaidToken] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const reconnectGoCardLessLink = useAction(reconnectGoCardLessLinkAction, {
    onExecute: () => {
      setIsLoading(true);
    },
    onError: () => {
      setIsLoading(false);

      toast({
        duration: 2500,
        variant: "error",
        title: "Something went wrong please try again.",
      });
    },
    onSuccess: () => {
      setIsLoading(false);
    },
  });

  const handleOnClick = async () => {
    switch (provider) {
      case "gocardless": {
        return reconnectGoCardLessLink.execute({
          id,
          institutionId,
          availableHistory: 60,
          redirectTo: `${window.location.origin}/api/gocardless/reconnect`,
          isDesktop: false,
        });
      }

      default:
        return;
    }
  };

  if (variant === "button") {
    return (
      <Button variant="outline" onClick={handleOnClick} disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          "Reconnect"
        )}
      </Button>
    );
  }

  return (
    <TooltipProvider delayDuration={70}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-7 h-7 flex items-center"
            onClick={handleOnClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Icons.Reconnect size={16} />
            )}
          </Button>
        </TooltipTrigger>

        <TooltipContent className="px-3 py-1.5 text-xs" sideOffset={10}>
          Reconnect
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
