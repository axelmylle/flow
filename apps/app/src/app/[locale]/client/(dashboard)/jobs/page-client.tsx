"use client";

import { SearchBoxPersisted } from "@/components/shared/search-box";
import { Filter } from "@gigflow/ui/filter";
import { MaxWidthWrapper } from "@gigflow/ui/max-width-wrapper";

import { JobDetail } from "@/components/jobs/job-detail";
import { useLinkFilters } from "@/components/jobs/use-job-filters";
import { Button } from "@gigflow/ui/button";
import { Icons } from "@gigflow/ui/icons";
import { useRouter } from "next/navigation";
import React from "react";
import { JobCard } from "./job-card";
import { JobList } from "./list";
// ... existing imports ...

export const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    description:
      "We're looking for an experienced Frontend Developer proficient in React, TypeScript, and Next.js. Must have 5+ years of experience building scalable applications and leading teams.",
    applicantsCount: 12,
    createdAt: new Date("2024-03-15"),
    status: "open" as const,
  },
  {
    id: "2",
    title: "UI/UX Designer",
    description:
      "Seeking a creative UI/UX Designer to join our product team. Experience with Figma, user research, and design systems required. Healthcare industry experience is a plus.",
    applicantsCount: 8,
    createdAt: new Date("2024-03-10"),
    status: "open" as const,
  },
  {
    id: "3",
    title: "DevOps Engineer",
    description:
      "Looking for a DevOps Engineer to help scale our cloud infrastructure. Experience with AWS, Kubernetes, and CI/CD pipelines is essential.",
    applicantsCount: 5,
    createdAt: new Date("2024-03-01"),
    status: "closed" as const,
  },
  {
    id: "4",
    title: "Backend Developer",
    description:
      "Backend Developer needed for building robust APIs and microservices. Strong knowledge of Node.js, PostgreSQL, and API design principles required.",
    applicantsCount: 0,
    createdAt: new Date("2024-03-18"),
    status: "draft" as const,
  },
  {
    id: "5",
    title: "Product Manager",
    description:
      "Experienced Product Manager needed to lead our core product initiatives. Must have experience in B2B SaaS products and agile methodologies.",
    applicantsCount: 15,
    createdAt: new Date("2024-03-05"),
    status: "open" as const,
  },
];
function PageClient() {
  const router = useRouter();

  // const { AddEditLinkModal, AddEditLinkButton } = useAddEditLinkModal();
  // const { AddEditTagModal, setShowAddEditTagModal } = useAddEditTagModal();

  // const { slug } = useWorkspace();

  const { filters, activeFilters, onSelect, onRemove, onRemoveAll } =
    useLinkFilters();

  return (
    <>
      <div className="flex w-full items-center">
        <div className="mx-auto w-full px-2.5  flex flex-col gap-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 md:flex-nowrap">
            <div className="order-4 flex w-full grow flex-wrap justify-end gap-2 md:order-2 md:w-auto">
              <div className="w-full md:w-56 lg:w-64">
                <SearchBoxPersisted
                  // loading={isValidating}
                  inputClassName="h-10"
                />
              </div>
              <div className="grow basis-0 md:grow-0">
                <Filter.Select
                  filters={filters}
                  activeFilters={activeFilters}
                  onSelect={onSelect}
                  onRemove={onRemove}
                  className="w-full"
                  emptyState={{
                    tagId: (
                      <div className="flex flex-col items-center gap-2 p-2 text-center text-sm">
                        <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 p-3">
                          <Icons.Tag className="h-8 w-8 text-gray-700" />
                        </div>
                        <p className="mt-2 font-medium text-gray-950">
                          No tags found
                        </p>
                        <p className="mx-auto mt-1 w-full max-w-[180px] text-gray-700">
                          Add tags to organize your links
                        </p>
                        <div>
                          <Button
                            className="mt-1 h-8"
                            // onClick={() => setShowAddEditTagModal(true)}
                          >
                            add a tag
                          </Button>
                        </div>
                      </div>
                    ),
                    domain: (
                      <div className="flex flex-col items-center gap-2 p-2 text-center text-sm">
                        <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 p-3">
                          <Icons.Tag className="h-8 w-8 text-gray-700" />
                        </div>
                        <p className="mt-2 font-medium text-gray-950">
                          No domains found
                        </p>
                        <p className="mx-auto mt-1 w-full max-w-[180px] text-gray-700">
                          Add a custom domain to match your brand
                        </p>
                        <div>
                          <Button
                            className="mt-1 h-8"
                            // onClick={() =>
                            //   router.push(`/${slug}/settings/domains`)
                            // }
                          >
                            add a domain
                          </Button>
                        </div>
                      </div>
                    ),
                  }}
                />
              </div>
              <div className="grow basis-0 md:grow-0">
                {/* <LinkDisplay /> LinkDisplay*/}
              </div>
            </div>
            <div className="order-3 flex gap-x-2">
              <div className="grow-0">
                {/* <AddEditLinkButton /> AddEditLinkButton*/}
              </div>
              {/* <MoreLinkOptions /> MoreLinkOptions*/}
            </div>
          </div>
          <Filter.List
            filters={filters}
            activeFilters={activeFilters}
            onRemove={onRemove}
            onRemoveAll={onRemoveAll}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
}

export default PageClient;
