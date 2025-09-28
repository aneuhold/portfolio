import '$shared/global-styles/global.css';
import { Metadata } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import { ReactNode } from 'react';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
  preload: true // Preload critical font
});
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-roboto-mono',
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

/**
 * Root layout component that wraps the entire application.
 * Sets up fonts, metadata, and provides the HTML structure for all pages.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${robotoMono.variable}`}>{children}</body>
    </html>
  );
}
