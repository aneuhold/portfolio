/**
 * The values both sites use to describe themselves in page titles, canonical links, link previews,
 * and structured data.
 */
type SiteMetadata = {
  /** Origin of the SvelteKit site, the primary copy that canonical links point at. */
  siteUrl: string;
  /** Origin of the Next.js site. */
  reactSiteUrl: string;
  siteName: string;
  title: string;
  description: string;
  ogImage: OgImageMetadata;
};

/**
 * Describes `images/og-image.png`, the image shown in link previews.
 */
type OgImageMetadata = {
  width: number;
  height: number;
  alt: string;
};

export const siteMetadata: SiteMetadata = {
  siteUrl: 'https://tonyneuhold.com',
  reactSiteUrl: 'https://react.tonyneuhold.com',
  siteName: 'Anton Neuhold',
  title: 'Anton (Tony) Neuhold | Senior Software Engineer',
  description:
    'A timeline of web, mobile, and backend projects by Anton (Tony) Neuhold, a Senior Software Engineer in Canby, Oregon.',
  ogImage: {
    width: 1200,
    height: 630,
    alt: 'Anton (Tony) Neuhold, Software Engineer and Web Developer.'
  }
};
