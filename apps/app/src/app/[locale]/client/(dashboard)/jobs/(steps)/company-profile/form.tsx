"use client";

import { ProfileAtCompanyForm } from "@/components/company/onboarding/profile-at-company-form";
import { useClientOnboardingProgress } from "../../use-onboarding-progress";

export function Form() {
  const { continueTo } = useClientOnboardingProgress();

  return (
    <ProfileAtCompanyForm
      className="w-full"
      onSuccess={() => {
        continueTo("completed");
      }}
    />
  );
}
