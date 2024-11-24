"use client";

import { useFreelancerSearchParams } from "@/hooks/use-freelancer-search-params";
import { Button } from "@gigflow/ui/button";
import { Icons } from "@gigflow/ui/icons";

export function OpenFreelancerDetailSheet({
  freelancerId,
}: {
  freelancerId: string;
}) {
  const { setParams } = useFreelancerSearchParams();

  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setParams({ type: "details", freelancerId })}
      >
        <Icons.Add />
      </Button>
    </div>
  );
}
