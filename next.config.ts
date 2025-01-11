import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true, // Chuyển hướng vĩnh viễn (301)
      },
    ];
  },
};

export default nextConfig;
