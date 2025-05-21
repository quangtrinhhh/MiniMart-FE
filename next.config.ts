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
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    domains: ["fonts.googleapis.com", "res.cloudinary.com"],
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"), // Đảm bảo alias trỏ đến thư mục src
    };
    return config;
  },
};

export default nextConfig;
