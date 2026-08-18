import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-12 border-t-4 border-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 overflow-hidden rounded-xl bg-white p-1 shadow-sm">
                <img
                  src="/logo.png"
                  alt="Anil Kumar & Sons Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-extrabold text-xl tracking-tight">
                Anil Kumar <span className="text-secondary-fixed-dim">&amp; Sons</span>
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Bharatpur&apos;s most trusted security systems dealer and IT networking solutions provider. Directed by <strong>Er. Rajat Garg</strong> (7+ years experience).
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/918947976889"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-600 flex items-center justify-center transition-colors text-white"
                aria-label="WhatsApp"
              >
                <span className="material-symbols-outlined text-xl">chat</span>
              </a>
              <a
                href="tel:+918947976889"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition-colors text-white"
                aria-label="Call Direct"
              >
                <span className="material-symbols-outlined text-xl">call</span>
              </a>
              <a
                href="mailto:rajatgarg011@gmail.com"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors text-white"
                aria-label="Email Us"
              >
                <span className="material-symbols-outlined text-xl">mail</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-secondary-fixed-dim transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-xs">chevron_right</span> Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-secondary-fixed-dim transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-xs">chevron_right</span> Services &amp; AMC
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-secondary-fixed-dim transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-xs">chevron_right</span> Camera Products Catalog
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-secondary-fixed-dim transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-xs">chevron_right</span> Project Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary-fixed-dim transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-xs">chevron_right</span> Contact &amp; Inquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Our Expertise
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xs text-secondary-fixed-dim">videocam</span> HD &amp; IP CCTV Camera Setup
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xs text-secondary-fixed-dim">build</span> DVR / NVR Repair &amp; Configuration
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xs text-secondary-fixed-dim">lan</span> Structured IT &amp; WiFi Networking
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xs text-secondary-fixed-dim">verified_user</span> Annual Maintenance Contracts (AMC)
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xs text-secondary-fixed-dim">security</span> CP Plus, Hikvision, Dahua Authorized
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Store Location
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-secondary-fixed-dim shrink-0 mt-0.5">location_on</span>
                <span>Anil Kumar &amp; Sons Digital Shop, Near New Mandi, Bharatpur, Rajasthan 321001</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-secondary-fixed-dim shrink-0">call</span>
                <a href="tel:+918947976889" className="hover:underline font-semibold text-white">
                  +91 89479 76889
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-secondary-fixed-dim shrink-0">badge</span>
                <span>Owner: <strong>Er. Rajat Garg</strong></span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Anil Kumar &amp; Sons Digital Shop. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Powered by Next.js App Router for top SEO performance</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
