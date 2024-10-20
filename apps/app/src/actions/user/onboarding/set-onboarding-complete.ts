"use server";

import { authActionClient } from "@/actions/safe-action";
import {
  revalidatePath,
  revalidatePath as revalidatePathFunc,
} from "next/cache";

// Generate a new client secret for an integration
export const setOnboardingCompleted = authActionClient
  .metadata({
    name: "set-onboarding-completed",
  })
  .action(async ({ ctx, parsedInput }) => {
    await ctx.supabase
      .from("users")
      .update({
        is_onboarded: true,
      })
      .eq("id", ctx.user.id);

    await ctx.supabase.auth.updateUser({
      data: {
        isOnboarded: true,
      },
    });

    return { success: true };
  });
