import { getTeamUser } from "@gigflow/supabase/cached-queries";
import { getTeamInvitesQuery } from "@gigflow/supabase/queries";
import { createClient } from "@gigflow/supabase/server";
import { DataTable } from "./table";

export async function PendingInvitesTable() {
  const supabase = createClient();
  const user = await getTeamUser();
  const teamInvites = await getTeamInvitesQuery(supabase, user.data.team_id);

  return <DataTable data={teamInvites?.data} currentUser={user?.data} />;
}
