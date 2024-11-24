"use client";

import { TopbarNavigation } from "@/components/TopbarNavigation";
import Footer from "@/components/footer";
import { Provider as AnalyticsProvider } from "@gigflow/analytics/client";
import { Button } from "@gigflow/ui/button";
import { cn } from "@gigflow/ui/cn";
import "@gigflow/ui/globals.css";
import { Wordmark } from "@gigflow/ui/wordmark";
import { motion } from "framer-motion";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";

const FontKompleks = localFont({
  src: "../fonts/Kompleks-Headline.woff2",
  variable: "--font-kompleks",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${FontKompleks.variable} ${GeistSans.variable} ${GeistMono.variable}`,
          "antialiased light",
          "relative flex w-full flex-col items-center",
          "bg-gray-100 dark:bg-black dark:bg-[radial-gradient(800px_at_top,rgba(20,20,25,1)_0%,rgba(0,0,0,1)_100%)] overflow-x-hidden",
        )}
      >
        <LandingPageTopbar />
        <main className="container mx-auto px-4 overflow-hidden md:overflow-visible">
          {children}
        </main>
        <LandingPageFooter />

        <AnalyticsProvider />
      </body>
    </html>
  );
}

const LandingPageTopbar = () => {
  return (
    <div className="dark:bg-polar-800 shadow-3xl fixed inset-x-4 top-6 z-30 flex flex-row items-center justify-between rounded-3xl bg-gray-50 px-8 py-4 md:sticky md:inset-x-0 md:w-full md:max-w-2xl">
      <TopbarNavigation />
      <div>
        <Wordmark />
      </div>
      <div className="flex flex-row items-center gap-x-4">
        <Button variant="secondary">Log in</Button>
      </div>
    </div>
  );
};

const LandingPageFooter = () => {
  return (
    <motion.div
      className="flex w-full flex-col items-center justify-center bg-gray-50"
      initial="initial"
      variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      whileInView="animate"
      viewport={{ once: true }}
    >
      <Footer wide={true} />
    </motion.div>
  );
};
