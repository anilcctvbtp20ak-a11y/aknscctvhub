'use client';

import React, { useState, useEffect } from 'react';

interface PhotoItem {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  category: 'certificates' | 'awards' | 'exhibition';
  tag: string;
}

interface VideoItem {
  id: string;
  src: string;
  thumb: string;
  title: string;
  subtitle: string;
  duration: string;
  tag: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    src: '/video/video1.mp4',
    thumb: '/gallery-images/video1-thumb.jpg',
    title: 'CCTV Installation & Security Setup',
    subtitle: 'Live On-Site Setup • Bharatpur Project',
    duration: '1:00',
    tag: 'Live Project',
  },
  {
    id: 'v2',
    src: '/video/video2.mp4',
    thumb: '/gallery-images/video2-thumb.jpg',
    title: 'Smart Camera Setup & Walkthrough',
    subtitle: 'High-Resolution Surveillance Demo',
    duration: '1:04',
    tag: 'Demo',
  },
  {
    id: 'v3',
    src: '/video/cctvVideo.mp4',
    thumb: '/gallery-images/cctvVideo-thumb.jpg',
    title: 'Complete Security Systems Overview',
    subtitle: 'Commercial & Residential Systems',
    duration: '1:46',
    tag: 'Full Overview',
  },
];

const PHOTOS: PhotoItem[] = [
  {
    id: 'p1',
    src: '/gallery-images/expo-stall.jpeg',
    title: 'Anil Kumar & Sons Security Expo Stall',
    subtitle: 'Official Exhibition Stall in Bharatpur Market',
    category: 'exhibition',
    tag: 'Exhibition',
  },
  {
    id: 'p2',
    src: '/gallery-images/expo-stall1.jpeg',
    title: 'Exhibition Stall Display & Showcase',
    subtitle: 'CCTV Cameras, NVRs & Wi-Fi Products Display',
    category: 'exhibition',
    tag: 'Exhibition',
  },
  {
    id: 'p3',
    src: '/gallery-images/award-ceremony.jpeg',
    title: 'Security Partner Award Ceremony',
    subtitle: 'Er Rajat Garg receiving Sales Achievement Honor',
    category: 'awards',
    tag: 'Award',
  },
  {
    id: 'p4',
    src: '/gallery-images/award.jpeg',
    title: 'Official Sales & Service Excellence Trophy',
    subtitle: 'Awarded for outstanding customer satisfaction in Rajasthan',
    category: 'awards',
    tag: 'Trophy',
  },
  {
    id: 'p5',
    src: '/gallery-images/uniview-award.jpeg',
    title: 'Uniview Gold Partner Certificate 2022',
    subtitle: 'Authorized Dealer & Distributor Certificate in Bharatpur',
    category: 'certificates',
    tag: 'Gold Partner',
  },
  {
    id: 'p6',
    src: '/gallery-images/dahua-certificate.jpeg',
    title: 'Dahua Authorized Dealer Partner Certificate',
    subtitle: 'Official Dealer Partner Certificate in Bharatpur',
    category: 'certificates',
    tag: 'Authorized Dealer',
  },
  {
    id: 'p7',
    src: '/gallery-images/cpplus-cse-certificate.jpeg',
    title: 'CP Plus MissionTech Certified Engineer (CSE)',
    subtitle: 'Surveillance Engineer Certification for Er Rajat Garg',
    category: 'certificates',
    tag: 'Certified Engineer',
  },
  {
    id: 'p8',
    src: '/gallery-images/cpplus-reseller-partner.jpeg',
    title: 'CP Plus Authorized Reseller Partner Certificate',
    subtitle: 'Official Reseller Certificate for Bharatpur Region',
    category: 'certificates',
    tag: 'Reseller Partner',
  },
  {
    id: 'p9',
    src: '/gallery-images/cppuls-bharat-award.jpeg',
    title: 'CP Plus Bharat Technology Show Award',
    subtitle: 'Valued Contribution & Service Excellence Award',
    category: 'awards',
    tag: 'CP Plus Honor',
  },
  {
    id: 'p10',
    src: '/gallery-images/lanvo-certificate.png',
    title: 'Lanvo Authorized Partner Certificate',
    subtitle: 'Official Lanvo Networking & Security Partner',
    category: 'certificates',
    tag: 'Authorized Partner',
  },
];

export default function Page() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'certificates' | 'awards' | 'exhibition' | 'videos'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
        setSelectedVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredPhotos = activeFilter === 'all' || activeFilter === 'videos'
    ? PHOTOS
    : PHOTOS.filter((p) => p.category === activeFilter);

  const showVideosSection = activeFilter === 'all' || activeFilter === 'videos';

  return (
    <>
      {/* TopNavBar (Mobile) */}
      <div className="md:hidden sticky top-0 w-full z-50 bg-navy border-b border-white/10 shadow-sm h-20 flex items-center justify-between px-margin-mobile">
        <a className="flex items-center gap-2 h-full" href="/">
          <img height="724" width="1024" src="/logo.png" alt="ANIL KUMAR & SONS" className="h-20 w-auto object-contain py-1" />
        </a>
        <a className="bg-secondary text-on-secondary px-4 py-2 rounded-lg font-bold text-sm hover:bg-opacity-90 transition-opacity" href="/contact">Consultation</a>
      </div>

      {/* TopNavBar (Web) */}
      <header className="hidden md:flex sticky top-0 w-full z-50 bg-navy border-b border-white/10 shadow-sm h-24">
        <div className="flex justify-between items-center px-margin-desktop w-full max-w-7xl mx-auto h-full">
          <a className="flex items-center gap-2 h-full" href="/">
            <img height="724" width="1024" src="/logo.png" alt="ANIL KUMAR & SONS" className="h-24 w-auto object-contain py-1" />
          </a>
          <nav className="flex gap-gutter items-center">
            <a className="text-white font-medium font-body-md text-body-md hover:text-secondary transition-colors" href="/">Home</a>
            <a className="text-white font-medium hover:text-secondary transition-colors font-body-md text-body-md" href="/services">Services</a>
            <a className="text-white font-medium hover:text-secondary transition-colors font-body-md text-body-md" href="/products">Products</a>
            <a className="text-secondary border-b-2 border-secondary pb-1 font-medium font-body-md text-body-md" href="/gallery">Gallery</a>
            <a className="text-white font-medium hover:text-secondary transition-colors font-body-md text-body-md" href="/contact">Contact</a>
            <a className="ml-4 bg-secondary text-on-secondary px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-opacity" href="/contact">Get Free Consultation</a>
          </nav>
        </div>
      </header>

      {/* SideNavBar (Mobile Bottom Bar) */}
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
          <a className="flex flex-col items-center text-secondary" href="/gallery">
            <span className="material-symbols-outlined">photo_library</span>
            <span className="text-[10px] font-medium mt-1">Gallery</span>
          </a>
          <a className="flex flex-col items-center text-on-surface-variant" href="/contact">
            <span className="material-symbols-outlined">contact_support</span>
            <span className="text-[10px] font-medium mt-1">Contact</span>
          </a>
        </div>
      </nav>

      <main className="bg-surface-container-lowest min-h-screen">
        {/* Page Header (Dark Navy Glassmorphism Hero Banner) */}
        <section className="bg-navy text-white py-14 md:py-20 px-margin-mobile md:px-margin-desktop border-b border-white/10 relative overflow-hidden mb-8">
          {/* Ambient Red Glow Background Effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>

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
                  Gallery
                </li>
              </ol>
            </nav>

            <span className="bg-secondary/20 text-gold text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-gold/30 inline-block mb-3 shadow-sm">
              OFFICIAL CERTIFICATES &amp; EXPO GALLERY
            </span>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                  Real Project Gallery &amp; Distributor Certificates
                  <span className="sr-only">.</span>
                </h1>
                <p className="text-sm md:text-base text-inverse-on-surface/85 leading-relaxed">
                  Explore our store displays, client site installations, security expo stalls, and official distributor certificates from CP Plus, Dahua, Uniview, and Lanvo in Bharatpur.
                </p>
              </div>

              {/* Quick Stat Counter Glass Badges */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-center min-w-[125px] shadow-lg">
                  <span className="block text-2xl font-black text-gold">1000+</span>
                  <span className="text-[11px] text-white/80 font-bold uppercase tracking-wider">Installations</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-center min-w-[125px] shadow-lg">
                  <span className="block text-2xl font-black text-secondary">100%</span>
                  <span className="text-[11px] text-white/80 font-bold uppercase tracking-wider">Original Brand</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop mb-12">

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-8">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm ${
                activeFilter === 'all'
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-surface-container-highest text-on-surface-variant hover:bg-outline-variant/30'
              }`}
            >
              All Photos &amp; Videos
            </button>
            <button
              onClick={() => setActiveFilter('certificates')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm ${
                activeFilter === 'certificates'
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-surface-container-highest text-on-surface-variant hover:bg-outline-variant/30'
              }`}
            >
              Official Certificates
            </button>
            <button
              onClick={() => setActiveFilter('awards')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm ${
                activeFilter === 'awards'
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-surface-container-highest text-on-surface-variant hover:bg-outline-variant/30'
              }`}
            >
              Awards &amp; Trophies
            </button>
            <button
              onClick={() => setActiveFilter('exhibition')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm ${
                activeFilter === 'exhibition'
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-surface-container-highest text-on-surface-variant hover:bg-outline-variant/30'
              }`}
            >
              Exhibition &amp; Stall
            </button>
            <button
              onClick={() => setActiveFilter('videos')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm ${
                activeFilter === 'videos'
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-surface-container-highest text-on-surface-variant hover:bg-outline-variant/30'
              }`}
            >
              Project Videos
            </button>
          </div>
        </div>

        {/* Video Walkthrough Section */}
        {showVideosSection && (
          <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop mb-16">
            <div className="flex items-center justify-between mb-6 border-b border-outline-variant pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-2xl">videocam</span>
                <h2 className="font-headline-lg text-xl md:text-2xl font-bold text-primary">
                  Site Installation &amp; Product Videos
                </h2>
              </div>
              <span className="text-xs text-on-surface-variant font-medium">Click to Play in HD</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VIDEOS.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="group relative bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="relative w-full aspect-video bg-navy overflow-hidden">
                    <img
                      src={video.thumb}
                      alt={video.title}
                      width={640}
                      height={360}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 bg-[#e63946] text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-3xl ml-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                          play_arrow
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                      {video.duration}
                    </div>
                    <div className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                      {video.tag}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1 justify-between bg-white">
                    <div>
                      <h3 className="font-bold text-navy text-base group-hover:text-secondary transition-colors mb-1 line-clamp-1">
                        {video.title}
                      </h3>
                      <p className="text-xs text-on-surface-variant line-clamp-1">{video.subtitle}</p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-xs font-semibold text-secondary">
                      <span>Watch Full Video</span>
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Photo Gallery Grid Section */}
        {activeFilter !== 'videos' && (
          <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop mb-16">
            <div className="flex items-center justify-between mb-6 border-b border-outline-variant pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-2xl">photo_library</span>
                <h2 className="font-headline-lg text-xl md:text-2xl font-bold text-primary">
                  Official Certificates, Awards &amp; Store Photos
                </h2>
              </div>
              <span className="text-xs text-on-surface-variant font-medium">Click Any Photo to Enlarge</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                >
                  {/* Photo Container with Controlled Height & Aspect Ratio */}
                  <div className="relative w-full aspect-[4/3] bg-surface-container-low overflow-hidden flex items-center justify-center p-2">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      width={600}
                      height={450}
                      loading="lazy"
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Hover Zoom Hint Overlay */}
                    <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-lg group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-2xl">zoom_in</span>
                      </div>
                    </div>
                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-navy/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                      {photo.tag}
                    </div>
                  </div>

                  {/* Photo Information Footer */}
                  <div className="p-4 bg-white flex flex-col justify-between flex-1 border-t border-outline-variant/30">
                    <div>
                      <h3 className="font-bold text-navy text-sm group-hover:text-secondary transition-colors line-clamp-1 mb-1">
                        {photo.title}
                      </h3>
                      <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">{photo.subtitle}</p>
                    </div>
                    <div className="mt-3 pt-2 flex items-center justify-between text-[11px] font-bold text-secondary">
                      <span>View Full Resolution</span>
                      <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">
                        open_in_new
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Quality Commitment Banner */}
        <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-12 bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm my-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary text-2xl">verified</span>
              </div>
              <div>
                <h3 className="font-bold text-primary text-base mb-1">100% Original Products</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Authorized partners for CP Plus, Dahua, Uniview, TP-Link, and Lanvo with manufacturer warranty.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary text-2xl">engineering</span>
              </div>
              <div>
                <h3 className="font-bold text-primary text-base mb-1">Certified Technicians</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  CP Plus MissionTech certified surveillance engineers delivering clean wiring and exact camera positioning.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary text-2xl">support_agent</span>
              </div>
              <div>
                <h3 className="font-bold text-primary text-base mb-1">Local Support in Bharatpur</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Fast site visits, mobile view setup, password reset, and AMC services right inside B. Narayan Gate.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Image Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-navy rounded-2xl overflow-hidden border border-white/20 shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-navy/95 shrink-0">
              <div className="flex items-center gap-3">
                <span className="bg-secondary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  {selectedPhoto.tag}
                </span>
                <h3 className="font-bold text-white text-base md:text-lg line-clamp-1">{selectedPhoto.title}</h3>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close Lightbox"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary hover:text-white text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Modal Main Image Container */}
            <div className="relative bg-black flex items-center justify-center p-4 overflow-hidden flex-1 max-h-[70vh]">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                width={1200}
                height={900}
                className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Modal Footer Description */}
            <div className="p-5 bg-navy/95 border-t border-white/10 shrink-0">
              <p className="text-sm text-white/90 leading-relaxed">{selectedPhoto.subtitle}</p>
            </div>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      {selectedVideo && (
        <div
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-navy rounded-2xl overflow-hidden border border-white/20 shadow-2xl flex flex-col max-h-[85vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-navy/95 shrink-0">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">videocam</span>
                <h3 className="font-bold text-white text-base md:text-lg line-clamp-1">{selectedVideo.title}</h3>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                aria-label="Close Video Player"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-secondary hover:text-white text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Video Player Box */}
            <div className="relative bg-black flex items-center justify-center w-full max-h-[65vh] overflow-hidden">
              <video
                src={selectedVideo.src}
                className="w-full max-h-[60vh] object-contain"
                controls
                autoPlay
                playsInline
              >
                Your browser does not support video playback.
              </video>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-primary-container text-on-primary-container pt-12 pb-32 md:pb-10 px-margin-mobile md:px-margin-desktop" id="footer">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-8 border-b border-white/10">
            <div>
              <a className="flex items-center gap-2 mb-3 inline-block" href="/">
                <img loading="lazy" height="724" width="1024" src="logo.png" alt="ANIL KUMAR &amp; SONS" className="h-20 w-auto object-contain py-1" />
              </a>
              <p className="text-xs text-on-primary-container/70 mt-1 leading-relaxed">
                Smart Security. Reliable Protection. Trusted Service.<br />Bharatpur, Rajasthan
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">Quick Links</h4>
              <div className="flex flex-col gap-2 text-xs text-on-primary-container/80">
                <a className="hover:text-white transition-colors" href="/">Home</a>
                <a className="hover:text-white transition-colors" href="/services">Services</a>
                <a className="hover:text-white transition-colors" href="/products">Products</a>
                <a className="hover:text-white transition-colors" href="/gallery">Gallery</a>
                <a className="hover:text-white transition-colors" href="/contact">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">Contact Us</h4>
              <div className="flex flex-col gap-3 text-xs text-on-primary-container/80">
                <a href="tel:+918947976889" className="flex items-center gap-2 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-base text-secondary">call</span>
                  +91 89479 76889
                </a>
                <a href="mailto:aknscctvbtp20.ak@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-base text-secondary">mail</span>
                  aknscctvbtp20.ak@gmail.com
                </a>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-base text-secondary mt-0.5">location_on</span>
                  <span>Inside B. Narayan Gate, Near SBI Bank,<br />Bahanera Wale, Bharatpur, Raj - 321001</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 text-center text-xs text-on-primary-container/60">
            © 2026 Anil Kumar &amp; Sons. All rights reserved.
            <span className="mx-2">|</span>
            Designed &amp; Developed by <a href="https://www.instagram.com/larkspireservices/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-white hover:underline transition-colors font-medium">Larkspire Services</a>
          </div>
        </div>
      </footer>

      {/* Fixed WhatsApp Floating Button */}
      <a
        className="fixed bottom-20 right-6 md:bottom-8 md:right-8 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 hover:shadow-xl border-2 border-white"
        href="https://wa.me/918947976889"
        target="_blank"
        aria-label="WhatsApp"
        rel="noopener noreferrer"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>
    </>
  );
}
