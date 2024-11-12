"use client";

import { Button } from "@gigflow/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@gigflow/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { SubscribeForm } from "./subscribe-form";

export function Header() {
  return (
    <div className="sticky inset-x-0 top-0 z-30 w-full transition-all">
      <div className="absolute inset-0 block transition-all lg:hidden"></div>
      <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20 relative">
        <div className="flex h-14 items-center justify-between">
          <a className="grow basis-0" href="/">
            <div className="max-w-fit">
              <svg
                width="46"
                height="24"
                viewBox="0 0 46 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-auto text-black dark:text-white"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11 2H14V13.9332L14.0003 13.9731L14.0003 14C14.0003 14.0223 14.0002 14.0445 14 14.0668V21H11V19.7455C9.86619 20.5362 8.48733 21 7.00016 21C3.13408 21 0 17.866 0 14C0 10.134 3.13408 7 7.00016 7C8.48733 7 9.86619 7.46375 11 8.25452V2ZM7 17.9998C9.20914 17.9998 11 16.209 11 13.9999C11 11.7908 9.20914 10 7 10C4.79086 10 3 11.7908 3 13.9999C3 16.209 4.79086 17.9998 7 17.9998ZM32 2H35V8.25474C36.1339 7.46383 37.5128 7 39.0002 7C42.8662 7 46.0003 10.134 46.0003 14C46.0003 17.866 42.8662 21 39.0002 21C35.1341 21 32 17.866 32 14V2ZM39 17.9998C41.2091 17.9998 43 16.209 43 13.9999C43 11.7908 41.2091 10 39 10C36.7909 10 35 11.7908 35 13.9999C35 16.209 36.7909 17.9998 39 17.9998ZM19 7H16V14C16 14.9192 16.1811 15.8295 16.5329 16.6788C16.8846 17.5281 17.4003 18.2997 18.0503 18.9497C18.7003 19.5997 19.472 20.1154 20.3213 20.4671C21.1706 20.8189 22.0809 21 23.0002 21C23.9194 21 24.8297 20.8189 25.679 20.4671C26.5283 20.1154 27.3 19.5997 27.95 18.9497C28.6 18.2997 29.1157 17.5281 29.4675 16.6788C29.8192 15.8295 30.0003 14.9192 30.0003 14H30V7H27V14C27 15.0608 26.5785 16.0782 25.8284 16.8283C25.0783 17.5784 24.0609 17.9998 23 17.9998C21.9391 17.9998 20.9217 17.5784 20.1716 16.8283C19.4215 16.0782 19 15.0608 19 14V7Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </a>
          <nav
            aria-label="Main"
            data-orientation="horizontal"
            dir="ltr"
            className="relative hidden lg:block"
          >
            <div>
              <ul
                data-orientation="horizontal"
                className="relative flex flex-row gap-2 px-2 py-0.5"
                dir="ltr"
              >
                <div className="absolute inset-0 -z-[1]">
                  <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200 drop-shadow-sm transition-all dark:border-white/10 bg-white/75 backdrop-blur-lg dark:bg-black/75"></div>
                </div>
                <li>
                  <button
                    className="block rounded-md px-3 py-1.5 text-sm text-gray-900/60 hover:text-gray-900/80 dark:text-white/70 dark:hover:text-white transition-colors ease-out"
                    id="radix-:R59rja:-trigger-radix-:Rct9rja:"
                    data-state="closed"
                    aria-expanded="false"
                    aria-controls="radix-:R59rja:-content-radix-:Rct9rja:"
                    data-radix-collection-item=""
                  >
                    Product
                  </button>
                </li>
                <li>
                  <button
                    className="block rounded-md px-3 py-1.5 text-sm text-gray-900/60 hover:text-gray-900/80 dark:text-white/70 dark:hover:text-white transition-colors ease-out"
                    id="radix-:R59rja:-trigger-radix-:Rkt9rja:"
                    data-state="closed"
                    aria-expanded="false"
                    aria-controls="radix-:R59rja:-content-radix-:Rkt9rja:"
                    data-radix-collection-item=""
                  >
                    Solutions
                  </button>
                </li>
                <li>
                  <a
                    id="nav-/customers"
                    className="block rounded-md px-3 py-1.5 text-sm text-gray-900/60 hover:text-gray-900/80 dark:text-white/70 dark:hover:text-white transition-colors ease-out"
                    href="/customers"
                  >
                    Customers
                  </a>
                </li>
                <li>
                  <a
                    id="nav-/pricing"
                    className="block rounded-md px-3 py-1.5 text-sm text-gray-900/60 hover:text-gray-900/80 dark:text-white/70 dark:hover:text-white transition-colors ease-out"
                    href="/pricing"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <button
                    className="block rounded-md px-3 py-1.5 text-sm text-gray-900/60 hover:text-gray-900/80 dark:text-white/70 dark:hover:text-white transition-colors ease-out"
                    id="radix-:R59rja:-trigger-radix-:R1ct9rja:"
                    data-state="closed"
                    aria-expanded="false"
                    aria-controls="radix-:R59rja:-content-radix-:R1ct9rja:"
                    data-radix-collection-item=""
                  >
                    Resources
                  </button>
                </li>
              </ul>
            </div>
            <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2"></div>
          </nav>
          <div className="hidden grow basis-0 justify-end lg:flex">
            <Button
              className="animate-fade-in rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-gray-800 hover:ring-4 hover:ring-gray-200 dark:border-white dark:bg-white dark:text-gray-600 dark:hover:bg-white dark:hover:text-gray-800 dark:hover:hover:shadow-[0_0_25px_5px_rgba(256,256,256,0.2)] dark:hover:ring-0"
              asChild
            >
              <Link className="" href="http://localhost:3000/login">
                Beta Access
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>

    // <header className="absolute top-0 w-full flex items-center justify-between p-4 z-10">
    //   <span className="hidden md:block text-sm font-medium">v1.run</span>

    //   <Link href="/">
    //     <Image
    //       src="/logo.png"
    //       alt="V1 logo"
    //       width={60}
    //       quality={100}
    //       height={60}
    //       className="md:absolute md:left-1/2 md:top-5 md:-translate-x-1/2"
    //     />
    //   </Link>

    //   <nav className="md:mt-2">
    //     <ul className="flex items-center gap-4">
    //       <li>
    //         <a
    //           href="https://github.com/midday-ai/v1"
    //           className="text-sm px-4 py-2 bg-primary text-secondary rounded-full font-medium"
    //         >
    //           Github
    //         </a>
    //       </li>
    //       <li>
    //         <Dialog>
    //           <DialogTrigger
    //             className="text-sm px-4 py-2 bg-secondary text-primary rounded-full font-medium cursor-pointer"
    //             asChild
    //           >
    //             <span>Get updates</span>
    //           </DialogTrigger>
    //           <DialogContent>
    //             <DialogHeader>
    //               <DialogTitle>Stay updated</DialogTitle>
    //               <DialogDescription>
    //                 Subscribe to our newsletter to get the latest news and
    //                 updates.
    //               </DialogDescription>
    //             </DialogHeader>

    //             <div className="flex flex-col gap-4">
    //               <SubscribeForm
    //                 group="v1-newsletter"
    //                 placeholder="Email address"
    //               />
    //             </div>
    //           </DialogContent>
    //         </Dialog>
    //       </li>
    //     </ul>
    //   </nav>
    // </header>
  );
}
