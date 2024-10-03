"use server";

import { authActionClient } from "@/actions/safe-action";
import { manualSyncTransactionsSchema } from "./schema";

import { Events, client } from "@v1/jobs";
import { manualSyncTask } from "@v1/jobs/src/trigger/manual-sync-job";

export const manualSyncTransactionsAction = authActionClient
  .schema(manualSyncTransactionsSchema)
  .metadata({
    name: "manual-sync-transactions",
    // track: {
    //   event: LogEvents.TransactionsManualSync.name,
    //   channel: LogEvents.TransactionsManualSync.channel,
    // },
  })
  .action(
    async ({ parsedInput: { connectionId }, ctx: { user, supabase } }) => {
      try {
        await manualSyncTask.trigger({
          connectionId,
          teamId: user.team_id,
          supabase,
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  );
