import { BentoCard } from "@/components/bento-card";
import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Gradient } from "@/components/gradient";
import { Keyboard } from "@/components/home/keyboard";
import { LogoCluster } from "@/components/home/logo-cluster";
import { Map } from "@/components/home/map";
import HeroDifferentPlans from "@/components/home/plans";
import TrustedClients from "@/components/home/trusted-clients";
import { Heading, Subheading } from "@/components/text";
import { Button } from "@v1/ui/button";

import { Screenshot } from "@/components/screenshot";
import { SubscribeForm } from "@/components/subscribe-form";
import { Testimonials } from "@/components/testimonials";
import { cn } from "@v1/ui/cn";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  description: "Freelancing made easy",
};

function Hero() {
  return (
    <div className="relative">
      {/* <Gradient className="absolute inset-2 bottom-0 rounded-3xl ring-1 ring-inset ring-black/5 opacity-15" /> */}
      <Container className="relative">
        <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
          <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-8xl/[0.8]">
            Freelance Flexibility Meets Stability
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-xl/8">
            Gigflow gives you the freedom of freelancing, permanent contracts
            for security, and the tools to grow and manage your career
            effortlessly.
          </p>
          <div className="mt-12 max-w-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Be the First to Know
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              Sign up now to be notified when Gigflow launches. Get early access
              and be among the first to revolutionize your freelancing career.
            </p>
            <SubscribeForm group="radiant" placeholder="Enter your email" />
          </div>
        </div>
      </Container>
    </div>
  );
}

function BentoSection() {
  return (
    <Container className="relative my-10">
      <Subheading>Sales</Subheading>

      <Heading as="h3" className="mt-2 max-w-3xl">
        Stay independent, become serene
      </Heading>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          eyebrow="Insight"
          title="Track Your Opportunities"
          description="Gain real-time insights on job proposals, leads, and client engagement—all from one dashboard."
          graphic={
            <div className="h-80 bg-[url(/screenshots/profile.png)] bg-[size:1000px_560px] bg-[left_-109px_top_-112px] bg-no-repeat" />
          }
          fade={["bottom"]}
          className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
        />

        <BentoCard
          eyebrow="Analysis"
          title="Know Your Market"
          description="See how your rates and services compare to others, and make informed decisions to stay competitive."
          graphic={
            <div className="absolute inset-0 bg-[url(/screenshots/competitors.png)] bg-[size:1100px_650px] bg-[left_-38px_top_-73px] bg-no-repeat" />
          }
          fade={["bottom"]}
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />

        <BentoCard
          eyebrow="Efficiency"
          title="Work Smarter, Not Harder"
          description="Simplify contracts, invoices, and client communications with tools that save you time."
          graphic={
            <div className="flex size-full pl-10 pt-10">
              <Keyboard highlighted={["LeftCommand", "LeftShift", "D"]} />
            </div>
          }
          className="lg:col-span-2 lg:rounded-bl-4xl"
        />

        <BentoCard
          eyebrow="Reach"
          title="Expand Your Client Base"
          description="Use our lead generation tools to connect with global clients and unlock new opportunities."
          graphic={<LogoCluster />}
          className="lg:col-span-2"
        />

        <BentoCard
          eyebrow="Global Freedom"
          title="Work Anywhere, Anytime"
          description="Take on clients worldwide. Work without borders and sell your services globally with ease."
          graphic={<Map />}
          className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
        />
      </div>
    </Container>
  );
}

function FeatureSection() {
  return (
    <div className="overflow-hidden">
      <Container className="pb-24">
        <Heading as="h2" className="max-w-3xl">
          A snapshot of your entire sales pipeline.
        </Heading>
        <Screenshot
          width={1216}
          height={768}
          src="./screenshots/app.png"
          className="mt-16 h-[36rem] sm:h-auto sm:w-[76rem]"
        />
      </Container>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <div
        className={cn(
          "absolute inset-0 overflow-hidden bg-white transition-opacity duration-300",
          "opacity-40",
        )}
      >
        <BackgroundGradient className="opacity-15" />
        <BackgroundGradient className="opacity-100 mix-blend-soft-light" />
      </div>
      <Hero />

      {/* <Testimonials /> */}
      <FeatureSection />
      {/* <TrustedClients /> */}

      {/* <HeroDifferentPlans /> */}

      <BentoSection />
    </>
  );
}

function BackgroundGradient({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute left-0 top-0 aspect-square w-full overflow-hidden sm:aspect-[2/1]",
        "[mask-image:radial-gradient(70%_100%_at_50%_0%,_black_70%,_transparent)]",
        className,
      )}
    >
      <div
        className="absolute inset-0 saturate-150"
        style={{
          backgroundImage: `conic-gradient(from -45deg at 50% -10%, #3A8BFD 0deg, #FF0000 172.98deg, #855AFC 215.14deg, #FF7B00 257.32deg, #3A8BFD 360deg)`,
        }}
      />
      <div className="absolute inset-0 backdrop-blur-[100px]" />
    </div>
  );
}
