import { Avatar, AvatarFallback, AvatarImage } from "@gigflow/ui/avatar";
import { Badge } from "@gigflow/ui/badge";

export function ProfileSideBarAvatar() {
  return (
    <div className="grid grid-cols-1 grid-rows-[1fr_16px_auto] gap-0 w-full">
      <div className="flex justify-center items-center col-start-1 col-end-2 row-start-1 row-end-3">
        <Avatar className="size-44">
          <AvatarImage src="https://cdn-engine.midday.ai/default.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="col-start-1 col-end-2 row-start-2 row-end-4 z-10 mx-auto">
        <Badge variant="rainbow">Unavailable</Badge>
      </div>
    </div>
  );
}
