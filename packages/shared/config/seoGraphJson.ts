import type { Graph } from 'schema-dts';
import { siteMetadata } from './siteMetadata';
import { socialLinks } from './socialLinks';

const { siteUrl, siteName, title, description } = siteMetadata;
const homeUrl = `${siteUrl}/`;
const websiteId = `${homeUrl}#/schema.org/WebSite`;
const personId = `${homeUrl}#/schema.org/Person`;

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
      url: homeUrl
    },
    {
      '@type': 'ProfilePage',
      '@id': `${homeUrl}#/schema.org/ProfilePage`,
      url: homeUrl,
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
      url: homeUrl,
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
