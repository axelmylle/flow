import { task } from "@trigger.dev/sdk/v3";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../../supabase/src/types/db";
import { Jobs } from "../constants";
import { engine } from "../utils/engine";
import { parseAPIError } from "../utils/error";
import { processBatch } from "../utils/process";
import { getClassification, transformTransaction } from "../utils/transform";

const supabase = createClient<Database>(
  // These details can be found in your Supabase project settings under `API`
  "http://127.0.0.1:54321" as string, // e.g. https://abc123.supabase.co - replace 'abc123' with your project ID
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU" as string, // Your service role secret key
);

const BATCH_LIMIT = 500;

export const manualSyncTask = task({
  id: Jobs.TRANSACTIONS_MANUAL_SYNC,
  retry: {
    maxAttempts: 1,
  },
  run: async (
    payload: {
      connectionId: string;
      teamId: string;
    },
    ctx,
  ) => {
    const { teamId, connectionId } = payload;

    const { data: accountsData } = await supabase
      .from("bank_accounts")
      .select(
        "id, team_id, account_id, type, bank_connection:bank_connection_id(id, provider, access_token)",
      )
      .eq("bank_connection_id", connectionId)
      .eq("team_id", teamId)
      .eq("enabled", true);

    console.log("accountsData", accountsData);
    const promises = accountsData?.map(async (account) => {
      const transactions = await engine.transactions.list({
        provider: account.bank_connection.provider,
        accountId: account.account_id,
        accountType: getClassification(account.type),
        accessToken: account.bank_connection?.access_token,
        latest: true,
      });

      console.log("transactions", transactions);

      const formattedTransactions = transactions.data?.map((transaction) => {
        return transformTransaction({
          transaction,
          teamId: account.team_id,
          bankAccountId: account.id,
        });
      });
      console.log("formattedTransactions", formattedTransactions);
      const balance = await engine.accounts.balance({
        provider: account.bank_connection.provider,
        id: account.account_id,
        accessToken: account.bank_connection?.access_token,
      });
      console.log("balance", balance);
      // Update account balance
      if (balance.data?.amount) {
        await supabase
          .from("bank_accounts")
          .update({
            balance: balance.data.amount,
          })
          .eq("id", account.id);
      }

      // NOTE: We will get all the transactions at once for each account so
      // we need to guard against massive payloads
      await processBatch(formattedTransactions, BATCH_LIMIT, async (batch) => {
        await supabase.from("transactions").upsert(batch, {
          onConflict: "internal_id",
          ignoreDuplicates: true,
        });
      });
    });

    try {
      console.log("promises", promises);
      if (promises) {
        await Promise.all(promises);
      }
    } catch (error) {
      if (error) {
        const parsedError = parseAPIError(error);
        console.log("parsedError", parsedError);
        await supabase
          .from("bank_connections")
          .update({
            status: parsedError.code,
            error_details: parsedError.message,
          })
          .eq("id", connectionId);
      }

      throw new Error(error instanceof Error ? error.message : String(error));
    }

    // Update bank connection last accessed and restore connection status
    await supabase
      .from("bank_connections")
      .update({
        last_accessed: new Date().toISOString(),
        status: "connected",
        error_details: null,
      })
      .eq("id", connectionId);
  },
});
