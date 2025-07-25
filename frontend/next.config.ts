import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net/**", // ou cdn.exemplo.com, imgur.com, etc
      },
    ],
  },
};
export default nextConfig;
