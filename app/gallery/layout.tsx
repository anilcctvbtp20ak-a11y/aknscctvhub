import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Gallery & Certificates',
  description:
    'Explore real CCTV installation project photos, security expo stall displays, and official CP Plus, Dahua, Uniview distributor certificates in Bharatpur.',
  alternates: {
    canonical: 'https://aknscctvhub.com/gallery',
  },
  openGraph: {
    title: 'Project Gallery & Certificates | Anil Kumar & Sons Bharatpur',
    description:
      'Explore real CCTV installation project photos, security expo stall displays, and official CP Plus, Dahua, Uniview distributor certificates in Bharatpur.',
    url: 'https://aknscctvhub.com/gallery',
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
