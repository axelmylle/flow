import { Form } from "@/app/[locale]/client/(onboarding)/onboarding/(steps)/my-company/form";
import { getUser } from "@v1/supabase/cached-queries";
import { getCurrentUserCompanyQuery } from "@v1/supabase/queries";
import { createClient } from "@v1/supabase/server";
import { Wordmark } from "@v1/ui/wordmark";
import { redirect } from "next/navigation";
import { NextButton } from "../next-button";

export default async function Welcome() {
  const user = await getUser();

  // if (user?.data?.is_onboarded) {
  //   return redirect("/");
  // }

  const supabase = await createClient();
  const company = await getCurrentUserCompanyQuery(supabase);

  return (
    <>
      <div className="relative mx-auto mt-24 flex max-w-lg flex-col items-center px-3 text-center md:mt-32 md:px-8 lg:mt-48">
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
          Your Partner in Managing Freelance Talent
        </h1>
        <p className="animate-slide-up-fade mt-2 text-gray-500 [--offset:10px] [animation-delay:500ms] [animation-duration:1s] [animation-fill-mode:both]">
          Get ready to enhance productivity, reduce administrative burdens, and
          scale your operations with ease. Let's start building your flexible
          workforce today!
        </p>
        <div className="animate-slide-up-fade mt-10 w-full [--offset:10px] [animation-delay:750ms] [animation-duration:1s] [animation-fill-mode:both]">
          <NextButton step={company ? "update-company" : "my-company"} />
        </div>
      </div>
    </>
  );
}
