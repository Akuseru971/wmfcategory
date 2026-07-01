import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shop.wmf.co.jp",
        pathname: "/g_images/**",
      },
    ],
  },
};

export default nextConfig;
