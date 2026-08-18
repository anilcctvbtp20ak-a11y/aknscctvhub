'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200/80 py-3' : 'bg-white py-4 border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-xl bg-navy p-1 shadow-sm transition-transform group-hover:scale-105">
              <img
                src="/logo.png"
                alt="Anil Kumar & Sons Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-extrabold text-lg md:text-xl text-navy tracking-tight block leading-none">
                Anil Kumar <span className="text-secondary">&amp; Sons</span>
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-wider uppercase block mt-0.5">
                Digital Shop &amp; CCTV Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-surface-container-low px-3 py-1.5 rounded-full border border-gray-200/60 shadow-inner">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-gray-700 hover:text-navy hover:bg-gray-200/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+918947976889"
              className="flex items-center gap-2 bg-secondary text-white font-bold px-4 py-2.5 rounded-xl shadow-md hover:bg-secondary/90 hover:shadow-lg transition-all text-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-base">call</span>
              <span>+91 89479 76889</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-navy hover:bg-gray-100 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 flex flex-col gap-2 bg-white pb-4 rounded-b-2xl shadow-xl">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 text-base font-bold rounded-xl flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-navy text-white'
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </Link>
              );
            })}
            <div className="pt-2 px-2">
              <a
                href="tel:+918947976889"
                className="w-full flex items-center justify-center gap-2 bg-secondary text-white font-bold py-3 px-4 rounded-xl shadow-md text-base active:scale-98"
              >
                <span className="material-symbols-outlined text-xl">call</span>
                <span>Call Er. Rajat Garg</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
