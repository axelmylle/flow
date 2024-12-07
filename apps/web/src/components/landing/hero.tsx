import { Button } from "@gigflow/ui/button";
import Image from "next/image";
import Link from "next/link";
import { WordAnimation } from "../home/word-animation";
import { SubscribeForm } from "../subscribe-form";

const logos = [
  "vercel",

  "cal",
  "vercel",

  "hashnode",
  "cal",
];

export const Hero = () => (
  <section className="!pt-16 md:!pt-52 !pb-0 md:!pb-0 grow relative">
    <div className="px-6 md:px-9 md:whitespace-pre-wrap hide-breaks md:show-breaks max-w-content mx-auto relative z-[1]">
      <div className="flex flex-col md:items-center justify-center">
        <div className="text-left md:text-center  max-w-[580px] ">
          <h1 className="mt-5  font-display text-4xl font-semibold text-neutral-900 sm:text-5xl sm:leading-[1.15] animate-slide-up-fade [--offset:20px] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in [animation-delay:100ms]">
            The Freelance Platform for Belgium That Gives You gigs and
            stability.
          </h1>
          <p className="mt-8 text-base text-neutral-500 sm:text-xl animate-slide-up-fade [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in">
            Find freelance opportunities tailored to your skills, work with
            predictable income and benefits, and connect with a community of
            freelancers who’ve got your back.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-x-4 mt-4">
          <SubscribeForm group="hero" placeholder="Your email" />
        </div>
        <div className="self-center flex justify-center w-[1512px]">
          <div className="left-[10%] md:left-0 relative h-[640px] w-full shrink-0">
            <div className="absolute z-10 inset-0 w-full h-full">
              <img
                alt="Recap"
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className="z-10 object-cover object-top"
                sizes="1512px"
                srcset="https://medusajs.com/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Ffront.1e6413ae.png&w=3840&q=75"
                src="https://medusajs.com/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Ffront.1e6413ae.png&w=3840&q=75"
              />
            </div>
            <div className="absolute inset-0 w-full h-full">
              <img
                alt="Recap"
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className="object-cover object-top"
                sizes="1512px"
                srcset="https://medusajs.com/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fback.61676a2a.png&w=3840&q=75"
                src="https://medusajs.com/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fback.61676a2a.png&w=3840&q=75"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
