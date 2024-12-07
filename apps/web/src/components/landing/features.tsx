import { Button } from "@gigflow/ui/button";
import { Card, CardHeader, CardTitle } from "@gigflow/ui/card";
import Link from "next/link";
import FeatureCard from "./features/feature-card";
import FeatureFullRowCard from "./features/feature-full-row-card";

export const Features = () => (
  <div className="mt-20">
    <div className="mx-auto w-full max-w-xl px-4 text-center">
      <h2 className="text-balance font-display text-3xl font-medium text-neutral-900">
        Freelancing Made Easy
      </h2>
      <p className="mt-3 text-pretty text-lg text-neutral-500">
        Enjoy the support of a freelancer community, and work with the stability
        of predictable income and benefits.
      </p>
    </div>
    <div className="mx-auto mt-14 grid w-full max-w-screen-lg grid-cols-1 px-4 sm:grid-cols-2">
      <div className="contents divide-neutral-200 max-sm:divide-y sm:divide-x">
        <FeatureCard
          title="Stability to thrive"
          description="Work on freelance projects while enjoying the security of a stable, predictable income, hospital and pensions."
        >
          <div className="relative h-64 overflow-hidden sm:h-[302px]">
            <div className="flex size-full flex-col justify-center">
              <div className="flex flex-col gap-2.5 [mask-image:linear-gradient(90deg,black_70%,transparent)]">
                <div className="transition-transform duration-300 hover:translate-x-[-2%]">
                  <Card className="flex cursor-default items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm ml-[calc((0+1)*5%)]">
                    <CardHeader>
                      <CardTitle>Card Title</CardTitle>
                    </CardHeader>
                  </Card>
                </div>
                <div className="transition-transform duration-300 hover:translate-x-[-2%]">
                  <Card className="flex cursor-default items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm ml-[calc((1+1)*5%)]">
                    <CardHeader>
                      <CardTitle>Card Title</CardTitle>
                    </CardHeader>
                  </Card>
                </div>
                <div className="transition-transform duration-300 hover:translate-x-[-2%]">
                  <Card className="flex cursor-default items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm ml-[calc((2+1)*5%)]">
                    <CardHeader>
                      <CardTitle>Card Title</CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </FeatureCard>
        <FeatureCard
          title="Stability to thrive"
          description="Work on freelance projects while enjoying the security of a stable, predictable income, hospital and pensions."
        >
          <div className="relative h-64 overflow-hidden sm:h-[302px]">
            <div className="flex size-full flex-col justify-center">
              <div className="flex flex-col gap-2.5 [mask-image:linear-gradient(90deg,black_70%,transparent)]">
                hi
              </div>
            </div>
          </div>
        </FeatureCard>
      </div>
      <div className="relative flex flex-col gap-10 px-4 py-14 sm:px-12 border-y border-neutral-200 pt-12 sm:col-span-2">
        <FeatureFullRowCard />
      </div>
    </div>
  </div>
);
