export const CLIENT_ONBOARDING_STEPS = [
  "basic-info",
  "my-company",
  "skills",
  "experience",
  "vat",
  "education",
  "completed",
  "create-company",
  "company-profile",
] as const;

export type ClientOnboardingStep = (typeof CLIENT_ONBOARDING_STEPS)[number];
