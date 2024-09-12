"use client";

import { CreateHeadlinerForm } from "@/components/profile/create-headliner-form";
import { useOnboardingProgress } from "../../use-onboarding-progress";

export function Form() {
  const { continueTo } = useOnboardingProgress();

  return (
    <CreateHeadlinerForm
      className="w-full"
      onSuccess={({ headliner }) => {
        continueTo("preferences", { headliner });
      }}
    />
  );
}
