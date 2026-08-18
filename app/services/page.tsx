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
                <a className="text-secondary border-b-2 border-secondary pb-1 font-medium font-body-md text-body-md" href="/services">Services</a>
                <a className="text-white font-medium hover:text-secondary transition-colors duration-200 font-body-md text-body-md" href="/products">Products</a>
                <a className="text-white font-medium hover:text-secondary transition-colors duration-200 font-body-md text-body-md" href="/gallery">Gallery</a>
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
            <a className="flex flex-col items-center text-secondary" href="/services" >
                <span className="material-symbols-outlined" style={{ 'fontVariationSettings': '\'FILL\' 1' }}>build</span>
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

    <main className="flex-grow ">
{/*  Page Header  */}
<section className="bg-surface py-section-padding px-margin-mobile md:px-margin-desktop border-b border-surface-container-high">
<div className="max-w-7xl mx-auto">
<nav aria-label="Breadcrumb" className="mb-stack-md">
<ol className="flex items-center space-x-2 text-caption font-caption text-on-surface-variant">
<li><a className="hover:text-primary transition-colors" href="/">Home</a></li>
<li><span className="material-symbols-outlined text-sm">chevron_right</span></li>
<li aria-current="page" className="text-primary font-medium">Services</li>
</ol>
</nav>
<h1 className="font-display-hero text-display-hero md:text-display-hero text-primary mb-stack-sm">Our Services<span className="sr-only">.</span></h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">We install security cameras and Wi-Fi networks in Bharatpur. Our team guarantees clean work, high product quality, and full technical help.</p>
</div>
</section>
{/*  Services List  */}
<section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">
{/*  Service 1: CCTV  */}
<div className="md:col-span-12 flex flex-col md:flex-row bg-surface-container-lowest border border-outline-variant rounded-DEFAULT card-hover transition-all duration-300 overflow-hidden">
<div className="md:w-1/3 bg-surface p-stack-lg flex items-center justify-center border-b md:border-b-0 md:border-r border-outline-variant">
<span className="material-symbols-outlined text-6xl text-primary icon-fill">videocam</span>
</div>
<div className="md:w-2/3 p-stack-lg flex flex-col justify-center">
<div className="flex justify-between items-start mb-stack-sm">
<h2 className="font-headline-md text-headline-md text-primary">CCTV Camera Installation<span className="sr-only">.</span></h2>
<span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-caption font-caption font-medium">From ₹1,350</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">We install high-definition CCTV camera systems for homes, offices, and shops. Our team visits your site, plans camera spots, and ensures clean wiring for round-the-clock safety.</p>
<div className="mt-auto">
<a href="/contact" className="btn-primary px-6 py-2 inline-block text-center w-full md:w-auto">Get a Quote</a>
</div>
</div>
</div>
{/*  Service 2: DVR/NVR  */}
<div className="md:col-span-12 flex flex-col md:flex-row bg-surface border border-outline-variant rounded-DEFAULT card-hover transition-all duration-300 overflow-hidden mt-stack-lg">
<div className="md:w-2/3 p-stack-lg flex flex-col justify-center order-2 md:order-1">
<div className="flex justify-between items-start mb-stack-sm">
<h2 className="font-headline-md text-headline-md text-primary">DVR &amp; NVR Recording<span className="sr-only">.</span></h2>
<span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-full text-caption font-caption font-medium">Custom Quote</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">We set up Digital Video Recorders (DVR) and Network Video Recorders (NVR) with large storage units. You can view live video footage on your phone anytime, anywhere.</p>
<div className="mt-auto">
<a href="/contact" className="btn-primary px-6 py-2 inline-block text-center w-full md:w-auto">Get a Quote</a>
</div>
</div>
<div className="md:w-1/3 bg-surface-container-lowest p-stack-lg flex items-center justify-center border-b md:border-b-0 md:border-l border-outline-variant order-1 md:order-2">
<span className="material-symbols-outlined text-6xl text-primary icon-fill">storage</span>
</div>
</div>
{/*  Service 3: Network  */}
<div className="md:col-span-12 flex flex-col md:flex-row bg-surface-container-lowest border border-outline-variant rounded-DEFAULT card-hover transition-all duration-300 overflow-hidden mt-stack-lg">
<div className="md:w-1/3 bg-surface p-stack-lg flex items-center justify-center border-b md:border-b-0 md:border-r border-outline-variant">
<span className="material-symbols-outlined text-6xl text-primary icon-fill">router</span>
</div>
<div className="md:w-2/3 p-stack-lg flex flex-col justify-center">
<div className="flex justify-between items-start mb-stack-sm">
<h2 className="font-headline-md text-headline-md text-primary">Network &amp; Wi-Fi Setup<span className="sr-only">.</span></h2>
<span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-caption font-caption font-medium">Custom Quote</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">We build fast, secure Wi-Fi networks and cable connections for offices, schools, and homes. Enjoy strong Internet coverage in every room with safe setup settings.</p>
<div className="mt-auto">
<a href="/contact" className="btn-primary px-6 py-2 inline-block text-center w-full md:w-auto">Get a Quote</a>
</div>
</div>
</div>
{/*  Service 4: VDP  */}
<div className="md:col-span-12 flex flex-col md:flex-row bg-surface border border-outline-variant rounded-DEFAULT card-hover transition-all duration-300 overflow-hidden mt-stack-lg">
<div className="md:w-2/3 p-stack-lg flex flex-col justify-center order-2 md:order-1">
<div className="flex justify-between items-start mb-stack-sm">
<h2 className="font-headline-md text-headline-md text-primary">Video Door Phone<span className="sr-only">.</span></h2>
<span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-full text-caption font-caption font-medium">Custom Quote</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">Our video door phones let you see and talk to visitors before opening your door. Protect your home with smart touch screens and electronic door locks.</p>
<div className="mt-auto">
<a href="/contact" className="btn-primary px-6 py-2 inline-block text-center w-full md:w-auto">Get a Quote</a>
</div>
</div>
<div className="md:w-1/3 bg-surface-container-lowest p-stack-lg flex items-center justify-center border-b md:border-b-0 md:border-l border-outline-variant order-1 md:order-2">
<span className="material-symbols-outlined text-6xl text-primary icon-fill">meeting_room</span>
</div>
</div>
{/*  Service 5: Wholesale  */}
<div className="md:col-span-12 flex flex-col md:flex-row bg-surface-container-lowest border border-outline-variant rounded-DEFAULT card-hover transition-all duration-300 overflow-hidden mt-stack-lg">
<div className="md:w-1/3 bg-surface p-stack-lg flex items-center justify-center border-b md:border-b-0 md:border-r border-outline-variant">
<span className="material-symbols-outlined text-6xl text-primary icon-fill">inventory_2</span>
</div>
<div className="md:w-2/3 p-stack-lg flex flex-col justify-center">
<div className="flex justify-between items-start mb-stack-sm">
<h2 className="font-headline-md text-headline-md text-primary">Wholesale Supply<span className="sr-only">.</span></h2>
<span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-caption font-caption font-medium">Bulk Pricing</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">We supply security cameras, cables, and connectors at wholesale prices. Contractors and bulk buyers get fast local delivery and complete warranty support.</p>
<div className="mt-auto">
<a href="/contact" className="btn-primary px-6 py-2 inline-block text-center w-full md:w-auto">Get a Quote</a>
</div>
</div>
</div>
{/*  Service 6: AMC  */}
<div className="md:col-span-12 flex flex-col md:flex-row bg-surface border border-outline-variant rounded-DEFAULT card-hover transition-all duration-300 overflow-hidden mt-stack-lg">
<div className="md:w-2/3 p-stack-lg flex flex-col justify-center order-2 md:order-1">
<div className="flex justify-between items-start mb-stack-sm">
<h2 className="font-headline-md text-headline-md text-primary">Annual Maintenance (AMC)<span className="sr-only">.</span></h2>
<span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-full text-caption font-caption font-medium">Custom Quote</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">Keep your security systems working without any gaps. Our Annual Maintenance Contracts (AMC) include routine checks, quick repair visits, and lens cleaning.</p>
<div className="mt-auto">
<a href="/contact" className="btn-primary px-6 py-2 inline-block text-center w-full md:w-auto">Get a Quote</a>
</div>
</div>
<div className="md:w-1/3 bg-surface-container-lowest p-stack-lg flex items-center justify-center border-b md:border-b-0 md:border-l border-outline-variant order-1 md:order-2">
<span className="material-symbols-outlined text-6xl text-primary icon-fill">build</span>
</div>
</div>
</div>
</section>
{/*  Frequently Asked Questions  */}
<section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface border-t border-b border-outline-variant">
<div className="max-w-4xl mx-auto">
<div className="text-center mb-stack-lg">
<h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-stack-xs">Frequently Asked Questions</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Answers to common queries about our security services and camera installation in Bharatpur.</p>
</div>
<div className="space-y-4">
    {/*  FAQ Item 1  */}
    <div className="faq-item bg-background border border-outline-variant rounded-lg overflow-hidden transition-all duration-300">
        <button className="faq-trigger w-full flex justify-between items-center p-5 text-left font-bold text-primary focus:outline-none hover:bg-surface-container-low transition-colors" aria-expanded="false">
            <span>What brands of security systems do you install?</span>
            <span className="material-symbols-outlined transform transition-transform duration-300 text-secondary faq-icon">expand_more</span>
        </button>
        <div className="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
            <div className="p-5 pt-0 border-t border-outline-variant/10 text-sm text-on-surface-variant">
                We install and support all leading brands including CP Plus, Uniview (UNV), Dahua, TP-Link, D-Link, IMOU, Ezviz, Qubo, and Tenda with official manufacturer warranties.
            </div>
        </div>
    </div>
    {/*  FAQ Item 2  */}
    <div className="faq-item bg-background border border-outline-variant rounded-lg overflow-hidden transition-all duration-300">
        <button className="faq-trigger w-full flex justify-between items-center p-5 text-left font-bold text-primary focus:outline-none hover:bg-surface-container-low transition-colors" aria-expanded="false">
            <span>Do you provide site surveys for installations?</span>
            <span className="material-symbols-outlined transform transition-transform duration-300 text-secondary faq-icon">expand_more</span>
        </button>
        <div className="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
            <div className="p-5 pt-0 border-t border-outline-variant/10 text-sm text-on-surface-variant">
                Yes! We provide a 100% free, no-obligation site survey and consultation for homes, businesses, and industrial sites in Bharatpur.
            </div>
        </div>
    </div>
    {/*  FAQ Item 3  */}
    <div className="faq-item bg-background border border-outline-variant rounded-lg overflow-hidden transition-all duration-300">
        <button className="faq-trigger w-full flex justify-between items-center p-5 text-left font-bold text-primary focus:outline-none hover:bg-surface-container-low transition-colors" aria-expanded="false">
            <span>What is covered under an Annual Maintenance Contract (AMC)?</span>
            <span className="material-symbols-outlined transform transition-transform duration-300 text-secondary faq-icon">expand_more</span>
        </button>
        <div className="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
            <div className="p-5 pt-0 border-t border-outline-variant/10 text-sm text-on-surface-variant">
                Our security AMC covers regular hardware health checks, camera lens cleaning, cabling inspections, software/firmware updates, and priority diagnostic support to keep your systems running 24/7.
            </div>
        </div>
    </div>
    {/*  FAQ Item 4  */}
    <div className="faq-item bg-background border border-outline-variant rounded-lg overflow-hidden transition-all duration-300">
        <button className="faq-trigger w-full flex justify-between items-center p-5 text-left font-bold text-primary focus:outline-none hover:bg-surface-container-low transition-colors" aria-expanded="false">
            <span>Which is the best security camera for home use?</span>
            <span className="material-symbols-outlined transform transition-transform duration-300 text-secondary faq-icon">expand_more</span>
        </button>
        <div className="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
            <div className="p-5 pt-0 border-t border-outline-variant/10 text-sm text-on-surface-variant">
                For home safety, you can pick IP cameras for clear HD video, or smart Wi-Fi cameras for easy control on your phone.
            </div>
        </div>
    </div>
    {/*  FAQ Item 5  */}
    <div className="faq-item bg-background border border-outline-variant rounded-lg overflow-hidden transition-all duration-300">
        <button className="faq-trigger w-full flex justify-between items-center p-5 text-left font-bold text-primary focus:outline-none hover:bg-surface-container-low transition-colors" aria-expanded="false">
            <span>What is the difference between an IP camera and an analog camera?</span>
            <span className="material-symbols-outlined transform transition-transform duration-300 text-secondary faq-icon">expand_more</span>
        </button>
        <div className="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
            <div className="p-5 pt-0 border-t border-outline-variant/10 text-sm text-on-surface-variant">
                Analog cameras connect via coaxial cables to a DVR recorder. IP cameras connect via network cables to an NVR, offering sharper HD video and smart motion alerts.
            </div>
        </div>
    </div>
</div>
</div>
</section>

{/*  CTA Banner  */}
<section className="bg-[#e63946] py-section-padding px-margin-mobile md:px-margin-desktop text-center">
<div className="max-w-4xl mx-auto">
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-[#ffffff] mb-stack-md">Ready to Secure Your Premises?</h2>
<p className="font-body-lg text-body-lg text-[#ffffff]/90 mb-stack-lg">Contact our technical team today for a free site assessment and a custom security architecture proposal.</p>
<div className="flex flex-col sm:flex-row justify-center gap-stack-md">
<a href="/contact" className="bg-primary text-on-primary font-bold py-3 px-8 rounded-lg hover:bg-surface-tint transition-colors inline-block text-center">Contact Sales</a>
<a href="/products" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-[#e63946] transition-colors inline-block text-center">View Products</a>
</div>
</div>
</section>
</main>

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
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg></a>
    </>
  );
}
