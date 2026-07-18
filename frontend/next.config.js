/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  async rewrites() {
    const backendUrl = (
      process.env.BACKEND_API_URL ||
      "https://arthasarthi-backend-production.up.railway.app"
    ).replace(/\/$/, "");

    return [
      {
        source: "/backend-api/:path*",
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
