"use client";

import type { Database } from "@gigflow/supabase/types";
import { Badge } from "@gigflow/ui/badge";
import { Button } from "@gigflow/ui/button";
import { Label } from "@gigflow/ui/label";
import { useParams } from "next/navigation";
import { type ReactNode, useState } from "react";
import { AvailabilityForm } from "./forms/availability-form";
import { AvatarForm } from "./forms/avatar-form";
import { FullNameForm } from "./forms/full-name-form";
import { ProfileSideBarAvatar } from "./profile-sidebar-avatar";

type Props = {
  daily_rate: string;
  user: Database["public"]["Tables"]["users"]["Row"];
};

export function ProfileSidebarCard({ user, daily_rate }: Props) {
  console.log(user);
  return (
    <aside
      className="relative w-full h-max bg-white pt-8 m-0 rounded-none
md:rounded-[20px] md:border md:border-[#E5E7EB] md:p-8 md:px-6"
    >
      <div className="flex flex-col items-center gap-4 mt-8 w-full first:mt-0">
        <div className="flex flex-col gap-4 w-full text-center mx-auto items-center justify-center">
          {/* <ProfileSideBarAvatar /> */}
          <AvatarForm defaultValues={{ avatar_url: user.avatar_url ?? "" }} />
          <AvailabilityForm
            defaultValues={{
              is_available: user?.is_available ?? false,
              available_until: user?.available_until ?? new Date(),
            }}
          />
          <div className="grid grid-cols-[1fr_16px] text-left justify-between items-start relative transition-colors duration-125 ease-in px-3 py-2 gap-[10px] rounded-lg -ml-[14px] -mt-2 w-[calc(100%+24px)]">
            <ProfileSideBarFullNameSection
              defaultValues={{ firstName: "Axèl", lastName: "Mylle" }}
            />
          </div>

          <Button size="lg">Get in touch</Button>
        </div>
      </div>
      <div className="mt-6">
        <ProfileSideBarSection
          title="Rate"
          content={<Badge>{daily_rate}</Badge>}
        />
        <ProfileSideBarSection
          title="Skills and Tools"
          content={<Badge>Unavailable</Badge>}
        />
        <ProfileSideBarSection
          title="About"
          content={
            <p>
              I'm Axèl, a detail-oriented Frontend Engineer and Web Developer
              ready to bring your vision to life. As a freelance front-end
              developer, I focus on delivering precise and reliable web
              solutions tailored to your needs. Let's collaborate to create
              user-friendly and visually appealing websites that make an impact.
            </p>
          }
        />
        <ProfileSideBarSection
          title="Skills and Tools"
          content={<Badge>Unavailable</Badge>}
        />
      </div>
    </aside>
  );
}

const ProfileSideBarSection = ({
  title,
  content,
}: { title: string; content: ReactNode }) => {
  return (
    <div className="flex flex-col items-start gap-4 mt-8 w-full first:mt-0">
      <Label>{title}</Label>
      <div className="flex flex-col gap-4 w-full text-left items-start">
        {content}
      </div>
    </div>
  );
};

const ProfileSideBarFullNameSection = ({
  defaultValues,
}: {
  defaultValues: { firstName: string; lastName: string };
}) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div
      className="text-center pl-6 break-words md:px-0 md:py-2"
      onClick={() => setShowForm(true)}
    >
      {showForm ? (
        <FullNameForm
          onCancel={() => setShowForm(false)}
          onSubmit={() => setShowForm(false)}
          defaultValues={defaultValues}
        />
      ) : (
        <h1 className="text-[2.125rem] font-bold tracking-[-0.5px] leading-[40px]">
          Axèl Mylle
        </h1>
      )}
    </div>
  );
};
