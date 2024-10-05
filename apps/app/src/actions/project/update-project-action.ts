"use server";

import { authActionClient } from "@/actions/safe-action";
// import { LogEvents } from "@midday/events/events";
import { revalidateTag } from "next/cache";
import { updateProjectSchema } from "./schema";

export const updateProjectAction = authActionClient
  .schema(updateProjectSchema)
  .metadata({
    name: "update-project",
    // track: {
    //   event: LogEvents.ProjectUpdated.name,
    //   channel: LogEvents.ProjectUpdated.channel,
    // },
  })
  .action(async ({ parsedInput: params, ctx: { user, supabase } }) => {
    const { id, ...data } = params;

    await supabase.from("tracker_projects").update(data).eq("id", id);

    revalidateTag(`tracker_projects_${user.team_id}`);
  });
