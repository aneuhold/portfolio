import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { siteMetadata } from '../packages/shared/config/siteMetadata.js';

/**
 * Returns the OG image generation config. Paths and viewport size live here so the rest of the
 * script just reads from one object.
 */
const getConfig = () => ({
  /** HTML source for the share image. */
  htmlSource: resolve(import.meta.dirname, 'og-image/index.html'),
  /** Output PNG, served by the SvelteKit site at `siteMetadata.ogImage.url`. */
  outputPath: resolve(import.meta.dirname, '../svelte/static/og-image.png'),
  /** The image size declared in `siteMetadata.ogImage`. */
  viewport: { width: siteMetadata.ogImage.width, height: siteMetadata.ogImage.height }
});

const config = getConfig();

/**
 * Launches headless Chromium, loads the local HTML at the OG image viewport, waits for webfonts to
 * load so glyph metrics are final, then writes the captured PNG to the configured output path.
 */
const generateOgImage = async (): Promise<void> => {
  // The template is opened as a `file://` URL and loads the shared stylesheet and fonts from
  // sibling folders, which Chromium blocks without this flag.
  const browser = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  try {
    const page = await browser.newPage({ viewport: config.viewport, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(config.htmlSource).href, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    await page.screenshot({ path: config.outputPath, type: 'png' });
    console.log(`  wrote ${config.outputPath}`);
  } finally {
    await browser.close();
  }
};

console.log(`OG image source: ${config.htmlSource}`);
await generateOgImage();
