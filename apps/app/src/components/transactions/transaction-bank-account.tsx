import { cn } from "@v1/ui/cn";
import { BankLogo } from "./bank-logo";

type Props = {
  logoUrl?: string;
  name?: string;
  size?: number;
  className?: string;
};

export function TransactionBankAccount({
  logoUrl,
  name,
  size = 20,
  className,
}: Props) {
  return (
    <div className="flex space-x-2 mt-1 items-center">
      {logoUrl && (
        <div className="rounded-full overflow-hidden">
          <BankLogo size={size} src={logoUrl} alt={name ?? ""} />
        </div>
      )}
      <span className={cn("text-sm line-clamp-1", className)}>{name}</span>
    </div>
  );
}
