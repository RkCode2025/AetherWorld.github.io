import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: '/AetherWorld.github.io',  // Set base path for GitHub Pages
  trailingSlash: true,  // Optional, useful for GitHub Pages
  output: 'export',  // Enable static export
};

export default nextConfig;
