import { Badge } from "@gigflow/ui/badge";
import { Button } from "@gigflow/ui/button";
import { Card, CardHeader, CardTitle } from "@gigflow/ui/card";
import Image from "next/image";
import Link from "next/link";
import FeatureCard from "./features/feature-card";
import FeatureFullRowCard from "./features/feature-full-row-card";

export const Features = () => (
  <div className="mt-20">
    <div className="mx-auto w-full max-w-xl px-4 text-center">
      <h2 className="text-balance font-display text-3xl font-medium text-neutral-900">
        Unlock the Future of Freelancing
      </h2>
      <p className="mt-3 text-pretty text-lg text-neutral-500">
        Join a platform designed to eliminate the struggle of finding work and
        maximize your opportunities. The only partner you need to thrive in the
        freelance world.
      </p>
    </div>
    <div className="mx-auto mt-14 grid w-full max-w-screen-lg grid-cols-1 px-4 sm:grid-cols-2">
      <div className="contents divide-neutral-200 max-sm:divide-y sm:divide-x">
        <FeatureCard
          title="One Platform, All the Jobs"
          ctaHref="/gigs"
          ctaText="See gigs"
          description="Stop waiting for gigs to come to you. Gigflow actively connects you and your referrals to customers, maximizing exposure and income potential."
        >
          <div className="relative h-64 overflow-hidden sm:h-[302px]">
            <div className="flex size-full flex-col justify-center">
              <div className="flex flex-col gap-2.5 [mask-image:linear-gradient(90deg,black_70%,transparent)]">
                <div className="transition-transform duration-300 hover:translate-x-[-2%]">
                  <Card className="flex cursor-default items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm ml-[calc((0+1)*5%)]">
                    <div className="relative gap-4 rounded-[10px] flex w-full z-10">
                      <div className="flex-shrink-0 pt-1">
                        <Image
                          src={"https://logo.clearbit.com/default.com"}
                          alt=""
                          width={40}
                          height={40}
                          className="size-10 rounded-full border border-[#e9ebee] object-contain bg-white"
                        />
                      </div>
                      <div className="flex flex-col w-full gap-1 ">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <div className="flex flex-col">
                            <div className="text-[12px] leading-[18px] font-normal text-[#555]">
                              KBC
                            </div>
                            <div className="text-sm leading-[18px] text-[#111111] font-medium">
                              Web Developer
                            </div>
                          </div>
                          <span className="text-[#535353] text-xs font-normal max-w-sm overflow-hidden truncate text-ellipsis">
                            Stockholm, Sweden
                          </span>
                        </div>
                        <p className="text-xs text-[#535353] mt-1 line-clamp-2">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quisquam, quos.
                        </p>
                      </div>
                    </div>
                    <div className="absolute bg-[#f0f0f0] -inset-x-3 inset-y-0 rounded-[10px] opacity-0 group-hover/jobcard:opacity-100 transition-opacity"></div>
                  </Card>
                </div>
                <div className="transition-transform duration-300 hover:translate-x-[-2%]">
                  <Card className="flex cursor-default items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm ml-[calc((1+1)*5%)]">
                    <div className="relative gap-4 rounded-[10px] flex w-full z-10">
                      <div className="flex-shrink-0 pt-1">
                        <Image
                          src={"https://logo.clearbit.com/default.com"}
                          alt=""
                          width={40}
                          height={40}
                          className="size-10 rounded-full border border-[#e9ebee] object-contain bg-white"
                        />
                      </div>
                      <div className="flex flex-col w-full gap-1 ">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <div className="flex flex-col">
                            <div className="text-[12px] leading-[18px] font-normal text-[#555]">
                              KBC
                            </div>
                            <div className="text-sm leading-[18px] text-[#111111] font-medium">
                              Web Developer
                            </div>
                          </div>
                          <span className="text-[#535353] text-xs font-normal max-w-sm overflow-hidden truncate text-ellipsis">
                            Stockholm, Sweden
                          </span>
                        </div>
                        <p className="text-xs text-[#535353] mt-1 line-clamp-2">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quisquam, quos.
                        </p>
                      </div>
                    </div>
                    <div className="absolute bg-[#f0f0f0] -inset-x-3 inset-y-0 rounded-[10px] opacity-0 group-hover/jobcard:opacity-100 transition-opacity"></div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </FeatureCard>
        <FeatureCard
          title="Earn More with Referrals"
          description="Invite other freelancers and earn rewards for every gig they complete. Turn your network into extra income."
        >
          <div class="relative h-64 overflow-hidden sm:h-[302px]">
            <div
              class="size-full overflow-clip [mask-image:linear-gradient(black_70%,transparent)]"
              aria-hidden="true"
              tabindex="-1"
            >
              <div class="mx-3.5 flex cursor-default flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5 shadow-[0_20px_20px_0_#00000017]">
                <h3 class="text-base font-medium">
                  Invite people to your tribe
                </h3>
                <div className="flex items-center justify-between gap-2 rounded-lg border border-neutral-200 p-2.5">
                  <div className="flex items-center gap-3 text-neutral-800">
                    <div className="relative">
                      <img
                        alt="Profile"
                        fetchpriority="high"
                        width="40"
                        height="40"
                        decoding="async"
                        data-nimg="1"
                        class="rounded-full bg-[rgba(128,128,128,0.14)] h-10 w-10 object-cover border-2 border-white"
                        srcset="https://useliftoff.com/_next/image?url=https%3A%2F%2Fimagedelivery.net%2F2eE23pchqRpk1E3L_rf21w%2Fa748725e-c191-47e4-738a-4295ca2d9300%2Fpublic&amp;w=48&amp;q=75 1x, https://useliftoff.com/_next/image?url=https%3A%2F%2Fimagedelivery.net%2F2eE23pchqRpk1E3L_rf21w%2Fa748725e-c191-47e4-738a-4295ca2d9300%2Fpublic&amp;w=96&amp;q=75 2x"
                        src="https://useliftoff.com/_next/image?url=https%3A%2F%2Fimagedelivery.net%2F2eE23pchqRpk1E3L_rf21w%2Fa748725e-c191-47e4-738a-4295ca2d9300%2Fpublic&amp;w=96&amp;q=75"
                      />
                      <div className="absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-white bg-green-500" />{" "}
                      {/* Online indicator */}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">John Doe</span>
                      <span className="text-xs text-neutral-500">
                        Web Developer
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-green-600">
                        €500
                      </span>
                      <span className="text-xs text-neutral-500">
                        Commission
                      </span>
                    </div>
                    <svg
                      height="18"
                      width="18"
                      viewBox="0 0 18 18"
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 text-green-600"
                    >
                      <g fill="currentColor">
                        <path
                          d="M9,1.75c4.004,0,7.25,3.246,7.25,7.25s-3.246,7.25-7.25,7.25S1.75,13.004,1.75,9,4.996,1.75,9,1.75"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <polyline
                          fill="none"
                          points="5.75 9 7.75 11 12.25 6.5"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </g>
                    </svg>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 rounded-lg border border-neutral-200 p-2.5">
                  <div className="flex items-center gap-3 text-neutral-800">
                    <div className="relative">
                      <img
                        alt="Profile"
                        fetchpriority="high"
                        width="40"
                        height="40"
                        decoding="async"
                        data-nimg="1"
                        class="rounded-full bg-[rgba(128,128,128,0.14)] h-10 w-10 object-cover border-2 border-white"
                        srcset="https://useliftoff.com/_next/image?url=https%3A%2F%2Fimagedelivery.net%2F2eE23pchqRpk1E3L_rf21w%2Fa748725e-c191-47e4-738a-4295ca2d9300%2Fpublic&amp;w=48&amp;q=75 1x, https://useliftoff.com/_next/image?url=https%3A%2F%2Fimagedelivery.net%2F2eE23pchqRpk1E3L_rf21w%2Fa748725e-c191-47e4-738a-4295ca2d9300%2Fpublic&amp;w=96&amp;q=75 2x"
                        src="https://useliftoff.com/_next/image?url=https%3A%2F%2Fimagedelivery.net%2F2eE23pchqRpk1E3L_rf21w%2Fa748725e-c191-47e4-738a-4295ca2d9300%2Fpublic&amp;w=96&amp;q=75"
                      />
                      <div className="absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-white bg-green-500" />{" "}
                      {/* Online indicator */}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">John Doe</span>
                      <span className="text-xs text-neutral-500">
                        Web Developer
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-green-600">
                        €500
                      </span>
                      <span className="text-xs text-neutral-500">
                        Commission
                      </span>
                    </div>
                    <svg
                      height="18"
                      width="18"
                      viewBox="0 0 18 18"
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 text-green-600"
                    >
                      <g fill="currentColor">
                        <path
                          d="M9,1.75c4.004,0,7.25,3.246,7.25,7.25s-3.246,7.25-7.25,7.25S1.75,13.004,1.75,9,4.996,1.75,9,1.75"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <polyline
                          fill="none"
                          points="5.75 9 7.75 11 12.25 6.5"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 rounded-lg border border-neutral-200 p-2.5">
                  <div className="flex items-center gap-3 text-neutral-800">
                    <div className="relative">
                      <img
                        alt="Pofilse"
                        width="40"
                        height="40"
                        decoding="async"
                        data-nimg="1"
                        class="rounded-full bg-[rgba(128,128,128,0.14)] h-10 w-10 object-cover border-2 border-white"
                        srcset="https://useliftoff.com/_next/image?url=https%3A%2F%2Fimagedelivery.net%2F2eE23pchqRpk1E3L_rf21w%2Fa748725e-c191-47e4-738a-4295ca2d9300%2Fpublic&amp;w=48&amp;q=75 1x, https://useliftoff.com/_next/image?url=https%3A%2F%2Fimagedelivery.net%2F2eE23pchqRpk1E3L_rf21w%2Fa748725e-c191-47e4-738a-4295ca2d9300%2Fpublic&amp;w=96&amp;q=75 2x"
                        src="https://useliftoff.com/_next/image?url=https%3A%2F%2Fimagedelivery.net%2F2eE23pchqRpk1E3L_rf21w%2Fa748725e-c191-47e4-738a-4295ca2d9300%2Fpublic&amp;w=96&amp;q=75"
                      />
                      <div className="absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-white bg-green-500" />{" "}
                      {/* Online indicator */}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">John Doe</span>
                      <span className="text-xs text-neutral-500">
                        Web Developer
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-green-600">
                        €500
                      </span>
                      <span className="text-xs text-neutral-500">
                        Commission
                      </span>
                    </div>
                    <svg
                      height="18"
                      width="18"
                      viewBox="0 0 18 18"
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 text-green-600"
                    >
                      <g fill="currentColor">
                        <path
                          d="M9,1.75c4.004,0,7.25,3.246,7.25,7.25s-3.246,7.25-7.25,7.25S1.75,13.004,1.75,9,4.996,1.75,9,1.75"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <polyline
                          fill="none"
                          points="5.75 9 7.75 11 12.25 6.5"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FeatureCard>
      </div>
      <div className="relative flex flex-col gap-10 px-4 py-14 sm:px-12 border-y border-neutral-200 pt-12 sm:col-span-2">
        <FeatureFullRowCard />
      </div>
      <div className="contents divide-neutral-200 max-sm:divide-y sm:divide-x">
        <FeatureCard
          title="Stability to thrive"
          description="Enjoy predictable income, health benefits, and pensions while working on projects that match your expertise."
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
          <div class="relative h-64 overflow-hidden sm:h-[302px]">
            <div
              class="size-full overflow-clip [mask-image:linear-gradient(black_70%,transparent)]"
              aria-hidden="true"
              tabindex="-1"
            >
              <div class="mx-3.5 flex cursor-default flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5 shadow-[0_20px_20px_0_#00000017]">
                <h3 class="text-base font-medium">Link customization</h3>
                <div class="flex flex-col gap-2.5">
                  <div class="flex items-center justify-between gap-2 rounded-lg border border-neutral-200 p-2.5">
                    <div class="flex items-center gap-2 text-neutral-800">
                      <svg
                        height="18"
                        width="18"
                        viewBox="0 0 18 18"
                        xmlns="http://www.w3.org/2000/svg"
                        class="size-5"
                      >
                        <g fill="currentColor">
                          <rect
                            height="10.5"
                            width="8.5"
                            fill="none"
                            rx="1"
                            ry="1"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            x="1.75"
                            y="1.75"
                          ></rect>
                          <path
                            d="M13,5.258l2.283,.6c.534,.141,.853,.688,.712,1.222l-2.292,8.703c-.141,.534-.688,.853-1.222,.712l-6.491-1.71"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                          ></path>
                        </g>
                      </svg>
                      <span class="text-sm font-medium">Link Preview</span>
                    </div>
                    <div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked="true"
                        data-state="checked"
                        value="on"
                        class="radix-state-unchecked:bg-gray-200 relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 data-[disabled]:cursor-not-allowed radix-state-checked:bg-orange-600 focus-visible:ring-orange-500"
                      >
                        <span
                          data-state="checked"
                          class="radix-state-checked:undefined radix-state-unchecked:translate-x-0 pointer-events-none h-3 w-3 translate-x-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                        ></span>
                      </button>
                    </div>
                  </div>
                  <div class="flex items-center justify-between gap-2 rounded-lg border border-neutral-200 p-2.5">
                    <div class="flex items-center gap-2 text-neutral-800">
                      <svg
                        height="18"
                        width="18"
                        viewBox="0 0 18 18"
                        xmlns="http://www.w3.org/2000/svg"
                        class="size-5"
                      >
                        <g fill="currentColor">
                          <polyline
                            fill="none"
                            points="10 6.5 12.25 8.75 10 11"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                          ></polyline>
                          <path
                            d="M12.25,8.75h-3.5c-1.105,0-2,.895-2,2v.5"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                          ></path>
                          <rect
                            height="11.313"
                            width="11.313"
                            fill="none"
                            rx="2"
                            ry="2"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            transform="translate(21.728 9) rotate(135)"
                            x="3.343"
                            y="3.343"
                          ></rect>
                        </g>
                      </svg>
                      <span class="text-sm font-medium">UTM</span>
                    </div>
                    <div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked="true"
                        data-state="checked"
                        value="on"
                        class="radix-state-unchecked:bg-gray-200 relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 data-[disabled]:cursor-not-allowed radix-state-checked:bg-orange-600 focus-visible:ring-orange-500"
                      >
                        <span
                          data-state="checked"
                          class="radix-state-checked:undefined radix-state-unchecked:translate-x-0 pointer-events-none h-3 w-3 translate-x-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                        ></span>
                      </button>
                    </div>
                  </div>
                  <div class="flex items-center justify-between gap-2 rounded-lg border border-neutral-200 p-2.5">
                    <div class="flex items-center gap-2 text-neutral-800">
                      <svg
                        height="18"
                        width="18"
                        viewBox="0 0 18 18"
                        xmlns="http://www.w3.org/2000/svg"
                        class="size-5"
                      >
                        <g fill="currentColor">
                          <polyline
                            fill="none"
                            points="9 4.75 9 9 12.25 11.25"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                          ></polyline>
                          <path
                            d="M9,1.75c4.004,0,7.25,3.246,7.25,7.25s-3.246,7.25-7.25,7.25"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                          ></path>
                          <circle
                            cx="3.873"
                            cy="14.127"
                            fill="currentColor"
                            r=".75"
                            stroke="none"
                          ></circle>
                          <circle
                            cx="1.75"
                            cy="9"
                            fill="currentColor"
                            r=".75"
                            stroke="none"
                          ></circle>
                          <circle
                            cx="3.873"
                            cy="3.873"
                            fill="currentColor"
                            r=".75"
                            stroke="none"
                          ></circle>
                          <circle
                            cx="6.226"
                            cy="15.698"
                            fill="currentColor"
                            r=".75"
                            stroke="none"
                          ></circle>
                          <circle
                            cx="2.302"
                            cy="11.774"
                            fill="currentColor"
                            r=".75"
                            stroke="none"
                          ></circle>
                          <circle
                            cx="2.302"
                            cy="6.226"
                            fill="currentColor"
                            r=".75"
                            stroke="none"
                          ></circle>
                          <circle
                            cx="6.226"
                            cy="2.302"
                            fill="currentColor"
                            r=".75"
                            stroke="none"
                          ></circle>
                        </g>
                      </svg>
                      <span class="text-sm font-medium">Expiration</span>
                    </div>
                    <div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked="false"
                        data-state="unchecked"
                        value="on"
                        class="radix-state-unchecked:bg-gray-200 relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 data-[disabled]:cursor-not-allowed radix-state-checked:bg-orange-600 focus-visible:ring-orange-500"
                      >
                        <span
                          data-state="unchecked"
                          class="radix-state-checked:undefined radix-state-unchecked:translate-x-0 pointer-events-none h-3 w-3 translate-x-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                        ></span>
                      </button>
                    </div>
                  </div>
                  <div class="flex items-center justify-between gap-2 rounded-lg border border-neutral-200 p-2.5">
                    <div class="flex items-center gap-2 text-neutral-800">
                      <svg
                        height="18"
                        width="18"
                        viewBox="0 0 18 18"
                        xmlns="http://www.w3.org/2000/svg"
                        class="size-5"
                      >
                        <g fill="currentColor">
                          <circle
                            cx="9"
                            cy="9"
                            fill="none"
                            r="7.25"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                          ></circle>
                          <line
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            x1="9"
                            x2="9"
                            y1="7"
                            y2="4.75"
                          ></line>
                          <line
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            x1="11"
                            x2="13.25"
                            y1="9"
                            y2="9"
                          ></line>
                          <line
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            x1="9"
                            x2="9"
                            y1="11"
                            y2="13.25"
                          ></line>
                          <line
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            x1="7"
                            x2="4.75"
                            y1="9"
                            y2="9"
                          ></line>
                        </g>
                      </svg>
                      <span class="text-sm font-medium">Targeting</span>
                    </div>
                    <div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked="true"
                        data-state="checked"
                        value="on"
                        class="radix-state-unchecked:bg-gray-200 relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 data-[disabled]:cursor-not-allowed radix-state-checked:bg-orange-600 focus-visible:ring-orange-500"
                      >
                        <span
                          data-state="checked"
                          class="radix-state-checked:undefined radix-state-unchecked:translate-x-0 pointer-events-none h-3 w-3 translate-x-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                        ></span>
                      </button>
                    </div>
                  </div>
                  <div class="flex items-center justify-between gap-2 rounded-lg border border-neutral-200 p-2.5">
                    <div class="flex items-center gap-2 text-neutral-800">
                      <svg
                        height="18"
                        width="18"
                        viewBox="0 0 18 18"
                        xmlns="http://www.w3.org/2000/svg"
                        class="size-5"
                      >
                        <g fill="currentColor">
                          <path
                            d="M7.75,13.25H3.75c-1.105,0-2-.895-2-2V6.75c0-1.105,.895-2,2-2H14.25c1.105,0,2,.895,2,2v.25"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                          ></path>
                          <path
                            d="M12.25,12.25v-2c0-.828,.672-1.5,1.5-1.5h0c.828,0,1.5,.672,1.5,1.5v2"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                          ></path>
                          <circle
                            cx="5.5"
                            cy="9"
                            fill="currentColor"
                            r="1"
                            stroke="none"
                          ></circle>
                          <circle
                            cx="9"
                            cy="9"
                            fill="currentColor"
                            r="1"
                            stroke="none"
                          ></circle>
                          <rect
                            height="4"
                            width="6"
                            fill="none"
                            rx="1"
                            ry="1"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            x="10.75"
                            y="12.25"
                          ></rect>
                        </g>
                      </svg>
                      <span class="text-sm font-medium">Password</span>
                    </div>
                    <div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked="true"
                        data-state="checked"
                        value="on"
                        class="radix-state-unchecked:bg-gray-200 relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 data-[disabled]:cursor-not-allowed radix-state-checked:bg-orange-600 focus-visible:ring-orange-500"
                      >
                        <span
                          data-state="checked"
                          class="radix-state-checked:undefined radix-state-unchecked:translate-x-0 pointer-events-none h-3 w-3 translate-x-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                        ></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FeatureCard>
      </div>
    </div>
  </div>
);
