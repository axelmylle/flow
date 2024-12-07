"use client";

import { BlurImage } from "@gigflow/ui/blur-image";
import React from "react";
const logos = ["vercel", "perplexity", "cal", "prisma", "cal"];

function TrustedBy() {
  return (
    <section className="!pt-16 md:!pt-16 !pb-16 md:!pb-16 grow relative">
      <div className="px-6 md:px-9 md:whitespace-pre-wrap hide-breaks md:show-breaks max-w-content mx-auto relative z-[1]">
        <div className="flex justify-between gap-y-6 w-full items-center flex-wrap">
          <div className="grow flex flex-wrap lg:flex-nowrap justify-center md:justify-between gap-y-6">
            <div className="w-full lg:w-auto flex justify-center lg:justify-start">
              <p className="whitespace-pre-wrap text-center lg:text-left w-[190px] text-ui-fg-subtle text-large font-medium">
                Trusted by Belgian Freelancers and Companies
              </p>
            </div>
            {logos.map((logo, idx) => (
              <div
                key={logo}
                className="h-[40px] w-[120px] basis-1/2 sm:basis-1/3 md:basis-auto relative overflow-hidden opacity-60 hover:opacity-100 transition-opacity duration-300 ease-in-out flex justify-center items-center"
              >
                <BlurImage
                  alt={`${logo} logo`}
                  key={logo}
                  src={`https://dub.co/_static/clients/${logo}.svg`}
                  width={520}
                  height={182}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustedBy;
