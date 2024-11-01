"use client";

import { useOnboardingProgress } from "@/app/[locale]/(onboarding)/onboarding/use-onboarding-progress";
import { Card, CardContent } from "@v1/ui/card";
import { useEffect, useState } from "react";

export function OnboardingSummaryCard() {
  const { continueTo, isLoading, isSuccessful } = useOnboardingProgress();
  const [onboardingData, setOnboardingData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        companyName: "GIG",
        website: "www.standrewsgig.com",
        location: "Saint Andrews, Fife",
        description:
          "GIG is an investment group that specializes in risk management and business return production.",
        logoUrl:
          "https://media.contra.com/image/upload/f_avif%2Cc_fill%2Cdpr_auto%2Cw_88%2Cfl_lossy%2Ce_loop%2Cfl_awebp%2Cfl_animated%2Ch_88/lza2qehbi4eh55uegz3n.png", // Replace with actual logo URL
      };
      setOnboardingData(data);
    };

    fetchData();
  }, []);

  return (
    <Card className="rounded-md bg-white shadow-sm p-4">
      <CardContent className="flex items-center gap-4">
        <img
          src={onboardingData?.logoUrl}
          alt="Company Logo"
          className="h-16 w-16 object-cover rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {onboardingData?.companyName}
            </h2>
            <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
              UNCLAIMED
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            <span role="img" aria-label="globe" className="mr-1">
              🌐
            </span>
            {onboardingData?.website}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            <span role="img" aria-label="location" className="mr-1">
              📍
            </span>
            {onboardingData?.location}
          </p>
          <p className="text-sm text-gray-700 mt-2">
            {onboardingData?.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
