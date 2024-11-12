"use server";

import { authActionClient } from "@/actions/safe-action";
import { Cookies } from "@/utils/constants";
// import { LogEvents } from "@midday/events/events";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { deleteExperienceSchema } from "./schema";

export const deleteExperienceAction = authActionClient
  .schema(deleteExperienceSchema)
  .metadata({
    name: "delete-experience",
  })
  .action(async ({ parsedInput: params, ctx: { user, supabase } }) => {
    await supabase.from("freelancer_experiences").delete().eq("id", params.id);

    cookies().delete(Cookies.LastProject);

    revalidateTag(`freelancer_experiences_${user.id}`);
  });
