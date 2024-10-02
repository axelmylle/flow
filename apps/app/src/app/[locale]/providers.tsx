"use client";

import { I18nProviderClient } from "@/locales/client";

import { TriggerProvider } from "@trigger.dev/react";
import type { ReactNode } from "react";

type ProviderProps = {
  locale: string;
  children: ReactNode;
};

export function Providers({ locale, children }: ProviderProps) {
  return (
    <I18nProviderClient locale={locale}>
      <TriggerProvider
        publicApiKey={"proj_raxmqnsxepndhqkztsnt"}
        apiUrl={process.env.NEXT_PUBLIC_TRIGGER_API_URL}
      >
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}

        {children}
        {/* </ThemeProvider> */}
      </TriggerProvider>
    </I18nProviderClient>
  );
}
