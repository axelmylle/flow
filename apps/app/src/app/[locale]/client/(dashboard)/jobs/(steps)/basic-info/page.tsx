import { Icons } from "@gigflow/ui/icons";
import { StepPage } from "../step-page";
import { Form } from "./form";

export default function Workspace() {
  return (
    <StepPage
      icon={Icons.GridPlus}
      title="What's your name? "
      description={
        <a
          href="https://dub.co/help/article/what-is-a-workspace"
          target="_blank"
          className="underline transition-colors hover:text-gray-700"
          rel="noreferrer"
        >
          sfds
        </a>
      }
    >
      <Form />
    </StepPage>
  );
}
