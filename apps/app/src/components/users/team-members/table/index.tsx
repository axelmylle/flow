import { getTeamUser } from "@v1/supabase/cached-queries";
import { getTeamMembersQuery } from "@v1/supabase/queries";
import { createClient } from "@v1/supabase/server";
import { DataTable } from "./table";

export async function MembersTable() {
  const supabase = createClient();
  const user = await getTeamUser();
  const teamMembers = await getTeamMembersQuery(supabase, user.data.team_id);

  return <DataTable data={teamMembers?.data} currentUser={user?.data} />;
}
