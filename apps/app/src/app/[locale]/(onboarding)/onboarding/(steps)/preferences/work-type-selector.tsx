"use client";

import { updateFreelancerAction } from "@/actions/freelancer/update-freelancer-action";
import { Button } from "@gigflow/ui/button";
import { cn } from "@gigflow/ui/cn";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@gigflow/ui/form";
import { useMediaQuery } from "@gigflow/ui/hooks";
import { Icons } from "@gigflow/ui/icons";
import { RadioGroup, RadioGroupItem } from "@gigflow/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@gigflow/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LaterButton } from "../../later-button";
import { useOnboardingProgress } from "../../use-onboarding-progress";

const formSchema = z.object({
  workType: z.enum(["remote", "hybrid"]),
  officeDays: z
    .string()
    .optional()
    .refine((val) => !val || (Number(val) >= 1 && Number(val) <= 5), {
      message: "Office days must be between 1 and 5",
    }),
});

export function WorkTypeSelector() {
  const { continueTo, isLoading, isSuccessful } = useOnboardingProgress();

  const action = useAction(updateFreelancerAction);

  const { isMobile } = useMediaQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workType: undefined,
      officeDays: undefined,
    },
  });

  const watchWorkType = form.watch("workType");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await action.execute({
      preferred_work_style: values.workType,
      office_days: values.workType === "hybrid" ? values.officeDays : null,
    });

    continueTo("vat");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mx-auto w-full max-w-[312px]">
          <FormField
            control={form.control}
            name="workType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select your preferred work type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-4"
                  >
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem
                          value="remote"
                          className="sr-only"
                          id="remote"
                        />
                      </FormControl>
                      <FormLabel htmlFor="remote">
                        <WorkRemoteOption
                          isSelected={field.value === "remote"}
                          onClick={() => form.setValue("workType", "remote")}
                        />
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem
                          value="hybrid"
                          className="sr-only"
                          id="hybrid"
                        />
                      </FormControl>
                      <FormLabel htmlFor="hybrid">
                        <HybridOption
                          isSelected={field.value === "hybrid"}
                          onClick={() => form.setValue("workType", "hybrid")}
                        />
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {watchWorkType === "hybrid" && (
          <FormField
            control={form.control}
            name="officeDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  How many days do you prefer to work at the office?
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of days" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day} {day === 1 ? "day" : "days"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div>
          <Button
            type="submit"
            variant="default"
            loading={isLoading || isSuccessful}
          >
            Continue
          </Button>
          <LaterButton next="skills" className="mt-4" />
        </div>
      </form>
    </Form>
  );
}

function WorkRemoteOption({
  onClick,
  isSelected,
}: {
  title: string;
  example: string;
  onClick: () => void;
  isSelected: boolean;
}) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "transition-border relative flex flex-col gap-2 rounded-lg border border-gray-300 px-10 py-9",
        isSelected && "border-2 border-black bg-black/[0.03]",
      )}
      role="button"
      onClick={onClick}
      aria-selected={isSelected}
    >
      {isSelected && (
        <Icons.CheckCircleFill className="absolute left-2 top-2 size-5 text-black" />
      )}
      <div className="flex w-full flex-col gap-2 rounded-md border border-gray-300 bg-gray-100 p-2 [mask-image:linear-gradient(to_bottom,black_50%,transparent_95%)]">
        <div className="relative rounded border-gray-200 bg-white px-2 py-1.5 text-center text-sm font-medium text-gray-800">
          <Icons.Laptop className="absolute left-2 top-1/2 size-4 -translate-y-1/2" />
          Remote Work
        </div>
        <div className="overflow-hidden rounded border border-gray-300">
          <div className="aspect-[1.9/1] w-full overflow-hidden bg-gray-200 p-2">
            <div className="flex h-full flex-col items-center justify-center space-y-2">
              <Icons.Clock className="size-6 text-gray-500" />
              <span className="text-xs text-gray-600">Remote work</span>
            </div>
          </div>
        </div>
      </div>
      <span className="text-center text-sm font-medium text-gray-800">
        Work from anywhere, anytime
      </span>
    </div>
  );
}

function HybridOption({
  onClick,
  isSelected,
}: {
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <div
      className={cn(
        "transition-border relative flex flex-col gap-2 rounded-lg border border-gray-300 px-10 py-9",
        isSelected && "border-2 border-black bg-black/[0.03]",
      )}
      role="button"
      onClick={onClick}
      aria-selected={isSelected}
    >
      {isSelected && (
        <Icons.CheckCircleFill className="absolute left-2 top-2 size-5 text-black" />
      )}
      <div className="flex w-full flex-col gap-2 rounded-md border border-gray-300 bg-gray-100 p-2 [mask-image:linear-gradient(to_bottom,black_50%,transparent_95%)]">
        <div className="relative rounded border-gray-200 bg-white px-2 py-1.5 text-center text-sm font-medium text-gray-800">
          <Icons.Building className="absolute left-2 top-1/2 size-4 -translate-y-1/2" />
          Hybrid Work
        </div>
        <div className="overflow-hidden rounded border border-gray-300">
          <div className="aspect-[1.9/1] w-full overflow-hidden bg-gray-200 p-2">
            <div className="flex h-full flex-col items-center justify-center space-y-2">
              <Icons.Calendar className="size-6 text-gray-500" />
              <span className="text-xs text-gray-600">Office & Remote</span>
            </div>
          </div>
        </div>
      </div>
      <span className="text-center text-sm font-medium text-gray-800">
        Mix of office and remote work
      </span>
    </div>
  );
}
