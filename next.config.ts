import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Peringatan: Ini memungkinkan build produksi berhasil meskipun
    // proyek Anda memiliki kesalahan ESLint.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;