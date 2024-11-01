"use client";

import type { updateCompanyFormValues } from "@/actions/company/schema";
import { updateCompanyAction } from "@/actions/company/update-company-action";
import { updateFreelancerAction } from "@/actions/freelancer/update-freelancer-action";
import type { UpdateUserFormValues } from "@/actions/user/schema";
import { updateUserAction } from "@/actions/user/update-user-action";
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
import { Textarea } from "@v1/ui/textarea";
import { useAction } from "next-safe-action/hooks";

import { useForm } from "react-hook-form";

type FormData = updateCompanyFormValues;

export function ClientInformationForm({
  onSuccess,
  className,
}: {
  onSuccess?: (data: FormData) => void;
  className?: string;
}) {
  const form = useForm<FormData>();
  const action = useAction(updateCompanyAction);

  const { isMobile } = useMediaQuery();

  const handleSubmit = async (data: FormData) => {
    await action.execute({
      ...data,
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
          <div className="mt-2 rounded-md shadow-sm">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-2 rounded-md shadow-sm">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What does your company do?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-2 rounded-md shadow-sm">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Website
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://acme.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-2 rounded-md shadow-sm">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="New York, NY" {...field} />
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
