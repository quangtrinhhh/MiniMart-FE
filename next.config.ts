import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/gioi-thieu",
        destination: "/introduce",
      },
      {
        source: "/lien-he",
        destination: "/contact",
      },
      {
        source: "/tin-tuc",
        destination: "/news",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
    ],
  },
};

export default nextConfig;
