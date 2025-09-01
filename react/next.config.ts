import { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  turbopack: {},
  // Emit a fully static site to the `out/` directory on build.
  // See: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
  output: 'export',
  // Disable the Image Optimization API for static exports so images are served directly
  // from the generated assets (avoids /_next/image URLs which 404 on static hosts).
  images: {
    unoptimized: true
  },
  // Helps on static hosts by ensuring directory-style URLs map to index.html
  trailingSlash: true,
  outputFileTracingRoot: path.join(__dirname, '../')
};

export default nextConfig;
