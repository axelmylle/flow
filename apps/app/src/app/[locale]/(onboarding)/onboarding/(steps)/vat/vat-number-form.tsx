"use client";

import { updateFreelancerAction } from "@/actions/freelancer/update-freelancer-action";
import { Button } from "@gigflow/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@gigflow/ui/form";
import { Input } from "@gigflow/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useOnboardingProgress } from "../../use-onboarding-progress";

const vatSchema = z.object({
  vat_number: z.string().optional().nullable(),
});

export function VatNumberForm() {
  const { continueTo } = useOnboardingProgress();
  const action = useAction(updateFreelancerAction);
  const form = useForm<z.infer<typeof vatSchema>>({
    resolver: zodResolver(vatSchema),
    defaultValues: {
      vat_number: null,
    },
  });

  const onSubmit = async (data: z.infer<typeof vatSchema>) => {
    await action.execute({
      vat_number: data.vat_number,
    });
    // Continue to the next step
    continueTo("completed");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="vat_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>VAT Number (optional)</FormLabel>
              <Input placeholder="Enter your VAT number" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              continueTo("completed");
            }}
          >
            Skip
          </Button>
          <Button type="submit" variant="default">
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
}
