import { Card, CardContent } from "@v1/ui/card";
import { Progress } from "@v1/ui/progress";
import { Database, Palette } from "lucide-react";

export function SkillsProgressCard() {
  return (
    <Card className="rounded-md text-xs shadow-sm">
      <CardContent className="flex items-start gap-2.5 p-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
          <Palette className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="grid flex-1 gap-1">
          <p className="font-medium">Verified Skills</p>
          <p className="text-muted-foreground">9 / 11 skills</p>
          <Progress
            value={79.2}
            className="mt-1"
            aria-label="79.2 GB / 100 GB used"
          />
        </div>
      </CardContent>
    </Card>
  );
}
