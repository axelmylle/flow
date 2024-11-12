"use client";

import { Button } from "@gigflow/ui/button";
import { Icons } from "@gigflow/ui/icons";
import { useContext } from "react";
import { SideNavContext } from "../main-nav";

export function NavButton() {
  const { setIsOpen } = useContext(SideNavContext);

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => setIsOpen((o) => !o)}
      className="h-auto w-fit p-1 md:hidden"
    >
      <Icons.ChevronLeft className="size-4" />
    </Button>
  );
}
