import type { NextConfig } from "next";

/**
 * Static export — output ke ./out, siap di-upload sebagai GitHub Pages artifact.
 * Repo ini adalah user page (heluvaa.github.io), jadi situs disajikan dari root:
 * tidak perlu basePath / assetPrefix.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // Static export tidak punya image optimizer di server.
    unoptimized: true,
  },
  reactStrictMode: true,
  // Menetapkan root tracing ke folder proyek ini. Tanpa ini, Next.js naik ke
  // direktori home dan mengabaikan package-lock.json karena akan menyeret
  // seluruh isi home masuk ke perhitungan.
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
