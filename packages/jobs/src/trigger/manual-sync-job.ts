import { task } from "@trigger.dev/sdk/v3";

import Midday from "@midday-ai/engine/src/index.js";
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
      console.log("account", account);
      console.log("account.bank_connection", {
        provider: "gocardless",
        accountId: account.account_id,
        accountType: getClassification(account.type),
        accessToken: account.bank_connection?.access_token,
        latest: true,
      });
      // const health = await engine.health.retrieve();

      const transactions = await engine.transactions.list({
        provider: "gocardless",
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

      // const formattedTransactions = [
      //   {
      //     name: "Mobbin Com",
      //     description: null,
      //     date: "2024-10-02",
      //     amount: -40.91,
      //     currency: "EUR",
      //     method: "other",
      //     internal_id:
      //       "f50c1b3d-4279-4797-be84-918c3ae3e6d5_cfc9ebbbeeca3a6bcab9057a1f426db3",
      //     category_slug: null,
      //     bank_account_id: "7af9242d-0868-4f46-8f07-bc82924e48b0",
      //     balance: null,
      //     team_id: "f50c1b3d-4279-4797-be84-918c3ae3e6d5",
      //     status: "posted",
      //   },
      //   {
      //     name: "Openai",
      //     description: null,
      //     date: "2024-09-29",
      //     amount: -5.49,
      //     currency: "EUR",
      //     method: "other",
      //     internal_id:
      //       "f50c1b3d-4279-4797-be84-918c3ae3e6d5_a1381af789356397f9ee6ba2ea3fba83",
      //     category_slug: null,
      //     bank_account_id: "7af9242d-0868-4f46-8f07-bc82924e48b0",
      //     balance: null,
      //     team_id: "f50c1b3d-4279-4797-be84-918c3ae3e6d5",
      //     status: "posted",
      //   },
      //   {
      //     name: "Openai",
      //     description: null,
      //     date: "2024-09-29",
      //     amount: 0,
      //     currency: "EUR",
      //     method: "other",
      //     internal_id:
      //       "f50c1b3d-4279-4797-be84-918c3ae3e6d5_67598683c0da4bde596dd1ec970a8a14",
      //     category_slug: null,
      //     bank_account_id: "7af9242d-0868-4f46-8f07-bc82924e48b0",
      //     balance: null,
      //     team_id: "f50c1b3d-4279-4797-be84-918c3ae3e6d5",
      //     status: "posted",
      //   },
      //   {
      //     name: "Axel Wilfried M Mylle",
      //     description: "From Yassin Fauvart",
      //     date: "2024-09-28",
      //     amount: 55,
      //     currency: "EUR",
      //     method: "other",
      //     internal_id:
      //       "f50c1b3d-4279-4797-be84-918c3ae3e6d5_4b6fa9ad09970646d81a95f127d514ff",
      //     category_slug: "income",
      //     bank_account_id: "7af9242d-0868-4f46-8f07-bc82924e48b0",
      //     balance: null,
      //     team_id: "f50c1b3d-4279-4797-be84-918c3ae3e6d5",
      //     status: "posted",
      //   },
      //   {
      //     name: "Axel Wilfried M Mylle",
      //     description: "From Denisa Florina Coltea Dine Outs",
      //     date: "2024-09-25",
      //     amount: 50,
      //     currency: "EUR",
      //     method: "other",
      //     internal_id:
      //       "f50c1b3d-4279-4797-be84-918c3ae3e6d5_73a8b43023c799a5f8ba09f7310348b1",
      //     category_slug: "income",
      //     bank_account_id: "7af9242d-0868-4f46-8f07-bc82924e48b0",
      //     balance: null,
      //     team_id: "f50c1b3d-4279-4797-be84-918c3ae3e6d5",
      //     status: "posted",
      //   },
      //   {
      //     name: "Yassin Fauvart",
      //     description: "To Yassin Fauvart",
      //     date: "2024-09-24",
      //     amount: -730,
      //     currency: "EUR",
      //     method: "other",
      //     internal_id:
      //       "f50c1b3d-4279-4797-be84-918c3ae3e6d5_8f7a410a673ece515aec381acc2a141c",
      //     category_slug: null,
      //     bank_account_id: "7af9242d-0868-4f46-8f07-bc82924e48b0",
      //     balance: null,
      //     team_id: "f50c1b3d-4279-4797-be84-918c3ae3e6d5",
      //     status: "posted",
      //   },
      //   {
      //     name: "Denisa Florina Coltea",
      //     description: "To Denisa Florina Coltea",
      //     date: "2024-09-20",
      //     amount: -11,
      //     currency: "EUR",
      //     method: "other",
      //     internal_id:
      //       "f50c1b3d-4279-4797-be84-918c3ae3e6d5_c666435e7bc88bd06225f78f3fb12b0f",
      //     category_slug: null,
      //     bank_account_id: "7af9242d-0868-4f46-8f07-bc82924e48b0",
      //     balance: null,
      //     team_id: "f50c1b3d-4279-4797-be84-918c3ae3e6d5",
      //     status: "posted",
      //   },
      //   {
      //     name: "Axel Wilfried M Mylle",
      //     description: "From Denisa Florina Coltea Dine Outs",
      //     date: "2024-09-20",
      //     amount: 75,
      //     currency: "EUR",
      //     method: "other",
      //     internal_id:
      //       "f50c1b3d-4279-4797-be84-918c3ae3e6d5_02befb4fc0e3a8c13711dd35a8cc0c7b",
      //     category_slug: "income",
      //     bank_account_id: "7af9242d-0868-4f46-8f07-bc82924e48b0",
      //     balance: null,
      //     team_id: "f50c1b3d-4279-4797-be84-918c3ae3e6d5",
      //     status: "posted",
      //   },
      //   {
      //     name: "Cursor Ai Powered Ide",
      //     description: null,
      //     date: "2024-09-15",
      //     amount: -18.3,
      //     currency: "EUR",
      //     method: "other",
      //     internal_id:
      //       "f50c1b3d-4279-4797-be84-918c3ae3e6d5_f3c236314fae1477a67db16498e4f109",
      //     category_slug: null,
      //     bank_account_id: "7af9242d-0868-4f46-8f07-bc82924e48b0",
      //     balance: null,
      //     team_id: "f50c1b3d-4279-4797-be84-918c3ae3e6d5",
      //     status: "posted",
      //   },
      //   {
      //     name: "Axel Wilfried M Mylle",
      //     description: "From Denisa Florina Coltea Food Love",
      //     date: "2024-09-12",
      //     amount: 30,
      //     currency: "EUR",
      //     method: "other",
      //     internal_id:
      //       "f50c1b3d-4279-4797-be84-918c3ae3e6d5_02dd98637499a8da92c91f126a49790a",
      //     category_slug: "income",
      //     bank_account_id: "7af9242d-0868-4f46-8f07-bc82924e48b0",
      //     balance: null,
      //     team_id: "f50c1b3d-4279-4797-be84-918c3ae3e6d5",
      //     status: "posted",
      //   },
      //   {
      //     name: "Openai Chatgpt Subscr",
      //     description: null,
      //     date: "2024-09-12",
      //     amount: -22.05,
      //     currency: "EUR",
      //     method: "other",
      //     internal_id:
      //       "f50c1b3d-4279-4797-be84-918c3ae3e6d5_26447f39af94755114a8c8eac5e0a979",
      //     category_slug: null,
      //     bank_account_id: "7af9242d-0868-4f46-8f07-bc82924e48b0",
      //     balance: null,
      //     team_id: "f50c1b3d-4279-4797-be84-918c3ae3e6d5",
      //     status: "posted",
      //   },
      //   {
      //     name: "Supermaven Inc",
      //     description: null,
      //     date: "2024-09-10",
      //     amount: -9.11,
      //     currency: "EUR",
      //     method: "other",
      //     internal_id:
      //       "f50c1b3d-4279-4797-be84-918c3ae3e6d5_9768a72fda2a291b4983b228a798397a",
      //     category_slug: null,
      //     bank_account_id: "7af9242d-0868-4f46-8f07-bc82924e48b0",
      //     balance: null,
      //     team_id: "f50c1b3d-4279-4797-be84-918c3ae3e6d5",
      //     status: "posted",
      //   },
      //   {
      //     name: "Axel Wilfried M Mylle",
      //     description: "From Denisa Florina Coltea Thai",
      //     date: "2024-09-09",
      //     amount: 36,
      //     currency: "EUR",
      //     method: "other",
      //     internal_id:
      //       "f50c1b3d-4279-4797-be84-918c3ae3e6d5_7142621151bfa85069f36b16018f286d",
      //     category_slug: "income",
      //     bank_account_id: "7af9242d-0868-4f46-8f07-bc82924e48b0",
      //     balance: null,
      //     team_id: "f50c1b3d-4279-4797-be84-918c3ae3e6d5",
      //     status: "posted",
      //   },
      //   {
      //     name: "Axel Wilfried M Mylle",
      //     description: "From Denisa Florina Coltea",
      //     date: "2024-09-08",
      //     amount: 1159.91,
      //     currency: "EUR",
      //     method: "other",
      //     internal_id:
      //       "f50c1b3d-4279-4797-be84-918c3ae3e6d5_4115466502cb4f37aa23c13fb91a4143",
      //     category_slug: "income",
      //     bank_account_id: "7af9242d-0868-4f46-8f07-bc82924e48b0",
      //     balance: null,
      //     team_id: "f50c1b3d-4279-4797-be84-918c3ae3e6d5",
      //     status: "posted",
      //   },
      // ];
      console.log("formattedTransactions", formattedTransactions);
      const balance = await engine.accounts.balance({
        provider: account.bank_connection.provider,
        id: account.account_id,
        accessToken: account.bank_connection?.access_token,
      });

      // const balance = { data: { currency: "EUR", amount: 572.79 } };
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
        const smth = await supabase.from("transactions").upsert(batch, {
          // onConflict: "internal_id",
          ignoreDuplicates: true,
        });
        console.log("smth error", smth.error);
      });
    });

    try {
      console.log("promises", promises);
      if (promises) {
        await Promise.all(promises);
      }
    } catch (error) {
      console.log(error);
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
