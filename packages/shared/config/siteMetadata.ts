/**
 * The values both sites use to describe themselves in page titles, canonical links, link previews,
 * and structured data.
 */
type SiteMetadata = {
  /** Home page URL of the SvelteKit site, the primary copy that canonical links point at. */
  siteUrl: string;
  /** Home page URL of the Next.js site. */
  reactSiteUrl: string;
  siteName: string;
  title: string;
  description: string;
  ogImage: OgImageMetadata;
};

/**
 * The image shown in link previews, served from the SvelteKit site's `static` folder.
 */
type OgImageMetadata = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

const siteUrl = 'https://tonyneuhold.com/';

export const siteMetadata: SiteMetadata = {
  siteUrl,
  reactSiteUrl: 'https://react.tonyneuhold.com/',
  siteName: 'Anton Neuhold',
  title: 'Anton (Tony) Neuhold | Senior Software Engineer',
  description:
    'A timeline of web, mobile, and backend projects by Anton (Tony) Neuhold, a Senior Software Engineer in Canby, Oregon.',
  ogImage: {
    url: new URL('og-image.png', siteUrl).href,
    width: 1200,
    height: 630,
    alt: 'Anton (Tony) Neuhold, Software Engineer and Web Developer.'
  }
};
