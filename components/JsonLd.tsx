import React from 'react';

export default function JsonLd() {
  const businessSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://aknscctvhub.com/#business',
        name: 'Anil Kumar & Sons Digital Shop',
        url: 'https://aknscctvhub.com',
        logo: 'https://aknscctvhub.com/logo.png',
        image: 'https://aknscctvhub.com/logo.png',
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
          '@id': 'https://aknscctvhub.com/#business',
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Bharatpur, Rajasthan',
        },
        serviceType: 'Security Camera Installation, DVR Repair, Network Cabling',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What brands of security systems do you install?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We install and support all leading brands including CP Plus, Uniview (UNV), Dahua, TP-Link, D-Link, IMOU, Ezviz, Qubo, and Tenda with official manufacturer warranties.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide site surveys for installations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We provide a 100% free, no-obligation site survey and consultation for homes, businesses, and industrial sites in Bharatpur.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is covered under an Annual Maintenance Contract (AMC)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our security AMC covers regular hardware health checks, camera lens cleaning, cabling inspections, software/firmware updates, and priority diagnostic support to keep your systems running 24/7.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which is the best security camera for home use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For home safety, you can pick IP cameras for clear HD video, or smart Wi-Fi cameras for easy control on your phone.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between an IP camera and an analog camera?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Analog cameras connect via coaxial cables to a DVR recorder. IP cameras connect via network cables to an NVR, offering sharper HD video and smart motion alerts.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}


