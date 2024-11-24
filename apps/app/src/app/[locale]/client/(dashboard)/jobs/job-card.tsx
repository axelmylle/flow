import { Badge } from "@gigflow/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@gigflow/ui/card";
import { formatDistance } from "date-fns";
import Link from "next/link";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    description: string;
    applicantsCount: number;
    createdAt: Date;
    status: "open" | "closed" | "draft";
  };
}

export function JobCard({ job }: JobCardProps) {
  const timeAgo = formatDistance(job.createdAt ?? new Date(), new Date(), {
    addSuffix: true,
  });

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-muted-foreground">{timeAgo}</p>
        </div>
        <Badge variant={job.status === "open" ? "success" : "secondary"}>
          {job.status}
        </Badge>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {job.description}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {job.applicantsCount} applicant
            {job.applicantsCount !== 1 ? "s" : ""}
          </span>
        </div>
        <Link
          href={`/client/jobs/${job.id}`}
          className="text-sm text-primary hover:underline"
        >
          View details →
        </Link>
      </CardFooter>
    </Card>
  );
}
