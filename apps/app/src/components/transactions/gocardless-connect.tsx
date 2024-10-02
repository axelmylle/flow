import { createGoCardLessLinkAction } from "@/actions/institutions/create-gocardless-link";
// import { useToast } from "@v1/ui/use-toast";
import { useAction } from "next-safe-action/hooks";
import { BankConnectButton } from "./bank-connect-button";

type Props = {
  id: string;
  availableHistory: number;
  onSelect: () => void;
};

export function GoCardLessConnect({ onSelect, id, availableHistory }: Props) {
  // const { toast } = useToast();

  const createGoCardLessLink = useAction(createGoCardLessLinkAction, {
    onError: () => {
      // toast({
      //   duration: 3500,
      //   variant: "error",
      //   title: "Something went wrong please try again.",
      // });
      console.error("GoCardLessConnect: something went wrong");
    },
  });

  const handleOnSelect = () => {
    onSelect();

    createGoCardLessLink.execute({
      institutionId: id,
      availableHistory: availableHistory,
      redirectBase: window.location.origin,
    });
  };

  return <BankConnectButton onClick={handleOnSelect} />;
}
