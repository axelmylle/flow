import { getSkillById } from "@gigflow/supabase/cached-queries";
import { Button } from "@gigflow/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@gigflow/ui/card";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Skill Assessment | Gigflow",
};

export default async function SkillAssessmentPage({
  params,
}: { params: { skillId: string } }) {
  const skill = await getSkillById(params.skillId);

  if (!skill.data) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{skill.data?.name} Assessment</h1>
      <p className="mb-6">
        This assessment consists of the following topics. Click start when
        you're ready to begin.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {skill.data?.skill_topics.map((topic) => (
          <Card className="w-full" key={topic.id}>
            <CardHeader>
              <CardTitle>{topic.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div key={topic.id}>{topic.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button asChild>
        <Link href={`/skill-assessments/${skill.data?.id}/start`} prefetch>
          Start Assessment
        </Link>
      </Button>
    </div>
  );
}
