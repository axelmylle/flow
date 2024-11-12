import { getCurrentUserCompanyQuery } from "@gigflow/supabase/queries";
import { createClient } from "@gigflow/supabase/server";
import { Icons } from "@gigflow/ui/icons";
import { StepPage } from "../../step-page";
import { Form } from "./form";

export default async function MyCompany() {
  return (
    <StepPage icon={Icons.Globe2} title="What's the name of your company?">
      <Form />
    </StepPage>
  );
}
