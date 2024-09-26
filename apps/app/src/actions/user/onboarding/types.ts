export const ONBOARDING_STEPS = [
  "basic-info",
  "preferences",
  "skills",
  "experience",
  "vat",
  "education",
  "completed",
] as const;

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];
