import { getCurrentUserAtCompanyQuery } from "@v1/supabase/queries";
import { createClient } from "@v1/supabase/server";
import { Icons } from "@v1/ui/icons";
import { StepPage } from "../../step-page";
import { Form } from "./form";

export default async function MyCompany() {
  const supabase = await createClient();
  const userAtCompany = await getCurrentUserAtCompanyQuery(supabase);

  return (
    <StepPage
      icon={Icons.Globe2}
      title="Update your profile"
      description="We need some more information about you to get started."
    >
      <Form userAtCompany={userAtCompany} />
    </StepPage>
  );
}
