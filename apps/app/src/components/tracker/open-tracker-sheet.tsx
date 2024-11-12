"use client";

import { useTrackerParams } from "@/hooks/use-tracker-params";
import { Button } from "@gigflow/ui/button";
import { Icons } from "@gigflow/ui/icons";

export function OpenTrackerSheet() {
  const { setParams } = useTrackerParams();

  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setParams({ create: true })}
      >
        <Icons.Plus />
      </Button>
    </div>
  );
}
