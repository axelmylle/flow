import { setClientOnboardingProgress } from "@/actions/company/set-onboarding-progress";
import type { ClientOnboardingStep } from "@/actions/company/types";
import { useAction } from "next-safe-action/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useClientOnboardingProgress() {
  const router = useRouter();

  const { execute, executeAsync, isExecuting, hasSucceeded } = useAction(
    setClientOnboardingProgress,
    {
      onSuccess: () => {
        console.log("Onboarding progress updated");
      },
      onError: ({ error }) => {
        console.error("Failed to update onboarding progress", error);
      },
    },
  );

  const continueTo = useCallback(
    async (
      step: ClientOnboardingStep,
      { companyId: providedSlug }: { companyId?: string } = {},
    ) => {
      execute({
        onboardingStep: step,
      });
      const queryParams = providedSlug ? `?companyId=${providedSlug}` : "";
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
