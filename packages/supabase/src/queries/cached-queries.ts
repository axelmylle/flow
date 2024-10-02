import "server-only";

import { unstable_cache } from "next/cache";
import { cache } from "react";
import {
  type GetTeamBankAccountsParams,
  type GetTransactionsParams,
  getTeamBankAccountsQuery,
  getTeamSettingsQuery,
  getTransactionsQuery,
  getUserQuery,
} from ".";
import { createClient } from "../clients/server";

export const getTransactions = async (
  params: Omit<GetTransactionsParams, "teamId">,
) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await getUser();

  if (!user) {
    return null;
  }

  return unstable_cache(
    async () => {
      return getTransactionsQuery(supabase, params);
    },
    ["transactions", user?.id],
    {
      revalidate: 180,
      tags: [`transactions_${user?.id}`],
    },
  )(params);
};

export const getSession = cache(async () => {
  const supabase = createClient();

  return supabase.auth.getSession();
});

export const getUser = async () => {
  const {
    data: { session },
  } = await getSession();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const supabase = createClient();

  return unstable_cache(
    async () => {
      return getUserQuery(supabase, userId);
    },
    ["user", userId],
    {
      tags: [`user_${userId}`],
      revalidate: 180,
    },
  )(userId);
};

export const getTeamSettings = async () => {
  const supabase = createClient();
  const user = await getUser();
  const teamId = user?.data?.team_id;
  console.log(teamId);
  if (!teamId) {
    return null;
  }

  return unstable_cache(
    async () => {
      return getTeamSettingsQuery(supabase, teamId);
    },
    ["team_settings", teamId],
    {
      tags: [`team_settings_${teamId}`],
      revalidate: 3600,
    },
  )();
};

export const getTeamBankAccounts = async (
  params?: Omit<GetTeamBankAccountsParams, "teamId">,
) => {
  const supabase = createClient();

  const user = await getUser();
  const teamId = user?.data?.team_id;

  if (!teamId) {
    return Error("No team id");
  }

  return unstable_cache(
    async () => {
      return getTeamBankAccountsQuery(supabase, { ...params, teamId });
    },
    ["bank_accounts", teamId],
    {
      tags: [`bank_accounts_${teamId}`],
      revalidate: 180,
    },
  )(params);
};
