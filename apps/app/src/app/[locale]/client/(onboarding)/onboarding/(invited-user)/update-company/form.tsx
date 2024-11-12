"use client";

import { CompanyUpdateForm } from "@/components/company/onboarding/invited-user/forms/company-update-form";
import type { Database } from "@gigflow/supabase/types";
import { useClientOnboardingProgress } from "../../use-onboarding-progress";

export function Form({
  company,
}: { company: Database["public"]["Tables"]["companies"]["Row"] | undefined }) {
  const { continueTo } = useClientOnboardingProgress();

  return (
    <CompanyUpdateForm
      className="w-full"
      defaultValues={company}
      onSuccess={() => {
        continueTo("update-user-at-company");
      }}
    />
  );
}
