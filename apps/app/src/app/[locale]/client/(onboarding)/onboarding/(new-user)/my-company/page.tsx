import { getCurrentUserCompanyQuery } from "@v1/supabase/queries";
import { createClient } from "@v1/supabase/server";
import { Icons } from "@v1/ui/icons";
import { StepPage } from "../../step-page";
import { Form } from "./form";

export default async function MyCompany() {
  return (
    <StepPage icon={Icons.Globe2} title="What's the name of your company?">
      <Form />
    </StepPage>
  );
}
