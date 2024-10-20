import type { ClientOnboardingStep } from "@/actions/client/types";
import { client } from "@v1/kv/client";
import { getUser } from "@v1/supabase/cached-queries";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";
import { Background } from "./background";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Background />
      {children}
    </>
  );
}
