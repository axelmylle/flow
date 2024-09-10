"use client";

import { createClient } from "@v1/supabase/client";
import { Button } from "@v1/ui/button";

export function LinkedInSignin() {
  const supabase = createClient();

  const handleSignin = () => {
    supabase.auth.signInWithOAuth({
      provider: "linkedin_oidc",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  return (
    <Button
      onClick={handleSignin}
      variant="outline"
      className="font-mono"
      text="Sign in with LinkedIn"
    />
  );
}
