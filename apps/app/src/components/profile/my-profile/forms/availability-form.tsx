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
  is_available: z.boolean(),
  available_until: z.date().optional(),
});

type AvailabilityFormValues = z.infer<typeof formSchema>;

export function AvailabilityForm({
  defaultValues,
}: {
  defaultValues: AvailabilityFormValues;
}) {
  const { toast } = useToast();
  const form = useForm<AvailabilityFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
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

  const currentAvailability = form.watch("is_available");
  const availableUntil = form.watch("available_until");

  const handleSetAvailabilityDate = (field: any) => {
    const nextMonth = addMonths(new Date(), 1);
    field.onChange(nextMonth);
  };

  const getAvailabilityText = () => {
    if (!availableUntil)
      return currentAvailability ? "Available" : "Unavailable";

    const dateStr = format(availableUntil, "MMM d, yyyy");
    return currentAvailability
      ? `Available until ${dateStr}`
      : `Unavailable until ${dateStr}`;
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="p-0">
          <Badge variant={currentAvailability ? "rainbow" : "gray"}>
            {getAvailabilityText()}
          </Badge>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Set your availability</AlertDialogTitle>
          <AlertDialogDescription>
            When you're available, clients are more likely to discover and reach
            out to you.
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
              name="available_until"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => handleSetAvailabilityDate(field)}
                    >
                      {field.value ? (
                        <>
                          {currentAvailability ? "Available" : "Unavailable"}{" "}
                          until {format(field.value, "MMM d, yyyy")}
                        </>
                      ) : (
                        <>
                          Set{" "}
                          {currentAvailability ? "available" : "unavailable"}{" "}
                          until{" "}
                          {format(addMonths(new Date(), 1), "MMM d, yyyy")}
                        </>
                      )}
                    </Button>
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
