"use client";

import { Badge } from "@gigflow/ui/badge";
import { Button } from "@gigflow/ui/button";
import { Icons } from "@gigflow/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface JobDetailProps {
  job: {
    id: string;
    title: string;
    company: string;
    companyLogo: string;
    description: string;
    location: string;
    salary: string;
    contractType: string;
    postedDate: string;
    requiredSkills: string[];
    companyRating: number;
    applicationUrl: string;
  };
}

export function JobDetail({ job }: JobDetailProps) {
  const router = useRouter();

  return (
    <div className="container max-w-[1200px] flex justify-center">
      <article className="max-w-[680px] pt-[80px] pb-[80px] w-full">
        <section className="relative">
          <Button
            variant="link"
            onClick={() => router.back()}
            className="hidden md:flex mb-4 text-[#888] text-[13px] font-normal items-center gap-2 hover:text-[#555] transition-all duration-250"
          >
            <Icons.ChevronLeft className="w-4 h-4" />
            Go back
          </Button>

          <div className="mb-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div className="flex items-center">
                <Image
                  src={job.companyLogo}
                  alt={job.company}
                  width={100}
                  height={100}
                  className="size-[3.125rem] shrink-0 rounded-full border border-[#e9ebee] object-contain bg-white mr-4"
                />
                <div>
                  <Link
                    href={`https://${job.company?.toLowerCase()}.com`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#888] text-sm hover:underline"
                  >
                    {job.company}
                  </Link>
                  <h1 className="text-xl font-semibold">{job.title}</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="my-3 flex flex-wrap pr-2">
            <Badge variant="secondary" className="my-1 mr-2">
              {job.contractType}
            </Badge>
          </div>

          <div className="mt-8 mb-4 md:grid md:grid-cols-[120px_auto] md:gap-[36px] flex flex-col gap-3">
            <p className="text-[#888] text-sm font-normal">Location</p>
            <p className="text-[#111111] text-sm font-normal ml-4 md:ml-0">
              {job.location}
            </p>
          </div>

          <div className="my-4 md:grid md:grid-cols-[120px_auto] md:gap-[36px] flex flex-col gap-3">
            <p className="text-[#888] text-sm font-normal">Salary range</p>
            <p className="text-[#111111] text-sm font-normal ml-4 md:ml-0">
              {job.salary}
            </p>
          </div>

          <div className="my-4 md:grid md:grid-cols-[120px_auto] md:gap-[36px] flex flex-col gap-3 max-w-2xl">
            <p className="text-[#888] text-sm font-normal">Tech stack</p>
            <div className="flex flex-wrap items-center gap-1.5 ml-4 md:ml-0">
              {job.requiredSkills?.map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="my-4 md:grid md:grid-cols-[120px_auto] md:gap-[36px] flex flex-col gap-3">
            <p className="text-[#888] text-sm font-normal">Description</p>
            <div className="text-[#111111] text-sm font-normal max-w-3xl ml-4 md:ml-0">
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
