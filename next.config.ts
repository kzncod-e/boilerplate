import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();
/** @type {import("next").NextConfig} */

const nextConfig = {
//   output: "standalone",






//   experimental: {
//     optimizePackageImports: [
//       "lucide-react",
//       "recharts",
//       "@radix-ui/react-alert-dialog",
//       "@radix-ui/react-dialog",
//       "@radix-ui/react-dropdown-menu",
//       "@radix-ui/react-popover",
//       "@radix-ui/react-select",
//       "@radix-ui/react-tabs",
//       "@radix-ui/react-tooltip",
//       "date-fns",
//       "react-day-picker",
//       "react-hook-form",
//       "@hookform/resolvers",
//       "zod",
//       "drizzle-orm",
//       "apexcharts",
//       "react-apexcharts",
//       "class-variance-authority",
//     ],
//   },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "github.com",
            },
        ],
    },

 
  
};


export default nextConfig;
