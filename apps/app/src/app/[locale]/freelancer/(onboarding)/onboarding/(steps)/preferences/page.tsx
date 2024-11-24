import { Icons } from "@gigflow/ui/icons";
import { StepPage } from "../step-page";
import { WorkTypeSelector } from "./work-type-selector";

export default function Domain() {
  return (
    <StepPage
      title="🌍 Customize Your Experience"
      description="Take your work options to the next level by choosing your ideal setup. Make your journey unique with a work style that aligns with you."
    >
      <WorkTypeSelector />
    </StepPage>
  );
}
