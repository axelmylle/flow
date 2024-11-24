import { Icons } from "@gigflow/ui/icons";
import { StepPage } from "../step-page";
import { Form } from "./form";

export default function Workspace() {
  return (
    <StepPage
      icon={Icons.GridPlus}
      title="What do you do?"
      description={
        <p>
          We need to know what you do so we can match you with the right
          opportunities.
        </p>
      }
    >
      <Form />
    </StepPage>
  );
}
