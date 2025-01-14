"use client";

import { Badge } from "@gigflow/ui/badge";
import { CardList } from "@gigflow/ui/card-list";
import Image from "next/image";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  postedDate: string;
  rate: string;
  description: string;
  duration: string;
  matchPercentage: number;
  clientRating: number;
  clientIndustry: string;
  requiredSkills: string[];
  startDate: string;
  applicationDeadline: string;
  contractType: string;
}

export async function JobList({ jobs }: { jobs: Job[] }) {
  return (
    <CardList>
      <div
        className="flow-root pb-3 mx-auto w-full -mt-[18px] group-has-[[data-pending]]:opacity-60 transition-all duration-250 group-has-[[data-pending]]:animate-pulse"
        style={{ animationDuration: "1.5s" }}
      >
        {jobs.map((job) => (
          <div key={job.id} className="relative group/jobcard">
            <Link
              href={`/jobs/${job.id}`}
              className="relative flex items-start text-left py-[17px]"
            >
              <div className="relative gap-4 rounded-[10px] flex w-full z-10">
                <div className="flex-shrink-0 pt-1">
                  <Image
                    src={
                      job.companyLogo || "https://logo.clearbit.com/default.com"
                    }
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
                        {job.company}
                      </div>
                      <div className="text-sm leading-[18px] text-[#111111] font-medium">
                        {job.title}
                      </div>
                    </div>
                    <span className="text-[#535353] text-xs font-normal max-w-sm overflow-hidden truncate text-ellipsis">
                      {job.location}
                    </span>
                  </div>
                  <p className="text-xs text-[#535353] mt-1 line-clamp-2">
                    {job.description}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {job.requiredSkills &&
                      job.requiredSkills.slice(0, 2).map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
              <div className="absolute bg-[#f0f0f0] -inset-x-3 inset-y-0 rounded-[10px] opacity-0 group-hover/jobcard:opacity-100 transition-opacity"></div>
            </Link>
          </div>
        ))}
      </div>
    </CardList>
  );
}
