/** @type {import("next").NextConfig} */
const config = {
  poweredByHeader: false,
  reactStrictMode: true,
  transpilePackages: ["@gigflow/ui", "next-mdx-remote"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["assets.dub.co", "pbs.twimg.com", "logo.clearbit.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/en/(.*)",
        destination: "/",
        permanent: true,
      },
      {
        source: "/public-beta",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pitch",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default config;
