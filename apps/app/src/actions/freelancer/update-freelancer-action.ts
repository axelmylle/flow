"use server";

import { updateFreelancer, updateUser } from "@v1/supabase/mutations";
import { revalidateTag } from "next/cache";
import { authActionClient } from "../safe-action";
import { updateFreelancerSchema } from "./schema";

export const updateFreelancerAction = authActionClient
  .schema(updateFreelancerSchema)
  .metadata({
    name: "update-freelancer",
  })
  .action(async ({ parsedInput: data, ctx: { user, supabase } }) => {
    const { data: freelancer, error } = await supabase
      .from("freelancers")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!freelancer) {
      throw new Error("Freelancer not found", error.message);
    }

    await updateFreelancer(freelancer?.id, data);

    revalidateTag(`freelancer_${freelancer.id}`);

    return freelancer;
  });
