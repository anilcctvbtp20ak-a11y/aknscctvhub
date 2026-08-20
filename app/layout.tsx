import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import JsonLd from '@/components/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aknscctvhub.com'),
  title: {
    default: 'CCTV Camera Installation Bharatpur | Anil Kumar & Sons',
    template: '%s | Anil Kumar & Sons Bharatpur',
  },
  description:
    'Professional CCTV camera installation in Bharatpur. Anil Kumar & Sons offers security cameras, IP systems, IT networking, and AMC maintenance by Er. Rajat Garg.',
  keywords: [
    'CCTV camera installation Bharatpur',
    'CCTV dealer in Bharatpur',
    'best CCTV camera services Bharatpur',
    'home security camera installation',
    'CP Plus dealer Bharatpur',
    'Hikvision dealer Bharatpur',
    'Er Rajat Garg',
    'security system repair Bharatpur',
    'CCTV AMC services Bharatpur',
  ],
  authors: [{ name: 'Er. Rajat Garg', url: 'https://aknscctvhub.com' }],
  creator: 'Anil Kumar & Sons Digital Shop',
  publisher: 'Anil Kumar & Sons Digital Shop',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://aknscctvhub.com/',
    siteName: 'Anil Kumar & Sons Digital Shop',
    title: 'Best CCTV Camera Installation in Bharatpur | Anil Kumar & Sons',
    description:
      'Get professional CCTV installation, IP cameras, DVR/NVR setup, and IT networking in Bharatpur, Rajasthan. 7+ years of trusted service by Er. Rajat Garg.',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'Anil Kumar & Sons CCTV Shop Bharatpur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best CCTV Camera Installation in Bharatpur | Anil Kumar & Sons',
    description:
      'Get professional CCTV installation, IP cameras, DVR/NVR setup, and IT networking in Bharatpur, Rajasthan.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '3r_Eecg38iP2W6ri21Qbfiq228VeOOHUQIhHOsKeGnQ',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.className}`}>
      <head>
        <meta name="google-site-verification" content="3r_Eecg38iP2W6ri21Qbfiq228VeOOHUQIhHOsKeGnQ" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
        />
        <JsonLd />
      </head>
      <body className="bg-background text-on-background font-body-md min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}

