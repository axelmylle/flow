"use client";

import { CreateYourCompanyForm } from "@/components/company/onboarding/create-your-company";
import { useClientOnboardingProgress } from "../../use-onboarding-progress";

export function Form() {
  const { continueTo } = useClientOnboardingProgress();

  return (
    <CreateYourCompanyForm
      className="w-full"
      onSuccess={(clientId) => {
        continueTo("company-profile", {
          clientId: clientId,
        });
      }}
    />
  );
}
