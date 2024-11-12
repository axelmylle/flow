"use server";

import {
  createCompany,
  updateCompany,
  updateUser,
} from "@gigflow/supabase/mutations";
import { revalidateTag } from "next/cache";
import { authActionClient } from "../safe-action";
import { updateCompanySchema } from "./schema";

export const updateCompanyAction = authActionClient
  .schema(updateCompanySchema)
  .metadata({
    name: "update-company",
  })
  .action(async ({ parsedInput: data, ctx: { user, supabase } }) => {
    const { data: userOnCompany } = await supabase
      .from("users_on_company")
      .select("*")
      .eq("user_id", user.id)
      .eq("company_id", user.company_id!)
      .single();

    console.log(userOnCompany);
    let company;
    if (userOnCompany) {
      const { data: updatedCompany } = await updateCompany(
        userOnCompany?.company_id,
        data,
      );
      company = updatedCompany;
    } else {
      const { data: newCompany } = await createCompany(data);
      company = newCompany;
    }

    return company;
  });
