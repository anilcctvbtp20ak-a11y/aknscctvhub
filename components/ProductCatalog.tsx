'use client';

import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  category: 'dome' | 'bullet' | 'ip' | 'nvr' | 'access';
  categoryLabel: string;
  brand: 'CP Plus' | 'Hikvision' | 'Dahua' | 'Imou' | 'General';
  specs: string[];
  image: string;
  tag?: string;
}

const productsData: Product[] = [
  {
    id: 'prod-1',
    name: 'CP Plus 2MP HD Bullet Camera (Guard-Plus)',
    category: 'bullet',
    categoryLabel: 'Bullet Camera',
    brand: 'CP Plus',
    specs: ['1080p Full HD Resolution', '20m Night Vision IR', 'IP66 Weatherproof Body', 'Smart IR LED'],
    image: '/product-images/cpplus-bullet.png',
    tag: 'Best Seller'
  },
  {
    id: 'prod-2',
    name: 'Hikvision 4MP Full-Color ColorVu Dome',
    category: 'dome',
    categoryLabel: 'Dome Camera',
    brand: 'Hikvision',
    specs: ['24/7 Full-Color Imaging', '4MP Super HD Sensor', 'Built-in Microphone Audio', 'H.265+ Compression'],
    image: '/product-images/hikvision-dome.png',
    tag: 'Premium'
  },
  {
    id: 'prod-3',
    name: 'Dahua 5MP Smart Dual Light IP Camera',
    category: 'ip',
    categoryLabel: 'IP Camera',
    brand: 'Dahua',
    specs: ['AI Human & Vehicle Detection', 'PoE Power Supply', '5MP Ultra Clarity', 'Starlight Night Sensor'],
    image: '/product-images/dahua-ip.png',
    tag: 'AI Powered'
  },
  {
    id: 'prod-4',
    name: 'CP Plus 8 Channel 4K DVR / NVR System',
    category: 'nvr',
    categoryLabel: 'DVR / NVR',
    brand: 'CP Plus',
    specs: ['4K HDMI Output', 'Up to 10TB HDD Support', 'Mobile App Remote View', 'Motion Alert Notification'],
    image: '/product-images/cpplus-dvr.png'
  },
  {
    id: 'prod-5',
    name: 'Imou 360° WiFi Smart Security Camera',
    category: 'dome',
    categoryLabel: 'Indoor Smart',
    brand: 'Imou',
    specs: ['360° Panoramic View', 'Two-Way Audio Talk', 'Smart Motion Tracking', 'Cloud & SD Card Record'],
    image: '/product-images/imou-wifi.png',
    tag: 'Wireless'
  },
  {
    id: 'prod-6',
    name: 'CCTV Power Supply 12V 10A + BNC Wire Kit',
    category: 'access',
    categoryLabel: 'Accessories',
    brand: 'General',
    specs: ['Heavy Duty Metal Box', 'Over-Voltage Protection', 'Pure Copper BNC connectors', 'Cat6 Cable Drums'],
    image: '/product-images/cctv-power-supply.png'
  }
];

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    { key: 'all', label: 'All Products' },
    { key: 'bullet', label: 'Bullet Cameras' },
    { key: 'dome', label: 'Dome Cameras' },
    { key: 'ip', label: 'IP Cameras' },
    { key: 'nvr', label: 'DVR & NVR' },
    { key: 'access', label: 'Accessories' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? productsData
    : productsData.filter(p => p.category === activeCategory);

  const triggerWhatsappInquiry = (productName: string) => {
    const text = encodeURIComponent(`Hello Er. Rajat Garg (Anil Kumar & Sons),\nI am interested in buying/getting a quote for: ${productName}`);
    window.open(`https://wa.me/918947976889?text=${text}`, '_blank');
  };

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
              activeCategory === cat.key
                ? 'bg-navy text-white shadow-md scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            <div className="relative aspect-4/3 bg-gray-50 p-6 flex items-center justify-center border-b border-gray-100 overflow-hidden">
              {prod.tag && (
                <span className="absolute top-3 left-3 bg-secondary text-white text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full shadow-sm z-10">
                  {prod.tag}
                </span>
              )}
              <span className="absolute top-3 right-3 bg-navy/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                {prod.brand}
              </span>
              <img
                src={prod.image}
                alt={prod.name}
                className="max-h-48 object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback standard SVG icon if image missing
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="hidden group-hover:flex items-center justify-center absolute inset-0 bg-navy/40 backdrop-blur-xs transition-opacity">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(prod)}
                  className="bg-white text-navy font-bold px-4 py-2 rounded-xl shadow-lg text-xs hover:bg-navy hover:text-white transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-secondary uppercase tracking-widest block mb-1">
                  {prod.categoryLabel}
                </span>
                <h3 className="font-bold text-navy text-base md:text-lg mb-3 line-clamp-2 leading-snug">
                  {prod.name}
                </h3>
                <ul className="space-y-1.5 mb-6 text-xs text-gray-600">
                  {prod.specs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => triggerWhatsappInquiry(prod.name)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-sm text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  <span>Inquire Price on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative border border-gray-100">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-navy p-1 rounded-full hover:bg-gray-100"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-1">
              {selectedProduct.brand} • {selectedProduct.categoryLabel}
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold text-navy mb-4">
              {selectedProduct.name}
            </h3>

            <div className="bg-gray-50 rounded-2xl p-4 mb-6 flex items-center justify-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="max-h-56 object-contain"
              />
            </div>

            <h4 className="font-bold text-sm text-navy uppercase tracking-wider mb-2">Key Specifications:</h4>
            <ul className="space-y-2 mb-6 text-sm text-gray-700">
              {selectedProduct.specs.map((spec, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  triggerWhatsappInquiry(selectedProduct.name);
                  setSelectedProduct(null);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md text-sm flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">chat</span>
                <span>Get Instant Quote on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
