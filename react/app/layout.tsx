import { ReactNode } from 'react';
import ThemeRegistry from '../theme/ThemeRegistry';

export const metadata = {
  title: "Anton Neuhold's Portfolio",
  description: 'Senior Software Engineer portfolio'
} as const;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
