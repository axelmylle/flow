import { SkillAssessmentForm } from "@/components/skill-assessments/forms/skill-assessment-form";
import {
  getSkillById,
  getSkillQuestionsBySkillId,
} from "@v1/supabase/cached-queries";
import { Button } from "@v1/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@v1/ui/card";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Skill Assessment | Gigflow",
};

export default async function SkillAssessmentPage({
  params,
}: { params: { skillId: string } }) {
  const questions = await getSkillQuestionsBySkillId(params.skillId);
  console.log(questions);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6"> Assessment</h1>

      <SkillAssessmentForm questions={questions} />
    </div>
  );
}
