import type { OnboardingStep } from "@/actions/user/onboarding/types";
import { setOnboardingProgress } from "@/lib/actions/set-onboarding-progress";
import { useAction } from "next-safe-action/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const PRE_WORKSPACE_STEPS = ["workspace"];

export function useOnboardingProgress() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { execute, executeAsync, isExecuting, hasSucceeded } = useAction(
    () => {
      return true;
    },
    {
      onSuccess: () => {
        console.log("Onboarding progress updated");
      },
      onError: ({ error }) => {
        // toast.error("Failed to update onboarding progress. Please try again.");
        console.error("Failed to update onboarding progress", error);
      },
    },
  );

  const continueTo = useCallback(
    async (
      step: OnboardingStep,
      { slug: providedSlug }: { slug?: string } = {},
    ) => {
      execute({
        onboardingStep: step,
      });

      const queryParams = PRE_WORKSPACE_STEPS.includes(step)
        ? ""
        : `?workspace=${providedSlug}`;
      router.push(`/onboarding/${step}${queryParams}`);
    },
    [execute, router],
  );

  const finish = useCallback(async () => {
    await executeAsync({
      onboardingStep: "completed",
    });

    router.push(`onboarded=true`);
  }, [execute, router]);

  return {
    continueTo,
    finish,
    isLoading: isExecuting,
    isSuccessful: hasSucceeded,
  };
}
