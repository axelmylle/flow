"use client";

import type { OnboardingStep } from "@/actions/user/onboarding/types";
import { Button, type ButtonProps } from "@v1/ui/button";
import { useOnboardingProgress } from "./use-onboarding-progress";

export function NextButton({
  step,
  ...rest
}: { step: OnboardingStep } & ButtonProps) {
  const { continueTo, isLoading, isSuccessful } = useOnboardingProgress();

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
