import { Badge } from "@gigflow/ui/badge";
import { Button } from "@gigflow/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@gigflow/ui/card";
import { cn } from "@gigflow/ui/cn";
import { Icons } from "@gigflow/ui/icons";
import Link from "next/link";

interface JobMatchCardProps {
  userName: string;
  matchedJobsCount: number;
  skills: string[];
}

export function JobMatchCard({
  userName,
  matchedJobsCount,
  skills,
}: JobMatchCardProps) {
  return (
    <Card className="w-full relative">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-blue-900">
          Your skills match {matchedJobsCount} open jobs, {userName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-blue-700 mb-4">
          Discover new companies and jobs that are just right for you and apply
          with your profile.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, index) => (
            <Badge key={index} variant="neutral">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/jobs">
            Find your next job
            <Icons.ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
