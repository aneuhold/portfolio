/* eslint-disable */
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: path.join(__dirname, '..'),
  webpack: (config) => {
    // Turn off symlink resolving so that shared code can be used among the
    // different platforms used for the portfolio.
    config.resolve.symlinks = false;
    return config;
  },
};

module.exports = nextConfig;
