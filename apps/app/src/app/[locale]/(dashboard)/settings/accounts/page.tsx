import { ConnectedAccounts } from "@/components/transactions/connected-accounts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accounts | Midday",
};

export default function Page() {
  return (
    <div className="space-y-12">
      <ConnectedAccounts />
      {/* <BaseCurrency /> */}
    </div>
  );
}
