'use client';

import React, { useState } from 'react';

export default function ServicesPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const services = [
    {
      id: 'cctv',
      title: 'CCTV Camera System Installation',
      category: 'Surveillance Hardware',
      price: 'From ₹1,350',
      icon: 'videocam',
      badge: 'Popular Choice',
      description:
        'High-definition indoor & outdoor CCTV cameras for homes, offices, retail shops, factories, and schools in Bharatpur. Includes site survey, camera position planning, and clean PVC pipe wiring.',
      features: [
        'Free On-Site Camera Survey',
        'HD Night Vision & Infrared Support',
        'Clean Concealed PVC Pipe Wiring',
        'Mobile Phone Live View Setup',
      ],
      linkText: 'Get Installation Quote',
    },
    {
      id: 'ip-cameras',
      title: 'AI-Enabled IP Cameras & NVR Storage',
      category: 'Smart Network Security',
      price: 'Custom Architecture',
      icon: 'photo_camera',
      badge: '4K Ultra HD',
      description:
        'Advanced IP camera systems with Network Video Recorders (NVR). Features 4K resolution, AI motion detection, face detection, line-crossing alerts, and multi-user phone monitoring.',
      features: [
        '4K Ultra HD Video Resolution',
        'AI Smart Motion & Intrusion Alert',
        'Power Over Ethernet (PoE) Wiring',
        'Remote Cloud & NVR Storage',
      ],
      linkText: 'Explore IP Systems',
    },
    {
      id: 'wifi-cameras',
      title: 'Wi-Fi & 4G SIM Cameras',
      category: 'Wireless Mobility',
      price: 'Best Seller',
      icon: 'wifi',
      badge: '360° PTZ View',
      description:
        'Wireless security cameras with built-in 4G SIM slots or Wi-Fi connectivity. Features 360° pan-tilt rotation, two-way talk, motion tracking, and instant mobile phone push notifications.',
      features: [
        '360° Pan-Tilt Smart Rotation',
        'Built-in 4G SIM & Wi-Fi Slots',
        'Two-Way Audio Talkback',
        'MicroSD & Cloud Recording',
      ],
      linkText: 'View Wireless Cameras',
    },
    {
      id: 'vdp',
      title: 'Video Door Phone (VDP) & Smart Locks',
      category: 'Access & Visitor Safety',
      price: 'Home Security',
      icon: 'door_front',
      badge: 'Visitor Safety',
      description:
        'Know who is at your front gate or door before opening. Features HD indoor monitor screen, outdoor night-vision camera bell, and optional electronic door lock release.',
      features: [
        '7-Inch HD Touch Screen Monitor',
        'Night-Vision Outdoor Camera Bell',
        'Two-Way Intercom Audio',
        'Electronic Door Lock Integration',
      ],
      linkText: 'Check VDP Solutions',
    },
    {
      id: 'biometric',
      title: 'Biometric Attendance & Access Control',
      category: 'Commercial Security',
      price: 'Enterprise Grade',
      icon: 'fingerprint',
      badge: 'Staff Tracking',
      description:
        'Biometric fingerprint, RFID card, and AI face recognition attendance devices for offices, schools, and factories. Automated shift logs and desktop payroll software reporting.',
      features: [
        'AI Face Recognition & Fingerprint',
        'Automated Payroll Software Logs',
        'Electromagnetic Door Access Lock',
        'Multi-Branch Network Sync',
      ],
      linkText: 'Setup Attendance System',
    },
    {
      id: 'amc',
      title: 'Annual Maintenance Contracts (AMC)',
      category: '24/7 System Health',
      price: 'Priority Support',
      icon: 'build_circle',
      badge: 'Zero Downtime',
      description:
        'Keep your security cameras and IT networking operating 24/7 without gaps. Our AMC packages cover routine site visits, lens cleaning, cabling inspection, and instant repair visits.',
      features: [
        'Scheduled Preventive Maintenance',
        'Priority Breakdown Visit Support',
        'Camera Lens Cleaning & Focus',
        'Free Password Reset & App Re-sync',
      ],
      linkText: 'Book AMC Package',
    },
  ];

  const faqs = [
    {
      q: 'What brands of security systems do you install?',
      a: 'We install and support all top authorized brands including CP Plus, Uniview (UNV), Dahua, TP-Link, D-Link, IMOU, Ezviz, Qubo, Tenda, and Mantra with official manufacturer brand warranties.',
    },
    {
      q: 'Do you provide free site surveys for installations?',
      a: 'Yes! We provide 100% free, no-obligation site surveys and consultation for homes, retail shops, schools, factories, and commercial sites in Bharatpur.',
    },
    {
      q: 'What is covered under an Annual Maintenance Contract (AMC)?',
      a: 'Our security AMC covers regular hardware health checks, camera lens cleaning, cabling inspections, software updates, free mobile app setup, and priority diagnostic support to keep your security active 24/7.',
    },
    {
      q: 'Which is the best security camera for home use?',
      a: 'For home safety, you can choose IP Cameras (PoE NVR) for ultra-clear 4K video, or Smart Wi-Fi 4G SIM Cameras (IMOU/Ezviz) for 360-degree phone rotation control. Call us at +91 89479 76889 for advice.',
    },
    {
      q: 'What is the difference between an IP Camera and an Analog Camera?',
      a: 'Analog cameras connect via coaxial cables to a DVR recorder and are budget-friendly. IP cameras connect via Cat6 network cables to an NVR, offering sharper video resolution, PoE power, and AI smart motion alerts.',
    },
  ];

  return (
    <>
      {/*  TopNavBar (Mobile)  */}
      <div className="md:hidden sticky top-0 w-full z-50 bg-navy border-b border-white/10 shadow-sm h-20 flex items-center justify-between px-margin-mobile">
        <a className="flex items-center gap-2 h-full" href="/">
          <img
            height="724"
            width="1024"
            src="logo.png"
            alt="ANIL KUMAR & SONS"
            className="h-20 w-auto object-contain py-1"
          />
        </a>
        <a
          className="bg-secondary text-on-secondary px-4 py-2 rounded-lg font-bold text-sm hover:bg-opacity-90 transition-opacity"
          href="/contact"
        >
          Consultation
        </a>
      </div>

      {/*  TopNavBar (Web)  */}
      <header className="hidden md:flex sticky top-0 w-full z-50 bg-navy border-b border-white/10 shadow-sm h-24">
        <div className="flex justify-between items-center px-margin-desktop w-full max-w-7xl mx-auto h-full">
          <a className="flex items-center gap-2 h-full" href="/">
            <img
              height="724"
              width="1024"
              src="logo.png"
              alt="ANIL KUMAR & SONS"
              className="h-24 w-auto object-contain py-1"
            />
          </a>
          <nav className="flex gap-gutter items-center">
            <a
              className="text-white font-medium hover:text-secondary transition-colors duration-200 font-body-md text-body-md"
              href="/"
            >
              Home
            </a>
            <a
              className="text-secondary border-b-2 border-secondary pb-1 font-medium font-body-md text-body-md"
              href="/services"
            >
              Services
            </a>
            <a
              className="text-white font-medium hover:text-secondary transition-colors duration-200 font-body-md text-body-md"
              href="/products"
            >
              Products
            </a>
            <a
              className="text-white font-medium hover:text-secondary transition-colors duration-200 font-body-md text-body-md"
              href="/gallery"
            >
              Gallery
            </a>
            <a
              className="text-white font-medium hover:text-secondary transition-colors duration-200 font-body-md text-body-md"
              href="/contact"
            >
              Contact
            </a>
            <a
              className="ml-4 bg-secondary text-on-secondary px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-opacity"
              href="/contact"
            >
              Get Free Consultation
            </a>
          </nav>
        </div>
      </header>

      {/*  SideNavBar (Mobile)  */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface-container-lowest border-t border-outline-variant pb-safe">
        <div className="flex justify-around items-center h-16">
          <a className="flex flex-col items-center text-on-surface-variant" href="/">
            <span className="material-symbols-outlined">home</span>
            <span className="text-[10px] font-medium mt-1">Home</span>
          </a>
          <a className="flex flex-col items-center text-secondary" href="/services">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              build
            </span>
            <span className="text-[10px] font-medium mt-1">Services</span>
          </a>
          <a className="flex flex-col items-center text-on-surface-variant" href="/products">
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="text-[10px] font-medium mt-1">Products</span>
          </a>
          <a className="flex flex-col items-center text-on-surface-variant" href="/contact">
            <span className="material-symbols-outlined">contact_support</span>
            <span className="text-[10px] font-medium mt-1">Contact</span>
          </a>
        </div>
      </nav>

      <main className="flex-grow bg-surface-container-lowest">
        {/*  Page Header (Hero Dark Banner)  */}
        <section className="bg-navy text-white py-12 md:py-16 px-margin-mobile md:px-margin-desktop border-b border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center space-x-2 text-xs font-semibold text-white/70">
                <li>
                  <a className="hover:text-secondary transition-colors" href="/">
                    Home
                  </a>
                </li>
                <li>
                  <span className="material-symbols-outlined text-xs text-white/40">
                    chevron_right
                  </span>
                </li>
                <li aria-current="page" className="text-secondary font-bold">
                  Services
                </li>
              </ol>
            </nav>

            <span className="bg-secondary/20 text-gold text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-gold/30 inline-block mb-3">
              EXPERT SURVEILLANCE &amp; IT NETWORKING
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Our Security &amp; IT Installation Services
              <span className="sr-only">.</span>
            </h1>

            <p className="text-sm md:text-base text-inverse-on-surface/85 max-w-3xl leading-relaxed mb-6">
              We engineer, install, and service HD CCTV camera setups, AI IP surveillance, biometric attendance, and commercial IT optical fiber networking across Bharatpur. Guaranteed clean PVC pipe wiring, genuine brand hardware, and 24/7 technical support.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/contact"
                className="bg-secondary text-white px-7 py-3 rounded-xl font-bold hover:bg-[#cf333f] transition-all shadow-lg flex items-center gap-2"
              >
                <span>Request Free Site Survey</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
              <a
                href="tel:+918947976889"
                className="bg-white/10 text-white hover:bg-white/20 px-6 py-3 rounded-xl font-bold border border-white/20 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-gold">call</span>
                <span>Call Engineer: +91 89479 76889</span>
              </a>
            </div>
          </div>
        </section>

        {/*  Core Services Grid  */}
        <section className="py-12 md:py-20 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-3 inline-block font-extrabold">
                OUR CORE CAPABILITIES
              </span>
              <h2 className="font-headline-lg text-3xl md:text-4xl font-extrabold text-navy">
                Complete Security &amp; IT Infrastructure
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="group bg-white p-7 rounded-2xl border border-outline-variant shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm">
                        <span className="material-symbols-outlined text-3xl">{s.icon}</span>
                      </div>
                      <span className="bg-navy/5 text-navy text-[10px] font-extrabold px-3 py-1 rounded-full border border-navy/10 uppercase tracking-wider">
                        {s.badge}
                      </span>
                    </div>

                    <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                      {s.category}
                    </span>
                    <h3 className="font-bold text-navy text-xl mt-1 mb-3 group-hover:text-secondary transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed mb-5">
                      {s.description}
                    </p>

                    <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40 mb-6">
                      <p className="text-xs font-bold text-navy mb-2 uppercase tracking-wide">Key Features:</p>
                      <ul className="space-y-1.5 text-xs text-on-surface-variant">
                        {s.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                    <span className="text-xs font-bold text-gold bg-navy px-3 py-1.5 rounded-lg shadow-sm">
                      {s.price}
                    </span>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary group-hover:translate-x-1 transition-transform"
                    >
                      <span>{s.linkText}</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/*  IT Networking Hub Box (Dark Navy Glassmorphism)  */}
            <div className="mt-12 bg-navy text-white p-8 rounded-2xl border border-white/15 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/15 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary text-white rounded-xl flex items-center justify-center shadow">
                      <span className="material-symbols-outlined text-xl">lan</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-white">
                        Structured Commercial IT Networking &amp; Fiber Splicing
                      </h3>
                      <p className="text-xs text-white/70">
                        Complete Rack Architecture, Gigabit Cabling &amp; Mesh Wi-Fi Setup
                      </p>
                    </div>
                  </div>
                  <span className="bg-white/10 text-secondary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/15 shrink-0 w-fit">
                    Cat6 &amp; Fiber Certified
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
                  <div className="p-3.5 bg-white/10 hover:bg-secondary hover:text-white rounded-xl text-xs font-bold border border-white/15 transition-all duration-300 transform hover:-translate-y-1 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer">
                    <span className="material-symbols-outlined text-sm">cable</span>
                    LAN Cabling
                  </div>
                  <div className="p-3.5 bg-white/10 hover:bg-secondary hover:text-white rounded-xl text-xs font-bold border border-white/15 transition-all duration-300 transform hover:-translate-y-1 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer">
                    <span className="material-symbols-outlined text-sm">account_tree</span>
                    Structured Cabling
                  </div>
                  <div className="p-3.5 bg-white/10 hover:bg-secondary hover:text-white rounded-xl text-xs font-bold border border-white/15 transition-all duration-300 transform hover:-translate-y-1 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer">
                    <span className="material-symbols-outlined text-sm">dns</span>
                    Server Racks
                  </div>
                  <div className="p-3.5 bg-white/10 hover:bg-secondary hover:text-white rounded-xl text-xs font-bold border border-white/15 transition-all duration-300 transform hover:-translate-y-1 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer">
                    <span className="material-symbols-outlined text-sm">router</span>
                    Wi-Fi Mesh Setup
                  </div>
                  <div className="p-3.5 bg-white/10 hover:bg-secondary hover:text-white rounded-xl text-xs font-bold border border-white/15 transition-all duration-300 transform hover:-translate-y-1 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer">
                    <span className="material-symbols-outlined text-sm">settings_ethernet</span>
                    PoE Switches
                  </div>
                  <div className="p-3.5 bg-white/10 hover:bg-secondary hover:text-white rounded-xl text-xs font-bold border border-white/15 transition-all duration-300 transform hover:-translate-y-1 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer">
                    <span className="material-symbols-outlined text-sm">bolt</span>
                    Fiber Splicing
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*  Frequently Asked Questions (React Controlled Accordion)  */}
        <section className="py-12 md:py-16 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-t border-b border-outline-variant">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-2 inline-block font-extrabold">
                SERVICE QUERIES
              </span>
              <h2 className="font-headline-lg text-3xl font-bold text-navy mb-3">
                Frequently Asked Questions
              </h2>
              <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
                Answers to common questions about security camera installation, warranties, and free site surveys in Bharatpur.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm ${
                    openFaqIndex === index
                      ? 'border-secondary shadow-lg'
                      : 'border-outline-variant hover:border-secondary/50'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full flex justify-between items-center p-5 text-left font-bold text-navy focus:outline-none hover:bg-surface-container-low transition-colors cursor-pointer"
                    aria-expanded={openFaqIndex === index}
                  >
                    <span className="text-sm md:text-base text-navy font-bold">{faq.q}</span>
                    <span
                      className={`material-symbols-outlined transform transition-transform duration-300 text-secondary text-2xl ${
                        openFaqIndex === index ? 'rotate-180 text-secondary' : 'rotate-0 text-navy/60'
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-5 pb-5 pt-1 border-t border-outline-variant/30 text-xs md:text-sm text-on-surface-variant leading-relaxed animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/*  CTA Banner (Red & Navy Gradient)  */}
        <section className="bg-gradient-to-r from-navy via-navy to-secondary py-14 px-margin-mobile md:px-margin-desktop text-center text-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            <span className="bg-gold/20 text-gold text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-gold/30 inline-block mb-3">
              ZERO BLINDSPOT GUARANTEE
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ready to Secure Your Home or Office?
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Book a free site survey with Er Rajat Garg &amp; our certified technical engineers today for a custom security architecture proposal.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/contact"
                className="bg-secondary text-white font-bold py-3.5 px-8 rounded-xl hover:bg-[#cf333f] transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">calendar_month</span>
                <span>Get Free Consultation</span>
              </a>
              <a
                href="https://wa.me/918947976889"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white font-bold py-3.5 px-8 rounded-xl hover:brightness-105 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">chat</span>
                <span>WhatsApp Er Rajat</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/*  Footer  */}
      <footer
        className="bg-primary-container text-on-primary-container pt-12 pb-32 md:pb-10 px-margin-mobile md:px-margin-desktop"
        id="footer"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-8 border-b border-white/10">
            <div>
              <a className="flex items-center gap-2 mb-3 inline-block" href="/">
                <img
                  loading="lazy"
                  height="724"
                  width="1024"
                  src="logo.png"
                  alt="ANIL KUMAR &amp; SONS"
                  className="h-20 w-auto object-contain py-1"
                />
              </a>
              <p className="text-xs text-on-primary-container/70 mt-1 leading-relaxed">
                Smart Security. Reliable Protection. Trusted Service.
                <br />
                Bharatpur, Rajasthan
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">
                Quick Links
              </h4>
              <div className="flex flex-col gap-2 text-xs text-on-primary-container/80">
                <a className="hover:text-white transition-colors" href="/">
                  Home
                </a>
                <a className="hover:text-white transition-colors" href="/services">
                  Services
                </a>
                <a className="hover:text-white transition-colors" href="/products">
                  Products
                </a>
                <a className="hover:text-white transition-colors" href="/gallery">
                  Gallery
                </a>
                <a className="hover:text-white transition-colors" href="/contact">
                  Contact
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">
                Contact Us
              </h4>
              <div className="flex flex-col gap-3 text-xs text-on-primary-container/80">
                <a
                  href="tel:+918947976889"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-base text-secondary">call</span>
                  +91 89479 76889
                </a>
                <a
                  href="mailto:aknscctvbtp20.ak@gmail.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-base text-secondary">mail</span>
                  aknscctvbtp20.ak@gmail.com
                </a>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-base text-secondary mt-0.5">
                    location_on
                  </span>
                  <span>
                    Inside B. Narayan Gate, Near SBI Bank,
                    <br />
                    Bahanera Wale, Bharatpur, Raj - 321001
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 text-center text-xs text-on-primary-container/60">
            © 2026 Anil Kumar &amp; Sons. All rights reserved.
            <span className="mx-2">|</span>
            Designed &amp; Developed by{' '}
            <a
              href="https://www.instagram.com/larkspireservices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-white hover:underline transition-colors font-medium"
            >
              Larkspire Services
            </a>
          </div>
        </div>
      </footer>

      {/*  Fixed WhatsApp Floating Button  */}
      <a
        className="fixed bottom-20 right-6 md:bottom-8 md:right-8 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 hover:shadow-xl border-2 border-white"
        href="https://wa.me/918947976889"
        target="_blank"
        aria-label="WhatsApp"
        rel="noopener noreferrer"
      >
        <svg
          className="w-8 h-8 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>
    </>
  );
}
