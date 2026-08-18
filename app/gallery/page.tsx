'use client';

import React, { useEffect } from 'react';

export default function Page() {

  useEffect(() => {
    // Stat counters
    const animateValue = (id: string, start: number, end: number, duration: number) => {
      const obj = document.getElementById(id);
      if (!obj) return;
      if (start === end) return;
      const range = end - start;
      let current = start;
      const increment = end > start ? 1 : -1;
      const stepTime = Math.abs(Math.floor(duration / range));
      const timer = setInterval(() => {
        current += increment;
        obj.innerText = current + "+";
        if (current == end) {
          clearInterval(timer);
        }
      }, stepTime || 15);
    };

    animateValue("counter-installs", 0, 1000, 1500);
    animateValue("counter-clients", 0, 800, 1500);

    // FAQ Accordion Handler
    const triggers = document.querySelectorAll(".faq-trigger");
    triggers.forEach((trigger) => {
      const handleFaqClick = () => {
        const item = trigger.closest(".faq-item");
        if (!item) return;
        const content = item.querySelector(".faq-content") as HTMLElement | null;
        const icon = item.querySelector(".faq-icon") as HTMLElement | null;
        const isOpen = trigger.getAttribute("aria-expanded") === "true";

        document.querySelectorAll(".faq-trigger").forEach((otherTrigger) => {
          if (otherTrigger !== trigger) {
            otherTrigger.setAttribute("aria-expanded", "false");
            const otherItem = otherTrigger.closest(".faq-item");
            if (otherItem) {
              const otherContent = otherItem.querySelector(".faq-content") as HTMLElement | null;
              const otherIcon = otherItem.querySelector(".faq-icon") as HTMLElement | null;
              if (otherContent) otherContent.style.maxHeight = "";
              if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
              otherItem.classList.remove("border-secondary");
            }
          }
        });

        if (isOpen) {
          trigger.setAttribute("aria-expanded", "false");
          if (content) content.style.maxHeight = "";
          if (icon) icon.style.transform = "rotate(0deg)";
          item.classList.remove("border-secondary");
        } else {
          trigger.setAttribute("aria-expanded", "true");
          if (content) content.style.maxHeight = content.scrollHeight + "px";
          if (icon) icon.style.transform = "rotate(180deg)";
          item.classList.add("border-secondary");
        }
      };
      trigger.addEventListener("click", handleFaqClick);
    });

    // Product Category Filter Handler
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    if (filterBtns.length > 0) {
      filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          filterBtns.forEach((b) => {
            b.classList.remove('bg-secondary', 'text-on-secondary');
            b.classList.add('bg-surface-container-high', 'text-on-surface-variant');
          });
          btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
          btn.classList.add('bg-secondary', 'text-on-secondary');

          const filter = btn.getAttribute('data-filter');
          productCards.forEach((card) => {
            const htmlCard = card as HTMLElement;
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
              htmlCard.style.display = 'flex';
            } else {
              htmlCard.style.display = 'none';
            }
          });
        });
      });
    }

    // Featured Video Observer
    const featuredVideo = document.getElementById("featured-video-player");
    if (featuredVideo) {
      let videoLoaded = false;
      const loadAndPlayVideo = () => {
        if (videoLoaded) {
          const video = featuredVideo.querySelector("video") as HTMLVideoElement | null;
          if (video && video.paused) {
            video.play().catch((err) => console.log("Autoplay blocked or interrupted: ", err));
          }
          return;
        }

        featuredVideo.innerHTML = `
          <video class="w-full h-full object-cover rounded-2xl md:rounded-3xl" autoplay muted loop playsinline id="main-cctv-video">
            <source src="/video/cctvVideo.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <div class="absolute bottom-3 left-3 md:bottom-6 md:left-6 flex items-center gap-2 md:gap-4 bg-navy/90 backdrop-blur-md px-3 py-2 md:px-5 md:py-3.5 rounded-xl md:rounded-2xl border border-white/10 text-white select-none transition-all duration-300 shadow-xl" id="video-volume-overlay">
            <button class="w-8 h-8 md:w-12 md:h-12 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform" id="video-volume-btn" aria-label="Toggle Sound">
              <span class="material-symbols-outlined text-on-secondary text-base md:text-2xl" id="volume-icon" style="font-variation-settings: 'FILL' 1;">volume_off</span>
            </button>
            <div>
              <p class="text-[8px] md:text-[10px] font-bold text-secondary uppercase tracking-widest mb-0.5" id="video-volume-status">Autoplay Muted</p>
              <h3 class="font-bold text-[10px] md:text-xs md:text-sm leading-tight" id="video-volume-title">Click to Unmute</h3>
            </div>
          </div>
        `;

        videoLoaded = true;

        const videoElement = document.getElementById("main-cctv-video") as HTMLVideoElement | null;
        const volumeOverlay = document.getElementById("video-volume-overlay") as HTMLElement | null;
        const volumeIcon = document.getElementById("volume-icon") as HTMLElement | null;
        const volumeStatus = document.getElementById("video-volume-status") as HTMLElement | null;
        const volumeTitle = document.getElementById("video-volume-title") as HTMLElement | null;

        const toggleMute = (e?: Event) => {
          if (e) e.stopPropagation();
          if (videoElement && videoElement.muted) {
            videoElement.muted = false;
            videoElement.controls = true;
            if (volumeIcon) volumeIcon.innerText = "volume_up";
            if (volumeStatus) volumeStatus.innerText = "Sound On";
            if (volumeTitle) volumeTitle.innerText = "Enjoy Walkthrough";
            setTimeout(() => {
              if (videoElement && !videoElement.muted && volumeOverlay) {
                volumeOverlay.style.opacity = "0";
                volumeOverlay.style.pointerEvents = "none";
              }
            }, 3000);
          } else if (videoElement) {
            videoElement.muted = true;
            videoElement.controls = false;
            if (volumeIcon) volumeIcon.innerText = "volume_off";
            if (volumeStatus) volumeStatus.innerText = "Muted";
            if (volumeTitle) volumeTitle.innerText = "Click to Unmute";
            if (volumeOverlay) {
              volumeOverlay.style.opacity = "1";
              volumeOverlay.style.pointerEvents = "auto";
            }
          }
        };

        if (volumeOverlay) volumeOverlay.addEventListener("click", toggleMute);
        if (videoElement) videoElement.addEventListener("click", toggleMute);
      };

      const pauseVideo = () => {
        if (videoLoaded) {
          const video = featuredVideo.querySelector("video") as HTMLVideoElement | null;
          if (video && !video.paused) {
            video.pause();
          }
        }
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadAndPlayVideo();
          } else {
            pauseVideo();
          }
        });
      }, { threshold: 0.2 });

      observer.observe(featuredVideo);
    }

    // Contact Form Handler
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      const handleFormSubmit = (e: Event) => {
        e.preventDefault();
        const nameEl = document.getElementById("contact-name") as HTMLInputElement | null;
        const emailEl = document.getElementById("contact-email") as HTMLInputElement | null;
        const msgEl = document.getElementById("contact-message") as HTMLTextAreaElement | null;
        const name = nameEl ? nameEl.value.trim() : '';
        const email = emailEl ? emailEl.value.trim() : '';
        const message = msgEl ? msgEl.value.trim() : '';

        const text = `Hello Anil Kumar & Sons,\n\nI have submitted an enquiry from the website:\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;
        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/918947976889?text=${encodedText}`;
        window.open(whatsappUrl, "_blank");
      };
      contactForm.addEventListener("submit", handleFormSubmit);
    }

    // Elfsight widget script
    if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
      const elfsightScript = document.createElement("script");
      elfsightScript.src = "https://elfsightcdn.com/platform.js";
      elfsightScript.defer = true;
      document.head.appendChild(elfsightScript);
    }
  }, []);


  return (
    <>


    {/*  TopNavBar (Mobile)  */}
    <div className="md:hidden sticky top-0 w-full z-50 bg-navy border-b border-white/10 shadow-sm h-20 flex items-center justify-between px-margin-mobile">
        <a className="flex items-center gap-2 h-full" href="/">
            <img height="724" width="1024" src="logo.png" alt="ANIL KUMAR &amp; SONS" className="h-20 w-auto object-contain py-1" />
        </a>
        <a className="bg-secondary text-on-secondary px-4 py-2 rounded-lg font-bold text-sm hover:bg-opacity-90 transition-opacity" href="/contact">Consultation</a>
    </div>

    {/*  TopNavBar (Web)  */}
    <header className="hidden md:flex sticky top-0 w-full z-50 bg-navy border-b border-white/10 shadow-sm h-24">
        <div className="flex justify-between items-center px-margin-desktop w-full max-w-7xl mx-auto h-full">
            <a className="flex items-center gap-2 h-full" href="/">
                <img height="724" width="1024" src="logo.png" alt="ANIL KUMAR &amp; SONS" className="h-24 w-auto object-contain py-1" />
            </a>
            <nav className="flex gap-gutter items-center">
                <a className="text-white font-medium font-body-md text-body-md" href="/">Home</a>
                <a className="text-white font-medium hover:text-secondary transition-colors duration-200 font-body-md text-body-md" href="/services">Services</a>
                <a className="text-white font-medium hover:text-secondary transition-colors duration-200 font-body-md text-body-md" href="/products">Products</a>
                <a className="text-secondary border-b-2 border-secondary pb-1 font-medium font-body-md text-body-md" href="/gallery">Gallery</a>
                <a className="text-white font-medium hover:text-secondary transition-colors duration-200 font-body-md text-body-md" href="/contact">Contact</a>
                <a className="ml-4 bg-secondary text-on-secondary px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-opacity" href="/contact">Get Free Consultation</a>
            </nav>
        </div>
    </header>

    {/*  SideNavBar (Mobile)  */}
    <nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface-container-lowest border-t border-outline-variant pb-safe">
        <div className="flex justify-around items-center h-16">
            <a className="flex flex-col items-center text-on-surface-variant" href="/">
                <span className="material-symbols-outlined" >home</span>
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
            <a className="flex flex-col items-center text-on-surface-variant" href="/contact">
                <span className="material-symbols-outlined">contact_support</span>
                <span className="text-[10px] font-medium mt-1">Contact</span>
            </a>
        </div>
    </nav>

    <main className="pt-section-padding">
{/*  Page Header  */}
<section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop mb-16">
<div className="max-w-3xl">
<p className="font-section-tagline text-section-tagline text-secondary uppercase mb-4">Anil Kumar and Sons (Bahanera wale)</p>
<h1 className="font-display-hero text-display-hero text-primary mb-6">Our Security Projects in Action<span className="sr-only">.</span></h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mb-4 leading-relaxed">
    Browse our photo and video gallery of camera setups, awards, and store displays in Bharatpur. We install CP Plus, Dahua, and Uniview cameras with clean wiring and clear HD video.
</p>
</div>
</section>
{/*  Video Section  */}
<section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop mb-24">
<h2 className="font-headline-lg text-headline-lg text-primary mb-8 border-b border-outline-variant pb-4">Videos<span className="sr-only">.</span></h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
{/*  Video Card 1  */}
<div className="group relative bg-surface-container-lowest rounded-lg overflow-hidden border border-outline-variant transition-all hover:shadow-[0px_10px_30px_rgba(10,22,40,0.12)] hover:border-on-tertiary-container cursor-pointer video-card-trigger" data-video-src="video/video1.mp4" data-video-title="CCTV Installation &amp; Security Setup">
<div className="aspect-video bg-surface-container-highest relative flex items-center justify-center overflow-hidden">
<img loading="lazy" height="360" width="640" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" alt="CCTV Installation &amp; Security Setup Video Thumbnail" src="gallery-images/video1-thumb.jpg" />
<div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/20 transition-colors"></div>
<button className="relative w-16 h-16 bg-[#e63946] text-[#ffffff] rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform cursor-pointer" aria-label="Play CCTV Installation Video">
<span className="material-symbols-outlined" style={{ 'fontVariationSettings': '\'FILL\' 1', 'fontSize': '36px' }}>play_arrow</span>
</button>
<div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded">1:00</div>
</div>
<div className="p-4">
<div className="flex items-center gap-2 mb-1">
<span className="bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Project Video 1</span>
</div>
<h3 className="font-headline-md text-body-lg font-bold text-primary mb-1">CCTV Installation &amp; Security Setup<span className="sr-only">.</span></h3>
<p className="font-caption text-caption text-on-surface-variant">Live Installation Showcase • Bharatpur Site</p>
</div>
</div>
{/*  Video Card 2  */}
<div className="group relative bg-surface-container-lowest rounded-lg overflow-hidden border border-outline-variant transition-all hover:shadow-[0px_10px_30px_rgba(10,22,40,0.12)] hover:border-on-tertiary-container cursor-pointer video-card-trigger" data-video-src="video/video2.mp4" data-video-title="Smart Camera Setup &amp; Walkthrough">
<div className="aspect-video bg-surface-container-highest relative flex items-center justify-center overflow-hidden">
<img loading="lazy" height="360" width="640" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" alt="Smart Camera Setup Video Thumbnail" src="gallery-images/video2-thumb.jpg" />
<div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/20 transition-colors"></div>
<button className="relative w-16 h-16 bg-[#e63946] text-[#ffffff] rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform cursor-pointer" aria-label="Play Smart Camera Setup Video">
<span className="material-symbols-outlined" style={{ 'fontVariationSettings': '\'FILL\' 1', 'fontSize': '36px' }}>play_arrow</span>
</button>
<div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded">1:04</div>
</div>
<div className="p-4">
<div className="flex items-center gap-2 mb-1">
<span className="bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Project Video 2</span>
</div>
<h3 className="font-headline-md text-body-lg font-bold text-primary mb-1">Smart Camera Setup &amp; Walkthrough<span className="sr-only">.</span></h3>
<p className="font-caption text-caption text-on-surface-variant">High-Resolution Surveillance Demo</p>
</div>
</div>
{/*  Video Card 3  */}
<div className="group relative bg-surface-container-lowest rounded-lg overflow-hidden border border-outline-variant transition-all hover:shadow-[0px_10px_30px_rgba(10,22,40,0.12)] hover:border-on-tertiary-container cursor-pointer video-card-trigger" data-video-src="video/cctvVideo.mp4" data-video-title="Complete Security Systems Overview">
<div className="aspect-video bg-surface-container-highest relative flex items-center justify-center overflow-hidden">
<img loading="lazy" height="360" width="640" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" alt="Complete Security Systems Video Thumbnail" src="gallery-images/cctvVideo-thumb.jpg" />
<div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/20 transition-colors"></div>
<button className="relative w-16 h-16 bg-[#e63946] text-[#ffffff] rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform cursor-pointer" aria-label="Play Complete Security Overview Video">
<span className="material-symbols-outlined" style={{ 'fontVariationSettings': '\'FILL\' 1', 'fontSize': '36px' }}>play_arrow</span>
</button>
<div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded">1:46</div>
</div>
<div className="p-4">
<div className="flex items-center gap-2 mb-1">
<span className="bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Full Overview</span>
</div>
<h3 className="font-headline-md text-body-lg font-bold text-primary mb-1">Complete Security Systems Overview<span className="sr-only">.</span></h3>
<p className="font-caption text-caption text-on-surface-variant">Commercial &amp; Residential Projects</p>
</div>
</div>
</div>
</section>
{/*  Photo Section (Masonry Grid)  */}
<section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
<h2 className="font-headline-lg text-headline-lg text-primary mb-8 border-b border-outline-variant pb-4">Photos<span className="sr-only">.</span></h2>
<div className="masonry-grid">

{/*  Image 1: Expo Stall Exterior  */}
<div className="masonry-item group relative cursor-pointer overflow-hidden rounded-lg bg-surface-container-highest border border-outline-variant transition-all hover:shadow-[0px_10px_30px_rgba(10,22,40,0.12)] hover:border-on-tertiary-container">
    <img loading="lazy" height="750" width="1000" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" src="gallery-images/expo-stall.jpeg" alt="Anil Kumar &amp; Sons Stall at Security Expo Bharatpur" />
    <div className="absolute top-3 left-3">
        <span className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Exhibition</span>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="font-body-md text-body-md font-semibold text-white">Anil Kumar &amp; Sons at Security Expo.</span>
    </div>
</div>

{/*  Image 2: Expo Stall Interior  */}
<div className="masonry-item group relative cursor-pointer overflow-hidden rounded-lg bg-surface-container-highest border border-outline-variant transition-all hover:shadow-[0px_10px_30px_rgba(10,22,40,0.12)] hover:border-on-tertiary-container">
    <img loading="lazy" height="600" width="800" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" src="gallery-images/expo-stall1.jpeg" alt="Security products display at exhibition stall" />
    <div className="absolute top-3 left-3">
        <span className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Exhibition</span>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="font-body-md text-body-md font-semibold text-white">Stall showing CCTV cameras and Wi-Fi devices.</span>
    </div>
</div>

{/*  Image 3: Award Ceremony  */}
<div className="masonry-item group relative cursor-pointer overflow-hidden rounded-lg bg-surface-container-highest border border-outline-variant transition-all hover:shadow-[0px_10px_30px_rgba(10,22,40,0.12)] hover:border-on-tertiary-container">
    <img loading="lazy" height="1200" width="900" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" src="gallery-images/award-ceremony.jpeg" alt="Award Ceremony - Anil Kumar &amp; Sons receiving recognition" />
    <div className="absolute top-3 left-3">
        <span className="bg-gold text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Award</span>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="font-body-md text-body-md font-semibold text-white">Award ceremony for top sales performance.</span>
    </div>
</div>

{/*  Image 4: Award Trophy  */}
<div className="masonry-item group relative cursor-pointer overflow-hidden rounded-lg bg-surface-container-highest border border-outline-variant transition-all hover:shadow-[0px_10px_30px_rgba(10,22,40,0.12)] hover:border-on-tertiary-container">
    <img loading="lazy" height="540" width="1200" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" src="gallery-images/award.jpeg" alt="Award Trophy - Anil Kumar &amp; Sons Achievement" />
    <div className="absolute top-3 left-3">
        <span className="bg-gold text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Award</span>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="font-body-md text-body-md font-semibold text-white">Official sales trophy.</span>
    </div>
</div>

{/*  Image 5: Uniview Gold Partner Award  */}
<div className="masonry-item group relative cursor-pointer overflow-hidden rounded-lg bg-surface-container-highest border border-outline-variant transition-all hover:shadow-[0px_10px_30px_rgba(10,22,40,0.12)] hover:border-on-tertiary-container">
    <img loading="lazy" height="1000" width="840" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" src="gallery-images/uniview-award.jpeg" alt="Uniview Gold Partner 2022 - Anil Kumar &amp; Sons Authorized Distributor Bharatpur" />
    <div className="absolute top-3 left-3">
        <span className="bg-gold text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Certified</span>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="font-body-md text-body-md font-semibold text-white">Uniview Gold Partner certificate for Bharatpur.</span>
    </div>
</div>

{/*  Image 6: Dahua Authorized Dealer Certificate  */}
<div className="masonry-item group relative cursor-pointer overflow-hidden rounded-lg bg-surface-container-highest border border-outline-variant transition-all hover:shadow-[0px_10px_30px_rgba(10,22,40,0.12)] hover:border-on-tertiary-container">
    <img loading="lazy" height="1200" width="848" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" src="gallery-images/dahua-certificate.jpeg" alt="Dahua Authorized Dealer Partner Certificate - Anil Kumar &amp; Sons Bharatpur Rajasthan" />
    <div className="absolute top-3 left-3">
        <span className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Certified</span>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="font-body-md text-body-md font-semibold text-white">Dahua dealer partner certificate in Bharatpur.</span>
    </div>
</div>

{/*  Image 7: CP Plus CSE Certificate  */}
<div className="masonry-item group relative cursor-pointer overflow-hidden rounded-lg bg-surface-container-highest border border-outline-variant transition-all hover:shadow-[0px_10px_30px_rgba(10,22,40,0.12)] hover:border-on-tertiary-container">
    <img loading="lazy" height="900" width="1200" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" src="gallery-images/cpplus-cse-certificate.jpeg" alt="CP Plus MissionTech Certified Surveillance Engineer CSE Level 1 - Rajat Garg, Anil Kumar &amp; Sons" />
    <div className="absolute top-3 left-3">
        <span className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Certified</span>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="font-body-md text-body-md font-semibold text-white">CP Plus certified engineer certificate.</span>
    </div>
</div>

{/*  Image 8: CP Plus Reseller Partner  */}
<div className="masonry-item group relative cursor-pointer overflow-hidden rounded-lg bg-surface-container-highest border border-outline-variant transition-all hover:shadow-[0px_10px_30px_rgba(10,22,40,0.12)] hover:border-on-tertiary-container">
    <img loading="lazy" height="900" width="1200" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" src="gallery-images/cpplus-reseller-partner.jpeg" alt="CP Plus Authorized Reseller Partner Certificate - Anil Kumar &amp; Sons Bharatpur Rajasthan" />
    <div className="absolute top-3 left-3">
        <span className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Partner</span>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="font-body-md text-body-md font-semibold text-white">CP Plus official partner certificate for Bharatpur.</span>
    </div>
</div>

{/*  Image 9: CP Plus Bharat Technology Show Award  */}
<div className="masonry-item group relative cursor-pointer overflow-hidden rounded-lg bg-surface-container-highest border border-outline-variant transition-all hover:shadow-[0px_10px_30px_rgba(10,22,40,0.12)] hover:border-on-tertiary-container">
    <img loading="lazy" height="900" width="1200" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" src="gallery-images/cppuls-bharat-award.jpeg" alt="CP Plus Bharat Technology Show Award - Recognition of Valued Contribution to Anil Kumar &amp; Sons" />
    <div className="absolute top-3 left-3">
        <span className="bg-gold text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Award</span>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="font-body-md text-body-md font-semibold text-white">CP Plus award for service excellence.</span>
    </div>
</div>

{/*  Image 10: Lanvo Certificate  */}
<div className="masonry-item group relative cursor-pointer overflow-hidden rounded-lg bg-surface-container-highest border border-outline-variant transition-all hover:shadow-[0px_10px_30px_rgba(10,22,40,0.12)] hover:border-on-tertiary-container">
    <img loading="lazy" height="781" width="550" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" src="gallery-images/lanvo-certificate.png" alt="Lanvo Authorized Certificate - Anil Kumar &amp; Sons Bharatpur" />
    <div className="absolute top-3 left-3">
        <span className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Certified</span>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="font-body-md text-body-md font-semibold text-white">Lanvo dealer certificate for Bharatpur shop.</span>
    </div>
</div>

</div>
</section>
</main>

{/*  Installation Quality & Partner Recognition  */}
<section className="py-16 bg-surface-container-lowest border-t border-outline-variant px-margin-mobile md:px-margin-desktop">
<div className="max-w-7xl mx-auto">
<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
<div>
<h2 className="font-headline-lg text-headline-lg text-primary mb-4">Our Quality Standards &amp; Experience</h2>
<p className="text-on-surface-variant text-body-md mb-4 leading-relaxed">At Anil Kumar &amp; Sons, every installation follows strict quality steps. We test camera angles, night vision, and power stability before completing the setup.</p>
<p className="text-on-surface-variant text-body-md leading-relaxed">Our trained technicians fit cables safely in PVC pipes. This protects wiring from weather and keeps your walls looking clean.</p>
</div>
<div className="bg-surface p-8 rounded-2xl border border-outline-variant">
<h3 className="font-headline-md text-headline-md text-primary mb-3">Why Customers Choose Us</h3>
<ul className="space-y-3 text-sm text-on-surface-variant">
<li className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary">check_circle</span>
<span>Official partner for Uniview, CP Plus, and Dahua in Bharatpur.</span>
</li>
<li className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary">check_circle</span>
<span>Over 500 successful installations in homes, shops, and offices.</span>
</li>
<li className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary">check_circle</span>
<span>Same-day site visits and fast technician service for repairs.</span>
</li>
<li className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary">check_circle</span>
<span>Free mobile phone app setup on Android and iPhone for online viewing.</span>
</li>
</ul>
</div>
</div>
</div>
</section>

{/*  Footer  */}
    <footer className="bg-primary-container text-on-primary-container pt-12 pb-32 md:pb-10 px-margin-mobile md:px-margin-desktop" id="footer">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-8 border-b border-white/10">
                <div>
                    <div className="bg-white p-3 rounded-xl inline-block shadow-md mb-3">
                        <img loading="lazy" height="724" width="1024" src="logo.png" alt="ANIL KUMAR &amp; SONS" className="h-20 w-auto object-contain" />
                    </div>
                    <p className="text-xs text-on-primary-container/70 mt-1 leading-relaxed">Smart Security. Reliable Protection. Trusted Service.<br/>Bharatpur, Rajasthan</p>
                </div>
                <div>
                    <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">Quick Links<span className="sr-only">.</span></h4>
                    <div className="flex flex-col gap-2 text-xs text-on-primary-container/80">
                        <a className="hover:text-white transition-colors" href="/">Home</a>
                        <a className="hover:text-white transition-colors" href="/services">Services</a>
                        <a className="hover:text-white transition-colors" href="/products">Products</a>
                        <a className="hover:text-white transition-colors" href="/gallery">Gallery</a>
                        <a className="hover:text-white transition-colors" href="/contact">Contact</a>
                    </div>
                </div>
                <div>
                    <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">Contact Us<span className="sr-only">.</span></h4>
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
                            <span>Inside B. Narayan Gate, Near SBI Bank,<br/>Bahanera Wale, Bharatpur, Raj - 321001</span>
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

    {/*  Fixed WhatsApp Floating Button  */}
    <a className="fixed bottom-20 right-6 md:bottom-8 md:right-8 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 hover:shadow-xl border-2 border-white" href="https://wa.me/918947976889" target="_blank" aria-label="WhatsApp" rel="noopener noreferrer">
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
    </a>
    {/*  Video Popup Modal  */}
    <div id="video-modal" className="fixed inset-0 z-[100] hidden items-center justify-center bg-black/85 backdrop-blur-md p-4 transition-all duration-300">
        <div className="relative w-full video-modal-container max-w-2xl md:max-w-3xl bg-navy border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[75vh]">
            {/*  Modal Header  */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-navy/95 shrink-0">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">videocam</span>
                    <h3 id="video-modal-title" className="font-bold text-white text-base md:text-lg">Video Preview</h3>
                </div>
                <button id="close-video-modal" aria-label="Close Video Modal" className="w-9 h-9 rounded-full bg-white/10 hover:bg-secondary hover:text-on-secondary text-white flex items-center justify-center transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>
            </div>
            {/*  Video Player Container  */}
            <div className="relative video-player-box bg-black flex items-center justify-center w-full max-h-[60vh] overflow-hidden">
                <video id="modal-video-player" className="w-full max-h-[60vh] object-contain" controls playsInline={true} preload="auto">
                    <source id="modal-video-source" src="" type="video/mp4" />
                    Your browser does not support video playback.
                </video>
            </div>
        </div>
    </div>

    

    </>
  );
}
