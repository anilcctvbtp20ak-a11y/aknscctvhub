import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security Products & Inventory',
  description:
    'Browse 5MP IP cameras, CP Plus DVR/NVR recorders, Tenda 4G SIM routers, PoE switches, and Cat6 cables stocked at wholesale prices in Bharatpur.',
  alternates: {
    canonical: 'https://aknscctvhub.com/products',
  },
  openGraph: {
    title: 'Security Products & Inventory | Anil Kumar & Sons Bharatpur',
    description:
      'Browse 5MP IP cameras, CP Plus DVR/NVR recorders, Tenda 4G SIM routers, PoE switches, and Cat6 cables stocked at wholesale prices in Bharatpur.',
    url: 'https://aknscctvhub.com/products',
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
