import { Tabs, TabsContent, TabsList, TabsTrigger } from "@v1/ui/tabs";
import { Suspense } from "react";

import { PendingInvitesTable } from "./pending-invites/table";
import { PendingInvitesSkeleton } from "./pending-invites/table/table";
import { MembersTable } from "./team-members/table";

export function TeamMembers() {
  return (
    <Tabs defaultValue="members">
      <TabsList className="bg-transparent border-b-[1px] w-full justify-start rounded-none mb-1 p-0 h-auto pb-4">
        <TabsTrigger value="members" className="p-0 m-0 mr-4">
          Team Members
        </TabsTrigger>
        <TabsTrigger value="pending" className="p-0 m-0">
          Pending Invitations
        </TabsTrigger>
      </TabsList>

      <TabsContent value="members">
        <Suspense fallback={<PendingInvitesSkeleton />}>
          <MembersTable />
        </Suspense>
      </TabsContent>

      <TabsContent value="pending">
        <Suspense fallback={<PendingInvitesSkeleton />}>
          <PendingInvitesTable />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}
