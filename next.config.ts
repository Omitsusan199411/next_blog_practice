import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 外部の画像を扱う場合の設定
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // デフォルトは1MBなので5MBに増やす
    },
  },
  server: {
    port: 3001,
  },
};

export default nextConfig;
