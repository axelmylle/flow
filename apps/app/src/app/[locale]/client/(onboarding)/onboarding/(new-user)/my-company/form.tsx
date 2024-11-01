"use client";

import { CompanySearchForm } from "@/components/company/onboarding/new-user/company-search-form";
import { useClientOnboardingProgress } from "../../use-onboarding-progress";

export function Form() {
  const { continueTo } = useClientOnboardingProgress();

  return (
    <CompanySearchForm
      defaultValues={{ company_id: undefined }}
      onSuccess={(companyId) => {
        continueTo("create-user-at-company", { companyId });
      }}
      onCreate={() => {
        continueTo("create-company");
      }}
    />
  );
}
