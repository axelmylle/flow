import { LogoCluster } from "@/components/home/logo-cluster";
import HeroDifferentPlans from "@/components/home/plans";
import TrustedClients from "@/components/home/trusted-clients";
import { Button } from "@gigflow/ui/button";

import FooterCTA from "@/components/footer-cta";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import TrustedBy from "@/components/landing/trusted-by";
import { Testimonials } from "@/components/testimonials";
import { Separator } from "@gigflow/ui/separator";
import type { Metadata } from "next";
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
      <Separator />
      <TrustedBy />
      <Separator />
      <Features />
      <FooterCTA />
      {/* <Features />
      <LogoCluster />
      <HeroDifferentPlans />
      <TrustedClients />
      <Testimonials /> */}
    </>
  );
}
