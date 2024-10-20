"use server";

import { authActionClient } from "@/actions/safe-action";
import { Cookies } from "@/utils/constants";

import {
  createClient,
  createCompanyClient,
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
    if (ctx.user.client_id) {
      return { clientId: ctx.user.client_id };
    }

    const client_id = await createCompanyClient(ctx.supabase, {
      name: params.name,
    });

    if (!client_id) {
      throw new Error("Failed to create client");
    }

    const user = await updateUser(ctx.user.id, { client_id });

    if (!user?.data) {
      return;
    }

    revalidateTag(`user_${user.data.id}`);
    revalidateTag(`clients_${user.data.id}`);

    return { clientId: client_id };
  });
