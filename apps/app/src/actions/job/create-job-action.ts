"use server";

import { authActionClient } from "@/actions/safe-action";
import { Cookies } from "@/utils/constants";
import { LogEvents } from "@gigflow/events/events";
import { createJob, createProject } from "@gigflow/supabase/mutations";
import { addYears } from "date-fns";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { createJobSchema } from "./schema";

export const createJobAction = authActionClient
  .schema(createJobSchema)
  .metadata({
    name: "create-job",
    track: {
      event: LogEvents.JobCreated.name,
      channel: LogEvents.JobCreated.channel,
    },
  })
  .action(async ({ parsedInput: params, ctx: { user, supabase } }) => {
    const { data } = await createJob(supabase, {
      ...params,
    });

    if (!data) {
      throw new Error("Failed to create job");
    }

    revalidateTag(`jobs_${user.company_id}`);

    return data;
  });
