"use client";

import { updateCompanySchema } from "@/actions/company/schema";
import { updateCompanyAction } from "@/actions/company/update-company-action";
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
import type { z } from "zod";

type Props = {
  defaultValues: z.infer<typeof updateCompanySchema>;
  onSuccess?: (companyId: string) => void;
};

export function CompanyUpdateForm({ defaultValues, onSuccess }: Props) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateCompanySchema>>({
    resolver: zodResolver(updateCompanySchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const updateAction = useAction(updateCompanyAction, {
    onSuccess: async ({ data }) => {
      await onSuccess?.(data?.id);
    },
    onError: () => {
      toast({
        duration: 3500,
        variant: "error",
        title: "Something went wrong please try again.",
      });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(updateAction.execute)}
        className={cn("flex flex-col space-y-6 text-left")}
      >
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  description
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
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  Logo
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
