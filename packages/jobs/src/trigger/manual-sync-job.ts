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
      // const health = await engine.health.retrieve();

      const transactions = await engine.transactions.list({
        provider: "gocardless",
        accountId: account.account_id,
        accountType: getClassification(account.type),
        accessToken: account.bank_connection?.access_token,
        latest: "true",
      });
      console.log("transactions", transactions);
      // const formattedTransactions = transactions.data?.map((transaction) => {
      //   return transformTransaction({
      //     transaction,
      //     teamId: account.team_id,
      //     bankAccountId: account.id,
      //   });
      // });

      const formattedTransactions = [
        {
          name: "Kompleks Bv",
          description: null,
          date: "2024-10-28",
          amount: -237.4,
          currency: "EUR",
          method: "other",
          internal_id:
            "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb_51b073b728ac49d33563773a13a5f2e3",
          category_slug: null,
          bank_account_id: "be2d090f-bf35-4f17-8db3-8900b8889822",
          balance: null,
          team_id: "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb",
          status: "posted",
        },
        {
          name: "Kompleks Bv",
          description: null,
          date: "2024-10-21",
          amount: -55.95,
          currency: "EUR",
          method: "other",
          internal_id:
            "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb_bcd9efdd47f51b824fd6e15d09204df2",
          category_slug: null,
          bank_account_id: "be2d090f-bf35-4f17-8db3-8900b8889822",
          balance: null,
          team_id: "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb",
          status: "posted",
        },
        {
          name: "Kompleks Bv",
          description: null,
          date: "2024-10-16",
          amount: -4.26,
          currency: "EUR",
          method: "other",
          internal_id:
            "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb_99a584642abefd0a148f5a53e25e96b4",
          category_slug: null,
          bank_account_id: "be2d090f-bf35-4f17-8db3-8900b8889822",
          balance: null,
          team_id: "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb",
          status: "posted",
        },
        {
          name: "Kompleks Bv",
          description: null,
          date: "2024-10-16",
          amount: -8.2,
          currency: "EUR",
          method: "other",
          internal_id:
            "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb_401529ec19784c60c2d5187c9bb656bd",
          category_slug: null,
          bank_account_id: "be2d090f-bf35-4f17-8db3-8900b8889822",
          balance: null,
          team_id: "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb",
          status: "posted",
        },
        {
          name: "Kompleks Bv",
          description: null,
          date: "2024-10-16",
          amount: -23.76,
          currency: "EUR",
          method: "other",
          internal_id:
            "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb_f2fc5f984259fbbcf1892e68ca2f64a1",
          category_slug: null,
          bank_account_id: "be2d090f-bf35-4f17-8db3-8900b8889822",
          balance: null,
          team_id: "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb",
          status: "posted",
        },
        {
          name: "Kompleks Bv",
          description: null,
          date: "2024-10-16",
          amount: -4.5,
          currency: "EUR",
          method: "other",
          internal_id:
            "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb_1f0bf43ddc169cba622c058f9f6569cb",
          category_slug: null,
          bank_account_id: "be2d090f-bf35-4f17-8db3-8900b8889822",
          balance: null,
          team_id: "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb",
          status: "posted",
        },
        {
          name: "Btw Aangifte",
          description: null,
          date: "2024-10-15",
          amount: -9386.63,
          currency: "EUR",
          method: "other",
          internal_id:
            "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb_01bb7625dfe41edc2fa053925781c698",
          category_slug: null,
          bank_account_id: "be2d090f-bf35-4f17-8db3-8900b8889822",
          balance: null,
          team_id: "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb",
          status: "posted",
        },
        {
          name: "Kompleks Bv",
          description: null,
          date: "2024-10-15",
          amount: 12100,
          currency: "EUR",
          method: "other",
          internal_id:
            "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb_7509fc9d505aeb3297e01a32af614b60",
          category_slug: null,
          bank_account_id: "be2d090f-bf35-4f17-8db3-8900b8889822",
          balance: null,
          team_id: "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb",
          status: "posted",
        },
        {
          name: "Kompleks Bv",
          description: null,
          date: "2024-10-15",
          amount: -31.47,
          currency: "EUR",
          method: "other",
          internal_id:
            "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb_3aa114bc52799011f48a6f54aef5bee3",
          category_slug: null,
          bank_account_id: "be2d090f-bf35-4f17-8db3-8900b8889822",
          balance: null,
          team_id: "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb",
          status: "posted",
        },
        {
          name: "Kompleks Bv",
          description: null,
          date: "2024-10-14",
          amount: -4.37,
          currency: "EUR",
          method: "other",
          internal_id:
            "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb_e6b763f9b0c4f946dff08e1db9a479a2",
          category_slug: null,
          bank_account_id: "be2d090f-bf35-4f17-8db3-8900b8889822",
          balance: null,
          team_id: "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb",
          status: "posted",
        },
        {
          name: "Kompleks Bv",
          description: null,
          date: "2024-10-11",
          amount: -6.31,
          currency: "EUR",
          method: "other",
          internal_id:
            "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb_cb866e2d5ef70ec957d7c69aec5c5456",
          category_slug: null,
          bank_account_id: "be2d090f-bf35-4f17-8db3-8900b8889822",
          balance: null,
          team_id: "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb",
          status: "posted",
        },
        {
          name: "Kompleks Bv",
          description: null,
          date: "2024-10-11",
          amount: -8.4,
          currency: "EUR",
          method: "other",
          internal_id:
            "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb_1f1fea25804870b82e90055af67eb944",
          category_slug: null,
          bank_account_id: "be2d090f-bf35-4f17-8db3-8900b8889822",
          balance: null,
          team_id: "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb",
          status: "posted",
        },
        {
          name: "Kompleks Bv",
          description: null,
          date: "2024-10-11",
          amount: -46.7,
          currency: "EUR",
          method: "other",
          internal_id:
            "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb_ff62ed99e0a77c817954401ac43c7685",
          category_slug: null,
          bank_account_id: "be2d090f-bf35-4f17-8db3-8900b8889822",
          balance: null,
          team_id: "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb",
          status: "posted",
        },
        {
          name: "Kompleks Bv",
          description: null,
          date: "2024-10-10",
          amount: -7.77,
          currency: "EUR",
          method: "other",
          internal_id:
            "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb_f72b053acc0131aefed7fe59394adb91",
          category_slug: null,
          bank_account_id: "be2d090f-bf35-4f17-8db3-8900b8889822",
          balance: null,
          team_id: "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb",
          status: "posted",
        },
        {
          name: "Kompleks Bv",
          description: null,
          date: "2024-10-10",
          amount: -45.45,
          currency: "EUR",
          method: "other",
          internal_id:
            "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb_81db3a0122cdd599d49a2b0b5056f10a",
          category_slug: null,
          bank_account_id: "be2d090f-bf35-4f17-8db3-8900b8889822",
          balance: null,
          team_id: "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb",
          status: "posted",
        },
        {
          name: "Maxime Mylle",
          description: null,
          date: "2024-10-07",
          amount: -1479,
          currency: "EUR",
          method: "other",
          internal_id:
            "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb_43351aabd7754ee4b28d426e69fff0c6",
          category_slug: null,
          bank_account_id: "be2d090f-bf35-4f17-8db3-8900b8889822",
          balance: null,
          team_id: "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb",
          status: "posted",
        },
        {
          name: "Team Inning Bedrijfsvoorheffing",
          description: null,
          date: "2024-10-06",
          amount: -570,
          currency: "EUR",
          method: "other",
          internal_id:
            "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb_55cd2b2c61b83b2119582e093f14dbd1",
          category_slug: null,
          bank_account_id: "be2d090f-bf35-4f17-8db3-8900b8889822",
          balance: null,
          team_id: "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb",
          status: "posted",
        },
        {
          name: "Liantis Sociale Bijdrage",
          description: null,
          date: "2024-10-04",
          amount: -7883.22,
          currency: "EUR",
          method: "other",
          internal_id:
            "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb_1c81850bfb0f5d6717435f6c7dd59314",
          category_slug: null,
          bank_account_id: "be2d090f-bf35-4f17-8db3-8900b8889822",
          balance: null,
          team_id: "6b5633c2-83ac-4fd2-9bbe-524b1e645ebb",
          status: "posted",
        },
      ];

      // const balance = await engine.accounts.balance({
      //   provider: account.bank_connection.provider,
      //   id: account.account_id,
      //   accessToken: account.bank_connection?.access_token,
      // });

      // // const balance = { data: { currency: "EUR", amount: 572.79 } };
      // console.log("balance", balance);
      // // Update account balance
      // if (balance.data?.amount) {
      //   await supabase
      //     .from("bank_accounts")
      //     .update({
      //       balance: balance.data.amount,
      //     })
      //     .eq("id", account.id);
      // }
      // NOTE: We will get all the transactions at once for each account so
      // we need to guard against massive payloads
      await processBatch(formattedTransactions, BATCH_LIMIT, async (batch) => {
        console.log("batch", batch);
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

    return true;
  },
});
