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
