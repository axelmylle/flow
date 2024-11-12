import { NewExperienceForm } from "@/components/profile/experiences/new-experience-form";

interface ProjectPageProps {
  params: {
    locale: string;
  };
}

export default function NewProjectPage({ params }: ProjectPageProps) {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <NewExperienceForm />
    </main>
  );
}
