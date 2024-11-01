export const CLIENT_ONBOARDING_STEPS = [
  "basic-info",
  "my-company",
  "skills",
  "experience",
  "vat",
  "education",
  "completed",
  "create-company",
  "setup-company",
  "company-profile",
  "update-company",
  "update-user-at-company",
  "create-user-at-company",
] as const;

export type ClientOnboardingStep = (typeof CLIENT_ONBOARDING_STEPS)[number];
