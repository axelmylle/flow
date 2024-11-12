import { Button } from "@gigflow/ui/button";
import { Icons } from "@gigflow/ui/icons";
import { Wordmark } from "@gigflow/ui/wordmark";

export function ConfiguratorHeader() {
  return (
    <nav
      className="bg-white w-full sticky top-0 z-50 pr-0
    shadow-[0_0_80px_rgba(228,232,247,0.4)]
    sm:shadow-none"
    >
      <div
        className="flex items-center justify-between h-16 px-4 mx-auto max-w-[1440px] relative
        sm:h-16 sm:px-8 sm:py-6"
      >
        <div>
          <Wordmark />
        </div>

        <div className="flex flex-row items-center gap-2">
          <Button variant="outline">
            <Icons.Plus className="size-4 mr-2" />
            <span>New Project</span>
          </Button>
          <Button>Preview</Button>
        </div>
      </div>
    </nav>
  );
}
