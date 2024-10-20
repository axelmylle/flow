"use server";

import { updateClient, updateUser } from "@v1/supabase/mutations";
import { revalidateTag } from "next/cache";
import { authActionClient } from "../safe-action";
import { updateClientSchema } from "./schema";

export const updateClientAction = authActionClient
  .schema(updateClientSchema)
  .metadata({
    name: "update-client",
  })
  .action(async ({ parsedInput: data, ctx: { user, supabase } }) => {
    const { data: Client, error } = await supabase
      .from("clients")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!Client) {
      throw new Error("Client not found", error.message);
    }

    await updateClient(Client?.id, data);

    revalidateTag(`Client_${Client.id}`);

    return Client;
  });
