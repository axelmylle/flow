import { updateBankAccountAction } from "@/actions/bank-account/update-bank-account-action";
import { useI18n } from "@/locales/client";
import { Button } from "@gigflow/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@gigflow/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@gigflow/ui/form";
import { Input } from "@gigflow/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@gigflow/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Account Name must be at least 1 characters.",
  }),
  type: z.string(),
});

type Props = {
  id: string;
  onOpenChange: (isOpen: boolean) => void;
  isOpen: boolean;
  defaultName: string;
  defaultType?: string;
};

export function EditBankAccountModal({
  id,
  onOpenChange,
  isOpen,
  defaultName,
  defaultType,
}: Props) {
  const t = useI18n();

  const updateAccount = useAction(updateBankAccountAction, {
    onSuccess: () => onOpenChange(false),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultName,
      type: defaultType,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateAccount.execute({ id, ...values });
  }

  const accountTypes = () => {
    return [
      "depository",
      "credit",
      "other_asset",
      "loan",
      "other_liability",
    ].map((type) => (
      <SelectItem key={type} value={type}>
        {t(`account_type.${type}`)}
      </SelectItem>
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[455px]"
        onOpenAutoFocus={(evt) => evt.preventDefault()}
      >
        <div className="p-4">
          <DialogHeader>
            <DialogTitle className="flex justify-between">
              Edit Account
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        autoFocus
                        placeholder="Company Account"
                        autoComplete="off"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck="false"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can change the name of the account here
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Change account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>{accountTypes()}</SelectContent>
                    </Select>
                    <FormDescription>Change the account type</FormDescription>
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-10 w-full">
                <div className="space-y-4 w-full">
                  <Button
                    disabled={updateAccount.status === "executing"}
                    className="w-full"
                    type="submit"
                  >
                    {updateAccount.status === "executing" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
