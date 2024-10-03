import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import Toolbar from "@/components/layout/toolbar/toolbar";
import UserSurveyPopup from "@/components/layout/user-survey";
import { getUser } from "@v1/supabase/cached-queries";

import { MaxWidthWrapper } from "@v1/ui/max-width-wrapper";
import { SidebarLayout, SidebarTrigger } from "@v1/ui/sidebar";

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
      <SidebarLayout>
        <AppSidebar user={user} />
        <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
          <div className="h-full rounded-md border-2 border-dashed p-2">
            <SidebarTrigger />

            <MaxWidthWrapper>{children}</MaxWidthWrapper>
          </div>
        </main>
      </SidebarLayout>
      <UserSurveyPopup />
      <Suspense>
        <GlobalSheets defaultCurrency={currencies[countryCode]} />
      </Suspense>
      <ConnectTransactionsModal countryCode={countryCode} />
      <SelectBankAccountsModal />
      <Toolbar show={["onboarding"]} />
    </div>
  );
}
