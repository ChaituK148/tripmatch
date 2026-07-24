import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TripMatch — Discover Your Perfect Travel Destination',
  description:
    'Take our personality quiz and discover the travel destinations that match your soul. Get personalized travel recommendations based on your unique personality traits.',
  keywords: 'travel, personality quiz, destination finder, travel recommendations, wanderlust',
  openGraph: {
    title: 'TripMatch — Your Travel Personality Match',
    description: 'Discover destinations matched to your personality. Take the quiz!',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
