"use client";

import { cn } from "@gigflow/ui/cn";
import { useInViewport } from "@gigflow/ui/hooks";
import { Icons } from "@gigflow/ui/icons";
import { Tooltip } from "@gigflow/ui/tooltip";
import { useRef } from "react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  postedDate: string;
}

export function JobTitleColumn({ job }: { job: Job }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInViewport(ref, { defaultValue: true });

  return (
    <div
      ref={ref}
      className="flex h-[32px] items-center gap-3 transition-[height] group-data-[variant=loose]/card-list:h-[60px]"
    >
      {isVisible && (
        <>
          <div className="relative hidden shrink-0 items-center justify-center sm:flex">
            <div className="absolute inset-0 shrink-0 rounded-full border border-gray-200 opacity-0 transition-opacity group-data-[variant=loose]/card-list:sm:opacity-100">
              <div className="h-full w-full rounded-full border border-white bg-gradient-to-t from-gray-100" />
            </div>
            <div className="relative pr-0.5 transition-[padding] group-data-[variant=loose]/card-list:sm:p-2">
              <Icons.Briefcase className="h-4 w-4 shrink-0 text-gray-600 transition-[width,height] sm:h-6 sm:w-6 group-data-[variant=loose]/card-list:sm:h-5 group-data-[variant=loose]/card-list:sm:w-5" />
            </div>
          </div>
          <div className="h-[24px] min-w-0 overflow-hidden transition-[height] group-data-[variant=loose]/card-list:h-[44px]">
            <div className="flex items-center gap-2">
              <div className="min-w-0 shrink grow-0 text-gray-950">
                <div className="flex items-center gap-2">
                  <span className="truncate font-semibold leading-6 text-gray-800">
                    {job.title}
                  </span>
                </div>
              </div>
            </div>
            <JobDetails job={job} />
          </div>
        </>
      )}
    </div>
  );
}

function JobDetails({ job, compact }: { job: Job; compact?: boolean }) {
  return (
    <div
      className={cn(
        "min-w-0 items-center whitespace-nowrap text-sm transition-[opacity,display] delay-[0s,150ms] duration-[150ms,0s]",
        compact
          ? [
              "hidden gap-2.5 opacity-0 group-data-[variant=compact]/card-list:flex group-data-[variant=compact]/card-list:opacity-100",
              "xs:min-w-[40px] xs:basis-[40px] min-w-0 shrink-0 grow basis-0 sm:min-w-[120px] sm:basis-[120px]",
            ]
          : "hidden gap-1.5 opacity-0 group-data-[variant=loose]/card-list:flex group-data-[variant=loose]/card-list:opacity-100 md:gap-3",
      )}
    >
      <div className="flex min-w-0 items-center gap-1">
        <Icons.Building className="h-3 w-3 shrink-0 text-gray-400" />
        <span className="truncate text-gray-500">{job.company}</span>
      </div>
      <div className="hidden shrink-0 sm:block">
        {/* <Tooltip content={job.location}> */}
        <span className="text-gray-400">{job.location}</span>
        {/* </Tooltip> */}
      </div>
      <div className="hidden shrink-0 sm:block">
        {/* <Tooltip content={`Posted on ${job.postedDate}`}> */}
        <span className="text-gray-400">{job.postedDate}</span>
        {/* </Tooltip> */}
      </div>
    </div>
  );
}
