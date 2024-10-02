"use client";

import { JobCard } from "@/components/jobs/card/job-card";
import { CardList } from "@v1/ui/card-list";

interface Job {
  id: string;
  title: string;
  company: string;
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

export function JobList({ jobs }: { jobs: Job[] }) {
  return (
    <CardList>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </CardList>
  );
}
