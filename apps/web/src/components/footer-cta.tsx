import React from "react";
import { SubscribeForm } from "./subscribe-form";

function FooterCTA() {
  return (
    <div>
      <div className="relative mx-auto mb-20 mt-12 w-full max-w-screen-lg overflow-hidden rounded-2xl bg-neutral-50 px-6 py-24 text-center sm:mt-0 sm:px-0 sm:px-12">
        <svg
          className="pointer-events-none absolute inset-[unset] left-1/2 top-0 w-[1200px] -translate-x-1/2 text-neutral-300 [mask-image:linear-gradient(transparent,black_70%)]"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern
              id="grid-:R1h7qnja:"
              x="0"
              y="-53.5"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 80 0 L 0 0 0 80"
                fill="transparent"
                stroke="currentColor"
                stroke-width="1"
              ></path>
            </pattern>
          </defs>
          <rect fill="url(#grid-:R1h7qnja:)" width="100%" height="100%"></rect>
        </svg>
        <div className="absolute -left-1/4 top-[38%] h-[135%] w-[150%] opacity-10 blur-[120px] [transform:translate3d(0,0,0)]">
          <div className="size-full bg-[conic-gradient(at_50%_50%,_#F4950C_0deg,_#F4950C_117deg,_#EB5C0C_180deg,_#F4950C_360deg)] [mask-image:radial-gradient(closest-side,black_100%,transparent_100%)]"></div>
        </div>
        <div className="relative mx-auto flex w-full max-w-lg flex-col items-center">
          <h2 className="font-display text-4xl font-medium text-neutral-900 sm:text-5xl sm:leading-[1.15]">
            Your Career, Simplified
          </h2>
          <p className="mt-5 text-balance text-base text-neutral-500 sm:text-xl">
            Stop searching, start thriving. With Gigflow, every opportunity
            comes to you.
          </p>
        </div>
        <div className="relative mx-auto mt-10 flex max-w-fit space-x-4">
          <SubscribeForm group="footer" placeholder="Your email" />
        </div>
      </div>
    </div>
  );
}

export default FooterCTA;
