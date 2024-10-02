import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import Toolbar from "@/components/layout/toolbar/toolbar";
import UserSurveyPopup from "@/components/layout/user-survey";
import { getUser } from "@v1/supabase/queries";

import { MaxWidthWrapper } from "@v1/ui/max-width-wrapper";
import { SidebarLayout, SidebarTrigger } from "@v1/ui/sidebar";

import { getCountryCode } from "@v1/location";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

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
  // This is where your authenticated app lives, add a sidebar, header etc.
  const {
    data: { user },
  } = await getUser();

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

      <ConnectTransactionsModal countryCode={countryCode} />
      <SelectBankAccountsModal />
      <Toolbar show={["onboarding"]} />
    </div>
  );
}
