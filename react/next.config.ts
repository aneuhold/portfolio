import { NextConfig } from 'next';
import withExportImages from 'next-export-optimize-images';
import path from 'path';

const nextConfig: NextConfig = {
  turbopack: {},
  // Emit a fully static site to the `out/` directory on build.
  // See: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
  output: 'export',
  // With next-export-optimize-images, we can use optimized images with static exports
  images: {
    // Configure image sizes for responsive layouts - optimized at build time
    imageSizes: [300, 600],
    qualities: [90],
    // Enable modern formats for better performance
    formats: ['image/avif', 'image/webp']
  },
  // Helps on static hosts by ensuring directory-style URLs map to index.html
  trailingSlash: true,
  outputFileTracingRoot: path.join(__dirname, '../')
};

export default withExportImages(nextConfig);
