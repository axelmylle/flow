import { setClientOnboardingProgress } from "@/actions/company/set-onboarding-progress";
import type { ClientOnboardingStep } from "@/actions/company/types";
import { useAction } from "next-safe-action/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const PRE_WORKSPACE_STEPS = ["workspace"];

export function useClientOnboardingProgress() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { execute, executeAsync, isExecuting, hasSucceeded } = useAction(
    setClientOnboardingProgress,
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
      step: ClientOnboardingStep,
      { clientId: providedSlug }: { clientId?: string } = {},
    ) => {
      execute({
        onboardingStep: step,
      });
      console.log("continueTo", providedSlug);
      const queryParams = PRE_WORKSPACE_STEPS.includes(step)
        ? ""
        : `?clientId=${providedSlug}`;
      router.push(`/client/onboarding/${step}${queryParams}`);
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
