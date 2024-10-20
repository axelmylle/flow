"use client";

import { SearchMyCompany } from "@/components/client/onboarding/search-my-company";
import { CreateHeadlinerForm } from "@/components/profile/create-headliner-form";
import { PersonalInformationForm } from "@/components/profile/personal-information-form";
import { useClientOnboardingProgress } from "../../use-onboarding-progress";

export function Form() {
  const { continueTo } = useClientOnboardingProgress();

  return (
    <SearchMyCompany
      className="w-full"
      onSuccess={() => {
        continueTo("company-profile");
      }}
      onCreate={() => {
        continueTo("create-company");
      }}
    />
  );
}
