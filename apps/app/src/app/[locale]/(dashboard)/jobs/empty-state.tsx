import { AddAccountButton } from "@/components/transactions/add-account-button";
import { AnimatedEmptyState } from "@gigflow/ui/animated-empty-state";
import { Icons } from "@gigflow/ui/icons";

export function JobsEmptyState() {
  return (
    <div className="animate-fade-in">
      <AnimatedEmptyState
        title="No Active jobs posted yet"
        description="Wait for new jobs"
        cardContent={
          <>
            <Icons.Building className="size-4 text-neutral-700" />
            <div className="flex flex-col gap-2">
              <div className="h-2.5 w-24 min-w-0 rounded-sm bg-neutral-200" />
              <div className="h-2.5 w-32 min-w-0 rounded-sm bg-neutral-200" />
            </div>
            <div className="xs:flex hidden grow items-center justify-end gap-1.5 text-gray-500">
              <Icons.CursorRays className="size-3.5" />
            </div>
          </>
        }
      />
    </div>
  );
}
