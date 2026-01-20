/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable Turbopack for builds if it's causing issues
  experimental: {
    // turbopack: false, // If version 16 supports this flag
  }
}

export default nextConfig
