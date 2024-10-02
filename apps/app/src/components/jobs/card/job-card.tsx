import { Badge } from "@v1/ui/badge";
import { Button } from "@v1/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@v1/ui/card";
import { useMediaQuery } from "@v1/ui/hooks";
import { Icons } from "@v1/ui/icons";
import TagBadge from "../tag-badge";
// import { useContext } from "react";
// import { useAddEditLinkModal } from "../modals/add-edit-link-modal";
// import { LinkTitleColumn } from "./job-title-column";
// import { LinkDetailsColumn } from "./link-details-column";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchPercentage: number;

  postedDate: string;
  rate: string;
  description: string;
  duration: string;
  clientRating: number;
  clientIndustry: string;
  requiredSkills: string[];
  startDate: string;
  applicationDeadline: string;
  contractType: string;
}

export function JobCard({ job }: { job: Job }) {
  const { isMobile } = useMediaQuery();

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="relative">
      <Badge
        className={`absolute top-2 right-2 ${getMatchColor(job.matchPercentage)}`}
      >
        {job.matchPercentage}% Match
      </Badge>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription className="mt-1">{job.company}</CardDescription>
          </div>
          <Badge variant="default" className="text-xs">
            {job.contractType}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center">
            <Icons.MapPin className="mr-1 h-3 w-3" /> {job.location}
          </span>
          <span className="flex items-center">
            <Icons.DollarSign className="mr-1 h-3 w-3" /> {job.rate}
          </span>
          <span className="flex items-center">
            <Icons.Calendar className="mr-1 h-3 w-3" /> Start: {job.startDate}
          </span>
          <span className="flex items-center">
            <Icons.Clock className="mr-1 h-3 w-3" /> Posted: {job.postedDate}
          </span>
        </div>
        <p className="text-sm">{job.description}</p>
        <div className="flex flex-wrap gap-2">
          {job.requiredSkills.slice(0, 2).map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
          {job.requiredSkills.length > 2 && (
            <span className="text-xs text-muted-foreground self-center">
              +{job.requiredSkills.length - 2} more
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Icons.Star className="h-4 w-4 text-yellow-400" />
          <span>{job.clientRating.toFixed(1)}</span>
          <span className="text-muted-foreground">| {job.clientIndustry}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Apply Now</Button>
      </CardFooter>
    </Card>
  );
}
