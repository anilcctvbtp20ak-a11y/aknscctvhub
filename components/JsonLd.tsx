import React from 'react';

export default function JsonLd() {
  const schema = {
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
      {
        '@type': 'FAQPage',
        '@id': 'https://aknscctvhub.com/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What brands of CCTV security cameras do you sell and install in Bharatpur?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Anil Kumar & Sons sells, installs, and services all leading CCTV brands including CP Plus, Uniview (UNV), Dahua, TP-Link, D-Link, IMOU, Ezviz, Qubo, and Tenda with official manufacturer warranty support in Bharatpur.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you provide free site surveys for CCTV camera installation in Bharatpur?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, Er. Rajat Garg and our technical team provide 100% free, no-obligation site surveys and custom security architecture proposals for homes, shops, offices, and factories in Bharatpur, Rajasthan.',
            },
          },
          {
            '@type': 'Question',
            name: 'What services are included in CCTV Annual Maintenance Contract (AMC)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Our AMC service covers regular DVR/NVR health audits, camera lens cleaning, cable inspections, firmware updates, and priority emergency repair support to keep your security system running 24/7.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which is better for home security: IP Camera or Analog Camera?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Analog cameras connect via coaxial cables to a DVR recorder. IP cameras connect via network cables to an NVR, offering sharper 4K/5MP video resolution, remote mobile viewing, and AI motion alerts.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you repair existing CCTV systems and DVRs in Bharatpur?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, we offer complete diagnostic repair, power supply replacement, hard disk recovery, and cable re-wiring for all types of CCTV cameras, DVRs, NVRs, EPBX intercoms, and IT network routers in Bharatpur.',
            },
          },
        ],
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

