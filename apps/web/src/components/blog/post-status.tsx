import { Badge } from "@gigflow/ui/badge";

export function PostStatus({ status }: { status: string }) {
  return (
    <Badge
      variant="gray"
      className="px-3 py-1.5 inline-block text-[11px] mb-4 text-[#878787]"
    >
      {status}
    </Badge>
  );
}
