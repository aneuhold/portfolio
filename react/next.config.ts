import { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  turbopack: {},
  // Emit a fully static site to the `out/` directory on build.
  // See: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
  output: 'export',
  // Helps on static hosts by ensuring directory-style URLs map to index.html
  trailingSlash: true,
  outputFileTracingRoot: path.join(__dirname, '../')
};

export default nextConfig;
