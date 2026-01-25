import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import("next").NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["github.com"], // ← IZININ GITHUB DI SINI
  // },
};

initOpenNextCloudflareForDev();

export default nextConfig;
