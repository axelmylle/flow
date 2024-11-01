"use server";

import { createClient } from "@v1/supabase/server";
import { redirect } from "next/navigation";
import { actionClient } from "../safe-action";
import { verifyOtpSchema } from "./schema";

export const verifyOtpAction = actionClient
  .schema(verifyOtpSchema)

  .action(async ({ parsedInput: { email, token } }) => {
    const supabase = createClient();

    await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    redirect("/");
  });
