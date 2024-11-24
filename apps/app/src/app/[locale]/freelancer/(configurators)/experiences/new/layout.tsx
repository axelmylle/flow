"use client";

import { PageContent } from "@/components/layout/page-content";
import { ProfileHeaderTitle } from "@/components/profile/my-profile/profile-header-title";
import { ProfileSidebarCard } from "@/components/profile/my-profile/profile-sidebar-card";
import { MaxWidthWrapper } from "@gigflow/ui/max-width-wrapper";
import type { ReactNode } from "react";
import { ConfiguratorHeader } from "../../configurator-header";
import { ExperienceFormProvider } from "./experience-form-context";
import { FormContext } from "./form-context";

export default function NewProjectLayout({
  children,
}: { children: ReactNode }) {
  return (
    <FormContext>
      <ConfiguratorHeader />
      {children}
    </FormContext>
  );
}
