"use client";

import { SearchBoxPersisted } from "@/components/shared/search-box";
import { Filter } from "@v1/ui/filter";
import { MaxWidthWrapper } from "@v1/ui/max-width-wrapper";

import { JobDetail } from "@/components/jobs/job-detail";
import { useLinkFilters } from "@/components/jobs/use-job-filters";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { useRouter } from "next/navigation";
import React from "react";
import { JobList } from "./list";
// ... existing imports ...

const mockJobs = [
  {
    id: "1",
    title: "Senior Product Designer",
    company: "TechInnovate",
    companyLogo: "https://logo.clearbit.com/techinnovate.com",
    location: "San Francisco, CA (Remote)",
    salary: "$120,000 - $160,000",
    contractType: "Full-time",
    postedDate: "2023-07-15",
    requiredSkills: ["UI/UX", "Figma", "User Research"],
    description:
      "Lead the design process for innovative tech products, creating intuitive and engaging user experiences.",
    // ... other fields
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: "WebSolutions",
    companyLogo: "https://logo.clearbit.com/websolutions.com",
    location: "New York, NY (Hybrid)",
    salary: "$100,000 - $140,000",
    contractType: "Full-time",
    postedDate: "2023-07-14",
    requiredSkills: ["React", "Node.js", "MongoDB"],
    description:
      "Develop and maintain full-stack web applications, working with both front-end and back-end technologies.",
    // ... other fields
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "AnalyticsPro",
    companyLogo: "https://logo.clearbit.com/analyticspro.com",
    location: "Boston, MA (On-site)",
    salary: "$110,000 - $150,000",
    contractType: "Full-time",
    postedDate: "2023-07-13",
    requiredSkills: ["Python", "Machine Learning", "SQL"],
    description:
      "Apply advanced analytics and machine learning techniques to derive insights from complex datasets.",
    // ... other fields
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudTech",
    companyLogo: "https://logo.clearbit.com/cloudtech.com",
    location: "Seattle, WA (Remote)",
    salary: "$115,000 - $155,000",
    contractType: "Full-time",
    postedDate: "2023-07-12",
    requiredSkills: ["AWS", "Docker", "Kubernetes"],
    description:
      "Implement and maintain cloud infrastructure, focusing on automation, scalability, and reliability.",
    // ... other fields
  },
  {
    id: "5",
    title: "Mobile App Developer",
    company: "AppWizards",
    companyLogo: "https://logo.clearbit.com/appwizards.com",
    location: "Austin, TX (Hybrid)",
    salary: "$90,000 - $130,000",
    contractType: "Full-time",
    postedDate: "2023-07-11",
    requiredSkills: ["iOS", "Android", "React Native"],
    description:
      "Design and develop cross-platform mobile applications with a focus on performance and user experience.",
    // ... other fields
  },
  {
    id: "6",
    title: "Cybersecurity Analyst",
    company: "SecureNet",
    companyLogo: "https://logo.clearbit.com/securenet.com",
    location: "Washington, D.C. (On-site)",
    salary: "$105,000 - $145,000",
    contractType: "Full-time",
    postedDate: "2023-07-10",
    requiredSkills: [
      "Network Security",
      "Penetration Testing",
      "Incident Response",
    ],
    description:
      "Protect organizational assets by identifying and mitigating security threats and vulnerabilities.",
    // ... other fields
  },
];
// ... rest of the component ...
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
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="col-span-1">
          <JobList jobs={mockJobs} />
        </div>
        <div className="col-span-2">
          {/* <JobDetail job={mockJobs[0]} /> */}
        </div>
      </div>
    </>
  );
}

export default PageClient;
