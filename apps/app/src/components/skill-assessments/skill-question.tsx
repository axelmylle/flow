import { Card, CardContent, CardHeader, CardTitle } from "@v1/ui/card";
import { Label } from "@v1/ui/label";
import { RadioGroup, RadioGroupItem } from "@v1/ui/radio-group";

type QuestionProps = {
  question: {
    id: string;
    content: string;
    type: "multiple_choice" | "yes_no";
    options: { id: string; content: string }[];
  };
  register: any;
  currentAnswer: string;
};

export function QuestionCard({
  question,
  register,
  currentAnswer,
}: QuestionProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{question.content}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* {question.type === "multiple_choice" && (
          <RadioGroup value={currentAnswer}>
            {question.options.map((option) => (
              <div className="flex items-center space-x-2" key={option.id}>
                <RadioGroupItem
                  value={option.id}
                  id={option.id}
                  {...register(`question_${question.id}`)}
                />
                <Label htmlFor={option.id}>{option.content}</Label>
              </div>
            ))}
          </RadioGroup>
        )} */}
        {question.type === "yes_no" && (
          <div className="flex items-center space-x-2">
            <RadioGroup value={currentAnswer}>
              <RadioGroupItem
                value="true"
                id="true"
                {...register(`question_${question.id}`)}
              />
              <RadioGroupItem
                value="false"
                id="false"
                {...register(`question_${question.id}`)}
              />
            </RadioGroup>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
