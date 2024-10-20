"use client";

import { ProfileAtCompanyForm } from "@/components/client/onboarding/profile-at-company-form";
import { SearchMyCompany } from "@/components/client/onboarding/search-my-company";
import { CreateHeadlinerForm } from "@/components/profile/create-headliner-form";
import { PersonalInformationForm } from "@/components/profile/personal-information-form";
import { useSearchParams } from "next/navigation";
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
