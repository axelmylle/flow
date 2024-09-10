import type { PropsWithChildren } from "react";
import { Background } from "./background";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Background />
      {children}
    </>
  );
}
