import { AddAccountButton } from "@/components/transactions/add-account-button";
import { AnimatedEmptyState } from "@gigflow/ui/animated-empty-state";
import { Icons } from "@gigflow/ui/icons";

export function ExperiencesEmptyState() {
  return (
    <div className="animate-fade-in">
      <AnimatedEmptyState
        className="border-none"
        title="No Experiences added"
        description="Add your educations to highlight your best skills and experience"
        cardContent={
          <>
            <Icons.Face className="size-4 text-neutral-700" />
            <div className="h-2.5 w-24 min-w-0 rounded-sm bg-neutral-200" />
            <div className="xs:flex hidden grow items-center justify-end gap-1.5 text-gray-500">
              <Icons.CursorRays className="size-3.5" />
            </div>
          </>
        }
        addButton={<AddAccountButton />}
      />
    </div>
  );
}
