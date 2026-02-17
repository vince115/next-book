import type { NextConfig } from "next";

const repo = "next-book";

const nextConfig: NextConfig = {
  output: "export", // 靜態輸出到 /out
  basePath: `/${repo}`, // 讓路由在 /next-book 下工作
  images: { 
    unoptimized: true  // GitHub Pages 必須關掉 Image Optimization
  },
};

export default nextConfig;
