"use server";

import { z } from "zod";

import { authActionClient } from "@/actions/safe-action";
import { client } from "@gigflow/kv/client";
import { CLIENT_ONBOARDING_STEPS } from "./types";

// Generate a new client secret for an integration
export const setClientOnboardingProgress = authActionClient
  .schema(
    z.object({
      onboardingStep: z.enum(CLIENT_ONBOARDING_STEPS).nullable(),
    }),
  )
  .metadata({
    name: "set-client-onboarding-progress",
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
