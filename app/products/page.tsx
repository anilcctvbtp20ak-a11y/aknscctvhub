'use client';

import React, { useState } from 'react';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Products', icon: 'grid_view' },
    { id: 'cctv', label: 'CCTV & IP Cameras', icon: 'videocam' },
    { id: 'dvrnvr', label: 'DVR & NVR Recorders', icon: 'storage' },
    { id: 'routers', label: 'Wi-Fi & 4G Routers', icon: 'router' },
    { id: 'accessories', label: 'Switches & Access', icon: 'settings_ethernet' },
    { id: 'cables', label: 'Cables & Wiring', icon: 'cable' },
    { id: 'epbx', label: 'EPBX Intercom', icon: 'phone_in_talk' },
    { id: 'it', label: 'IT & Computers', icon: 'computer' },
  ];

  const products = [
    {
      id: 1,
      name: '5MP IP Bullet Camera',
      category: 'cctv',
      brand: 'Velvu / UNV',
      image: 'product-images/bullet-camera-5mp.jpg',
      badge: 'Outdoor HD',
      description: 'Outdoor weatherproof camera with 5MP resolution, clear IR night vision up to 30m, and motion alert.',
      price: 'Wholesale Deal',
    },
    {
      id: 2,
      name: '2.4MP Dome Camera',
      category: 'cctv',
      brand: 'CP Plus',
      image: 'product-images/dome-camera-2.4mp.jpg',
      badge: 'Indoor Best',
      description: 'Compact dome camera for ceiling mounting in shops, homes, and office rooms with smart IR night view.',
      price: 'Top Seller',
    },
    {
      id: 3,
      name: '4-Ch HD DVR',
      category: 'dvrnvr',
      brand: 'CP Plus',
      image: 'product-images/dvr-4ch.jpg',
      badge: 'Home DVR',
      description: '4-channel video recorder supporting 1080p cameras, mobile phone remote access, and HDMI output.',
      price: 'Genuine Warranty',
    },
    {
      id: 4,
      name: '16-Ch 4K NVR Recorder',
      category: 'dvrnvr',
      brand: 'CP Plus / UNV',
      image: 'product-images/nvr-16ch.jpg',
      badge: '4K Commercial',
      description: '16-channel Network Video Recorder for commercial IP camera surveillance setups with dual HDD slots.',
      price: 'Enterprise',
    },
    {
      id: 5,
      name: 'N301 Wi-Fi Router',
      category: 'routers',
      brand: 'Tenda',
      image: 'product-images/n301-router.jpg',
      badge: 'Home Wi-Fi',
      description: '300Mbps easy setup wireless router with 2 omni antennas for high-speed internet coverage.',
      price: 'Budget Choice',
    },
    {
      id: 6,
      name: '4G SIM-Slot Router',
      category: 'routers',
      brand: 'TP-Link / Tenda',
      image: 'product-images/router-4g-sim.jpg',
      badge: '4G Mobility',
      description: 'Plug-and-play 4G LTE Wi-Fi router with SIM card slot for instant remote camera connectivity.',
      price: 'Popular',
    },
    {
      id: 7,
      name: '8-Port PoE Gigabit Switch',
      category: 'accessories',
      brand: 'CP Plus / UNV',
      image: 'product-images/poe-switch-8port.jpg',
      badge: 'PoE Power',
      description: '8-port Power-Over-Ethernet switch to supply data and power to IP cameras over single Cat6 cables.',
      price: 'Pro Gear',
    },
    {
      id: 8,
      name: 'Video Door Phone System',
      category: 'accessories',
      brand: 'Godrej / CP Plus',
      image: 'product-images/video-door-phone.jpg',
      badge: 'Home Safety',
      description: '7-inch color monitor screen with outdoor night-vision camera bell and electronic lock opener.',
      price: 'Smart Access',
    },
    {
      id: 9,
      name: '90m Cat6 CCTV Cable Roll',
      category: 'cables',
      brand: 'D-Link / Finolex',
      image: 'product-images/cctv-cable-90m.jpg',
      badge: '90M Heavy',
      description: 'Pure copper 90-meter camera cable for high-speed video transmission with minimal signal drop.',
      price: 'Heavy Duty',
    },
    {
      id: 10,
      name: 'Analog EPBX Intercom',
      category: 'epbx',
      brand: 'Matrix / Syntel',
      image: 'product-images/epbx-analog.jpg',
      badge: 'Office Calls',
      description: 'Multi-extension analog EPBX phone system for internal room calls in hotels, hospitals, and offices.',
      price: 'Custom Lines',
    },
    {
      id: 11,
      name: 'IP-Based EPBX System',
      category: 'epbx',
      brand: 'Grandstream',
      image: 'product-images/epbx-ip.jpg',
      badge: 'IP Telecom',
      description: 'Modern IP PBX system for SIP trunking, mobile extension calls, and multi-branch communication.',
      price: 'Pro Telecom',
    },
    {
      id: 12,
      name: 'Lenovo Business Laptop',
      category: 'it',
      brand: 'Lenovo',
      image: 'product-images/laptop-lenovo.jpg',
      badge: 'Core i5',
      description: 'Durable Lenovo laptop for office work, CCTV monitoring software, accounting, and daily tasks.',
      price: 'Genuine Warranty',
    },
    {
      id: 13,
      name: 'Desktop PC Tower & Monitor',
      category: 'it',
      brand: 'Custom Build / HP',
      image: 'product-images/desktop-pc.jpg',
      badge: 'Workstation',
      description: 'High-speed desktop PC setup with HD monitor, SSD storage, and pre-installed CCTV viewing tools.',
      price: 'Ready Stock',
    },
    {
      id: 14,
      name: 'All-in-One (AIO) PC',
      category: 'it',
      brand: 'HP / Lenovo',
      image: 'product-images/aio-pc.jpg',
      badge: 'Space Saver',
      description: 'Sleek All-in-One desktop PC with integrated screen, wireless keyboard-mouse, and fast Wi-Fi.',
      price: 'Modern Office',
    },
    {
      id: 15,
      name: 'Laser Document Printer',
      category: 'it',
      brand: 'HP / Canon',
      image: 'product-images/printer.jpg',
      badge: 'Fast Print',
      description: 'High-speed monochrome laser printer for crisp document printing, bill invoices, and scanning.',
      price: 'Office Grade',
    },
    {
      id: 16,
      name: 'Flatbed Document Scanner',
      category: 'it',
      brand: 'Epson / HP',
      image: 'product-images/scanner.png',
      badge: 'HD Scan',
      description: 'High-resolution document scanner for archiving official records, invoices, and photo ID cards.',
      price: 'Wholesale',
    },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              className="text-white font-medium hover:text-secondary transition-colors duration-200 font-body-md text-body-md"
              href="/services"
            >
              Services
            </a>
            <a
              className="text-secondary border-b-2 border-secondary pb-1 font-medium font-body-md text-body-md"
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
          <a className="flex flex-col items-center text-on-surface-variant" href="/services">
            <span className="material-symbols-outlined">build</span>
            <span className="text-[10px] font-medium mt-1">Services</span>
          </a>
          <a className="flex flex-col items-center text-secondary" href="/products">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              inventory_2
            </span>
            <span className="text-[10px] font-medium mt-1">Products</span>
          </a>
          <a className="flex flex-col items-center text-on-surface-variant" href="/contact">
            <span className="material-symbols-outlined">contact_support</span>
            <span className="text-[10px] font-medium mt-1">Contact</span>
          </a>
        </div>
      </nav>

      <main className="bg-surface-container-lowest min-h-screen">
        {/*  Page Header (Dark Navy Hero)  */}
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
                  Products
                </li>
              </ol>
            </nav>

            <span className="bg-secondary/20 text-gold text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-gold/30 inline-block mb-3">
              100% GENUINE HARDWARE INVENTORY
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Products We Stock &amp; Supply
              <span className="sr-only">.</span>
            </h1>

            <p className="text-sm md:text-base text-inverse-on-surface/85 max-w-3xl leading-relaxed mb-8">
              Explore authorized security surveillance hardware, IP cameras, 4K NVRs, 4G Wi-Fi routers, biometric locks, Cat6 cables, and IT desktop solutions available at wholesale &amp; retail prices in Bharatpur.
            </p>

            {/*  Live Search Box  */}
            <div className="max-w-xl relative">
              <span className="material-symbols-outlined absolute left-4 top-3.5 text-navy/50 text-xl">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by brand (CP Plus, Dahua, Tenda) or category..."
                className="w-full bg-white text-navy placeholder:text-navy/50 pl-12 pr-4 py-3 rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-secondary shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-xs bg-surface-container-high text-navy px-2 py-1 rounded-md font-bold hover:bg-secondary hover:text-white transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </section>

        {/*  Interactive Category Filter Pills  */}
        <section className="py-6 bg-white border-b border-outline-variant/40 sticky top-20 md:top-24 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 min-w-max pb-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer shadow-sm ${
                    activeCategory === cat.id
                      ? 'bg-secondary text-white shadow-md scale-105'
                      : 'bg-surface-container-low text-navy hover:bg-secondary/10 hover:text-secondary'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/*  Product Cards Grid  */}
        <section className="py-12 md:py-16 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant/30">
              <p className="text-xs md:text-sm font-bold text-navy">
                Showing <span className="text-secondary">{filteredProducts.length}</span> Products
              </p>
              <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Genuine Brand Warranty Guaranteed</span>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-outline-variant text-center max-w-md mx-auto my-8">
                <span className="material-symbols-outlined text-5xl text-navy/30 mb-3">
                  search_off
                </span>
                <h3 className="font-bold text-navy text-lg mb-2">No Products Found</h3>
                <p className="text-xs text-on-surface-variant mb-6">
                  No items matched your search query "{searchQuery}". Try searching for another brand like CP Plus, Dahua, or UNV.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="bg-secondary text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-[#cf333f] transition-all shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* Product Image Box */}
                      <div className="w-full h-52 bg-surface-container-low relative overflow-hidden flex items-center justify-center p-4">
                        <img
                          loading="lazy"
                          height="400"
                          width="400"
                          src={product.image}
                          alt={product.name}
                          className="object-contain max-h-44 w-auto group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
                        />
                        <div className="absolute top-3 left-3 bg-navy text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider">
                          {product.badge}
                        </div>
                        <div className="absolute top-3 right-3 bg-secondary/10 text-secondary border border-secondary/20 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {product.brand}
                        </div>
                      </div>

                      {/* Content Box */}
                      <div className="p-5">
                        <h3 className="font-bold text-navy text-base mb-2 group-hover:text-secondary transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2 mb-4">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="px-5 pb-5 pt-3 border-t border-outline-variant/30 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-gold bg-navy px-2.5 py-1 rounded-md">
                        {product.price}
                      </span>
                      <a
                        href={`https://wa.me/918947976889?text=${encodeURIComponent(
                          `Hello Anil Kumar & Sons, I want to enquire about ${product.name} (${product.brand}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1 shrink-0"
                      >
                        <span className="material-symbols-outlined text-sm">chat</span>
                        <span>Enquire</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/*  CTA Banner  */}
        <section className="bg-navy text-white py-14 px-margin-mobile md:px-margin-desktop text-center relative overflow-hidden border-t border-white/10">
          <div className="max-w-4xl mx-auto relative z-10">
            <span className="bg-gold/20 text-gold text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-gold/30 inline-block mb-3">
              BULK &amp; WHOLESALE ENQUIRIES
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Need Bulk Security Equipment or Custom Quotation?
            </h2>
            <p className="text-sm md:text-base text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              We offer special contractor pricing and wholesale deals on CP Plus, Dahua, UNV, and TP-Link products across Rajasthan. Contact our team today!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/contact"
                className="bg-secondary text-white font-bold py-3.5 px-8 rounded-xl hover:bg-[#cf333f] transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">description</span>
                <span>Get Custom Quote</span>
              </a>
              <a
                href="tel:+918947976889"
                className="bg-white/10 text-white hover:bg-white/20 font-bold py-3.5 px-8 rounded-xl border border-white/20 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg text-gold">call</span>
                <span>Call Us: +91 89479 76889</span>
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
                <span className="sr-only">.</span>
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
                <span className="sr-only">.</span>
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
