"use client";

import { ProfileAtCompanyForm } from "@/components/company/onboarding/profile-at-company-form";
import { SearchMyCompany } from "@/components/company/onboarding/search-my-company";
import { CreateHeadlinerForm } from "@/components/freelancers/onboarding/create-headliner-form";
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
