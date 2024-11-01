import { getAccessValidForDays } from "@v1/engine/src/providers/gocardless/utils";
import { logger } from "@v1/logger";
import { createClient } from "@v1/supabase/server";
import { addDays } from "date-fns";
import {
  getCompanyInviteQuery,
  getCurrentUserTeamQuery,
  getUserInviteQuery,
} from "../queries";
import type { Database, Tables, TablesInsert, TablesUpdate } from "../types";
import type { Client } from "../types";

export async function updateUser(userId: string, data: TablesUpdate<"users">) {
  const supabase = createClient();

  try {
    console.log("data", data, userId);
    const result = await supabase.from("users").update(data).eq("id", userId);

    return result;
  } catch (error) {
    logger.error(error);

    throw error;
  }
}

export async function updateCompany(
  companyId: string,
  data: TablesUpdate<"companies">,
) {
  const supabase = createClient();

  try {
    const result = await supabase
      .from("companies")
      .update(data)
      .eq("id", companyId)
      .select("*")
      .single();

    return result;
  } catch (error) {
    logger.error(error);

    throw error;
  }
}

export async function createCompany(data: TablesInsert<"companies">) {
  const supabase = createClient();

  try {
    const result = await supabase
      .from("companies")
      .insert(data)
      .select("*")
      .single();

    return result;
  } catch (error) {
    logger.error(error);

    throw error;
  }
}

type LeaveTeamParams = {
  userId: string;
  teamId: string;
};

export async function leaveTeam(supabase: Client, params: LeaveTeamParams) {
  await supabase
    .from("users")
    .update({
      team_id: null,
    })
    .eq("id", params.userId)
    .eq("team_id", params.teamId);

  return supabase
    .from("users_on_team")
    .delete()
    .eq("team_id", params.teamId)
    .eq("user_id", params.userId)
    .select()
    .single();
}

type DeleteTeamMemberParams = {
  userId: string;
  teamId: string;
};

export async function deleteTeamMember(
  supabase: Client,
  params: DeleteTeamMemberParams,
) {
  return supabase
    .from("users_on_team")
    .delete()
    .eq("user_id", params.userId)
    .eq("team_id", params.teamId)
    .select()
    .single();
}

type UpdateUserTeamRoleParams = {
  role: "owner" | "member";
  userId: string;
  teamId: string;
};

export async function updateUserTeamRole(
  supabase: Client,
  params: UpdateUserTeamRoleParams,
) {
  const { role, userId, teamId } = params;

  return supabase
    .from("users_on_team")
    .update({
      role,
    })
    .eq("user_id", userId)
    .eq("team_id", teamId)
    .select()
    .single();
}

export async function joinTeamByInviteCode(supabase: Client, code: string) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user.email) {
    return;
  }
  const { data: inviteData } = await getUserInviteQuery(supabase, {
    code,
    email: session.user.email,
  });

  if (inviteData) {
    // Add user team
    await supabase.from("users_on_team").insert({
      user_id: session.user.id,
      team_id: inviteData?.team_id,
      role: inviteData.role,
    });

    // Set current team
    const { data } = await supabase
      .from("users")
      .update({
        team_id: inviteData?.team_id,
      })
      .eq("id", session.user.id)
      .select()
      .single();

    // remove invite
    await supabase.from("user_invites").delete().eq("code", code);

    return data;
  }

  return null;
}

export async function joinCompanyByInviteCode(supabase: Client, code: string) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user.email) {
    return;
  }

  const { data: inviteData } = await getCompanyInviteQuery(supabase, {
    code,
  });

  console.log("inviteData", inviteData);

  if (inviteData) {
    // Add user team
    await supabase.from("users_on_company").insert({
      user_id: session.user.id,
      company_id: inviteData?.company_id,
      role: inviteData.role,
    });

    // Set current team
    const { data } = await supabase
      .from("users")
      .update({
        company_id: inviteData?.company_id,
        user_type: "Company",
      })
      .eq("id", session.user.id)
      .select()
      .single();

    // remove invite
    await supabase.from("company_user_invites").delete().eq("code", code);

    return data;
  }

  return null;
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

  //TODO: check onConflict
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
      // {
      //   onConflict: "institution_id, team_id",
      // },
    )
    .select()
    .single();

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

type CreateProjectParams = {
  name: string;
  description?: string;
  estimate?: number;
  billable?: boolean;
  rate?: number;
  currency?: string;
};

export async function createProject(
  supabase: Client,
  params: CreateProjectParams,
) {
  const { data: userData } = await getCurrentUserTeamQuery(supabase);

  return supabase
    .from("tracker_projects")
    .insert({
      ...params,
      team_id: userData?.team_id,
    })
    .select()
    .single();
}

type CreateJobParams = {
  title: string;
  description?: string;
  location?: string;
  employment_type?: string;
  status?: "active" | "inactive" | "filled" | "expired";
};

export async function createJob(supabase: Client, params: CreateJobParams) {
  const { data: userData } = await getCurrentUserTeamQuery(supabase);

  return supabase
    .from("jobs")
    .insert({
      ...params,
      company_id: userData?.company_id,
      user_id: userData?.id,
    })
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

type CreateCompanyClientParams = {
  name: string;
  website?: string;
  description?: string;
  logo_url?: string;
};

export async function createCompanyClient(
  supabase: Client,
  params: CreateCompanyClientParams,
) {
  const { data, error } = await supabase.rpc("create_client", {
    name: params.name,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function createFreelancer(
  supabase: Client,
  params: { headline: string },
) {
  const { data, error } = await supabase.rpc("create_freelancer", {
    headline: params.headline,
  });
  console.log("error", { error });
  if (error) {
    throw error;
  }
  console.log("data", data);
  return data;
}

export async function updateProfileAtCompany(
  id: string,
  data: TablesUpdate<"users_on_client">,
) {
  const supabase = createClient();

  try {
    const { data: result, error } = await supabase
      .from("users_on_client")
      .update(data)
      .eq("id", id);
    console.log("error", error);
    return result;
  } catch (error) {
    logger.error(error);

    throw error;
  }
}

export async function updateTransaction(
  supabase: Client,
  id: string,
  data: any,
) {
  return supabase
    .from("transactions")
    .update(data)
    .eq("id", id)
    .select("id, category, category_slug, team_id, name, status")
    .single();
}
