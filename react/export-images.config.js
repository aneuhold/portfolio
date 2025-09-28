/**
 * @type {import('next-export-optimize-images').Config}
 */
const config = {
  // Output directory
  outDir: 'out',

  // Image formats to generate (modern formats for better compression)
  formats: ['avif', 'webp'],

  // Quality settings for different formats
  quality: {
    avif: 80,
    webp: 85,
    png: 90,
    jpeg: 90
  },

  // Responsive image breakpoints to generate
  sizes: [300, 600],

  // Cache directory for faster rebuilds
  cacheDir: '.next/cache/images',

  // Sharp optimization options
  sharpOptions: {
    // Optimize for size vs quality balance
    effort: 6,
    // Enable progressive JPEGs for better perceived loading
    progressive: true
  },

  // Enable lossy compression for better file sizes
  enableLossless: false,

  // Convert PNG to more efficient formats when possible
  convertFormat: [
    ['png', 'webp'],
    ['png', 'avif'],
    ['jpg', 'webp'],
    ['jpg', 'avif'],
    ['jpeg', 'webp'],
    ['jpeg', 'avif']
  ]
};

export default config;
