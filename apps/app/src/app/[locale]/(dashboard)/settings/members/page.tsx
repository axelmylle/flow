import { TeamMembers } from "@/components/users/team-members";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Members | Gigflow",
};

export default async function Members() {
  return <TeamMembers />;
}
