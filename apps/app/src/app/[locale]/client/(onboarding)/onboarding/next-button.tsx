"use client";

import type { ClientOnboardingStep } from "@/actions/client/types";
import { Button, type ButtonProps } from "@gigflow/ui/button";
import { useClientOnboardingProgress } from "./use-onboarding-progress";

export function NextButton({
  step,
  ...rest
}: { step: ClientOnboardingStep } & ButtonProps) {
  const { continueTo, isLoading, isSuccessful } = useClientOnboardingProgress();

  return (
    <Button
      variant="default"
      onClick={() => continueTo(step)}
      loading={isLoading || isSuccessful}
      {...rest}
    >
      Next
    </Button>
  );
}
