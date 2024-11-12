import { getTeamUser } from "@gigflow/supabase/cached-queries";
import { getTeamMembersQuery } from "@gigflow/supabase/queries";
import { createClient } from "@gigflow/supabase/server";
import { DataTable } from "./table";

export async function MembersTable() {
  const supabase = createClient();
  const user = await getTeamUser();
  const teamMembers = await getTeamMembersQuery(supabase, user.data.team_id);

  return <DataTable data={teamMembers?.data} currentUser={user?.data} />;
}
