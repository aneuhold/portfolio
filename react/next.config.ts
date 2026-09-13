import { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  turbopack: {},
  // Emit a fully static site to the `out/` directory on build.
  // See: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
  output: 'export',
  images: {
    loader: 'custom',
    // Only the specific sizes needed for the portfolio thumbnails. The two lists
    // are unioned into `srcset`. The actual code shows: `let widths = [...blurSize, ...imageSizes, ...deviceSizes];`
    // here: https://github.com/Niels-IO/next-image-export-optimizer/blob/master/src/optimizeImages.ts#L377.
    // So just specify one set to only generate the 300 + 600 once.
    imageSizes: [300, 600],
    deviceSizes: []
  },
  transpilePackages: [
    // Only added here because next-image-export-optimizer says to and warns otherwise. Don't see an
    // issue with builds though when it is removed.
    'next-image-export-optimizer',
    // `shared` ships TypeScript source rather than a build, so Next has to compile
    // it alongside the app.
    'shared'
  ],
  env: {
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: '90',
    nextImageExportOptimizer_storePicturesInWEBP: 'true',
    nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',
    nextImageExportOptimizer_generateAndUseBlurImages: 'true',
    nextImageExportOptimizer_remoteImageCacheTTL: '0'
  },
  // Helps on static hosts by ensuring directory-style URLs map to index.html
  trailingSlash: true,
  outputFileTracingRoot: path.join(__dirname, '../'),
  // Stops `next dev` from writing AGENTS.md and CLAUDE.md into this folder when it runs under an AI
  // coding agent.
  // See: https://nextjs.org/docs/app/guides/ai-agents#opting-out
  agentRules: false
};

export default nextConfig;
