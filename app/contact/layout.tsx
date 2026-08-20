import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us & Free Site Survey',
  description:
    'Contact Er. Rajat Garg at Anil Kumar & Sons in Bharatpur for free CCTV site surveys, phone consultation, WhatsApp queries, and store location directions.',
  alternates: {
    canonical: 'https://aknscctvhub.com/contact',
  },
  openGraph: {
    title: 'Contact Us & Free Site Survey | Anil Kumar & Sons Bharatpur',
    description:
      'Contact Er. Rajat Garg at Anil Kumar & Sons in Bharatpur for free CCTV site surveys, phone consultation, WhatsApp queries, and store location directions.',
    url: 'https://aknscctvhub.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
