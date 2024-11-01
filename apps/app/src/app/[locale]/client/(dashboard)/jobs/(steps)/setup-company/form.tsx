"use client";

import { SetupCompanyForm } from "@/components/company/onboarding/setup-company-form";
import { useClientOnboardingProgress } from "../../use-onboarding-progress";

export function Form() {
  const { continueTo } = useClientOnboardingProgress();

  return (
    <SetupCompanyForm
      className="w-full"
      onSuccess={() => {
        continueTo("company-profile");
      }}
    />
  );
}
