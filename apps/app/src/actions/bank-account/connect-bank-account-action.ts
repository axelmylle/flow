"use server";

import { getMostFrequentCurrency } from "@/utils/currency";
// import { LogEvents } from "@v1/events/events";
import { Events, client } from "@v1/jobs";
import { getTeamSettings } from "@v1/supabase/cached-queries";
import { createBankAccounts } from "@v1/supabase/mutations";
import { revalidateTag } from "next/cache";
import { authActionClient } from "../safe-action";
import { connectBankAccountSchema } from "./schema";

export const connectBankAccountAction = authActionClient
  .schema(connectBankAccountSchema)
  .metadata({
    name: "connect-bank-account",
    // track: {
    //   event: LogEvents.ConnectBankCompleted.name,
    //   channel: LogEvents.ConnectBankCompleted.channel,
    // },
  })
  .action(
    async ({
      parsedInput: {
        provider,
        accounts,
        accessToken,
        enrollmentId,
        referenceId,
      },
      ctx: { supabase, user },
    }) => {
      const teamId = user.team_id;
      const result = await getTeamSettings();
      const data = result?.data;
      const selectedCurrency = getMostFrequentCurrency(accounts);

      // Update team settings with base currency if not set
      if (!data?.base_currency && selectedCurrency && teamId) {
        await supabase
          .from("teams")
          .update({
            base_currency: selectedCurrency,
          })
          .eq("id", teamId);
      }

      const bankAccounts = await createBankAccounts(supabase, {
        accessToken,
        enrollmentId,
        referenceId,
        teamId,
        userId: user.id,
        accounts,
        provider,
      });

      const event = await client.sendEvent({
        name: Events.TRANSACTIONS_INITIAL_SYNC,
        payload: {
          teamId,
        },
      });

      revalidateTag(`bank_accounts_${teamId}`);
      revalidateTag(`bank_accounts_currencies_${teamId}`);
      revalidateTag(`bank_connections_${teamId}`);

      return event;
    },
  );
