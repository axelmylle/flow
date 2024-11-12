//implement action for registering user

"use server";

import { actionClientWithMeta } from "@/actions/safe-action";
import { createClient } from "@gigflow/supabase/server";
import { z } from "zod";
import { authActionClient } from "../safe-action";

export const registerUserAction = actionClientWithMeta
  .schema(z.object({ email: z.string().email() }))
  .metadata({
    name: "register-user",
  })
  .action(async ({ parsedInput: { email }, ctx }) => {
    const supabase = createClient();

    const data = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {},
    });

    const flks = data.data.url;

    return userExists;
  });
