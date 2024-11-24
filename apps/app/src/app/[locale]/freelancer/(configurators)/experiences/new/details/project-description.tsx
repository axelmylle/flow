"use client";

import type { CreateExperienceFormValues } from "@/actions/freelancer/experience/schema";
import { useUpload } from "@/hooks/use-upload";
import { Alert, AlertDescription, AlertTitle } from "@gigflow/ui/alert";
import { Button } from "@gigflow/ui/button";
import { Card, CardContent } from "@gigflow/ui/card";
import { FileUpload } from "@gigflow/ui/file-upload";
import { Form, FormField, FormItem, FormLabel } from "@gigflow/ui/form";
import { Icons } from "@gigflow/ui/icons";
import { Label } from "@gigflow/ui/label";
import { Skeleton } from "@gigflow/ui/skeleton";
import { SubmitButton } from "@gigflow/ui/submit-button";
import { Textarea } from "@gigflow/ui/textarea";
import { toast } from "@gigflow/ui/use-toast";
import { resizeImage } from "@gigflow/utils/images";
import Image from "next/image";
import { useState } from "react";
import { type SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { useExperienceForm } from "../experience-form-context";

type ProjectDescriptionPageProps = {
  onSubmit: SubmitHandler<CreateExperienceFormValues>;
  isSubmitting: boolean;
};

export default function ProjectDescriptionPage({
  onSubmit,
  isSubmitting,
}: ProjectDescriptionPageProps) {
  return (
    <div className="md:border-t md:border-gray-300 md:flex-1 md:flex md:flex-col">
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8">
        <div
          className="grid flex-1 
        grid-cols-1 grid-rows-[auto_1fr] grid-areas-[Details_Preview]
        md:gap-x-8 md:grid-cols-[380px_1fr] md:grid-areas-[Details_Preview]
        xl:grid-cols-[440px_1fr]"
        >
          <div
            className="grid-in-[Details] pt-4 pb-8
          md:border-r md:border-gray-300 md:pr-[31px]"
          >
            <ExperienceDetailForm
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
            />
          </div>

          <div className="grid-in-[Preview] pt-16 relative">
            {/* Preview content */}
            <div className="absolute top-0 right-0 text-muted-foreground pointer-events-none select-none hidden md:flex md:items-center">
              <Icons.ThreeDots className="size-4" />
            </div>
            <Card>
              <CardContent className="py-6">
                <ProjectCardSkeleton />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

const ExperienceDetailForm = ({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: SubmitHandler<CreateExperienceFormValues>;
  isSubmitting: boolean;
}) => {
  const form = useFormContext<CreateExperienceFormValues>();
  const { uploadFile } = useUpload();
  const handleUpload = async (file: File) => {
    if (file) {
      console.log("file", file);
      try {
        const { url } = await uploadFile({
          file,
          path: ["experiences", file.name],
          bucket: "experiences",
        });

        form.setValue("thumbnail_url", url, { shouldValidate: true });
      } catch (error) {
        console.error(error);
        toast({
          title: "Something went wrong, please try again.",
          variant: "error",
        });
      }
    }
  };

  const [resizing, setResizing] = useState(false);
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="">
      <p className="text-sm text-muted-foreground leading-[1.42] tracking-[0.15px]">
        Customize and preview how this project will appear on your profile page.
      </p>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Description</FormLabel>
            <Textarea
              placeholder="Add a description to your project"
              className="h-20"
              {...field}
            />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="thumbnail_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cover Image</FormLabel>
            <FileUpload
              accept="images"
              variant="default"
              imageSrc={field.value}
              readFile
              onChange={({ file }) => handleUpload(file)}
              maxFileSizeMB={2}
              loading={resizing}
              clickToUpload={true}
              showHoverOverlay={true}
              accessibilityLabel="OG image upload"
              className="mt-2 rounded-lg"
              content={
                <>
                  <p>Drag and drop or click to upload.</p>
                  <p className="mt-1">Recommended: 1200 x 630 pixels</p>
                </>
              }
            />
          </FormItem>
        )}
      />
      <SubmitButton isSubmitting={isSubmitting}>Create Experience</SubmitButton>
    </form>
  );
};

const ProjectCardSkeleton = () => {
  const form = useFormContext<CreateExperienceFormValues>();

  const title = form.watch("title");
  const company = form.watch("company");
  const description = form.watch("description");
  const thumbnail_url = form.watch("thumbnail_url");

  return (
    <div>
      <div
        className="grid grid-flow-row rounded-[10px] bg-white
    [grid-template-areas:'cardImage'_'cardContent'_'cardTags'_'cardActions'] [grid-template-columns:auto]
    md:[grid-template-areas:'cardDragIcon_cardImage_cardContent_cardContent'_'._cardTags_cardTags_cardActions']
    md:[grid-template-columns:auto_264px_1fr_auto]"
      >
        <div className="[grid-area:cardImage] md:mr-5">
          <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden">
            {thumbnail_url ? (
              <Image src={thumbnail_url} alt="thumbnail" fill />
            ) : (
              <Skeleton className="absolute inset-0" />
            )}
          </div>
        </div>
        <div className="[grid-area:cardContent] flex flex-col gap-2">
          <div>
            {title ?? <Skeleton className="h-6 w-48 mb-4 rounded-md" />}
          </div>
          {description ?? <Skeleton className="h-4 w-20 rounded-md" />}
          <Skeleton className="h-4 w-62 rounded-md" />
        </div>
      </div>
    </div>
  );
};
