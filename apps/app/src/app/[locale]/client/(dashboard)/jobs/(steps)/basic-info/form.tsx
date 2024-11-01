"use client";

import { CreateHeadlinerForm } from "@/components/freelancers/onboarding/create-headliner-form";
import { PersonalInformationForm } from "@/components/profile/personal-information-form";
import { useClientOnboardingProgress } from "../../use-onboarding-progress";

export function Form() {
  const { continueTo } = useClientOnboardingProgress();

  return (
    <PersonalInformationForm
      className="w-full"
      onSuccess={() => {
        continueTo("my-company");
      }}
    />
  );
}
