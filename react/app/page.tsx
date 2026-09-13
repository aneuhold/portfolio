import Footer from '$components/Footer';
import Hero from '$components/Hero';
import Timeline from '$components/Timeline/Timeline';
import { Metadata } from 'next';
import { seoGraphJson, siteMetadata } from 'shared';

const { siteUrl, siteName, title, description, ogImage } = siteMetadata;

// The canonical link and `og:url` point at the SvelteKit site, so search engines treat it as the
// primary copy of this page. Next fills in the `twitter:` title, description, and image from
// `openGraph`.
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    type: 'website',
    siteName,
    locale: 'en_US',
    title,
    description,
    url: siteUrl,
    images: [ogImage]
  },
  twitter: {
    card: 'summary_large_image'
  }
};

/**
 * Main page component that renders the portfolio layout.
 * Combines the Hero section, Timeline section, and Footer into a cohesive homepage.
 */
export default function Page() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: seoGraphJson }} />
      <Hero />
      <Timeline />
      <Footer />
    </main>
  );
}
