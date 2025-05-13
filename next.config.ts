import type { NextConfig } from "next";
import path from "path";

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
    domains: ["fonts.googleapis.com"],
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.join(__dirname, "src"), // Thêm alias @ trỏ tới thư mục src
    };
    return config;
  },
};

export default nextConfig;
