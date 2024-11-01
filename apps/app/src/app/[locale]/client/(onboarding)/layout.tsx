import type { PropsWithChildren } from "react";
import { Background } from "./background";
import { OnboardingSummaryCard } from "./onboarding-summary-card";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Background />
      <div className="grid grid-cols-2">
        <div>{children}</div>

        <div className="bg-white">
          <div className="p-4 z-10">
            <OnboardingSummaryCard />
          </div>
        </div>
      </div>
    </>
  );
}
