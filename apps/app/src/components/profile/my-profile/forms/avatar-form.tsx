"use client";

import { updateUserAction } from "@/actions/user/update-user-action";
import { useUpload } from "@/hooks/use-upload";
import { Button } from "@gigflow/ui/button";
import { FileUpload } from "@gigflow/ui/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@gigflow/ui/form";
import { useToast } from "@gigflow/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  avatar_url: z.string().min(1, "Avatar is required"),
});

type AvatarFormValues = z.infer<typeof formSchema>;

export function AvatarForm({
  defaultValues,
}: {
  defaultValues: AvatarFormValues;
}) {
  const { toast } = useToast();
  const { uploadFile, isLoading } = useUpload();

  const form = useForm<AvatarFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar_url: defaultValues.avatar_url,
    },
  });

  console.log(form.watch("avatar_url"));

  const updateUser = useAction(updateUserAction, {
    onSuccess: () => {
      toast({
        duration: 3500,
        variant: "success",
        title: "Avatar updated successfully.",
      });
    },
    onError: () => {
      toast({
        duration: 3500,
        variant: "error",
        title: "Failed to update avatar. Please try again.",
      });
    },
  });

  const handleFileUpload = async ({ file }: { file: File }) => {
    try {
      const { url } = await uploadFile({
        file,
        path: ["avatars", file.name],
        bucket: "avatars",
      });

      form.setValue("avatar_url", url);
    } catch (error) {
      toast({
        duration: 3500,
        variant: "error",
        title: "Failed to upload image. Please try again.",
      });
    }
  };

  const handleSubmit = async (data: AvatarFormValues) => {
    await updateUser.execute(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="avatar_url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* <FileUpload
                  accept="image"
                  maxFileSizeMB={5}
                  loading={isLoading}
                  imageSrc={field.value}
                  onChange={({ file }) => handleFileUpload({ file })}
                  className="aspect-square h-44 w-44 rounded-full"
                  previewClassName="object-cover"
                /> */}

                <FileUpload
                  accept="images"
                  variant="plain"
                  imageSrc={field.value}
                  readFile
                  onChange={({ file }) => handleFileUpload({ file })}
                  maxFileSizeMB={2}
                  loading={isLoading}
                  clickToUpload={true}
                  showHoverOverlay={true}
                  previewClassName="aspect-square h-44 w-44 rounded-full"
                  accessibilityLabel="OG image upload"
                  className="aspect-square h-44 w-44 rounded-full"
                  content={
                    <>
                      <p>Drag and drop or click to upload.</p>
                    </>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
