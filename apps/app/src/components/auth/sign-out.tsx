"use client";

import { createClient } from "@gigflow/supabase/client";
import { Button } from "@gigflow/ui/button";
import { Icons } from "@gigflow/ui/icons";

export function SignOut() {
  const supabase = createClient();

  const handleSignOut = () => {
    supabase.auth.signOut();
  };

  return (
    <Button onClick={handleSignOut} variant="outline">
      <Icons.SignOut className="size-4 mr-2" />
      Sign out
    </Button>
  );
}
