import { getUser } from "@v1/supabase/cached-queries";
import { Editor } from "@v1/ui/editor";
import { Wordmark } from "@v1/ui/wordmark";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@v1/ui/accordion";
import { Badge } from "@v1/ui/badge";
import { ComboboxDropdown } from "@v1/ui/combobox-dropdown";
import Image from "next/image";
import { redirect } from "next/navigation";
import { NextButton } from "../next-button";
import PageClient from "./page-client";

export default async function Welcome() {
  const user = await getUser();

  // if (user?.data?.is_onboarded) {
  //   return redirect("/");
  // }

  return (
    <>
      <PageClient />
    </>
  );
}
