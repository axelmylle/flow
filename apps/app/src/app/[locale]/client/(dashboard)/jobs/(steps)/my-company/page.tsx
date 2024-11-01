import { Icons } from "@v1/ui/icons";
import { StepPage } from "../step-page";
import { Form } from "./form";

export default function MyCompany() {
  return (
    <StepPage icon={Icons.Globe2} title="What's the name of your company?">
      <Form />
    </StepPage>
  );
}
