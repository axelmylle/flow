"use client";

import { Button } from "@gigflow/ui/button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { RadarChart } from "@/components/shared/charts/radar-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@gigflow/ui/card";
import { Progress } from "@gigflow/ui/progress";
import { QuestionCard } from "../skill-question";

type Question = {
  id: string;
  content: string;
  type: "multiple_choice" | "true_false";
  options: { id: string; content: string }[];
};

export function SkillAssessmentForm({ questions }: { questions: Question[] }) {
  console.log("questions", questions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { register, handleSubmit, watch } = useForm();

  const onSubmit = async (data) => {
    // Handle post-submission logic (e.g., show results, redirect)
    console.log(data);
  };

  const watchCurrentAnswer = watch(
    `question_${questions[currentQuestion]?.id}`,
  );

  return (
    <div className="grid grid-cols-3 gap-1">
      <form className="col-span-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <Progress value={currentQuestion + 1} max={questions.length} />
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>
        {questions.length > 0 && (
          <QuestionCard
            question={questions[currentQuestion]}
            register={register}
            currentAnswer={watchCurrentAnswer}
          />
        )}
        <div className="mt-6 flex justify-between">
          <Button
            type="button"
            onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          {currentQuestion < questions.length - 1 ? (
            <Button
              type="button"
              onClick={() =>
                setCurrentQuestion((prev) =>
                  Math.min(questions.length - 1, prev + 1),
                )
              }
            >
              Next
            </Button>
          ) : (
            <Button type="submit">Submit Assessment</Button>
          )}
        </div>
      </form>
      <div className="col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Assessment Results</CardTitle>
            <CardDescription>
              Your assessment results will be displayed here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadarChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
