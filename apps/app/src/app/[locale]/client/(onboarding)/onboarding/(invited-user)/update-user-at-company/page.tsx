import { getCurrentUserAtCompanyQuery } from "@gigflow/supabase/queries";
import { createClient } from "@gigflow/supabase/server";
import { Icons } from "@gigflow/ui/icons";
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
