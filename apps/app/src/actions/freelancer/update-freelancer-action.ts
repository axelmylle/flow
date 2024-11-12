"use server";

import {
  createFreelancer,
  updateFreelancer,
  updateUser,
} from "@gigflow/supabase/mutations";
import { revalidateTag } from "next/cache";
import { authActionClient } from "../safe-action";
import { updateFreelancerSchema } from "./schema";

export const updateFreelancerAction = authActionClient
  .schema(updateFreelancerSchema)
  .metadata({
    name: "update-freelancer",
  })
  .action(async ({ parsedInput: data, ctx: { user, supabase } }) => {
    const { data: doesFreelancerExist, error } = await supabase
      .from("freelancers")
      .select("*")
      .eq("user_id", user.id)
      .single();
    if (!doesFreelancerExist) {
      const { data: freelancer } = await createFreelancer(supabase, {
        headline: data.headline,
      });
    } else {
      const { data: freelancer } = await updateFreelancer(
        doesFreelancerExist.id,
        data,
      );
    }

    // await updateFreelancer(freelancer?.id, data);

    // revalidateTag(`freelancer_${freelancer.id}`);
    // revalidateTag(`user_${user.id}`);

    // return freelancer;
  });
