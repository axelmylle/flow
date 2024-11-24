"use client";

import { updateUserAction } from "@/actions/user/update-user-action";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@gigflow/ui/alert-dialog";
import { Badge } from "@gigflow/ui/badge";
import { Button } from "@gigflow/ui/button";
import { Calendar } from "@gigflow/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@gigflow/ui/form";
import { useToast } from "@gigflow/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMonths, format } from "date-fns";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  availableDates: z.array(z.date()),
  is_available: z.boolean(),
});

type AvailabilityFormValues = z.infer<typeof formSchema>;

interface AvailabilityCalendarProps {
  defaultValues?: AvailabilityFormValues;
}

export function AvailabilityCalendar({
  defaultValues,
}: AvailabilityCalendarProps) {
  const { toast } = useToast();
  const form = useForm<AvailabilityFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      availableDates: [],
      is_available: true,
    },
  });

  const updateUser = useAction(updateUserAction, {
    onSuccess: () => {
      toast({
        duration: 3500,
        variant: "success",
        title: "Availability updated successfully.",
      });
    },
    onError: () => {
      toast({
        duration: 3500,
        variant: "error",
        title: "Failed to update availability. Please try again.",
      });
    },
  });

  const handleSubmit = async (data: AvailabilityFormValues) => {
    await updateUser.execute(data);
  };

  const selectedDates = form.watch("availableDates");
  const isAvailable = form.watch("is_available");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="p-0">
          <Badge variant={isAvailable ? "rainbow" : "gray"}>
            {isAvailable ? "Available" : "Unavailable"}
          </Badge>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Set your availability</AlertDialogTitle>
          <AlertDialogDescription>
            Select the dates when you're available for work. This helps clients
            find the right time to work with you.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="is_available"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Button
                      type="button"
                      variant={field.value ? "default" : "outline"}
                      className="w-full"
                      onClick={() => field.onChange(!field.value)}
                    >
                      {field.value ? "I'm available" : "I'm unavailable"}
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="availableDates"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Calendar
                      mode="range"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      numberOfMonths={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <AlertDialogTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </AlertDialogTrigger>
              <Button type="submit" disabled={updateUser.isExecuting}>
                {updateUser.isExecuting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
