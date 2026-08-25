/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: { bodySizeLimit: '25mb' }
  },
  eslint: { ignoreDuringBuilds: true }
};

export default nextConfig;
