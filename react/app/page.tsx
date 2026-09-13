import Footer from '$components/Footer';
import Hero from '$components/Hero';
import Timeline from '$components/Timeline/Timeline';

/**
 * Main page component that renders the portfolio layout.
 * Combines the Hero section, Timeline section, and Footer into a cohesive homepage.
 */
export default function Page() {
  return (
    <main>
      <Hero />
      <Timeline />
      <Footer />
    </main>
  );
}
