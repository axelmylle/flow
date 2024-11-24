import { BentoCard } from "@/components/bento-card";
import { Container } from "@/components/container";
import { Gradient } from "@/components/gradient";
import { Keyboard } from "@/components/home/keyboard";
import { LogoCluster } from "@/components/home/logo-cluster";
import HeroDifferentPlans from "@/components/home/plans";
import TrustedClients from "@/components/home/trusted-clients";
import { Heading, Subheading } from "@/components/text";
import { Button } from "@gigflow/ui/button";

import { AvatarCircles } from "@/components/avatar-circles";
import { Feature1 } from "@/components/home/feature1";
import { Features } from "@/components/home/features";
import { HeroImage } from "@/components/home/hero-image";
import { Metrics } from "@/components/home/metrics";
import { PlanFeatures } from "@/components/home/plan-features";
import { WordAnimation } from "@/components/home/word-animation";
import { Screenshot } from "@/components/screenshot";
import { SubscribeForm } from "@/components/subscribe-form";
import { Testimonials } from "@/components/testimonials";
import { cn } from "@gigflow/ui/cn";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
    profileUrl: "https://github.com/sanjay-mali",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406",
    profileUrl: "https://github.com/itsarghyadas",
  },
];

export const metadata: Metadata = {
  description: "Gigflow Freelancing made easy",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <LogoCluster />
      <HeroDifferentPlans />
      <TrustedClients />
      <Testimonials />
    </>
  );
}

const Hero = () => {
  return (
    <section className="mt-[60px] lg:mt-[180px] min-h-[530px] relative lg:h-[calc(100vh-300px)]">
      <div className="flex flex-col">
        <h2 className="mt-6 md:mt-10 max-w-[580px] text-[#878787] leading-tight text-[24px] md:text-[36px] font-medium">
          Freelancing shouldn’t feel like a hustle.
          <br />
          Gigflow Finds Gigs, Pays You Instantly, and we support your growth –
          so you can focus on doing what you love. made for <WordAnimation />
        </h2>

        <div className="mt-8 md:mt-10">
          <div className="flex items-center space-x-4">
            <Link
              href="https://cal.com/pontus-midday/15min"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-transparent h-11 px-6 dark:bg-[#1D1D1D] bg-[#F2F1EF]"
              >
                Talk to founders
              </Button>
            </Link>

            <a href="https://app.midday.ai">
              <Button className="h-11 px-5">Try it for free</Button>
            </a>
          </div>
          <div>
            Trusted by{" "}
            <span className="font-bold text-[#FF6B00]">1000+ freelancers</span>
            <AvatarCircles numPeople={7} avatarUrls={avatars} />
          </div>
        </div>
        <SubscribeForm />
      </div>

      <HeroImage />
      <Metrics />
    </section>
  );
};

// const Features = () => {
//   return (
//     <section className="mt-[60px] lg:mt-[180px] min-h-[530px] relative lg:h-[calc(100vh-300px)]">
//       <Feature1 className="bg-transparent" />
//     </section>
//   );
// };
