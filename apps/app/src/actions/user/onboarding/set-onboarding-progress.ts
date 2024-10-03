"use server";

import { z } from "zod";
import { ONBOARDING_STEPS } from "../onboarding/types";

import { authActionClient } from "@/actions/safe-action";
import { client } from "@v1/kv/client";

// Generate a new client secret for an integration
export const setOnboardingProgress = authActionClient
  .schema(
    z.object({
      onboardingStep: z.enum(ONBOARDING_STEPS).nullable(),
    }),
  )
  .metadata({
    name: "set-onboarding-progress",
  })
  .action(async ({ ctx, parsedInput }) => {
    const { onboardingStep } = parsedInput;

    try {
      await client.set(`onboarding-step:${ctx.user.id}`, onboardingStep);
    } catch (e) {
      console.error("Failed to update onboarding step", e);
      throw new Error("Failed to update onboarding step");
    }

    return { success: true };
  });
