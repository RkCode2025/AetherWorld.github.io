import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,  // Optional, disable image optimization if necessary
  },
  basePath: '/AetherWorld.github.io',  // Set base path for GitHub Pages
  trailingSlash: true,  // Useful for GitHub Pages to ensure correct URL structure

  // Set the output for static export
  output: 'export',  // Enables exporting the app as static files
};

export default nextConfig;