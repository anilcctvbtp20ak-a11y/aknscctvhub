'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    requirement: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Anil Kumar & Sons,\n\nI have an enquiry from the website Contact Page:\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Requirement:* ${formData.requirement || 'General Enquiry'}\n*Message:* ${formData.message}`;
    const whatsappUrl = `https://wa.me/918947976889?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

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
              className="text-secondary border-b-2 border-secondary pb-1 font-medium font-body-md text-body-md"
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
          <a className="flex flex-col items-center text-on-surface-variant" href="/products">
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="text-[10px] font-medium mt-1">Products</span>
          </a>
          <a className="flex flex-col items-center text-secondary" href="/contact">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              contact_support
            </span>
            <span className="text-[10px] font-medium mt-1">Contact</span>
          </a>
        </div>
      </nav>

      <main className="flex-grow bg-surface-container-lowest min-h-screen">
        {/*  Page Header (Dark Navy Glassmorphism Hero Banner)  */}
        <section className="bg-navy text-white py-14 md:py-20 px-margin-mobile md:px-margin-desktop border-b border-white/10 relative overflow-hidden">
          {/* Ambient Red & Gold Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
            <nav aria-label="Breadcrumb" className="mb-4 flex justify-center md:justify-start">
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
                  Contact
                </li>
              </ol>
            </nav>

            <span className="bg-secondary/20 text-gold text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-gold/30 inline-block mb-4 shadow-sm">
              CONNECT WITH BHARATPUR'S NO.1 SECURITY TEAM
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight max-w-4xl">
              Get in Touch with Our Technical Security Experts
              <span className="sr-only">.</span>
            </h1>

            <p className="text-sm md:text-base text-inverse-on-surface/85 max-w-3xl leading-relaxed mb-8">
              We are here to assist you in designing custom HD CCTV camera setups, AI IP surveillance, optical fiber networks, and smart biometric locks in Bharatpur. Speak directly with <strong className="text-white">Er. Rajat Garg</strong> for expert site guidance and transparent quotations.
            </p>

            {/*  Interactive Status Pills (Compact Responsive Grid for Mobile)  */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6 max-w-3xl">
              <span className="bg-white/10 text-white text-[11px] sm:text-xs font-bold px-3 py-2 rounded-xl border border-white/15 flex items-center justify-center gap-1.5 backdrop-blur-md shadow-sm text-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                <span>Open 7 Days: 9:30AM–7:30PM</span>
              </span>
              <span className="bg-white/10 text-white text-[11px] sm:text-xs font-bold px-3 py-2 rounded-xl border border-white/15 flex items-center justify-center gap-1.5 backdrop-blur-md shadow-sm text-center">
                <span className="material-symbols-outlined text-gold text-sm shrink-0">verified</span>
                <span>Free Site Survey in Bharatpur</span>
              </span>
              <span className="bg-white/10 text-white text-[11px] sm:text-xs font-bold px-3 py-2 rounded-xl border border-white/15 flex items-center justify-center gap-1.5 backdrop-blur-md shadow-sm text-center">
                <span className="material-symbols-outlined text-secondary text-sm shrink-0">speed</span>
                <span>Same-Day Technical Support</span>
              </span>
            </div>

            {/*  Hero Action Buttons Grid (2-Column Mobile Grid)  */}
            <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center md:justify-start gap-2.5 max-w-2xl">
              <a
                href="tel:+918947976889"
                className="bg-secondary text-white px-3 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold hover:bg-[#cf333f] transition-all shadow-lg flex items-center justify-center gap-1.5 text-center transform hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined text-base">call</span>
                <span>Call Engineer</span>
              </a>
              <a
                href="https://wa.me/918947976889"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-3 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold hover:brightness-105 transition-all shadow-lg flex items-center justify-center gap-1.5 text-center transform hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                <span>WhatsApp Er Rajat</span>
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Anil+kumar+and+Sons+(+Bahanera+wale+)+Bharatpur"
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 md:col-auto bg-white/10 text-white hover:bg-white/20 px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold border border-white/20 transition-all flex items-center justify-center gap-1.5 text-center"
              >
                <span className="material-symbols-outlined text-gold text-base">location_on</span>
                <span>Get Store Location Pin</span>
              </a>
            </div>
          </div>
        </section>

        {/*  Split Layout: Contact Details & Form  */}
        <section className="py-12 md:py-16 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/*  Left: Contact Info Cards  */}
            <div className="md:col-span-5 bg-white p-8 border border-outline-variant rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-navy mb-6 border-b border-outline-variant/30 pb-4">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  {/* Phone & WhatsApp */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-2xl">call</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-base">Phone &amp; WhatsApp</h3>
                      <p className="text-secondary font-bold text-base mt-0.5">+91 89479 76889</p>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                        Direct line to Er. Rajat Garg for site survey and instant quotes.
                      </p>
                    </div>
                  </div>

                  {/* Store Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-2xl">location_on</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-base">Store Location Address</h3>
                      <p className="text-on-surface-variant font-medium text-xs md:text-sm mt-0.5 leading-relaxed">
                        Anil Kumar &amp; Sons, Inside B. Narayan Gate, Near SBI Bank, Bahanera Wale, Bharatpur, Rajasthan - 321001
                      </p>
                      <p className="text-xs text-on-surface-variant/70 mt-1">
                        Free store parking available right in front of our main entrance.
                      </p>
                    </div>
                  </div>

                  {/* Proprietor & Lead Engineer */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-2xl">engineering</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-base">Proprietor &amp; Lead Engineer</h3>
                      <p className="text-navy font-bold text-sm mt-0.5">Er. Rajat Garg</p>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                        Certified security surveillance architect with 7+ years hands-on engineering legacy.
                      </p>
                    </div>
                  </div>

                  {/* Operating Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-2xl">schedule</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-base">Operating Hours</h3>
                      <p className="text-navy font-bold text-xs md:text-sm mt-0.5">
                        Monday – Sunday: 9:30 AM – 7:30 PM
                      </p>
                      <p className="text-xs text-emerald-600 font-semibold mt-1">
                        Active 7 Days a week to support your urgent security needs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-outline-variant/30">
                <h3 className="font-bold text-navy text-xs uppercase tracking-wider mb-2">
                  Service Regions Covered:
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  We provide free site visits across Bharatpur including Bahanera, Mathura Gate, Circular Road, Sewar, Kumher, Deeg, Bayana, Kaman, Nadbai, Weir, and Nagar.
                </p>
              </div>
            </div>

            {/*  Right: Enquiry Form  */}
            <div className="md:col-span-7 bg-white p-8 border border-outline-variant rounded-2xl shadow-sm">
              <h2 className="text-xl font-extrabold text-navy mb-2">Send an Instant Enquiry</h2>
              <p className="text-xs md:text-sm text-on-surface-variant mb-6 leading-relaxed">
                Fill out this form to request a free camera site visit or custom quotation. Submitting opens WhatsApp directly with your details.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5" htmlFor="name">
                      Your Full Name *
                    </label>
                    <input
                      className="w-full border border-outline-variant rounded-xl bg-surface-container-lowest px-4 py-3 text-sm text-navy focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
                      id="name"
                      placeholder="e.g. Ramesh Sharma"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5" htmlFor="phone">
                      Phone Number *
                    </label>
                    <input
                      className="w-full border border-outline-variant rounded-xl bg-surface-container-lowest px-4 py-3 text-sm text-navy focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
                      id="phone"
                      placeholder="e.g. 98290XXXXX"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5" htmlFor="requirement">
                    Primary Requirement *
                  </label>
                  <select
                    className="w-full border border-outline-variant rounded-xl bg-surface-container-lowest px-4 py-3 text-sm text-navy focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all cursor-pointer"
                    id="requirement"
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    required
                  >
                    <option value="">Select Requirement</option>
                    <option value="Free Site Survey & Camera Positioning">Free Site Survey &amp; Camera Positioning</option>
                    <option value="CCTV Installation (Home / Shop)">CCTV Installation (Home / Shop)</option>
                    <option value="Wholesale Hardware Bulk Order">Wholesale Hardware Bulk Order</option>
                    <option value="Annual Maintenance Contract (AMC)">Annual Maintenance Contract (AMC)</option>
                    <option value="IT Optical Fiber & Wi-Fi Mesh Networking">IT Optical Fiber &amp; Wi-Fi Mesh Networking</option>
                    <option value="Biometric Attendance & VDP Door Phone">Biometric Attendance &amp; VDP Door Phone</option>
                    <option value="Other Technical Query">Other Technical Query</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5" htmlFor="message">
                    Message / Site Details *
                  </label>
                  <textarea
                    className="w-full border border-outline-variant rounded-xl bg-surface-container-lowest px-4 py-3 text-sm text-navy focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all h-32"
                    id="message"
                    placeholder="Describe your site location, number of camera points required, or product model..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button
                  className="w-full bg-[#25D366] text-white py-3.5 rounded-xl font-bold hover:brightness-105 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 text-sm"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-lg">chat</span>
                  <span>Send Enquiry via WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </section>

        {/*  Interactive Google Map Section  */}
        <section className="py-12 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
          <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[11px] font-extrabold text-secondary uppercase tracking-widest block mb-1">
                  EXACT STORE PIN LOCATION
                </span>
                <h3 className="font-extrabold text-navy text-xl">
                  Visit Anil Kumar &amp; Sons Store in Bharatpur
                </h3>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Anil+kumar+and+Sons+(+Bahanera+wale+)+Bharatpur"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-navy text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-secondary transition-all shrink-0 w-fit flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-gold text-base">directions</span>
                <span>Open Directions in Google Maps</span>
              </a>
            </div>

            <div className="w-full h-80 rounded-xl overflow-hidden border border-outline-variant/40 shadow-inner">
              <iframe
                title="Store Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3372.6618781201437!2d77.49321747523537!3d27.21208167647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3973a30d1e8b672b%3A0x251227a6a12ebdb0!2sAnil%20kumar%20and%20Sons%20(%20Bahanera%20wale%20)!5e1!3m2!1sen!2sin!4v1787155780030!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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
