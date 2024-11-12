"use server";

import { updateClient, updateUser } from "@gigflow/supabase/mutations";
import { revalidateTag } from "next/cache";
import { authActionClient } from "../safe-action";

import { updateProfileAtCompany } from "../../../../../packages/supabase/src/mutations/index";
import { updateProfileAtCompanySchema } from "./schema";

export const updateProfileAtCompanyAction = authActionClient
  .schema(updateProfileAtCompanySchema)
  .metadata({
    name: "update-profile-at-company",
  })
  .action(async ({ parsedInput: data, ctx: { user, supabase } }) => {
    const { data: profileAtCompany, error } = await supabase
      .from("users_on_client")
      .select("*")
      .eq("user_id", user.id)
      .eq("client_id", user.client_id!)
      .single();

    console.log("profileAtCompany", profileAtCompany, error);
    if (!profileAtCompany) {
      throw new Error("profile at client not found", error.message);
    }

    const {
      location,
      phone_number,
      title,
      linkedin_url,
      first_name,
      last_name,
    } = data;

    await updateProfileAtCompany(profileAtCompany.id, {
      location,
      phone_number,
      title,
    });

    await updateUser(user.id, {
      first_name,
      last_name,
    });

    revalidateTag(`user_${user.id}`);

    return profileAtCompany;
  });
