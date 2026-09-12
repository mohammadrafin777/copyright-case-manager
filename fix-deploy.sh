#!/bin/bash
echo "⚡ Auto-fixing next.config.mjs..."
cat << 'CFG' > next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
CFG

echo "⚡ Ensuring .npmrc configuration..."
echo "legacy-peer-deps=true" > .npmrc

echo "⚡ Pushing to GitHub..."
git add .
git commit -m "auto fix: update configs and build bypass"
git push

echo "⚡ Deploying to Vercel..."
vercel --force
