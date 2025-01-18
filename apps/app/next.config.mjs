import "./src/env.mjs";
import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@gigflow/supabase", "@gigflow/invoice", "@gigflow/ui"],
  experimental: {
    instrumentationHook: process.env.NODE_ENV === "production",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add logging configuration
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      { hostname: "logo.clearbit.com" },
      { hostname: "images.pexels.com" },
      { hostname: "builds.contra.com" },
      { hostname: "127.0.0.1" },
      { hostname: "img.logo.dev" },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  silent: !process.env.CI,
  telemetry: false,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  tunnelRoute: "/monitoring",
});
