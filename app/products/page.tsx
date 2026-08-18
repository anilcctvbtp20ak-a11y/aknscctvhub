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
                <a className="text-secondary border-b-2 border-secondary pb-1 font-medium font-body-md text-body-md" href="/products">Products</a>
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
            <a className="flex flex-col items-center text-on-surface-variant" href="/services">
                <span className="material-symbols-outlined">build</span>
                <span className="text-[10px] font-medium mt-1">Services</span>
            </a>
            <a className="flex flex-col items-center text-secondary" href="/products" >
                <span className="material-symbols-outlined" style={{ 'fontVariationSettings': '\'FILL\' 1' }}>inventory_2</span>
                <span className="text-[10px] font-medium mt-1">Products</span>
            </a>
            <a className="flex flex-col items-center text-on-surface-variant" href="/contact">
                <span className="material-symbols-outlined">contact_support</span>
                <span className="text-[10px] font-medium mt-1">Contact</span>
            </a>
        </div>
    </nav>

    <main className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-section-padding ">
{/*  Header  */}
<div className="mb-stack-lg border-b border-outline-variant pb-8">
<h2 className="font-section-tagline text-section-tagline text-secondary uppercase block mb-stack-sm">Inventory Overview</h2>
<h1 className="font-headline-lg text-headline-lg text-primary">Products We Stock<span className="sr-only">.</span></h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-stack-sm max-w-2xl">We stock top-quality security cameras, recorders, and Wi-Fi devices. Browse our full inventory for wholesale deals in Bharatpur.</p>
</div>
{/*  Filter Tabs  */}
<div className="flex flex-nowrap md:flex-wrap overflow-x-auto no-scrollbar gap-stack-md mb-stack-lg border-b border-surface-variant pb-4" id="filter-tabs">
<button data-filter="all" className="filter-btn active-filter px-4 py-2 rounded-full border border-secondary bg-secondary text-on-secondary font-caption text-caption focus:outline-none transition-colors">All</button>
<button data-filter="cctv" className="filter-btn px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant font-caption text-caption hover:border-secondary hover:text-secondary focus:outline-none transition-colors">CCTV Cameras</button>
<button data-filter="dvrnvr" className="filter-btn px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant font-caption text-caption hover:border-secondary hover:text-secondary focus:outline-none transition-colors">DVR/NVR</button>
<button data-filter="cables" className="filter-btn px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant font-caption text-caption hover:border-secondary hover:text-secondary focus:outline-none transition-colors">Cables</button>
<button data-filter="routers" className="filter-btn px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant font-caption text-caption hover:border-secondary hover:text-secondary focus:outline-none transition-colors">Routers</button>
<button data-filter="accessories" className="filter-btn px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant font-caption text-caption hover:border-secondary hover:text-secondary focus:outline-none transition-colors">Accessories</button>
<button data-filter="power" className="filter-btn px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant font-caption text-caption hover:border-secondary hover:text-secondary focus:outline-none transition-colors">Power Supply</button>
<button data-filter="epbx" className="filter-btn px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant font-caption text-caption hover:border-secondary hover:text-secondary focus:outline-none transition-colors">EPBX Systems</button>
<button data-filter="it" className="filter-btn px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant font-caption text-caption hover:border-secondary hover:text-secondary focus:outline-none transition-colors">Computers &amp; IT</button>
</div>
{/*  Product Grid  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter" id="product-grid">
{/*  Card 1  */}
<div className="product-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden group hover:shadow-[0px_10px_30px_rgba(10,22,40,0.08)] hover:border-tertiary-container transition-all duration-300 flex flex-col" data-category="cctv">
<div className="w-full h-48 bg-surface-container-high relative overflow-hidden">
<img loading="lazy" height="400" width="400" className="object-cover w-full h-full mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" src="product-images/bullet-camera-5mp.jpg" alt="5MP IP Bullet Camera" />
<div className="absolute top-2 left-2 bg-primary-container text-on-primary-container font-caption text-caption px-2 py-1 rounded text-xs font-bold">Velvu</div>
</div>
<div className="p-stack-md flex flex-col flex-grow">
<h3 className="font-headline-md text-body-lg text-primary mb-1">5MP IP Bullet Camera<span className="sr-only">.</span></h3>
<p className="font-caption text-caption text-on-surface-variant mb-4 flex-grow">Outdoor security camera with clear night vision and sharp 5MP video.</p>
<div className="mt-auto pt-4 border-t border-surface-container text-center">
<a href="/contact" className="inline-block border-2 border-primary text-primary px-6 py-2 rounded font-caption text-caption font-bold hover:bg-primary hover:text-on-primary transition-colors w-full">Enquire</a>
</div>
</div>
</div>
{/*  Card 2  */}
<div className="product-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden group hover:shadow-[0px_10px_30px_rgba(10,22,40,0.08)] hover:border-tertiary-container transition-all duration-300 flex flex-col" data-category="cctv">
<div className="w-full h-48 bg-surface-container-high relative overflow-hidden">
<img loading="lazy" height="400" width="400" className="object-cover w-full h-full mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" src="product-images/dome-camera-2.4mp.jpg" alt="2.4MP Dome Camera" />
<div className="absolute top-2 left-2 bg-primary-container text-on-primary-container font-caption text-caption px-2 py-1 rounded text-xs font-bold">CP Plus</div>
</div>
<div className="p-stack-md flex flex-col flex-grow">
<h3 className="font-headline-md text-body-lg text-primary mb-1">2.4MP Dome Camera<span className="sr-only">.</span></h3>
<p className="font-caption text-caption text-on-surface-variant mb-4 flex-grow">Compact indoor camera for easy ceiling mounting in shops and offices.</p>
<div className="mt-auto pt-4 border-t border-surface-container text-center">
<a href="/contact" className="inline-block border-2 border-primary text-primary px-6 py-2 rounded font-caption text-caption font-bold hover:bg-primary hover:text-on-primary transition-colors w-full">Enquire</a>
</div>
</div>
</div>
{/*  Card 3  */}
<div className="product-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden group hover:shadow-[0px_10px_30px_rgba(10,22,40,0.08)] hover:border-tertiary-container transition-all duration-300 flex flex-col" data-category="dvrnvr">
<div className="w-full h-48 bg-surface-container-high relative overflow-hidden">
<img loading="lazy" height="400" width="400" className="object-cover w-full h-full mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" src="product-images/dvr-4ch.jpg" alt="4-Ch DVR" />
<div className="absolute top-2 left-2 bg-primary-container text-on-primary-container font-caption text-caption px-2 py-1 rounded text-xs font-bold">CP Plus</div>
</div>
<div className="p-stack-md flex flex-col flex-grow">
<h3 className="font-headline-md text-body-lg text-primary mb-1">4-Ch DVR<span className="sr-only">.</span></h3>
<p className="font-caption text-caption text-on-surface-variant mb-4 flex-grow">4-channel video recorder built for simple home camera setups.</p>
<div className="mt-auto pt-4 border-t border-surface-container text-center">
<a href="/contact" className="inline-block border-2 border-primary text-primary px-6 py-2 rounded font-caption text-caption font-bold hover:bg-primary hover:text-on-primary transition-colors w-full">Enquire</a>
</div>
</div>
</div>
{/*  Card 4  */}
<div className="product-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden group hover:shadow-[0px_10px_30px_rgba(10,22,40,0.08)] hover:border-tertiary-container transition-all duration-300 flex flex-col" data-category="dvrnvr">
<div className="w-full h-48 bg-surface-container-high relative overflow-hidden">
<img loading="lazy" height="400" width="400" className="object-cover w-full h-full mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" src="product-images/nvr-16ch.jpg" alt="16-Ch 4K NVR" />
<div className="absolute top-2 left-2 bg-primary-container text-on-primary-container font-caption text-caption px-2 py-1 rounded text-xs font-bold">CP Plus</div>
</div>
<div className="p-stack-md flex flex-col flex-grow">
<h3 className="font-headline-md text-body-lg text-primary mb-1">16-Ch 4K NVR<span className="sr-only">.</span></h3>
<p className="font-caption text-caption text-on-surface-variant mb-4 flex-grow">16-channel video recorder that supports sharp 4K IP cameras.</p>
<div className="mt-auto pt-4 border-t border-surface-container text-center">
<a href="/contact" className="inline-block border-2 border-primary text-primary px-6 py-2 rounded font-caption text-caption font-bold hover:bg-primary hover:text-on-primary transition-colors w-full">Enquire</a>
</div>
</div>
</div>
{/*  Card 5  */}
<div className="product-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden group hover:shadow-[0px_10px_30px_rgba(10,22,40,0.08)] hover:border-tertiary-container transition-all duration-300 flex flex-col" data-category="routers">
<div className="w-full h-48 bg-surface-container-high relative overflow-hidden">
<img loading="lazy" height="400" width="400" className="object-cover w-full h-full mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" src="product-images/n301-router.jpg" alt="N301 Router" />
<div className="absolute top-2 left-2 bg-primary-container text-on-primary-container font-caption text-caption px-2 py-1 rounded text-xs font-bold">Tenda</div>
</div>
<div className="p-stack-md flex flex-col flex-grow">
<h3 className="font-headline-md text-body-lg text-primary mb-1">N301 Router<span className="sr-only">.</span></h3>
<p className="font-caption text-caption text-on-surface-variant mb-4 flex-grow">Wireless router for home and shop Wi-Fi setup.</p>
<div className="mt-auto pt-4 border-t border-surface-container text-center">
<a href="/contact" className="inline-block border-2 border-primary text-primary px-6 py-2 rounded font-caption text-caption font-bold hover:bg-primary hover:text-on-primary transition-colors w-full">Enquire</a>
</div>
</div>
</div>
{/*  Card 6  */}
<div className="product-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden group hover:shadow-[0px_10px_30px_rgba(10,22,40,0.08)] hover:border-tertiary-container transition-all duration-300 flex flex-col" data-category="routers">
<div className="w-full h-48 bg-surface-container-high relative overflow-hidden">
<img loading="lazy" height="400" width="400" className="object-cover w-full h-full mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" src="product-images/router-4g-sim.jpg" alt="4G SIM-Slot Router" />
<div className="absolute top-2 left-2 bg-primary-container text-on-primary-container font-caption text-caption px-2 py-1 rounded text-xs font-bold">Network</div>
</div>
<div className="p-stack-md flex flex-col flex-grow">
<h3 className="font-headline-md text-body-lg text-primary mb-1">4G SIM-Slot Router<span className="sr-only">.</span></h3>
<p className="font-caption text-caption text-on-surface-variant mb-4 flex-grow">Fast 4G Wi-Fi router with SIM slot for instant internet.</p>
<div className="mt-auto pt-4 border-t border-surface-container text-center">
<a href="/contact" className="inline-block border-2 border-primary text-primary px-6 py-2 rounded font-caption text-caption font-bold hover:bg-primary hover:text-on-primary transition-colors w-full">Enquire</a>
</div>
</div>
</div>
{/*  Card 7  */}
<div className="product-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden group hover:shadow-[0px_10px_30px_rgba(10,22,40,0.08)] hover:border-tertiary-container transition-all duration-300 flex flex-col" data-category="accessories">
<div className="w-full h-48 bg-surface-container-high relative overflow-hidden">
<img loading="lazy" height="400" width="400" className="object-cover w-full h-full mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" src="product-images/poe-switch-8port.jpg" alt="8-Port PoE Switch" />
<div className="absolute top-2 left-2 bg-primary-container text-on-primary-container font-caption text-caption px-2 py-1 rounded text-xs font-bold">CP Plus</div>
</div>
<div className="p-stack-md flex flex-col flex-grow">
<h3 className="font-headline-md text-body-lg text-primary mb-1">8-Port PoE Switch<span className="sr-only">.</span></h3>
<p className="font-caption text-caption text-on-surface-variant mb-4 flex-grow">8-port network switch to power IP cameras with one cable.</p>
<div className="mt-auto pt-4 border-t border-surface-container text-center">
<a href="/contact" className="inline-block border-2 border-primary text-primary px-6 py-2 rounded font-caption text-caption font-bold hover:bg-primary hover:text-on-primary transition-colors w-full">Enquire</a>
</div>
</div>
</div>
{/*  Card 8  */}
<div className="product-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden group hover:shadow-[0px_10px_30px_rgba(10,22,40,0.08)] hover:border-tertiary-container transition-all duration-300 flex flex-col" data-category="accessories">
<div className="w-full h-48 bg-surface-container-high relative overflow-hidden">
<img loading="lazy" height="400" width="400" className="object-cover w-full h-full mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" src="product-images/video-door-phone.jpg" alt="Video Door Phone" />
<div className="absolute top-2 left-2 bg-primary-container text-on-primary-container font-caption text-caption px-2 py-1 rounded text-xs font-bold">Access</div>
</div>
<div className="p-stack-md flex flex-col flex-grow">
<h3 className="font-headline-md text-body-lg text-primary mb-1">Video Door Phone<span className="sr-only">.</span></h3>
<p className="font-caption text-caption text-on-surface-variant mb-4 flex-grow">Talk and see visitors clearly before opening your door.</p>
<div className="mt-auto pt-4 border-t border-surface-container text-center">
<a href="/contact" className="inline-block border-2 border-primary text-primary px-6 py-2 rounded font-caption text-caption font-bold hover:bg-primary hover:text-on-primary transition-colors w-full">Enquire</a>
</div>
</div>
</div>
{/*  Card 9  */}
<div className="product-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden group hover:shadow-[0px_10px_30px_rgba(10,22,40,0.08)] hover:border-tertiary-container transition-all duration-300 flex flex-col" data-category="cables">
<div className="w-full h-48 bg-surface-container-high relative overflow-hidden">
<img loading="lazy" height="400" width="400" className="object-cover w-full h-full mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" src="product-images/cctv-cable-90m.jpg" alt="90m CCTV Cable" />
<div className="absolute top-2 left-2 bg-primary-container text-on-primary-container font-caption text-caption px-2 py-1 rounded text-xs font-bold">Cables</div>
</div>
<div className="p-stack-md flex flex-col flex-grow">
<h3 className="font-headline-md text-body-lg text-primary mb-1">90m CCTV Cable<span className="sr-only">.</span></h3>
<p className="font-caption text-caption text-on-surface-variant mb-4 flex-grow">Strong 90-meter camera cable for clear video and power supply.</p>
<div className="mt-auto pt-4 border-t border-surface-container text-center">
<a href="/contact" className="inline-block border-2 border-primary text-primary px-6 py-2 rounded font-caption text-caption font-bold hover:bg-primary hover:text-on-primary transition-colors w-full">Enquire</a>
</div>
</div>
</div>

{/*  Card 10: Analog EPBX System  */}
<div className="product-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden group hover:shadow-[0px_10px_30px_rgba(10,22,40,0.08)] hover:border-tertiary-container transition-all duration-300 flex flex-col" data-category="epbx">
<div className="w-full h-48 bg-surface-container-high relative overflow-hidden">
<img loading="lazy" height="400" width="400" className="object-cover w-full h-full mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" src="product-images/epbx-analog.jpg" alt="Analog EPBX System" />
<div className="absolute top-2 left-2 bg-primary-container text-on-primary-container font-caption text-caption px-2 py-1 rounded text-xs font-bold">Analog EPBX</div>
</div>
<div className="p-stack-md flex flex-col flex-grow">
<h3 className="font-headline-md text-body-lg text-primary mb-1">Analog EPBX System<span className="sr-only">.</span></h3>
<p className="font-caption text-caption text-on-surface-variant mb-4 flex-grow">Intercom system for internal office and hotel room calls.</p>
<div className="mt-auto pt-4 border-t border-surface-container text-center">
<a href="/contact" className="inline-block border-2 border-primary text-primary px-6 py-2 rounded font-caption text-caption font-bold hover:bg-primary hover:text-on-primary transition-colors w-full">Enquire</a>
</div>
</div>
</div>

{/*  Card 11: IP-Based EPBX System  */}
<div className="product-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden group hover:shadow-[0px_10px_30px_rgba(10,22,40,0.08)] hover:border-tertiary-container transition-all duration-300 flex flex-col" data-category="epbx">
<div className="w-full h-48 bg-surface-container-high relative overflow-hidden">
<img loading="lazy" height="400" width="400" className="object-cover w-full h-full mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" src="product-images/epbx-ip.jpg" alt="IP-Based EPBX System" />
<div className="absolute top-2 left-2 bg-primary-container text-on-primary-container font-caption text-caption px-2 py-1 rounded text-xs font-bold">IP Base</div>
</div>
<div className="p-stack-md flex flex-col flex-grow">
<h3 className="font-headline-md text-body-lg text-primary mb-1">IP-Based EPBX System<span className="sr-only">.</span></h3>
<p className="font-caption text-caption text-on-surface-variant mb-4 flex-grow">Modern IP phone system for multi-branch phone connections.</p>
<div className="mt-auto pt-4 border-t border-surface-container text-center">
<a href="/contact" className="inline-block border-2 border-primary text-primary px-6 py-2 rounded font-caption text-caption font-bold hover:bg-primary hover:text-on-primary transition-colors w-full">Enquire</a>
</div>
</div>
</div>

{/*  Card 12: Lenovo Laptop  */}
<div className="product-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden group hover:shadow-[0px_10px_30px_rgba(10,22,40,0.08)] hover:border-tertiary-container transition-all duration-300 flex flex-col" data-category="it">
<div className="w-full h-48 bg-surface-container-high relative overflow-hidden">
<img loading="lazy" height="400" width="400" className="object-cover w-full h-full mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" src="product-images/laptop-lenovo.jpg" alt="Lenovo Laptop" />
<div className="absolute top-2 left-2 bg-primary-container text-on-primary-container font-caption text-caption px-2 py-1 rounded text-xs font-bold">Lenovo</div>
</div>
<div className="p-stack-md flex flex-col flex-grow">
<h3 className="font-headline-md text-body-lg text-primary mb-1">Lenovo Laptop<span className="sr-only">.</span></h3>
<p className="font-caption text-caption text-on-surface-variant mb-4 flex-grow">Reliable Lenovo laptops for office work and daily study.</p>
<div className="mt-auto pt-4 border-t border-surface-container text-center">
<a href="/contact" className="inline-block border-2 border-primary text-primary px-6 py-2 rounded font-caption text-caption font-bold hover:bg-primary hover:text-on-primary transition-colors w-full">Enquire</a>
</div>
</div>
</div>

{/*  Card 13: Desktop PC  */}
<div className="product-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden group hover:shadow-[0px_10px_30px_rgba(10,22,40,0.08)] hover:border-tertiary-container transition-all duration-300 flex flex-col" data-category="it">
<div className="w-full h-48 bg-surface-container-high relative overflow-hidden">
<img loading="lazy" height="400" width="400" className="object-cover w-full h-full mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" src="product-images/desktop-pc.jpg" alt="Desktop PC Tower & Monitor" />
<div className="absolute top-2 left-2 bg-primary-container text-on-primary-container font-caption text-caption px-2 py-1 rounded text-xs font-bold">Custom PC</div>
</div>
<div className="p-stack-md flex flex-col flex-grow">
<h3 className="font-headline-md text-body-lg text-primary mb-1">Desktop Computer<span className="sr-only">.</span></h3>
<p className="font-caption text-caption text-on-surface-variant mb-4 flex-grow">Desktop computers with sharp monitors for office and home use.</p>
<div className="mt-auto pt-4 border-t border-surface-container text-center">
<a href="/contact" className="inline-block border-2 border-primary text-primary px-6 py-2 rounded font-caption text-caption font-bold hover:bg-primary hover:text-on-primary transition-colors w-full">Enquire</a>
</div>
</div>
</div>

{/*  Card 14: All-in-One PC (AIO)  */}
<div className="product-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden group hover:shadow-[0px_10px_30px_rgba(10,22,40,0.08)] hover:border-tertiary-container transition-all duration-300 flex flex-col" data-category="it">
<div className="w-full h-48 bg-surface-container-high relative overflow-hidden">
<img loading="lazy" height="400" width="400" className="object-cover w-full h-full mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" src="product-images/aio-pc.jpg" alt="All-in-One Computer" />
<div className="absolute top-2 left-2 bg-primary-container text-on-primary-container font-caption text-caption px-2 py-1 rounded text-xs font-bold">All-in-One</div>
</div>
<div className="p-stack-md flex flex-col flex-grow">
<h3 className="font-headline-md text-body-lg text-primary mb-1">All-in-One (AIO) PC<span className="sr-only">.</span></h3>
<p className="font-caption text-caption text-on-surface-variant mb-4 flex-grow">Sleek All-in-One computer with built-in screen and CPU.</p>
<div className="mt-auto pt-4 border-t border-surface-container text-center">
<a href="/contact" className="inline-block border-2 border-primary text-primary px-6 py-2 rounded font-caption text-caption font-bold hover:bg-primary hover:text-on-primary transition-colors w-full">Enquire</a>
</div>
</div>
</div>

{/*  Card 15: Laser Printer  */}
<div className="product-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden group hover:shadow-[0px_10px_30px_rgba(10,22,40,0.08)] hover:border-tertiary-container transition-all duration-300 flex flex-col" data-category="it">
<div className="w-full h-48 bg-surface-container-high relative overflow-hidden">
<img loading="lazy" height="400" width="400" className="object-cover w-full h-full mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" src="product-images/printer.jpg" alt="Laser Printer" />
<div className="absolute top-2 left-2 bg-primary-container text-on-primary-container font-caption text-caption px-2 py-1 rounded text-xs font-bold">Printer</div>
</div>
<div className="p-stack-md flex flex-col flex-grow">
<h3 className="font-headline-md text-body-lg text-primary mb-1">Laser Printer<span className="sr-only">.</span></h3>
<p className="font-caption text-caption text-on-surface-variant mb-4 flex-grow">Fast laser printer for clear document printing at work.</p>
<div className="mt-auto pt-4 border-t border-surface-container text-center">
<a href="/contact" className="inline-block border-2 border-primary text-primary px-6 py-2 rounded font-caption text-caption font-bold hover:bg-primary hover:text-on-primary transition-colors w-full">Enquire</a>
</div>
</div>
</div>

{/*  Card 16: Flatbed Scanner  */}
<div className="product-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden group hover:shadow-[0px_10px_30px_rgba(10,22,40,0.08)] hover:border-tertiary-container transition-all duration-300 flex flex-col" data-category="it">
<div className="w-full h-48 bg-surface-container-high relative overflow-hidden">
<img loading="lazy" height="400" width="400" className="object-cover w-full h-full mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" src="product-images/scanner.png" alt="Flatbed Document Scanner" />
<div className="absolute top-2 left-2 bg-primary-container text-on-primary-container font-caption text-caption px-2 py-1 rounded text-xs font-bold">Scanner</div>
</div>
<div className="p-stack-md flex flex-col flex-grow">
<h3 className="font-headline-md text-body-lg text-primary mb-1">Flatbed Scanner<span className="sr-only">.</span></h3>
<p className="font-caption text-caption text-on-surface-variant mb-4 flex-grow">High-resolution scanner to digitize paper files quickly.</p>
<div className="mt-auto pt-4 border-t border-surface-container text-center">
<a href="/contact" className="inline-block border-2 border-primary text-primary px-6 py-2 rounded font-caption text-caption font-bold hover:bg-primary hover:text-on-primary transition-colors w-full">Enquire</a>
</div>
</div>
</div>
</div>

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

    </>
  );
}
