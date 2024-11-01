"use server";

import { authActionClient } from "@/actions/safe-action";
import { Cookies } from "@/utils/constants";

import {
  createCompanyClient,
  updateCompany,
  updateUser,
} from "@v1/supabase/mutations";
import { addYears } from "date-fns";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { createClientSchema } from "./schema";

export const createClientAction = authActionClient
  .schema(createClientSchema)
  .metadata({
    name: "create-client",
    // track: {
    //   event: LogEvents.ClientCreated.name,
    //   channel: LogEvents.ClientCreated.channel,
    // },
  })
  .action(async ({ parsedInput: params, ctx }) => {
    console.log(params.name);
    //if user is already connected to a company update the company
    if (ctx.user.company_id) {
      const company_id = await updateCompany(ctx.user.company_id, {
        id: ctx.user.company_id,
        name: params.name,
      });
      return { companyId: company_id };
    }

    const company_id = await createCompanyClient(ctx.supabase, {
      name: params.name,
    });

    if (!company_id) {
      throw new Error("Failed to create company");
    }

    const user = await updateUser(ctx.user.id, { company_id });

    if (!user?.data) {
      return;
    }

    revalidateTag(`user_${user.data.id}`);
    revalidateTag(`companies_${user.data.id}`);

    return { companyId: company_id };
  });
