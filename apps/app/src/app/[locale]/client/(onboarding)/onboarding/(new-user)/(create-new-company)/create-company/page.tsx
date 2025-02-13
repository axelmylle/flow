import { Icons } from "@gigflow/ui/icons";
import { StepPage } from "../../../step-page";
import { Form } from "./form";

export default async function MyCompany() {
  return (
    <StepPage
      icon={Icons.Globe2}
      title="Select or create your company"
      description="Search your company and select it or create a new one."
    >
      <Form />
    </StepPage>
  );
}
