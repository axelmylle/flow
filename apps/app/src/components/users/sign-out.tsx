"use client";

import { signOutAction } from "@/actions/user/sign-out-action";
import { DropdownMenuItem } from "@v1/ui/dropdown-menu";
import { useState } from "react";

export function SignOut() {
  const [isLoading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    signOutAction();
  };

  return (
    <DropdownMenuItem onClick={handleSignOut}>
      {isLoading ? "Loading..." : "Sign out"}
    </DropdownMenuItem>
  );
}
