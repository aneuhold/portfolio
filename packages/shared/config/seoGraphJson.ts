import type { Graph } from 'schema-dts';
import { siteMetadata } from './siteMetadata';
import { socialLinks } from './socialLinks';

const { siteUrl, siteName, title, description } = siteMetadata;
const websiteId = `${siteUrl}#/schema.org/WebSite`;
const personId = `${siteUrl}#/schema.org/Person`;

/**
 * The schema.org entities for the site: the site itself, the home page as a profile page, and the
 * person it profiles.
 */
const seoGraph: Graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: siteName,
      url: siteUrl
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}#/schema.org/ProfilePage`,
      url: siteUrl,
      name: title,
      description,
      isPartOf: { '@id': websiteId },
      mainEntity: { '@id': personId }
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: 'Anton Neuhold',
      jobTitle: 'Senior Software Engineer',
      description,
      url: siteUrl,
      sameAs: socialLinks.map(({ link }) => link)
    }
  ]
};

/**
 * The JSON-LD graph as the content of a `<script type="application/ld+json">` tag. Every `<` is
 * escaped as `<` so the content can never close the tag, as the Next.js JSON-LD guide
 * recommends: https://nextjs.org/docs/app/guides/json-ld
 */
export const seoGraphJson = JSON.stringify(seoGraph).replace(/</g, '\\u003c');

/**
 * `seoGraphJson` inside a complete `<script type="application/ld+json">` element, for inserting as
 * raw HTML.
 */
export const seoGraphScriptTag = `<script type="application/ld+json">${seoGraphJson}</script>`;
