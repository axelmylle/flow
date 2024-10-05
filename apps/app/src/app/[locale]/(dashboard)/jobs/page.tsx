import { SignOut } from "@/components/auth/sign-out";
import { getI18n } from "@/locales/server";
import { getUser } from "@v1/supabase/cached-queries";
import { Button } from "@v1/ui/button";
import { JobList } from "./list";
import PageClient from "./page-client";

export const metadata = {
  title: "Jobs",
};

export default async function Page() {
  return (
    <>
      <PageClient />
    </>
  );
}
