import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // nextが用意しているImageコンポーネントで外部URLの画像を使用する場合は、許可する外部の画像のURLを設定する必要がある。（悪意のあるサイトからの画像読み込みを防止するため）
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "gvqbifuiqchkteqequut.supabase.co" // supabaseに保存された画像を扱うため設定する
      }
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
