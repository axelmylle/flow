import { StepPage } from "../step-page";
import { Form } from "./form";

export default function Plan() {
  return (
    <StepPage
      title="Choose your plan"
      description="Find a plan that fits your needs"
      className="max-w-2xl"
    >
      <Form />
      <div className="mt-8 flex flex-col gap-3">
        <a
          href="https://dub.co/enterprise"
          target="_blank"
          className="w-full text-center text-sm text-gray-500 transition-colors hover:text-gray-700"
          rel="noreferrer"
        >
          Looking for enterprise?
        </a>
      </div>
    </StepPage>
  );
}
