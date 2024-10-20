import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import Toolbar from "@/components/layout/toolbar/toolbar";
import UserSurveyPopup from "@/components/layout/user-survey";
import { getUser } from "@v1/supabase/cached-queries";

import { MaxWidthWrapper } from "@v1/ui/max-width-wrapper";
import { SidebarLayout, SidebarTrigger } from "@v1/ui/sidebar";

import { MainNav } from "@/components/layout/main-nav";
import { GlobalSheets } from "@/components/tracker/sheets";
import { getCountryCode } from "@v1/location";
import { currencies } from "@v1/location/src/currencies";
import { createClient } from "@v1/supabase/server";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ConnectTransactionsModal = dynamic(
  () =>
    import("@/components/transactions/modals/connect-transactions-modal").then(
      (mod) => mod.ConnectTransactionsModal,
    ),
  {
    ssr: false,
  },
);

const SelectBankAccountsModal = dynamic(
  () =>
    import("@/components/transactions/modals/select-bank-accounts").then(
      (mod) => mod.SelectBankAccountsModal,
    ),
  {
    ssr: false,
  },
);

export default async function Layout({
  children,
}: { children: React.ReactNode }) {
  const client = createClient();

  const {
    data: { user },
  } = await client.auth.getUser();

  const countryCode = getCountryCode();

  return (
    <div>
      <div className="min-h-screen w-full bg-white">
        <MainNav user={user} role="company" toolContent={null}>
          {children}
          <ConnectTransactionsModal countryCode={countryCode} />
          <SelectBankAccountsModal />
          <Toolbar show={["onboarding"]} />
        </MainNav>
      </div>
      {/* <ChangelogPopup /> */}
      <Toolbar show={["onboarding"]} />
      <Suspense>
        <GlobalSheets defaultCurrency={currencies[countryCode]} />
      </Suspense>
    </div>
  );
}
