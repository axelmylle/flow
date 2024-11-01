"use server";

import { z } from "zod";
import { authActionClient } from "../safe-action";

export const getUserExistsAction = authActionClient
  .schema(z.object({ email: z.string().email() }))
  .metadata({
    name: "get-user-exists",
  })
  .action(async ({ parsedInput: { email }, ctx }) => {
    const user = await ctx.supabase
      .from("users")
      .select("*")
      .eq("email", email);
    const userExists = user.data?.length > 0;

    return userExists;
  });
