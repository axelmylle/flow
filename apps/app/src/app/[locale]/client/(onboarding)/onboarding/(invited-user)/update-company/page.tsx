import { getCurrentUserCompanyQuery } from "@v1/supabase/queries";
import { createClient } from "@v1/supabase/server";
import { Icons } from "@v1/ui/icons";
import { StepPage } from "../../step-page";
import { Form } from "./form";

export default async function MyCompany() {
  const supabase = await createClient();
  const company = await getCurrentUserCompanyQuery(supabase);

  return (
    <StepPage
      icon={Icons.Globe2}
      title="Welcome to your company"
      description="We need some more information about your company to get started."
    >
      <Form company={company} />
    </StepPage>
  );
}
