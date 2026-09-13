import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const rootDir = resolve(import.meta.dirname, '..');

/**
 * Returns the favicon generation config. All file paths and sizes live here so the rest of the
 * script just reads from one object.
 */
const getConfig = () => ({
  /** Artwork every icon is rendered from. */
  source: resolve(rootDir, 'packages/shared/images/sparkles.svg'),
  /** Multi-image ICO with a transparent background, served at `/favicon.ico` by both apps. */
  favicon: {
    sizes: [16, 32, 48],
    outputPaths: [
      resolve(rootDir, 'svelte/static/favicon.ico'),
      resolve(rootDir, 'react/app/favicon.ico')
    ]
  },
  /**
   * Apple touch icon on a white background. The React copy uses Next's `apple-icon` file name,
   * which makes Next write the link tag.
   */
  appleTouchIcon: {
    size: 180,
    backgroundColor: '#ffffff',
    outputPaths: [
      resolve(rootDir, 'svelte/static/apple-touch-icon.png'),
      resolve(rootDir, 'react/app/apple-icon.png')
    ]
  }
});

const config = getConfig();

/**
 * Renders the source SVG to a square PNG with `rsvg-convert` (librsvg). Requires `rsvg-convert` on
 * PATH.
 *
 * @param size - Width and height of the PNG in pixels
 * @param outputPath - Destination PNG path
 * @param backgroundColor - Fill behind the artwork. Omit it to keep the background transparent.
 */
const renderPng = (size: number, outputPath: string, backgroundColor?: string): void => {
  const backgroundArgs = backgroundColor ? ['--background-color', backgroundColor] : [];
  execFileSync(
    'rsvg-convert',
    [
      ...backgroundArgs,
      '--width',
      String(size),
      '--height',
      String(size),
      config.source,
      '--output',
      outputPath
    ],
    { stdio: 'inherit' }
  );
};

/**
 * Renders the source SVG at each favicon size and packs the PNGs into one multi-image ICO with
 * `magick` (ImageMagick), written to every favicon output path. Requires `magick` on PATH.
 */
const generateFavicons = (): void => {
  const tempDir = mkdtempSync(join(tmpdir(), 'portfolio-favicon-'));
  try {
    const pngPaths = config.favicon.sizes.map((size) => {
      const pngPath = join(tempDir, `${size}.png`);
      renderPng(size, pngPath);
      return pngPath;
    });
    for (const outputPath of config.favicon.outputPaths) {
      execFileSync('magick', [...pngPaths, outputPath], { stdio: 'inherit' });
      console.log(`  wrote ${outputPath}`);
    }
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
};

/**
 * Renders the Apple touch icon to every output path.
 */
const generateAppleTouchIcons = (): void => {
  const { size, backgroundColor, outputPaths } = config.appleTouchIcon;
  for (const outputPath of outputPaths) {
    renderPng(size, outputPath, backgroundColor);
    console.log(`  wrote ${outputPath}`);
  }
};

console.log(`Favicon source: ${config.source}`);
generateFavicons();
generateAppleTouchIcons();
