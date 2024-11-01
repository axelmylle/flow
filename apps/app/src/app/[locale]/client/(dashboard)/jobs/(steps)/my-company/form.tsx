"use client";

import { SearchMyCompany } from "@/components/company/onboarding/search-my-company";
import { useClientOnboardingProgress } from "../../use-onboarding-progress";

export function Form() {
  const { continueTo } = useClientOnboardingProgress();

  return (
    <SearchMyCompany
      className="w-full"
      onSuccess={() => {
        continueTo("setup-company");
      }}
      onCreate={() => {
        continueTo("create-company");
      }}
    />
  );
}
