import '$shared/global-styles/global.css';
import { ReactNode } from 'react';

export const metadata = {
  title: "Anton Neuhold's Portfolio",
  description: 'Senior Software Engineer portfolio'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
