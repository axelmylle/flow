import { Icons } from "@v1/ui/icons";
import { StepPage } from "../step-page";
import { WorkTypeSelector } from "./work-type-selector";

export default function Domain() {
  return (
    <StepPage
      icon={Icons.Globe2}
      title="Add a custom domain"
      description="Take your links to the next level with your own branding."
    >
      <WorkTypeSelector />
    </StepPage>
  );
}
