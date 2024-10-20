import { getUser } from "@v1/supabase/cached-queries";
import { redirect } from "next/navigation";

export default async function Onboarding() {
  const user = await getUser();
  console.log("user", user);
  if (user?.data?.is_onboarded) {
    return redirect("/");
  }

  redirect("/onboarding/welcome");
}
