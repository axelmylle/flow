"use client";

import { createExperienceAction } from "@/actions/freelancer/experience/create-experience-action";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import ProjectDescriptionPage from "./project-description";

interface NewProjectDetailsPageProps {
  params: {
    locale: string;
  };
}

export default function NewProjectDetailsPage({
  params,
}: NewProjectDetailsPageProps) {
  const router = useRouter();

  const createExperience = useAction(createExperienceAction, {
    onSuccess: async () => router.push("/my-profile/experiences"),
  });

  return (
    <main className="">
      <ProjectDescriptionPage
        isSubmitting={createExperience.isPending}
        onSubmit={createExperience.execute}
      />
    </main>
  );
}
