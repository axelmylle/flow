"use server";

import { updateUser } from "@gigflow/supabase/mutations";
import {
  revalidatePath as nextRevalidatePath,
  revalidateTag,
} from "next/cache";
import { authActionClient } from "../safe-action";
import { updateUserSchema } from "./schema";

export const updateUserAction = authActionClient
  .schema(updateUserSchema)
  .metadata({
    name: "update-user",
  })
  .action(
    async ({
      parsedInput: { revalidatePath, ...data },
      ctx: { user, supabase },
    }) => {
      await updateUser(user.id, data);

      if (data.full_name) {
        await supabase.auth.updateUser({
          data: { full_name: data.full_name },
        });
      }

      revalidateTag(`user_${user.id}`);

      if (revalidatePath) {
        nextRevalidatePath(revalidatePath);
      }

      return user;
    },
  );
