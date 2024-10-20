import { getUser } from "@v1/supabase/cached-queries";
import { redirect } from "next/navigation";

export default async function Onboarding() {
  const user = await getUser();

  redirect("onboarding/welcome");
}
