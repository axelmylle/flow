import { PageContent } from "@/components/layout/page-content";
import { Avatar, AvatarFallback, AvatarImage } from "@gigflow/ui/avatar";
import { Badge } from "@gigflow/ui/badge";
import { Button } from "@gigflow/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@gigflow/ui/card";
import { Icons } from "@gigflow/ui/icons";
import { MaxWidthWrapper } from "@gigflow/ui/max-width-wrapper";
import { Skeleton } from "@gigflow/ui/skeleton";
import { TabSelect } from "@gigflow/ui/tab-select";
import Image from "next/image";
import { Suspense } from "react";
import MyProfileHeader from "./header";
import PageClient from "./page-client";

export const metadata = {
  title: "My Profile | Gigflow",
};

export default async function MyProfile() {
  return <ProfileSection />;
}

const ProfileSideBarAvatar = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-[1fr_16px_auto] gap-0 w-full">
      <div className="flex justify-center items-center col-start-1 col-end-2 row-start-1 row-end-3">
        <Avatar className="size-44">
          <AvatarImage src="https://cdn-engine.midday.ai/default.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="col-start-1 col-end-2 row-start-2 row-end-4 z-10 mx-auto">
        <Badge variant="rainbow">Unavailable</Badge>
      </div>
    </div>
  );
};

const ProfileHeader = () => {
  return <div className="font-bold text-4xl">ProfileHeader</div>;
};

const ProfileNavigationHeader = () => {
  return <MyProfileHeader />;
};

const ProfileSection = () => {
  return (
    <main className="flex-1">
      <AddAProjectSection />
      <ProjectsList />
    </main>
  );
};

const AddAProjectSection = () => {
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
      >
        <Icons.Plus />
      </Button>
      <div className="[grid-area:title] self-center">
        <h2 className="text-xl font-semibold tracking-[-.25px] leading-[1.4]">
          Add a project
        </h2>
      </div>
      <p className="[grid-area:description] text-gray-500 text-base font-normal font-body leading-normal">
        Your projects should highlight your best skills and experience.
      </p>
    </div>
  );
};

const ProjectsList = () => {
  return (
    <div className="relative flex flex-col justify-center mt-10 mb-16 md:mb-0">
      <ProjectCard key={1} />
      <ProjectCard key={2} />
      <ProjectCard key={3} />
    </div>
  );
};

const ProjectCard = () => {
  return (
    <div>
      <div
        className="grid grid-flow-row gap-y-4 mb-8 rounded-[10px] bg-white
  [grid-template-areas:'cardImage'_'cardContent'_'cardTags'_'cardActions'] [grid-template-columns:auto]
  md:mb-10 md:gap-y-6
  md:[grid-template-areas:'cardDragIcon_cardImage_cardContent_cardContent'_'._cardTags_cardTags_cardActions']
  md:[grid-template-columns:auto_264px_1fr_auto]"
      >
        <div className="[grid-area:cardDragIcon] mr-1">
          <Icons.DragIndicator />
        </div>
        <div className="[grid-area:cardImage] md:mr-5">
          <div className="relative aspect-[4/3] w-full rounded-[10px] overflow-hidden">
            <Image
              src="https://builds.contra.com/8ecf88a5/assets/static/SHAPE_COINS_DARK-2x.BTqkJL-v.webp"
              alt="project cover"
              fill
              sizes="(max-width: 768px) 100vw, 264px"
              className="object-cover"
              priority={false}
            />
          </div>
        </div>
        <div className="[grid-area:cardContent] flex flex-col gap-2">
          <div>badge</div>
          <h2 className="text-xl font-semibold tracking-[-.25px] leading-[1.4]">
            badge
          </h2>
          <div className="text-[#4A5264] break-words xl:line-clamp-2">
            Axèl designed and developed a sleek, responsive portfolio website
            that showcased their ability t
          </div>
        </div>
        <div className="[grid-area:cardTags] flex items-center flex-wrap gap-2">
          <Badge>badge</Badge>
          <Badge>badge</Badge>
        </div>
        <div className="[grid-area:cardActions] flex items-center justify-start md:justify-end gap-2">
          <Button>Edit</Button>
          <Button variant="outline">Delete</Button>
        </div>
      </div>
    </div>
  );
};
