import { Icons } from "@v1/ui/icons";
import { StepPage } from "../step-page";
import { Form } from "./form";

export default function Workspace() {
  return (
    <StepPage
      icon={Icons.GridPlus}
      title="Create a workspace"
      description={
        <a
          href="https://dub.co/help/article/what-is-a-workspace"
          target="_blank"
          className="underline transition-colors hover:text-gray-700"
          rel="noreferrer"
        >
          What is a workspace?
        </a>
      }
    >
      <Form />
    </StepPage>
  );
}
