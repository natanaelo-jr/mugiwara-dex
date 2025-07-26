import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net", // Apenas o domínio aqui
        pathname: "/**", // O wildcard para o caminho vai aqui
      },
    ],
  },
};
export default nextConfig;
