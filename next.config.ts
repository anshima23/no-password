import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // ✅ Helps catch potential issues in development
  swcMinify: true,       // ✅ Optimizes JS for faster performance
  experimental: {
    appDir: true,        // ✅ Enables Next.js App Router
  },
};

export default nextConfig;
