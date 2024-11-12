"use client";

import {
  type updateUserAtCompanyFormValues,
  updateUserAtCompanySchema,
} from "@/actions/company/schema";
import { updateCompanyUserAction } from "@/actions/company/update-user-at-company-action";
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
import { Input } from "@gigflow/ui/input";
import { Textarea } from "@gigflow/ui/textarea";
import { useToast } from "@gigflow/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";

type Props = {
  defaultValues: updateUserAtCompanyFormValues;
  onSuccess?: () => void;
};

export function CompanyUserProfileUpdateForm({
  defaultValues,
  onSuccess,
}: Props) {
  const { toast } = useToast();

  const form = useForm<updateUserAtCompanyFormValues>({
    resolver: zodResolver(updateUserAtCompanySchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const updateAction = useAction(updateCompanyUserAction, {
    onSuccess: async () => {
      await onSuccess?.();
    },
    onError: () => {
      toast({
        duration: 3500,
        variant: "error",
        title: "Something went wrong please try again.",
      });
    },
  });
  console.log(form.formState.errors);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(updateAction.execute)}
        className={cn("flex flex-col space-y-6 text-left")}
      >
        <div className="mt-2 rounded-md shadow-sm">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  First Name
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
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  First Name
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  Title
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
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  Location
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
            name="linkedin_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  LinkedIn URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://linkedin.com/in/john-doe"
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
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input placeholder="New York, NY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" loading={updateAction.isExecuting}>
          Continue
        </Button>
      </form>
    </Form>
  );
}
