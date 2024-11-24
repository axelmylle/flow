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
import { Input } from "@gigflow/ui/input";
import { useAction } from "next-safe-action/hooks";

import { useForm } from "react-hook-form";

type FormData = {
  headline: string;
};

export function CreateHeadlinerForm({
  onSuccess,
  className,
}: {
  onSuccess?: (data: FormData) => void;
  className?: string;
}) {
  const form = useForm<FormData>();
  const action = useAction(updateFreelancerAction);

  const { isMobile } = useMediaQuery();

  const handleSubmit = async (data: FormData) => {
    await action.execute({
      headline: data?.headline,
    });
    onSuccess?.(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("flex flex-col space-y-6 text-left", className)}
      >
        <div>
          <div className="mt-2  rounded-md shadow-sm">
            <FormField
              control={form.control}
              name="headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Add up to 3 titles
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="frontend developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" loading={action.isExecuting}>
          Continue
        </Button>
      </form>
    </Form>
  );
}
