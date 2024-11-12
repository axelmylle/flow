"use client";

import { updateUserAction } from "@/actions/user/update-user-action";
import { Button } from "@gigflow/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@gigflow/ui/form";
import { Input } from "@gigflow/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

type FullNameFormValues = z.infer<typeof formSchema>;

export function FullNameForm({
  defaultValues,
  onCancel,
  onSubmit,
}: {
  defaultValues: FullNameFormValues;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  const form = useForm<FullNameFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: defaultValues.firstName,
      lastName: defaultValues.lastName,
    },
  });

  const updateUser = useAction(updateUserAction, {
    onSuccess: () => onSubmit(),
  });

  const handleSubmit = async (data: FullNameFormValues) => {
    await updateUser.execute(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John"
                    className="text-xl p-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Mylle"
                    className="text-xl p-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button onClick={onCancel} variant="outline" type="button">
            Cancel
          </Button>
          <Button disabled={updateUser.isExecuting} type="submit">
            {updateUser.isExecuting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
