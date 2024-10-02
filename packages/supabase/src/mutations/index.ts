import { getAccessValidForDays } from "@v1/engine/src/providers/gocardless/utils";
import { logger } from "@v1/logger";
import { createClient } from "@v1/supabase/server";
import { addDays } from "date-fns";
import { getCurrentUserTeamQuery, getUserInviteQuery } from "../queries";
import type { Database, Tables, TablesUpdate } from "../types";
import type { Client } from "../types";

export async function updateUser(userId: string, data: TablesUpdate<"users">) {
  const supabase = createClient();

  try {
    const result = await supabase.from("users").update(data).eq("id", userId);

    return result;
  } catch (error) {
    logger.error(error);

    throw error;
  }
}

type CreateBankAccountsPayload = {
  accounts: {
    account_id: string;
    institution_id: string;
    logo_url: string;
    name: string;
    bank_name: string;
    currency: string;
    enabled: boolean;
    balance: number;
    type: "depository" | "credit" | "other_asset" | "loan" | "other_liability";
  }[];
  balance: number;
  accessToken?: string;
  enrollmentId?: string;
  referenceId?: string;
  teamId: string;
  userId: string;
  provider: "gocardless" | "teller" | "plaid";
};

export async function createBankAccounts(
  supabase: Client,
  {
    accounts,
    accessToken,
    enrollmentId,
    referenceId,
    teamId,
    userId,
    provider,
  }: CreateBankAccountsPayload,
) {
  // Get first account to create a bank connection
  const account = accounts?.at(0);

  if (!account) {
    return;
  }

  // NOTE: GoCardLess connection expires after 90-180 days
  const expiresAt =
    provider === "gocardless"
      ? addDays(
          new Date(),
          getAccessValidForDays({ institutionId: account.institution_id }),
        ).toDateString()
      : undefined;

  console.log("before bank connection", {
    institution_id: account.institution_id,
    name: account.bank_name,
    logo_url: account.logo_url,
    team_id: teamId,
    provider,
    access_token: accessToken,
    enrollment_id: enrollmentId,
    reference_id: referenceId,
    expires_at: expiresAt,
  });
  const bankConnection = await supabase
    .from("bank_connections")
    .upsert(
      {
        institution_id: account.institution_id,
        name: account.bank_name,
        logo_url: account.logo_url,
        team_id: teamId,
        provider,
        access_token: accessToken,
        enrollment_id: enrollmentId,
        reference_id: referenceId,
        expires_at: expiresAt,
      },
      {
        onConflict: "institution_id, team_id",
      },
    )
    .select()
    .single();

  console.log("after bank connection", bankConnection.error);
  console.log("after bank connection", bankConnection.data);
  console.log("after bank connection", bankConnection.status);

  return supabase
    .from("bank_accounts")
    .upsert(
      accounts.map(
        (account) => ({
          account_id: account.account_id,
          bank_connection_id: bankConnection?.data?.id,
          team_id: teamId,
          created_by: userId,
          name: account.name,
          currency: account.currency,
          enabled: account.enabled,
          type: account.type,
          balance: account.balance ?? 0,
        }),
        {
          onConflict: "account_id",
        },
      ),
    )
    .select();
}

export async function deleteBankAccount(supabase: Client, id: string) {
  return await supabase
    .from("bank_accounts")
    .delete()
    .eq("id", id)
    .select()
    .single();
}

type UpdateBankAccountParams = {
  id: string;
  teamId: string;
  name: string;
  type: "depository" | "credit" | "other_asset" | "loan" | "other_liability";
};

export async function updateBankAccount(
  supabase: Client,
  params: UpdateBankAccountParams,
) {
  const { id, teamId, ...data } = params;

  return await supabase
    .from("bank_accounts")
    .update(data)
    .eq("id", id)
    .eq("team_id", teamId)
    .select()
    .single();
}

export async function updateFreelancer(
  freelancerId: string,
  data: TablesUpdate<"freelancers">,
) {
  const supabase = createClient();

  try {
    const result = await supabase
      .from("freelancers")
      .update(data)
      .eq("id", freelancerId);

    return result;
  } catch (error) {
    logger.error(error);

    throw error;
  }
}
