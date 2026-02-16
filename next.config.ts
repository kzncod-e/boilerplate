import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",

  runtime: "edge",

  // 👇 INI KUNCI
  turbopack: {},

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "recharts",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
      "date-fns",
      "react-day-picker",
      "react-hook-form",
      "@hookform/resolvers",
      "zod",
      "drizzle-orm",
      "apexcharts",
      "react-apexcharts",
      "class-variance-authority",
    ],
  },

  images: {
    remotePatterns: [{ protocol: "https", hostname: "github.com" }],
  },

  webpack(config, { isServer }) {
    if (isServer) {
      config.externals = [
        ...(config.externals || []),
        "zod",
        "framer-motion",
        "lucide-react",
        "ai",
        "openai",
      ];
    }
    return config;
  },
};

initOpenNextCloudflareForDev();
export default nextConfig;
