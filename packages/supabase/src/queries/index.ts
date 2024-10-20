import { UTCDate } from "@date-fns/utc";
import { logger } from "@v1/logger";
import {
  addDays,
  endOfMonth,
  formatISO,
  isWithinInterval,
  startOfMonth,
  subYears,
} from "date-fns";

import type { Client } from "../types";

export async function getTeamInvitesQuery(supabase: Client, teamId: string) {
  return supabase
    .from("user_invites")
    .select("id, email, code, role, user:invited_by(*), team:team_id(*)")
    .eq("team_id", teamId)
    .throwOnError();
}

export async function getCurrentUserTeamQuery(supabase: Client) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return;
  }
  return getUserQuery(supabase, session.user?.id);
}

export type GetMetricsParams = {
  teamId: string;
  from: string;
  to: string;
  currency?: string;
  type?: "revenue" | "profit";
};

export async function getMetricsQuery(
  supabase: Client,
  params: GetMetricsParams,
) {
  const { teamId, from, to, type = "profit", currency } = params;

  // const rpc = type === "profit" ? "get_profit_v3" : "get_revenue_v3";

  const rpc = "get_profit_v3";
  const fromDate = new UTCDate(from);
  const toDate = new UTCDate(to);

  const [{ data: prevData }, { data: currentData }] = await Promise.all([
    supabase.rpc(rpc, {
      team_id: teamId,
      date_from: subYears(startOfMonth(fromDate), 1).toDateString(),
      date_to: subYears(endOfMonth(toDate), 1).toDateString(),
      base_currency: currency,
    }),
    supabase.rpc(rpc, {
      team_id: teamId,
      date_from: startOfMonth(fromDate).toDateString(),
      date_to: endOfMonth(toDate).toDateString(),
      base_currency: currency,
    }),
  ]);

  const prevTotal = prevData?.reduce((value, item) => item.value + value, 0);
  const currentTotal = currentData?.reduce(
    (value, item) => item.value + value,
    0,
  );

  const baseCurrency = currentData?.at(0)?.currency;

  return {
    summary: {
      currentTotal,
      prevTotal,
      currency: baseCurrency,
    },
    meta: {
      type,
      currency: baseCurrency,
    },
    result: currentData?.map((record, index) => {
      const prev = prevData?.at(index);

      return {
        date: record.date,
        precentage: {
          value: getPercentageIncrease(
            Math.abs(prev?.value),
            Math.abs(record.value),
          ),
          status: record.value > prev?.value ? "positive" : "negative",
        },
        current: {
          date: record.date,
          value: record.value,
          currency,
        },
        previous: {
          date: prev?.date,
          value: prev?.value,
          currency,
        },
      };
    }),
  };
}

export function getPercentageIncrease(a: number, b: number) {
  return a > 0 && b > 0 ? Math.abs(((a - b) / b) * 100).toFixed() : 0;
}

type GetUserInviteQueryParams = {
  code: string;
  email: string;
};

export async function getUserInviteQuery(
  supabase: Client,
  params: GetUserInviteQueryParams,
) {
  return supabase
    .from("user_invites")
    .select("*")
    .eq("code", params.code)
    .eq("email", params.email)
    .single();
}

type GetTrackerProjectQueryParams = {
  teamId: string;
  projectId: string;
};

export async function getTrackerProjectQuery(
  supabase: Client,
  params: GetTrackerProjectQueryParams,
) {
  return supabase
    .from("tracker_projects")
    .select("*")
    .eq("id", params.projectId)
    .eq("team_id", params.teamId)
    .single();
}

export async function getUserQuery(supabase: Client, userId: string) {
  return supabase
    .from("users")
    .select(
      `
      *,
      team:team_id(*)
    `,
    )
    .eq("id", userId)
    .single()
    .throwOnError();
}

export async function getTeamSettingsQuery(supabase: Client, teamId: string) {
  return supabase.from("teams").select("*").eq("id", teamId).single();
}

export type GetTrackerRecordsByRangeParams = {
  teamId: string;
  from: string;
  to: string;
  projectId?: string;
  userId?: string;
};

export async function getTrackerRecordsByRangeQuery(
  supabase: Client,
  params: GetTrackerRecordsByRangeParams,
) {
  if (!params.teamId) {
    return null;
  }

  const query = supabase
    .from("tracker_entries")
    .select(
      "*, assigned:assigned_id(id, full_name, avatar_url), project:project_id(id, name, rate)",
    )
    .eq("team_id", params.teamId)
    .gte("date", new UTCDate(params.from).toISOString())
    .lte("date", new UTCDate(params.to).toISOString())
    .order("created_at");

  if (params.userId) {
    query.eq("assigned_id", params.userId);
  }

  if (params.projectId) {
    query.eq("project_id", params.projectId);
  }

  const { data } = await query;
  const result = data?.reduce((acc, item) => {
    const key = item.date;

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  const totalDuration = data?.reduce(
    (duration, item) => (item?.duration ?? 0) + duration,
    0,
  );

  const totalAmount = data?.reduce(
    (amount, { project, duration = 0 }) =>
      amount + (project?.rate ?? 0) * (duration / 3600),
    0,
  );

  return {
    meta: {
      totalDuration,
      totalAmount,
      from: params.from,
      to: params.to,
    },
    data: result,
  };
}

type GetTrackerRecordsByDateParams = {
  teamId: string;
  date: string;
  projectId?: string;
  userId?: string;
};

export async function getTrackerRecordsByDateQuery(
  supabase: Client,
  params: GetTrackerRecordsByDateParams,
) {
  const { teamId, projectId, date, userId } = params;

  const query = supabase
    .from("tracker_entries")
    .select(
      "*, assigned:assigned_id(id, full_name, avatar_url), project:project_id(id, name, rate, currency)",
    )
    .eq("team_id", teamId)
    .eq("date", formatISO(new UTCDate(date), { representation: "date" }));

  if (projectId) {
    query.eq("project_id", projectId);
  }

  if (userId) {
    query.eq("assigned_id", userId);
  }

  const { data } = await query;

  const totalDuration = data?.reduce(
    (duration, item) => (item?.duration ?? 0) + duration,
    0,
  );

  return {
    meta: {
      totalDuration,
    },
    data,
  };
}

export type GetTransactionsParams = {
  teamId: string;

  to: number;
  from: number;
  sort?: string[];
  searchQuery?: string;
  filter?: {
    statuses?: string[];
    attachments?: "include" | "exclude";
    categories?: string[];
    accounts?: string[];
    assignees?: string[];
    type?: "income" | "expense";
    start?: string;
    end?: string;
    recurring?: string[];
  };
};

export type GetTrackerProjectsQueryParams = {
  teamId: string;
  to?: number;
  from?: number;
  start?: string;
  end?: string;
  sort?: [string, "asc" | "desc"];
  search?: {
    query?: string;
    fuzzy?: boolean;
  };
  filter?: {
    status?: "in_progress" | "completed";
  };
};

export async function getTrackerProjectsQuery(
  supabase: Client,
  params: GetTrackerProjectsQueryParams,
) {
  const {
    from = 0,
    to = 10,
    filter,
    sort,
    teamId,
    search,
    start,
    end,
  } = params;
  const { status } = filter || {};

  const query = supabase
    .from("tracker_projects")
    .select(
      "*, total_duration, users:get_assigned_users_for_project, total_amount:get_project_total_amount",
      {
        count: "exact",
      },
    )
    .eq("team_id", teamId);

  if (status) {
    query.eq("status", status);
  }

  if (start && end) {
    query.gte("created_at", start);
    query.lte("created_at", end);
  }

  if (search?.query && search?.fuzzy) {
    query.ilike("name", `%${search.query}%`);
  }

  if (sort) {
    const [column, value] = sort;
    if (column === "time") {
      query.order("total_duration", { ascending: value === "asc" });
    } else if (column === "amount") {
      // query.order("total_amount", { ascending: value === "asc" });
    } else if (column === "assigned") {
      // query.order("assigned_id", { ascending: value === "asc" });
    } else {
      query.order(column, { ascending: value === "asc" });
    }
  } else {
    query.order("created_at", { ascending: false });
  }

  const { data, count } = await query.range(from, to);

  return {
    meta: {
      count,
    },
    data,
  };
}

export type GetClientsQueryParams = {
  to?: number;
  from?: number;
  search?: {
    query?: string;
    fuzzy?: boolean;
  };
};

export async function getClientsQuery(
  supabase: Client,
  params: GetClientsQueryParams,
) {
  const {
    from = 0,
    to = 5,

    search,
  } = params;

  const query = supabase.from("clients").select("*", {
    count: "exact",
  });

  if (search?.query) {
    if (search.fuzzy) {
      query.ilike("name", `%${search.query}%`);
    } else {
      query.eq("name", search.query);
    }
  }

  query.order("created_at", { ascending: false });

  const { data, count } = await query.range(from, to);

  return {
    meta: {
      count,
    },
    data,
  };
}

export async function getTransactionsQuery(
  supabase: Client,
  params: GetTransactionsParams,
) {
  const { from = 0, to, filter, sort, teamId, searchQuery } = params;

  const {
    statuses,
    attachments,
    categories,
    type,
    accounts,
    start,
    end,
    assignees,
    recurring,
  } = filter || {};

  const columns = [
    "id",
    "date",
    "amount",
    "currency",
    "method",
    "status",
    "note",
    "manual",
    "recurring",
    "frequency",
    "name",
    "description",
    "assigned:assigned_id(*)",
    "category:transaction_categories(id, name, color, slug)",
    "bank_account:bank_accounts(id, name, currency, bank_connection:bank_connections(id, logo_url))",
    // "attachments:transaction_attachments(id, name, size, path, type)",
    "vat:calculated_vat",
  ];

  const query = supabase
    .from("transactions")
    .select(columns.join(","), { count: "exact" })
    .eq("team_id", teamId);

  if (sort) {
    const [column, value] = sort;
    const ascending = value === "asc";

    if (column === "attachment") {
      query.order("is_fulfilled", { ascending });
    } else if (column === "assigned") {
      query.order("assigned(full_name)", { ascending });
    } else if (column === "bank_account") {
      query.order("bank_account(name)", { ascending });
    } else if (column === "category") {
      query.order("category(name)", { ascending });
    } else {
      query.order(column, { ascending });
    }
  } else {
    query
      .order("date", { ascending: false })
      .order("created_at", { ascending: false });
  }

  if (start && end) {
    const fromDate = new UTCDate(start);
    const toDate = new UTCDate(end);

    query.gte("date", fromDate.toISOString());
    query.lte("date", toDate.toISOString());
  }

  if (searchQuery) {
    if (!Number.isNaN(Number.parseInt(searchQuery))) {
      query.like("amount_text", `%${searchQuery}%`);
    } else {
      query.textSearch("fts_vector", `'${searchQuery}'`);
    }
  }

  if (statuses?.includes("fullfilled") || attachments === "include") {
    query.eq("is_fulfilled", true);
  }

  if (statuses?.includes("unfulfilled") || attachments === "exclude") {
    query.eq("is_fulfilled", false);
  }

  if (statuses?.includes("excluded")) {
    query.eq("status", "excluded");
  } else {
    query.or("status.eq.pending,status.eq.posted,status.eq.completed");
  }

  if (categories) {
    const matchCategory = categories
      .map((category) => {
        if (category === "uncategorized") {
          return "category_slug.is.null";
        }
        return `category_slug.eq.${category}`;
      })
      .join(",");

    query.or(matchCategory);
  }

  if (recurring) {
    if (recurring.includes("all")) {
      query.eq("recurring", true);
    } else {
      query.in("frequency", recurring);
    }
  }

  if (type === "expense") {
    query.lt("amount", 0);
    query.neq("category_slug", "transfer");
  }

  if (type === "income") {
    query.eq("category_slug", "income");
  }

  if (accounts?.length) {
    query.in("bank_account_id", accounts);
  }

  if (assignees?.length) {
    query.in("assigned_id", assignees);
  }

  const { data, count } = await query.range(from, to);
  console.log("data", data);
  const totalAmount = data
    ?.reduce((acc, { amount, currency }) => {
      const existingCurrency = acc.find((item) => item.currency === currency);

      if (existingCurrency) {
        existingCurrency.amount += amount;
      } else {
        acc.push({ amount, currency });
      }
      return acc;
    }, [])
    .sort((a, b) => a?.amount - b?.amount);

  return {
    meta: {
      totalAmount,
      count,
    },
    data: data?.map((transaction) => ({
      ...transaction,
    })),
  };
}

export type GetTeamBankAccountsParams = {
  teamId: string;
  enabled?: boolean;
};

export async function getTeamBankAccountsQuery(
  supabase: Client,
  params: GetTeamBankAccountsParams,
) {
  const { teamId, enabled } = params;

  const query = supabase
    .from("bank_accounts")
    .select("*, bank:bank_connections(*)")
    .eq("team_id", teamId)
    .order("created_at", { ascending: true })
    .order("name", { ascending: false })
    .throwOnError();

  if (enabled) {
    query.eq("enabled", enabled);
  }

  return query;
}

export type GetCategoriesParams = {
  teamId: string;
  limit?: number;
};

export async function getCategoriesQuery(
  supabase: Client,
  params: GetCategoriesParams,
) {
  const { teamId, limit = 1000 } = params;

  return supabase
    .from("transaction_categories")
    .select("id, name, color, slug, description, system, vat")
    .eq("team_id", teamId)
    .order("created_at", { ascending: false })
    .range(0, limit);
}

export async function getTeamMembersQuery(supabase: Client, teamId: string) {
  const { data } = await supabase
    .from("users_on_team")
    .select(
      `
      id,
      role,
      team_id,
      user:users(id, full_name, avatar_url, email)
    `,
    )
    .eq("team_id", teamId)
    .order("created_at")
    .throwOnError();

  return {
    data,
  };
}

type GetTeamUserParams = {
  teamId: string;
  userId: string;
};

export async function getTeamUserQuery(
  supabase: Client,
  params: GetTeamUserParams,
) {
  const { data } = await supabase
    .from("users_on_team")
    .select(
      `
      id,
      role,
      team_id,
      user:users(id, full_name, avatar_url, email)
    `,
    )
    .eq("team_id", params.teamId)
    .eq("user_id", params.userId)
    .throwOnError()
    .single();

  return {
    data,
  };
}

export async function getSkillByIdQuery(supabase: Client, skillId: string) {
  console.log("hi");

  const { data, error } = await supabase
    .schema("skill_assessment")
    .from("skills")
    .select(`
      *,
      skill_topics:skill_topics(*)
    `)
    .eq("id", skillId)
    .single()
    .throwOnError();

  return {
    data,
  };
}

export async function getSkillQuestionsByIdQuery(
  supabase: Client,
  skillId: string,
) {
  const { data, error } = await supabase
    .schema("skill_assessment")
    .from("questions")
    .select(`
       *
    `)
    .eq("skill_id", skillId)
    .throwOnError();

  return data;
}
