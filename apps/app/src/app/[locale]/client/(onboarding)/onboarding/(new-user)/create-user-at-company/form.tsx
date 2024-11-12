"use client";

import { CompanyUserProfileUpdateForm } from "@/components/company/onboarding/invited-user/forms/company-user-profile-update-form";
import type { Database } from "@gigflow/supabase/types";
import { useClientOnboardingProgress } from "../../use-onboarding-progress";

export function Form({
  companyId,
}: {
  companyId: string;
}) {
  const { continueTo } = useClientOnboardingProgress();

  return (
    <CompanyUserProfileUpdateForm
      defaultValues={{ company_id: companyId, role: "member" }}
      onSuccess={() => {
        continueTo("completed");
      }}
    />
  );
}
