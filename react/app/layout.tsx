import '$shared/global-styles/global.css';
import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Script from 'next/script';
import { ReactNode } from 'react';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  preload: true // Preload critical font
});

export const metadata: Metadata = {
  title: "Anton G Neuhold Jr's Portfolio",
  description:
    'A portfolio with various projects and social links for the developer Anton G Neuhold Jr.',
  icons: {
    icon: '/favicon.ico'
  }
};

const GA_MEASUREMENT_ID = 'G-JJX60BKWFQ';

/**
 * Root layout component that wraps the entire application.
 * Sets up fonts, metadata, and provides the HTML structure for all pages.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Script id="google-analytics-deferred" strategy="afterInteractive">
        {`
// Initialize Google Analytics with deferred loading for better performance
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', {
  page_path: window.location.pathname,
});

// Defer loading of the Google Tag Manager script
function loadGoogleAnalytics() {
  const script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
  script.async = true;
  document.head.appendChild(script);
}

// Load after page is interactive, or after 1 second (whichever comes first)
if (document.readyState === 'complete') {
  setTimeout(loadGoogleAnalytics, 1000);
} else {
  window.addEventListener('load', () => setTimeout(loadGoogleAnalytics, 1000));
}
        `}
      </Script>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
