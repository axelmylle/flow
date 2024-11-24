import { SkillAssessmentForm } from "@/components/skill-assessments/forms/skill-assessment-form";
import {
  getSkillById,
  getSkillQuestionsBySkillId,
} from "@gigflow/supabase/cached-queries";
import { Button } from "@gigflow/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@gigflow/ui/card";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Skill Assessment | Gigflow",
};

export default async function SkillAssessmentPage({
  params,
}: { params: { skillId: string } }) {
  const questions = await getSkillQuestionsBySkillId(params.skillId);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6"> Assessment</h1>

      <SkillAssessmentForm questions={questions} />
    </div>
  );
}
