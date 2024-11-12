import { getUser } from "@gigflow/supabase/cached-queries";
import { Editor } from "@gigflow/ui/editor";
import { Wordmark } from "@gigflow/ui/wordmark";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@gigflow/ui/accordion";
import { Badge } from "@gigflow/ui/badge";
import { ComboboxDropdown } from "@gigflow/ui/combobox-dropdown";
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
