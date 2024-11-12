import { AddAccountButton } from "@/components/transactions/add-account-button";
import {
  BankAccountList,
  BankAccountListSkeleton,
} from "@/components/transactions/bank-account-list";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@gigflow/ui/card";
import { Suspense } from "react";

export function ConnectedAccounts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accounts</CardTitle>
        <CardDescription>
          Manage bank accounts, update or connect new ones.
        </CardDescription>
      </CardHeader>

      <Suspense fallback={<BankAccountListSkeleton />}>
        <BankAccountList />
      </Suspense>

      <CardFooter className="flex justify-between">
        <div />

        <AddAccountButton />
      </CardFooter>
    </Card>
  );
}
