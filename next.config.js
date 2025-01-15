/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Disable SSL certificate validation
