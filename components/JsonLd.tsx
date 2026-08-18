import React from 'react';

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://aknscctv.com/#business',
        name: 'Anil Kumar & Sons Digital Shop',
        url: 'https://aknscctv.com',
        logo: 'https://aknscctv.com/logo.png',
        image: 'https://aknscctv.com/logo.png',
        description: 'Authorized CCTV dealer and security camera installation specialist in Bharatpur, Rajasthan. Offers IP cameras, DVR/NVR repair, IT networking, and AMC services.',
        telephone: '+918947976889',
        priceRange: '₹₹',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Near New Mandi',
          addressLocality: 'Bharatpur',
          addressRegion: 'Rajasthan',
          postalCode: '321001',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 27.217,
          longitude: 77.49,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '20:00',
          },
        ],
        founder: {
          '@type': 'Person',
          name: 'Er. Rajat Garg',
        },
        sameAs: [
          'https://wa.me/918947976889',
        ],
      },
      {
        '@type': 'Service',
        name: 'CCTV Camera Installation & AMC Services',
        provider: {
          '@id': 'https://aknscctv.com/#business',
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Bharatpur, Rajasthan',
        },
        serviceType: 'Security Camera Installation, DVR Repair, Network Cabling',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
