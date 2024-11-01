import { Icons } from "@v1/ui/icons";
import { StepPage } from "../../step-page";
import { Form } from "./form";

export default async function MyCompany({
  searchParams,
}: {
  searchParams: { companyId: string };
}) {
  const companyId = searchParams.companyId;
  return (
    <StepPage
      icon={Icons.Globe2}
      title="Create your profile"
      description="We need some more information about you to get started."
    >
      <Form companyId={companyId} />
    </StepPage>
  );
}
