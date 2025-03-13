/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: '/AetherWorld.github.io',  // GitHub Pages base path
  trailingSlash: true,  // Ensures correct URL handling
  output: 'export',  // Enables static export
};

module.exports = nextConfig;

