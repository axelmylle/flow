"use server";

import { authActionClient } from "@/actions/safe-action";
import { createFreelancerExperience } from "@gigflow/supabase/mutations";
import { revalidateTag } from "next/cache";
import { createExperienceSchema } from "./schema";

export const createExperienceAction = authActionClient
  .schema(createExperienceSchema)
  .metadata({
    name: "create-experience",
  })
  .action(async ({ parsedInput: params, ctx: { user, supabase } }) => {
    const { data: freelancer } = await supabase
      .from("freelancers")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!freelancer) {
      throw new Error("Freelancer profile not found");
    }
    console.log("freelancer", freelancer);
    const { data, error } = await createFreelancerExperience(supabase, {
      ...params,
      freelancer_id: freelancer.id,
    });

    if (error) {
      throw error;
    }

    revalidateTag(`freelancer_experiences_${user.id}`);
    console.log("data", data.id);
    return data;
  });
