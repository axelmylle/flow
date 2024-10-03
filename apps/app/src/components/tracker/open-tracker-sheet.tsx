"use client";

import { useTrackerParams } from "@/hooks/use-tracker-params";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";

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
