import "server-only";

import { unstable_cache } from "next/cache";
import { cache } from "react";
import { type GetTransactionsParams, getTransactionsQuery, getUser } from ".";
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
