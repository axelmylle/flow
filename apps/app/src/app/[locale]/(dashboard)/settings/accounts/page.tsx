import { PageContent } from "@/components/layout/page-content";
import { ConnectedAccounts } from "@/components/transactions/connected-accounts";
import { MaxWidthWrapper } from "@v1/ui/max-width-wrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accounts | Midday",
};

export default function Page() {
  return (
    <PageContent title="Connected Accounts">
      <MaxWidthWrapper className="flex flex-col">
        <ConnectedAccounts />
      </MaxWidthWrapper>
    </PageContent>
  );
}
