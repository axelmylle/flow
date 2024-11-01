"use server";

import { updateUserAtCompanySchema } from "@/actions/company/schema";
import { revalidateTag } from "next/cache";
import { authActionClient } from "../safe-action";

export const updateCompanyUserAction = authActionClient
  .schema(updateUserAtCompanySchema)
  .metadata({
    name: "update-company-user",
  })
  .action(async ({ parsedInput: data, ctx: { user, supabase } }) => {
    //make cached query
    console.log("data", data);
    const { data: userOnCompany } = await supabase
      .from("users_on_company")
      .upsert({
        title: data.title,
        user_id: user.id,
        company_id: user.company_id ?? data.company_id, // Use existing company_id if available, otherwise use the one from data
        role: data.role,
      })
      .select("*")
      .single()
      .throwOnError();

    if (!userOnCompany) {
      throw new Error("user doesn't exist in company");
    }

    const { data: userData } = await supabase
      .from("users")
      .update({
        company_id: userOnCompany.company_id!,
      })
      .eq("id", user.id)
      .select("*")
      .single();

    revalidateTag(`company_user_${userOnCompany.user_id}`);

    return userOnCompany;
  });
