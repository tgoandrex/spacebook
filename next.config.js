/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io'
      }
    ]
  },
  nextConfig,
  experimental: {
    serverActions: true,
  }
}