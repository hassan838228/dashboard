/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  experimental: {
    appDir: false, // Using pages directory for better compatibility with next-i18next
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'discord.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URL}/api/:path*`,
      },
    ]
  },
}

module.exports = nextConfig