import { LaterButton } from "../../later-button";
import { StepPage } from "../step-page";
import { VatNumberForm } from "./vat-number-form";

export default function Plan() {
  return (
    <StepPage
      title="Choose your plan"
      description="Find a plan that fits your needs"
      className="max-w-2xl"
    >
      <VatNumberForm />
      <div className="mt-8 flex flex-col gap-3">
        <LaterButton next="finish">I'll add my VAT number later</LaterButton>
      </div>
    </StepPage>
  );
}
