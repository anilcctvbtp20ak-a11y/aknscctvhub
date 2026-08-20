import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CCTV & IT Networking Services',
  description:
    'Expert CCTV camera installation, optical fiber splicing, IP camera setup, AMC maintenance, and network cabling in Bharatpur by Er. Rajat Garg.',
  alternates: {
    canonical: 'https://aknscctvhub.com/services',
  },
  openGraph: {
    title: 'CCTV & IT Networking Services | Anil Kumar & Sons Bharatpur',
    description:
      'Expert CCTV camera installation, optical fiber splicing, IP camera setup, AMC maintenance, and network cabling in Bharatpur by Er. Rajat Garg.',
    url: 'https://aknscctvhub.com/services',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
