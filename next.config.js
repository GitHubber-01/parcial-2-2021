/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    URI_MONGO: process.env.URI_MONGO,
    API_KEY: process.env.API_KEY
  }
}

module.exports = nextConfig
