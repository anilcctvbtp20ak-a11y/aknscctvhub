'use client';

import React from 'react';

export default function FloatingWhatsapp() {
  return (
    <a
      href="https://wa.me/918947976889?text=Hello%20Anil%20Kumar%20%26%20Sons%2C%20I%20want%20to%20inquire%20about%20CCTV%20Installation%20and%20Services."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group"
      aria-label="Chat on WhatsApp"
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
      </span>
      <span className="material-symbols-outlined text-2xl">chat</span>
      <span className="hidden sm:inline text-sm">Chat on WhatsApp</span>
    </a>
  );
}
