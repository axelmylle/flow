import { NewBackground } from "@gigflow/ui/new-background";
import { Wordmark } from "@gigflow/ui/wordmark";
import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NewBackground />
      <div className="relative flex min-h-screen w-full justify-center">
        <Link href="/" className="absolute left-4 top-3 z-10">
          <Wordmark className="h-6" />
        </Link>
        {children}
      </div>
    </>
  );
}
