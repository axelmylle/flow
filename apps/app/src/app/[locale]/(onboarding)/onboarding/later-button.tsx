"use client";

import type { OnboardingStep } from "@/actions/user/onboarding/types";
import { cn } from "@gigflow/ui/cn";
import { Icons } from "@gigflow/ui/icons";
import type { PropsWithChildren } from "react";
import { useOnboardingProgress } from "./use-onboarding-progress";

export function LaterButton({
  next,
  className,
  children,
}: PropsWithChildren<{ next: OnboardingStep | "finish"; className?: string }>) {
  const { continueTo, finish, isLoading, isSuccessful } =
    useOnboardingProgress();

  return (
    <button
      type="button"
      onClick={() => (next === "finish" ? finish() : continueTo(next))}
      className={cn(
        "mx-auto flex w-fit items-center gap-2 text-center text-sm text-gray-500 transition-colors enabled:hover:text-gray-700",
        className,
      )}
      disabled={isLoading || isSuccessful}
    >
      <Icons.LoadingSpinner
        className={cn(
          "size-3 transition-opacity ",
          !(isLoading || isSuccessful) && "opacity-0",
        )}
      />
      {children || "I'll do this later"}
      <div className="w-3" />
    </button>
  );
}
