import "server-only";

import { unstable_cache } from "next/cache";
import { cache } from "react";
import {
  type GetCategoriesParams,
  type GetJobsParams,
  type GetMetricsParams,
  type GetTeamBankAccountsParams,
  type GetTrackerProjectsQueryParams,
  type GetTrackerRecordsByRangeParams,
  type GetTransactionsParams,
  getCategoriesQuery,
  getMetricsQuery,
  getSkillByIdQuery,
  getSkillQuestionsByIdQuery,
  getTeamBankAccountsQuery,
  getTeamMembersQuery,
  getTeamSettingsQuery,
  getTeamUserQuery,
  getTrackerProjectsQuery,
  getTrackerRecordsByRangeQuery,
  getTransactionsQuery,
  getUserQuery,
} from ".";
import { createClient } from "../clients/server";
import { getJobsByQuery } from "./index";

export const getTrackerRecordsByRange = async (
  params: Omit<GetTrackerRecordsByRangeParams, "teamId">,
) => {
  const supabase = createClient();
  const user = await getUser();
  const teamId = user?.data?.team_id;

  return unstable_cache(
    async () => {
      return getTrackerRecordsByRangeQuery(supabase, {
        ...params,
        teamId,
        userId: user?.data?.id,
      });
    },
    ["tracker_entries", teamId],
    {
      tags: [`tracker_entries_${teamId}`],
      revalidate: 180,
    },
  )(params);
};

export const getJobs = async (params: GetJobsParams) => {
  const supabase = createClient();
  const user = await getUser();

  return unstable_cache(
    async () => {
      return getJobsByQuery(supabase, {
        ...params,
      });
    },
    ["jobs", user?.data?.id],
    {
      tags: [`jobs_${user?.data?.id}`],
      revalidate: 180,
    },
  )(params);
};

export const getMetrics = async (params: Omit<GetMetricsParams, "teamId">) => {
  const supabase = createClient();

  const user = await getUser();
  const teamId = user?.data?.team_id;

  if (!teamId) {
    return null;
  }

  return unstable_cache(
    async () => {
      return getMetricsQuery(supabase, { ...params, teamId });
    },
    ["metrics", teamId],
    {
      tags: [`metrics_${teamId}`],
      revalidate: 3600,
    },
  )(params);
};

export const getTransactions = async (
  params: Omit<GetTransactionsParams, "teamId">,
) => {
  const supabase = createClient();
  const user = await getUser();
  const teamId = user?.data?.team_id;
  console.log(teamId);
  if (!teamId) {
    return null;
  }

  return unstable_cache(
    async () => {
      return getTransactionsQuery(supabase, { ...params, teamId });
    },
    ["transactions", user?.id],
    {
      revalidate: 180,
      tags: [`transactions_${user?.id}`],
    },
  )(params);
};

export const getTrackerProjects = async (
  params: Omit<GetTrackerProjectsQueryParams, "teamId">,
) => {
  const supabase = createClient();
  const user = await getUser();
  const teamId = user?.data?.team_id;

  return unstable_cache(
    async () => {
      return getTrackerProjectsQuery(supabase, { ...params, teamId });
    },
    ["tracker_projects", teamId],
    {
      tags: [`tracker_projects_${teamId}`],
      revalidate: 180,
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

export const getCategories = async (
  params?: Omit<GetCategoriesParams, "teamId">,
) => {
  const supabase = createClient();
  const user = await getUser();
  const teamId = user?.data?.team_id;

  return unstable_cache(
    async () => {
      return getCategoriesQuery(supabase, { ...params, teamId });
    },
    ["transaction_categories", teamId],
    {
      tags: [`transaction_categories_${teamId}`],
      revalidate: 3600,
    },
  )(params);
};

export const getTeamMembers = async () => {
  const supabase = createClient();

  const user = await getUser();
  const teamId = user?.data?.team_id;

  if (!teamId) {
    return null;
  }

  return unstable_cache(
    async () => {
      return getTeamMembersQuery(supabase, teamId);
    },
    ["team_members", teamId],
    {
      tags: [`team_members_${teamId}`],
      revalidate: 180,
    },
  )(teamId);
};

export const getTeamUser = async () => {
  const supabase = createClient();
  const user = await getUser();

  return unstable_cache(
    async () => {
      return getTeamUserQuery(supabase, {
        userId: user?.data.id,
        teamId: user?.data.team_id,
      });
    },
    ["team", "user", user?.data.id],
    {
      tags: [`team_user_${user?.data.id}`],
      revalidate: 180,
    },
  )(user?.data.id);
};

export const getSkillById = async (skillId: string) => {
  const supabase = createClient();
  return getSkillByIdQuery(supabase, skillId);
};

export const getSkillQuestionsBySkillId = async (skillId: string) => {
  const supabase = createClient();

  return unstable_cache(async () => {
    return getSkillQuestionsByIdQuery(supabase, skillId);
  }, ["skill", skillId])(skillId);
};
