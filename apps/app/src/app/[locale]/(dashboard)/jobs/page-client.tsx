"use client";

import { SearchBoxPersisted } from "@/components/shared/search-box";
import { Filter } from "@v1/ui/filter";
import { MaxWidthWrapper } from "@v1/ui/max-width-wrapper";

import { useLinkFilters } from "@/components/jobs/use-job-filters";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { useRouter } from "next/navigation";
import React from "react";
import { JobList } from "./list";
// ... existing imports ...

export const mockJobs = [
  {
    id: "1",
    title: "Senior Full Stack Developer",
    company: "TechBrussels",
    location: "Brussels, Belgium (Hybrid)",
    salary: "€70,000 - €90,000 per year",
    rate: "€500 - €600 per day",
    postedDate: "2023-07-01",
    description:
      "Seeking an experienced full stack developer to work on our flagship SaaS product. Strong skills in React, Node.js, and AWS required.",
    duration: "Long-term contract",
    clientRating: 4.8,
    clientIndustry: "Software Development",
    requiredSkills: ["React", "Node.js", "AWS", "TypeScript", "MongoDB"],
    startDate: "2023-08-01",
    applicationDeadline: "2023-07-15",
    contractType: "Full-time",
    matchPercentage: 80,
  },
  {
    id: "2",
    title: "DevOps Engineer",
    company: "AntwerpIT Solutions",
    location: "Antwerp, Belgium (Remote)",
    salary: "€65,000 - €85,000 per year",
    rate: "€450 - €550 per day",
    postedDate: "2023-06-28",
    description:
      "Join our DevOps team to streamline our CI/CD pipelines and manage cloud infrastructure. Experience with Kubernetes and Azure is a must.",
    duration: "Permanent",
    clientRating: 4.6,
    clientIndustry: "Cloud Services",
    requiredSkills: ["Kubernetes", "Azure", "Docker", "Jenkins", "Terraform"],
    startDate: "2023-08-15",
    applicationDeadline: "2023-07-20",
    contractType: "Full-time",
    matchPercentage: 90,
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "GhentAI",
    location: "Ghent, Belgium (On-site)",
    salary: "€60,000 - €80,000 per year",
    rate: "€400 - €500 per day",
    postedDate: "2023-06-30",
    description:
      "Looking for a data scientist to work on cutting-edge AI projects. Strong background in machine learning and statistical analysis required.",
    duration: "Initial 1-year contract",
    clientRating: 4.9,
    clientIndustry: "Artificial Intelligence",
    requiredSkills: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "SQL",
      "Data Visualization",
    ],
    startDate: "2023-09-01",
    applicationDeadline: "2023-07-25",
    contractType: "Full-time",
    matchPercentage: 50,
  },
  {
    id: "4",
    title: "Frontend Developer",
    company: "LeuvenTech",
    location: "Leuven, Belgium (Flexible)",
    salary: "€45,000 - €65,000 per year",
    rate: "€350 - €450 per day",
    postedDate: "2023-07-02",
    description:
      "Seeking a creative frontend developer to work on responsive web applications. Experience with modern JavaScript frameworks is essential.",
    duration: "Long-term contract",
    clientRating: 4.7,
    clientIndustry: "Web Development",
    requiredSkills: ["React", "Vue.js", "CSS3", "HTML5", "JavaScript"],
    startDate: "2023-08-15",
    applicationDeadline: "2023-07-30",
    contractType: "Full-time",
    matchPercentage: 80,
  },
  {
    id: "5",
    title: "Cybersecurity Specialist",
    company: "BruggeSecure",
    location: "Bruges, Belgium (Hybrid)",
    salary: "€70,000 - €95,000 per year",
    rate: "€500 - €650 per day",
    postedDate: "2023-06-29",
    description:
      "Join our team to enhance and maintain our clients' cybersecurity infrastructure. CISSP certification and experience in penetration testing required.",
    duration: "Permanent",
    clientRating: 4.8,
    clientIndustry: "Cybersecurity",
    requiredSkills: [
      "Network Security",
      "CISSP",
      "Penetration Testing",
      "Incident Response",
      "Security Auditing",
    ],
    startDate: "2023-09-01",
    applicationDeadline: "2023-07-31",
    contractType: "Full-time",
    matchPercentage: 40,
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
      <div className="mt-10 flex w-full items-center pt-3">
        <MaxWidthWrapper className="flex flex-col gap-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 md:flex-nowrap">
            <h1 className="order-1 text-2xl font-semibold tracking-tight text-black">
              Jobs
            </h1>
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
        </MaxWidthWrapper>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
          <JobList jobs={mockJobs} />
        </div>
        {/* <div className="col-span-2">
          <JobList jobs={mockJobs} />
        </div> */}
      </div>
    </>
  );
}

export default PageClient;
