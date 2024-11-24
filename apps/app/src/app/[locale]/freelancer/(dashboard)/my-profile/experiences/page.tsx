import ExperienceCard from "@/components/profile/experiences/experience-card";
import { getFreelancerExperiences } from "@gigflow/supabase/cached-queries";
import { Badge } from "@gigflow/ui/badge";
import { Button } from "@gigflow/ui/button";
import { Icons } from "@gigflow/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { ExperiencesEmptyState } from "./empty-state";

export const metadata = {
  title: "My Profile | Gigflow",
};

export default async function MyProfile({
  searchParams,
}: { searchParams: { freelancerId: string } }) {
  const experiences = await getFreelancerExperiences();
  return <ProfileSection experiences={experiences} />;
}

const ProfileSection = ({ experiences }) => {
  return (
    <main className="flex-1">
      <AddExperienceSection />
      {experiences.length > 0 ? (
        <ProjectsList experiences={experiences} />
      ) : (
        <ExperiencesEmptyState />
      )}
    </main>
  );
};

const AddExperienceSection = () => {
  return (
    <div
      className="grid grid-cols-[auto_1fr] grid-rows-[min-content] 
  w-full mx-auto bg-gray-50 gap-1 gap-x-3 p-4 rounded-[20px]
  [grid-template-areas:'button_title'_'description_description'_'links_links']
  xl:p-6 xl:gap-1 xl:gap-x-6
  xl:[grid-template-areas:'button_title'_'button_description'_'button_links']"
    >
      <Button
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 
    xl:w-12 xl:h-12 xl:mt-0.5 xl:[grid-area:button] xl:text-3xl"
        asChild
      >
        <Link href="/experiences/new">
          <Icons.Plus />
        </Link>
      </Button>
      <div className="[grid-area:title] self-center">
        <h2 className="text-xl font-semibold tracking-[-.25px] leading-[1.4]">
          Add a new experience
        </h2>
      </div>
      <p className="[grid-area:description] text-gray-500 text-base font-normal font-body leading-normal">
        Your experiences should highlight your best skills and projects.
      </p>
    </div>
  );
};

const ProjectsList = ({ experiences }) => {
  return (
    <div className="relative flex flex-col justify-center mt-10 mb-16 md:mb-0">
      {experiences.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
    </div>
  );
};
