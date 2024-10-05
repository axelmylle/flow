import { getTeamUser } from "@v1/supabase/cached-queries";
import { getTeamInvitesQuery } from "@v1/supabase/queries";
import { createClient } from "@v1/supabase/server";
import { DataTable } from "./table";

export async function PendingInvitesTable() {
  const supabase = createClient();
  const user = await getTeamUser();
  const teamInvites = await getTeamInvitesQuery(supabase, user.data.team_id);

  return <DataTable data={teamInvites?.data} currentUser={user?.data} />;
}
