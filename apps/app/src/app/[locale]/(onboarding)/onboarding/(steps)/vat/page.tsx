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
        <a
          href="https://dub.co/enterprise"
          target="_blank"
          className="w-full text-center text-sm text-gray-500 transition-colors hover:text-gray-700"
          rel="noreferrer"
        >
          Looking for enterprise?
        </a>
        <LaterButton next="finish">I'll pick a plan later</LaterButton>
      </div>
    </StepPage>
  );
}
