import { Badge } from "@gigflow/ui/badge";
import { Button } from "@gigflow/ui/button";
import { Card, CardContent, CardFooter } from "@gigflow/ui/card";
import { Icons } from "@gigflow/ui/icons";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchPercentage: number;
  postedDate: string;
  contractType: string;
}

export function JobCard({ job }: { job: Job }) {
  return (
    <Card className="relative">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            <Badge variant="secondary" className="text-xs">
              Posted {job.postedDate}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Icons.MapPin className="mr-1 h-3 w-3" /> {job.location}
            </span>
            <span className="flex items-center">
              <Icons.DollarSign className="mr-1 h-3 w-3" /> {job.salary}
            </span>
            <span className="flex items-center">
              <Icons.Clock className="mr-1 h-3 w-3" /> {job.contractType}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <Badge variant="default" className="mr-2">
            {job.matchPercentage}% Match
          </Badge>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/jobs/${job.id}`}>View job posting</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
