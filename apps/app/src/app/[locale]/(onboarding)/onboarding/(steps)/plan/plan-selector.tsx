"use client";

import { useState } from "react";

export function PlanSelector() {
  const [periodTab, setPeriodTab] = useState<"monthly" | "yearly">("yearly");

  return (
    <div>
      <div className="flex justify-center">sdfs</div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
      </div>
    </div>
  );
}
