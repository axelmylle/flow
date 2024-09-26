import { SignOut } from "@/components/auth/sign-out";
import { getI18n } from "@/locales/server";
import { getUser } from "@v1/supabase/queries";
import { Button } from "@v1/ui/button";
import { JobList } from "./list";
import PageClient from "./page-client";

export const metadata = {
  title: "Jobs",
};

export default async function Page() {
  const { data } = await getUser();
  const t = await getI18n();

  return (
    <>
      <PageClient />
    </>
  );
}
