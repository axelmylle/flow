export const ONBOARDING_STEPS = [
  "basic-info",
  "preferences",
  "skills",
  "experience",
  "education",
] as const;

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];
