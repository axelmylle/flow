"use client";

import { Button } from "@v1/ui/button";
import { cn } from "@v1/ui/cn";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@v1/ui/form";
import { useMediaQuery } from "@v1/ui/hooks";
import { Icons } from "@v1/ui/icons";
import { Input } from "@v1/ui/input";

import { useForm } from "react-hook-form";

type FormData = {
  headliner: string;
};

export function CreateHeadlinerForm({
  onSuccess,
  className,
}: {
  onSuccess?: (data: FormData) => void;
  className?: string;
}) {
  const form = useForm<FormData>();

  const { isMobile } = useMediaQuery();

  const handleSubmit = (data: FormData) => {
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
              name="headliner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Subject
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Summary of the problem you have"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" loading={false} text="Create workspace">
          Continue
        </Button>
      </form>
    </Form>
  );
}
