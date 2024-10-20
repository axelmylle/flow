"use client";

import { CreateYourCompanyForm } from "@/components/client/onboarding/create-your-company";
import { SearchMyCompany } from "@/components/client/onboarding/search-my-company";
import { CreateHeadlinerForm } from "@/components/profile/create-headliner-form";
import { PersonalInformationForm } from "@/components/profile/personal-information-form";
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
