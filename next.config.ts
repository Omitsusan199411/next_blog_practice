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
  }
};

export default nextConfig;
