"use client";

import { setOnboardingCompleted } from "@/actions/user/onboarding/set-onboarding-complete";
import { Background } from "@/app/[locale]/(onboarding)/background";
import { Wordmark } from "@gigflow/ui/wordmark";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Confetti from "react-confetti";
import { NextButton } from "../../next-button";

export default function OnboardingCompleted() {
  const router = useRouter();

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       router.push("/"); // Redirect to homepage
  //     }, 5000);

  //     return () => clearTimeout(timer); // Cleanup timer on unmount
  //   }, [router]);

  useEffect(() => {
    const completeOnboarding = async () => {
      try {
        await setOnboardingCompleted();
        const timer = setTimeout(() => {
          router.push("/"); // Redirect to homepage
        }, 5000);

        return () => clearTimeout(timer); // Cleanup timer on unmount
      } catch (error) {
        console.error("Failed to complete onboarding:", error);
      }
    };

    completeOnboarding();
  }, [router]);

  return (
    <>
      <Confetti className="absolute top-0 left-0 z-10" />

      <div className="relative mx-auto mt-24 flex max-w-sm flex-col items-center px-3 text-center md:mt-32 md:px-8 lg:mt-48">
        <div className="animate-slide-up-fade relative flex w-auto items-center justify-center px-6 py-2 [--offset:20px] [animation-duration:1.3s] [animation-fill-mode:both]">
          <div className="absolute inset-0 opacity-10">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse-scale absolute inset-0 rounded-full mix-blend-color-burn"
                style={{
                  animationDelay: `${i * -2}s`,
                  backgroundImage: `linear-gradient(90deg, #000, transparent, #000)`,
                }}
              />
            ))}
          </div>
          <Wordmark className="relative h-16" />
        </div>
        <h1 className="animate-slide-up-fade mt-10 text-2xl font-medium [--offset:10px] [animation-delay:250ms] [animation-duration:1s] [animation-fill-mode:both]">
          Onboarding Completed!
        </h1>
        <p className="animate-slide-up-fade mt-2 text-gray-500 [--offset:10px] [animation-delay:500ms] [animation-duration:1s] [animation-fill-mode:both]">
          Let's connect you with exciting freelance opportunities and showcase
          your skills to top clients.
        </p>
        <div className="animate-slide-up-fade mt-10 w-full [--offset:10px] [animation-delay:750ms] [animation-duration:1s] [animation-fill-mode:both]">
          <NextButton step="basic-info" />
        </div>
      </div>
    </>
  );
}
