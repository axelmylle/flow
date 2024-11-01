"use client";

import { CompanyUserProfileUpdateForm } from "@/components/company/onboarding/invited-user/forms/company-user-profile-update-form";
import type { Database } from "@v1/supabase/types";
import { useClientOnboardingProgress } from "../../use-onboarding-progress";

export function Form({
  userAtCompany,
}: {
  userAtCompany: Database["public"]["Tables"]["users_on_company"]["Row"] &
    Database["public"]["Tables"]["users"]["Row"];
}) {
  const { continueTo } = useClientOnboardingProgress();

  return (
    <CompanyUserProfileUpdateForm
      className="w-full"
      defaultValues={userAtCompany}
      onSuccess={() => {
        continueTo("completed");
      }}
    />
  );
}
