"use client";

import { CompanyUpdateForm } from "@/components/company/onboarding/invited-user/forms/company-update-form";
import type { Database } from "@gigflow/supabase/types";
import { useClientOnboardingProgress } from "../../../use-onboarding-progress";

export function Form() {
  const { continueTo } = useClientOnboardingProgress();

  return (
    <CompanyUpdateForm
      className="w-full"
      defaultValues={{}}
      onSuccess={(companyId) => {
        continueTo("create-user-at-company", { companyId });
      }}
    />
  );
}
