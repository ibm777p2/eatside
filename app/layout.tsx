import type { Metadata, Viewport } from 'next';
import { Inter_Tight } from 'next/font/google';
import './globals.css';

const sans = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Eatside — Residency: Transforming Dark Kitchens Into Viral Dining',
  description:
    'Not a restaurant. Not a pop-up. A residency. Eatside matches underutilized commercial kitchens with creator-chefs for one-night dining residencies.',
  openGraph: {
    title: 'Eatside — Empty kitchens. Full tables.',
    description: 'Airbnb for restaurant nights. Kitchens earn on dead nights, creator-chefs cook for their audience.',
    images: ['/images/service.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#171517',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body>{children}</body>
    </html>
  );
}
