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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', {
  page_path: window.location.pathname,
});
        `}
      </Script>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
