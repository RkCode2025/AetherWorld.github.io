import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,  // You can disable image optimization if necessary
  },
  basePath: '/AetherWorld.github.io',  // Set base path for GitHub Pages
  trailingSlash: true,  // Optional, useful for GitHub Pages

  // Set the output for static export
  output: 'export',  // This enables exporting the app as static files
};

export default nextConfig;

