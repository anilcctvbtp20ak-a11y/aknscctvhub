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
    <div
      className="md:hidden sticky top-0 w-full z-50 bg-navy border-b border-white/10 shadow-sm h-20 flex items-center justify-between px-margin-mobile"
    >
      <a className="flex items-center gap-2 h-full" href="/">
        <img
          height="724"
          width="1024"
          src="logo.png"
          alt="ANIL KUMAR &amp; SONS"
          className="h-20 w-auto object-contain py-1"
        />
      </a>
      <a
        className="bg-secondary text-on-secondary px-4 py-2 rounded-lg font-bold text-sm hover:bg-opacity-90 transition-opacity"
        href="/contact"
        >Consultation</a
      >
    </div>

    {/*  TopNavBar (Web)  */}
    <header
      className="hidden md:flex sticky top-0 w-full z-50 bg-navy border-b border-white/10 shadow-sm h-24"
    >
      <div
        className="flex justify-between items-center px-margin-desktop w-full max-w-7xl mx-auto h-full"
      >
        <a className="flex items-center gap-2 h-full" href="/">
          <img
            height="724"
            width="1024"
            src="logo.png"
            alt="ANIL KUMAR &amp; SONS"
            className="h-24 w-auto object-contain py-1"
          />
        </a>
        <nav className="flex gap-gutter items-center">
          <a
            className="text-secondary border-b-2 border-secondary pb-1 font-body-md text-body-md"
            href="/"
            >Home</a
          >
          <a
            className="text-white font-medium hover:text-secondary transition-colors duration-200 font-body-md text-body-md"
            href="/services"
            >Services</a
          >
          <a
            className="text-white font-medium hover:text-secondary transition-colors duration-200 font-body-md text-body-md"
            href="/products"
            >Products</a
          >
          <a
            className="text-white font-medium hover:text-secondary transition-colors duration-200 font-body-md text-body-md"
            href="/gallery"
            >Gallery</a
          >
          <a
            className="text-white font-medium hover:text-secondary transition-colors duration-200 font-body-md text-body-md"
            href="/contact"
            >Contact</a
          >
          <a
            className="ml-4 bg-secondary text-on-secondary px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-opacity"
            href="/contact"
            >Get Free Consultation</a
          >
        </nav>
      </div>
    </header>

    {/*  SideNavBar (Mobile)  */}
    <nav
      className="md:hidden fixed bottom-0 w-full z-50 bg-surface-container-lowest border-t border-outline-variant pb-safe"
    >
      <div className="flex justify-around items-center h-16">
        <a className="flex flex-col items-center text-secondary" href="/">
          <span
            className="material-symbols-outlined"
            style={{ 'fontVariationSettings': '\'FILL\' 1' }}
            >home</span
          >
          <span className="text-[10px] font-medium mt-1">Home</span>
        </a>
        <a
          className="flex flex-col items-center text-on-surface-variant"
          href="/services"
        >
          <span className="material-symbols-outlined">build</span>
          <span className="text-[10px] font-medium mt-1">Services</span>
        </a>
        <a
          className="flex flex-col items-center text-on-surface-variant"
          href="/products"
        >
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="text-[10px] font-medium mt-1">Products</span>
        </a>
        <a
          className="flex flex-col items-center text-on-surface-variant"
          href="/contact"
        >
          <span className="material-symbols-outlined">contact_support</span>
          <span className="text-[10px] font-medium mt-1">Contact</span>
        </a>
      </div>
    </nav>

    <main className="flex-grow">
      {/*  Hero Section (Navy Background)  */}
      <section
        className="bg-navy text-on-tertiary pt-24 pb-32 px-margin-mobile md:px-margin-desktop relative overflow-hidden"
      >
        <div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10 items-center"
        >
          <div className="md:col-span-7 flex flex-col justify-center">
            <span
              className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-4 inline-block"
              >Protecting What Matters Most</span
            >
            <h1
              className="font-display-hero text-[32px] sm:text-[40px] md:text-display-hero mb-6"
            >
              CCTV Installation &amp; Smart Security Solutions
            <span className="sr-only">.</span></h1>
            <p
              className="font-body-lg text-body-lg text-inverse-on-surface/80 mb-8 max-w-2xl"
            >
              We provide end-to-end security solutions with premium products,
              expert installation, and reliable after-sales support. From homes
              to commercial spaces, industries, schools, hospitals, and
              offices—we ensure complete protection with advanced surveillance
              technology.
            </p>

            {/*  Bullet checklist  */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-inverse-on-surface/90 font-medium"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary"
                  >check_circle</span
                >
                <span>✔ Free Site Survey</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary"
                  >check_circle</span
                >
                <span>✔ Professional Installation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary"
                  >check_circle</span
                >
                <span>✔ Genuine Products</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary"
                  >check_circle</span
                >
                <span>✔ Reliable After-Sales Support</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                className="bg-secondary text-on-secondary px-8 py-3 rounded-lg font-bold hover:brightness-90 transition-all shadow-md inline-block text-center"
                href="/contact"
                >Get Free Consultation</a
              >
              <a
                className="bg-transparent border-2 border-outline-variant text-on-tertiary px-8 py-3 rounded-lg font-bold hover:bg-outline-variant hover:text-navy transition-all inline-block text-center"
                href="/contact"
                >Contact Us</a
              >
            </div>
          </div>

          {/*  Hero Image on the Right  */}
          <div className="hidden md:flex md:col-span-5 justify-center">
            <div
              className="relative w-full max-w-md rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl aspect-[4/3] bg-[#122238]"
            >
              <img
                height="400"
                width="600"
                className="w-full h-full object-cover"
                alt="Security Camera Surveillance System"
                src="gallery-images/hero-surveillance.jpg"
              />
              {/*  Decorative overlay badge  */}
              <div
                className="absolute top-4 right-4 bg-navy/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-bold tracking-widest text-secondary flex items-center gap-1.5 uppercase"
              >
                <span
                  className="w-2 h-2 bg-red-500 rounded-full animate-pulse"
                ></span>
                Live Monitoring
              </div>
            </div>
          </div>
        </div>
        {/*  Decorative Tech Background  */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ 'backgroundImage': 'radial-gradient(#fff 1px, transparent 1px)', 'backgroundSize': '40px 40px' }}
        ></div>
      </section>

      {/*  Stats Bar (Floating element)  */}
      <section
        className="bg-surface-container-lowest border-b border-outline-variant py-8 relative -mt-12 mx-margin-mobile md:mx-margin-desktop rounded-xl shadow-lg z-20"
      >
        <div
          className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 px-4 md:px-8 text-center divide-x-0 md:divide-x divide-outline-variant"
          id="stats-container"
        >
          <div className="flex flex-col items-center stat-item">
            <div className="flex items-center text-gold mb-1">
              <span
                className="font-headline-md text-headline-md font-bold text-navy mr-1 counter"
                id="counter-installs"
                >1000+</span
              >
            </div>
            <span className="font-caption text-caption text-surface-tint"
              >Installations Completed</span
            >
          </div>
          <div className="flex flex-col items-center stat-item">
            <span
              className="font-headline-md text-headline-md font-bold text-navy mb-1"
              id="counter-clients"
              >800+</span
            >
            <span className="font-caption text-caption text-surface-tint"
              >Happy Clients</span
            >
          </div>
          <div className="flex flex-col items-center stat-item">
            <span
              className="font-headline-md text-headline-md font-bold text-navy mb-1 flex items-center gap-1 justify-center"
            >
              <span
                className="material-symbols-outlined text-secondary"
                style={{ 'fontVariationSettings': '\'FILL\' 1' }}
                >verified</span
              >
              CP Plus
            </span>
            <span className="font-caption text-caption text-surface-tint"
              >Authorized Dealer</span
            >
          </div>
          <div className="flex flex-col items-center stat-item font-bold text-navy">
            <div className="flex items-center text-gold mb-1 justify-center">
              <span
                className="font-headline-md text-headline-md font-bold text-navy mr-1"
                >5.0</span
              >
              <span
                className="material-symbols-outlined text-gold"
                style={{ 'fontVariationSettings': '\'FILL\' 1' }}
                >star</span
              >
            </div>
            <span className="font-caption text-caption text-surface-tint"
              >Google Rating</span
            >
          </div>
        </div>
      </section>
      {/*  Featured Video Section (Reference Design)  */}
      <section className="py-[48px] md:py-[80px] bg-[#f4f7f5] border-b border-outline-variant px-margin-mobile md:px-margin-desktop relative">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            Featured Walkthrough
          </div>
          <h2 className="font-headline-lg text-headline-lg text-navy mb-4">
            Professional Security Installation: <span className="text-secondary border-b-2 border-secondary pb-1">See Us In Action</span>
          <span className="sr-only">.</span></h2>          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Take a look at how we design, mount, and configure custom CCTV setups. We ensure high-definition surveillance with zero blind zones and expert cable management.
          </p>
        </div>

        {/*  Video Player Wrapper (Facade Pattern)  */}
        <div className="max-w-4xl mx-auto">
          <div 
            className="relative w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden border border-outline-variant shadow-2xl bg-[#0a1628] group cursor-pointer"
            id="featured-video-player"
            style={{ 'transform': 'translateZ(0)', 'WebkitMaskImage': '-webkit-radial-gradient(white, black)' }}
          >
            {/*  Thumbnail Image  */}
            <img loading="lazy" 
              src="gallery-images/video-thumbnail-1.jpg" 
              alt="Security installation walkthrough demo video thumbnail" 
              width="640"
              height="360"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 rounded-2xl md:rounded-3xl"
            />
            {/*  Dark Overlay  */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 rounded-2xl md:rounded-3xl"></div>

            {/*  Custom Play Overlay (Matching reference design)  */}
            <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 flex items-center gap-2 md:gap-4 bg-black/40 backdrop-blur-md px-3 py-2 md:px-5 md:py-3.5 rounded-xl md:rounded-2xl border border-white/10 text-white select-none">
              {/*  Play Button  */}
              <button 
                className="w-8 h-8 md:w-12 md:h-12 bg-white text-navy rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                aria-label="Play Walkthrough Video"
              >
                <span className="material-symbols-outlined text-navy text-base md:text-2xl" style={{ 'fontVariationSettings': '\'FILL\' 1' }}>play_arrow</span>
              </button>
              <div>
                <p className="text-[8px] md:text-xs font-bold text-white/60 uppercase tracking-wider mb-0.5">Walkthrough Demo</p>
                <h3 className="font-bold text-[10px] md:text-sm md:text-base leading-tight">Live CCTV Installation Walkthrough<span className="sr-only">.</span></h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  About Us Section  */}
      <section
        className="py-[48px] md:py-[80px] bg-background px-margin-mobile md:px-margin-desktop border-b border-outline-variant"
        id="about"
      >
        <div className="max-w-4xl mx-auto text-center">
          <span
            className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-4 inline-block"
            >ABOUT US</span
          >
          <h2 className="font-headline-lg text-headline-lg text-navy mb-6">
            Who We Are
          <span className="sr-only">.</span></h2>
          <p
            className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed"
          >
            At <span className="font-semibold text-navy">Anil Kumar And Sons</span>,
            we believe security is not just about installing cameras—it’s about
            protecting people, businesses, and peace of mind.
          </p>
          <p
            className="font-body-md text-body-md text-on-surface-variant leading-relaxed"
          >
            With years of experience in Security Surveillance and IT Networking,
            we provide customized security solutions backed by genuine products,
            expert installation, and prompt technical support. Our mission is to
            build long-term relationships by delivering quality, trust, and
            exceptional client service.
          </p>
        </div>
      </section>

      {/*  Meet The Owner Section  */}
      <section
        className="py-[48px] md:py-[80px] bg-navy text-on-tertiary px-margin-mobile md:px-margin-desktop"
      >
        <div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center"
        >
          <div className="md:col-span-5">
            <div
              className="rounded-xl overflow-hidden border-4 border-surface-tint/30 relative aspect-[4/5] max-w-sm mx-auto shadow-2xl"
            >
              <img loading="lazy"
                height="1024"
                width="801"
                className="w-full h-full object-cover"
                alt="Rajat Garg standing in store"
                src="owner.jpg"
              />
            </div>
          </div>
          <div className="md:col-span-7 flex flex-col justify-center">
            <span
              className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-4 inline-block font-extrabold"
              >HIGH PRIORITY PROFILE</span
            >
            <h2 className="font-headline-lg text-headline-lg text-white mb-2">
              Er Rajat Garg
            <span className="sr-only">.</span></h2>
            <p className="text-gold font-body-lg text-body-lg mb-6 font-semibold">
              Proprietor · Anil Kumar and Sons
            </p>
            <p
              className="font-body-md text-body-md text-inverse-on-surface/80 mb-6 leading-relaxed"
            >
              Continuing the proud legacy of Anil Kumar, I have been running
              this shop for over 7 years with a strict commitment to honesty,
              technical expertise, service, and client satisfaction. We don't just sell
              equipment; we engineer peace of mind for families and businesses
              across Bharatpur.
            </p>
            <p className="text-gold font-bold mb-6 italic">
              "109 people trust him on Google."
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div
                className="bg-surface-tint/20 px-4 py-2 rounded-lg flex items-center gap-2 border border-white/10"
              >
                <span className="material-symbols-outlined text-gold">star</span>
                <span className="font-caption text-caption text-white"
                  >5.0 Rated</span
                >
              </div>
              <div
                className="bg-surface-tint/20 px-4 py-2 rounded-lg flex items-center gap-2 border border-white/10"
              >
                <span className="material-symbols-outlined text-secondary"
                  >handshake</span
                >
                <span className="font-caption text-caption text-white"
                  >Trusted Local</span
                >
              </div>
            </div>
            <a
              className="bg-secondary text-on-secondary px-8 py-3.5 rounded-lg font-bold flex items-center gap-2 hover:brightness-95 transition-all inline-flex w-fit justify-center shadow-lg"
              href="https://wa.me/918947976889"
              target="_blank"
             rel="noopener noreferrer">
              <span className="material-symbols-outlined">chat</span>
              Talk to Er Rajat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/*  Why Choose Us  */}
      <section
        className="py-[48px] md:py-[80px] bg-surface-container-lowest px-margin-mobile md:px-margin-desktop border-b border-outline-variant"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-4 inline-block"
              >WHY CHOOSE US</span
            >
            <h2 className="font-headline-lg text-headline-lg text-navy">
              Why Clients Trust Us
            <span className="sr-only">.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div
              className="bg-background border border-outline-variant p-6 rounded-xl text-center"
            >
              <span
                className="material-symbols-outlined text-4xl text-secondary mb-3"
                >groups</span
              >
              <h4 className="font-bold text-navy mb-2">
                Experienced Technical Team
              <span className="sr-only">.</span></h4>
            </div>
            <div
              className="bg-background border border-outline-variant p-6 rounded-xl text-center"
            >
              <span
                className="material-symbols-outlined text-4xl text-secondary mb-3"
                >verified</span
              >
              <h4 className="font-bold text-navy mb-2">Certified Installation<span className="sr-only">.</span></h4>
            </div>
            <div
              className="bg-background border border-outline-variant p-6 rounded-xl text-center"
            >
              <span
                className="material-symbols-outlined text-4xl text-secondary mb-3"
                >high_quality</span
              >
              <h4 className="font-bold text-navy mb-2">Premium Quality Products<span className="sr-only">.</span></h4>
            </div>
            <div
              className="bg-background border border-outline-variant p-6 rounded-xl text-center"
            >
              <span
                className="material-symbols-outlined text-4xl text-secondary mb-3"
                >workspace_premium</span
              >
              <h4 className="font-bold text-navy mb-2">Genuine Brand Warranty<span className="sr-only">.</span></h4>
            </div>
            <div
              className="bg-background border border-outline-variant p-6 rounded-xl text-center"
            >
              <span
                className="material-symbols-outlined text-4xl text-secondary mb-3"
                >tune</span
              >
              <h4 className="font-bold text-navy mb-2">
                Customized Security Solutions
              <span className="sr-only">.</span></h4>
            </div>
            <div
              className="bg-background border border-outline-variant p-6 rounded-xl text-center"
            >
              <span
                className="material-symbols-outlined text-4xl text-secondary mb-3"
                >payments</span
              >
              <h4 className="font-bold text-navy mb-2">Affordable Pricing<span className="sr-only">.</span></h4>
            </div>
            <div
              className="bg-background border border-outline-variant p-6 rounded-xl text-center"
            >
              <span
                className="material-symbols-outlined text-4xl text-secondary mb-3"
                >support_agent</span
              >
              <h4 className="font-bold text-navy mb-2">Quick Service Support<span className="sr-only">.</span></h4>
            </div>
            <div
              className="bg-background border border-outline-variant p-6 rounded-xl text-center"
            >
              <span
                className="material-symbols-outlined text-4xl text-secondary mb-3"
                >handyman</span
              >
              <h4 className="font-bold text-navy mb-2">
                Annual Maintenance Contracts (AMC)
              <span className="sr-only">.</span></h4>
            </div>
            <div
              className="bg-background border border-outline-variant p-6 rounded-xl text-center"
            >
              <span
                className="material-symbols-outlined text-4xl text-secondary mb-3"
                >search</span
              >
              <h4 className="font-bold text-navy mb-2">Free Site Survey<span className="sr-only">.</span></h4>
            </div>
            <div
              className="bg-background border border-outline-variant p-6 rounded-xl text-center"
            >
              <span
                className="material-symbols-outlined text-4xl text-secondary mb-3"
                >sentiment_very_satisfied</span
              >
              <h4 className="font-bold text-navy mb-2">
                Client Satisfaction Guaranteed
              <span className="sr-only">.</span></h4>
            </div>
          </div>
        </div>
      </section>

      {/*  Our Services Section  */}
      <section
        className="py-[48px] md:py-[80px] bg-background px-margin-mobile md:px-margin-desktop"
        id="services"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-4 inline-block"
              >OUR SERVICES</span
            >
            <h2 className="font-headline-lg text-headline-lg text-navy">
              Complete Security &amp; IT Solutions
            <span className="sr-only">.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/*  Service 1  */}
            <div
              className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover-lift flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary mb-4"
                >
                  <span className="material-symbols-outlined text-2xl"
                    >videocam</span
                  >
                </div>
                <h3 className="font-headline-md text-lg text-navy mb-2">
                  CCTV Surveillance Systems
                <span className="sr-only">.</span></h3>
                <p className="font-body-md text-sm text-on-surface-variant mb-4">
                  High-definition CCTV cameras for homes, offices, shops,
                  factories, schools, hospitals, and industries.
                </p>
              </div>
            </div>
            {/*  Service 2  */}
            <div
              className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover-lift flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary mb-4"
                >
                  <span className="material-symbols-outlined text-2xl"
                    >photo_camera</span
                  >
                </div>
                <h3 className="font-headline-md text-lg text-navy mb-2">
                  IP Cameras
                <span className="sr-only">.</span></h3>
                <p className="font-body-md text-sm text-on-surface-variant mb-4">
                  AI-enabled IP surveillance with remote monitoring and
                  crystal-clear video quality.
                </p>
              </div>
            </div>
            {/*  Service 3  */}
            <div
              className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover-lift flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary mb-4"
                >
                  <span className="material-symbols-outlined text-2xl">wifi</span>
                </div>
                <h3 className="font-headline-md text-lg text-navy mb-2">
                  Wi-Fi &amp; 4G Cameras
                <span className="sr-only">.</span></h3>
                <p className="font-body-md text-sm text-on-surface-variant mb-4">
                  Wireless cameras with mobile access from anywhere.
                </p>
              </div>
            </div>
            {/*  Service 4  */}
            <div
              className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover-lift flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary mb-4"
                >
                  <span className="material-symbols-outlined text-2xl"
                    >door_front</span
                  >
                </div>
                <h3 className="font-headline-md text-lg text-navy mb-2">
                  Video Door Phone
                <span className="sr-only">.</span></h3>
                <p className="font-body-md text-sm text-on-surface-variant mb-4">
                  Know who’s at your door before opening it.
                </p>
              </div>
            </div>
            {/*  Service 5  */}
            <div
              className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover-lift flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary mb-4"
                >
                  <span className="material-symbols-outlined text-2xl"
                    >fingerprint</span
                  >
                </div>
                <h3 className="font-headline-md text-lg text-navy mb-2">
                  Biometric Attendance
                <span className="sr-only">.</span></h3>
                <p className="font-body-md text-sm text-on-surface-variant mb-4">
                  Fingerprint &amp; Face Recognition attendance systems.
                </p>
              </div>
            </div>
            {/*  Service 6  */}
            <div
              className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover-lift flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary mb-4"
                >
                  <span className="material-symbols-outlined text-2xl">lock</span>
                </div>
                <h3 className="font-headline-md text-lg text-navy mb-2">
                  Access Control
                <span className="sr-only">.</span></h3>
                <p className="font-body-md text-sm text-on-surface-variant mb-4">
                  Secure entry systems for offices, industries, schools, and
                  institutions.
                </p>
              </div>
            </div>
          </div>

          {/*  IT Networking Highlight Box  */}
          <div
            className="mt-8 bg-surface-container-lowest p-8 rounded-xl border border-outline-variant hover-lift"
          >
            <h3
              className="font-headline-md text-navy text-xl mb-4 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-secondary">lan</span>
              IT Networking
            <span className="sr-only">.</span></h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
              <div
                className="p-3 bg-background rounded-lg text-xs font-semibold text-navy"
              >
                LAN Cabling
              </div>
              <div
                className="p-3 bg-background rounded-lg text-xs font-semibold text-navy"
              >
                Structured Cabling
              </div>
              <div
                className="p-3 bg-background rounded-lg text-xs font-semibold text-navy"
              >
                Network Rack Installation
              </div>
              <div
                className="p-3 bg-background rounded-lg text-xs font-semibold text-navy"
              >
                Wi-Fi Solutions
              </div>
              <div
                className="p-3 bg-background rounded-lg text-xs font-semibold text-navy"
              >
                Switch Configuration
              </div>
              <div
                className="p-3 bg-background rounded-lg text-xs font-semibold text-navy"
              >
                Fiber Networking
              </div>
            </div>
          </div>

          {/*  AMC Services Highlight Box  */}
          <div
            className="mt-6 bg-navy text-on-tertiary p-8 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <div>
              <h3
                className="font-headline-md text-xl mb-2 flex items-center gap-2 text-white"
              >
                <span className="material-symbols-outlined text-secondary"
                  >build_circle</span
                >
                AMC Services
              <span className="sr-only">.</span></h3>
              <p className="text-sm text-inverse-on-surface/80">
                Regular maintenance for CCTV and networking systems to ensure
                maximum uptime.
              </p>
            </div>
            <a
              className="bg-secondary text-on-secondary px-6 py-2.5 rounded-lg font-bold hover:brightness-95 transition-all text-sm"
              href="/contact"
              >Get Quotation</a
            >
          </div>
        </div>
      </section>

      {/*  Our Promise Section  */}
      <section
        className="py-[48px] md:py-[80px] bg-navy text-on-tertiary px-margin-mobile md:px-margin-desktop text-center"
      >
        <div className="max-w-3xl mx-auto">
          <span
            className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-4 inline-block"
            >OUR PROMISE</span
          >
          <h2 className="font-headline-lg text-3xl mb-4 text-white">
            We don’t just install security systems— We build trust.
          <span className="sr-only">.</span></h2>
          <p className="font-body-md text-inverse-on-surface/80">
            Every installation is planned carefully to deliver maximum coverage,
            better performance, and long-term reliability.
          </p>
        </div>
      </section>

      {/*  Our Work Process Section  */}
      <section
        className="py-[48px] md:py-[80px] bg-surface-container-lowest px-margin-mobile md:px-margin-desktop border-b border-outline-variant"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-4 inline-block font-extrabold"
              >WORKFLOW</span
            >
            <h2 className="font-headline-lg text-headline-lg text-navy">
              Our Work Process
            <span className="sr-only">.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 text-center">
            <div
              className="p-6 bg-background border border-outline-variant rounded-xl flex flex-col items-center justify-between"
            >
              <div
                className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold mb-4"
              >
                1
              </div>
              <h4 className="font-bold text-navy mb-2 text-sm">Initial Consultation<span className="sr-only">.</span></h4>
            </div>
            <div
              className="p-6 bg-background border border-outline-variant rounded-xl flex flex-col items-center justify-between"
            >
              <div
                className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold mb-4"
              >
                2
              </div>
              <h4 className="font-bold text-navy mb-2 text-sm">
                Security Assessment
              <span className="sr-only">.</span></h4>
            </div>
            <div
              className="p-6 bg-background border border-outline-variant rounded-xl flex flex-col items-center justify-between"
            >
              <div
                className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold mb-4"
              >
                3
              </div>
              <h4 className="font-bold text-navy mb-2 text-sm">
                Customized Solution
              <span className="sr-only">.</span></h4>
            </div>
            <div
              className="p-6 bg-background border border-outline-variant rounded-xl flex flex-col items-center justify-between"
            >
              <div
                className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold mb-4"
              >
                4
              </div>
              <h4 className="font-bold text-navy mb-2 text-sm">
                Professional Installation
              <span className="sr-only">.</span></h4>
            </div>
            <div
              className="p-6 bg-background border border-outline-variant rounded-xl flex flex-col items-center justify-between"
            >
              <div
                className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold mb-4"
              >
                5
              </div>
              <h4 className="font-bold text-navy mb-2 text-sm">
                Testing &amp; Training
              <span className="sr-only">.</span></h4>
            </div>
            <div
              className="p-6 bg-background border border-outline-variant rounded-xl flex flex-col items-center justify-between"
            >
              <div
                className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold mb-4"
              >
                6
              </div>
              <h4 className="font-bold text-navy mb-2 text-sm">
                After Sales Support
              <span className="sr-only">.</span></h4>
            </div>
          </div>
        </div>
      </section>

      {/*  Brands We Deal In  */}
      <section
        className="py-12 bg-background border-b border-outline-variant overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
          <span
            className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-2 inline-block"
            >PARTNERS</span
          >
          <h3 className="text-lg font-bold text-navy">Brands We Deal In<span className="sr-only">.</span></h3>
        </div>
        <div className="marquee-container relative w-full">
          <div className="marquee-content flex items-center gap-10 py-4">
            {/*  CP PLUS  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="28"
                width="168"
                src="logos/cpplus.png"
                alt="CP PLUS"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  Dahua  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="40"
                width="130"
                src="logos/dahua.svg"
                alt="Dahua"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  UNV  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="34"
                width="56"
                src="logos/uniview.svg"
                alt="UNV"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  IMOU  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="252"
                width="1057"
                src="logos/imou.png"
                alt="IMOU"
                className="h-10 w-auto object-contain brightness-0"
              />
            </div>
            {/*  QUBO  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="56"
                width="200"
                src="logos/qubo.png"
                alt="QUBO"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  MAXEMUS  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="54"
                width="250"
                src="logos/maxemus.svg"
                alt="MAXEMUS"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  TP LINK  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="40"
                width="105"
                src="logos/tplink.svg"
                alt="TP LINK"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  D LINK  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="32"
                width="158"
                src="logos/dlink.svg"
                alt="D LINK"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  TENDA  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="106"
                width="500"
                src="logos/tenda.svg"
                alt="TENDA"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  LENOVO  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="100"
                width="300"
                src="logos/lenovo.png"
                alt="LENOVO"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  HP  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="80"
                width="80"
                src="logos/hp.png"
                alt="HP"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  DELL  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="155"
                width="1200"
                src="logos/dell.png"
                alt="DELL"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  EZVIZ  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="230"
                width="400"
                src="logos/ezviz.png"
                alt="EZVIZ"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  FINGERS  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="273"
                width="500"
                src="logos/fingers.png"
                alt="FINGERS"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  RANZ  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="271"
                width="845"
                src="logos/ranz.jpg"
                alt="RANZ"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  GEONIX  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="47"
                width="140"
                src="logos/geonix.png"
                alt="GEONIX"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  WD  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="459"
                width="999"
                src="logos/wd.svg"
                alt="WD"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  ERD  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="120"
                width="120"
                src="logos/erd.jpg"
                alt="ERD"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  CCL  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="50"
                width="123"
                src="logos/ccl.png"
                alt="CCL"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  MANTRA  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="156"
                width="622"
                src="logos/mantra.png"
                alt="MANTRA"
                className="h-10 w-auto object-contain"
              />
            </div>

            {/*  DUPLICATE SET FOR SEAMLESS LOOP  */}
            {/*  CP PLUS  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="28"
                width="168"
                src="logos/cpplus.png"
                alt="CP PLUS"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  Dahua  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="40"
                width="130"
                src="logos/dahua.svg"
                alt="Dahua"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  UNV  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="34"
                width="56"
                src="logos/uniview.svg"
                alt="UNV"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  IMOU  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="252"
                width="1057"
                src="logos/imou.png"
                alt="IMOU"
                className="h-10 w-auto object-contain brightness-0"
              />
            </div>
            {/*  QUBO  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="56"
                width="200"
                src="logos/qubo.png"
                alt="QUBO"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  MAXEMUS  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="54"
                width="250"
                src="logos/maxemus.svg"
                alt="MAXEMUS"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  TP LINK  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="40"
                width="105"
                src="logos/tplink.svg"
                alt="TP LINK"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  D LINK  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="32"
                width="158"
                src="logos/dlink.svg"
                alt="D LINK"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  TENDA  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="106"
                width="500"
                src="logos/tenda.svg"
                alt="TENDA"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  LENOVO  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="100"
                width="300"
                src="logos/lenovo.png"
                alt="LENOVO"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  HP  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="80"
                width="80"
                src="logos/hp.png"
                alt="HP"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  DELL  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="155"
                width="1200"
                src="logos/dell.png"
                alt="DELL"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  EZVIZ  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="230"
                width="400"
                src="logos/ezviz.png"
                alt="EZVIZ"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  FINGERS  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="273"
                width="500"
                src="logos/fingers.png"
                alt="FINGERS"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  RANZ  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="271"
                width="845"
                src="logos/ranz.jpg"
                alt="RANZ"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  GEONIX  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="47"
                width="140"
                src="logos/geonix.png"
                alt="GEONIX"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  WD  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="459"
                width="999"
                src="logos/wd.svg"
                alt="WD"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  ERD  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="120"
                width="120"
                src="logos/erd.jpg"
                alt="ERD"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  CCL  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="50"
                width="123"
                src="logos/ccl.png"
                alt="CCL"
                className="h-10 w-auto object-contain"
              />
            </div>
            {/*  MANTRA  */}
            <div
              className="brand-logo-card flex items-center justify-center bg-white rounded-xl border border-outline-variant px-6 py-4 h-20 min-w-[140px] brand-logo shadow-sm"
            >
              <img loading="lazy"
                height="156"
                width="622"
                src="logos/mantra.png"
                alt="MANTRA"
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/*  Our Commitment Section  */}
      <section
        className="py-12 bg-surface-container-lowest border-b border-outline-variant"
      >
        <div className="max-w-5xl mx-auto text-center">
          <span
            className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-4 inline-block"
            >OUR COMMITMENT</span
          >
          <div
            className="flex flex-wrap justify-center gap-4 text-sm font-bold text-navy"
          >
            <span
              className="px-5 py-2 bg-background border border-outline-variant rounded-full"
              >✔ Quality</span
            >
            <span
              className="px-5 py-2 bg-background border border-outline-variant rounded-full"
              >✔ Trust</span
            >
            <span
              className="px-5 py-2 bg-background border border-outline-variant rounded-full"
              >✔ Technology</span
            >
            <span
              className="px-5 py-2 bg-background border border-outline-variant rounded-full"
              >✔ Service</span
            >
            <span
              className="px-5 py-2 bg-background border border-outline-variant rounded-full"
              >✔ Client Satisfaction</span
            >
          </div>
        </div>
      </section>

      {/*  Our Valued Clients  */}
      <section
        className="py-[48px] md:py-[80px] bg-surface-container-lowest px-margin-mobile md:px-margin-desktop border-b border-outline-variant"
        id="clients"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-4 inline-block font-extrabold"
              >TRUSTED BY</span
            >
            <h2 className="font-headline-lg text-headline-lg text-navy">
              Our Valued Clients
            <span className="sr-only">.</span></h2>
            <p className="text-secondary-label text-sm mt-2 max-w-2xl mx-auto">
              We are proud to have deployed secure, high-performance technology
              solutions for leading institutions, commercial enterprises, and
              industrial facilities in Bharatpur and surrounding regions.
            </p>
          </div>

          {/*  Ongoing Projects (Running Clients)  */}
          <div className="mb-12">
            <h4
              className="text-xs font-bold uppercase tracking-wider text-secondary mb-4 flex items-center gap-2"
            >
              <span
                className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"
              ></span>
              Active Integrations / Running Clients
            <span className="sr-only">.</span></h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/*  Mukund Resort  */}
              <div
                className="relative bg-white rounded-2xl border border-emerald-200 shadow-sm p-6 flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[10px] font-bold text-emerald-600 tracking-wider uppercase bg-emerald-50 px-2 py-0.5 rounded"
                      >Resort &amp; Hospitality</span
                    >
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"
                      ></span>
                      Running Client
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-navy">
                    Mukund Resort
                    <span className="text-xs text-secondary-label font-normal"
                      >(Bharatpur)</span
                    >
                  <span className="sr-only">.</span></h3>
                  <p className="text-secondary-label text-xs mt-1.5">
                    Ongoing deployment of enterprise-grade security cameras and
                    optical fiber network connectivity.
                  </p>
                </div>
              </div>
              {/*  Ananta Resort  */}
              <div
                className="relative bg-white rounded-2xl border border-emerald-200 shadow-sm p-6 flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[10px] font-bold text-emerald-600 tracking-wider uppercase bg-emerald-50 px-2 py-0.5 rounded"
                      >Resort &amp; Hospitality</span
                    >
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"
                      ></span>
                      Running Client
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-navy">
                    Ananta Resort
                    <span className="text-xs text-secondary-label font-normal"
                      >(VMD Resort)</span
                    >
                  <span className="sr-only">.</span></h3>
                  <p className="text-secondary-label text-xs mt-1.5">
                    Deployment of centralized CCTV surveillance network and
                    high-capacity wireless link systems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/*  Categorized Client List Grid  */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/*  Category: Food & Confectionery  */}
            <div
              className="bg-white rounded-2xl border border-outline-variant p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4 text-navy">
                <span className="material-symbols-outlined text-2xl"
                  >restaurant</span
                >
                <h4 className="font-bold text-sm uppercase tracking-wide">
                  Food &amp; Sweets
                <span className="sr-only">.</span></h4>
              </div>
              <ul className="space-y-2 text-xs text-secondary-label">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  Saini Madhur vyjan
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  Saini mithas
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  Saini sweets
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  AKSHAR FOOD
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  Sai Bakery
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  Standard Bakery
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  SENCTURY GREEN RESORT
                <span className="sr-only">.</span></li>
              </ul>
            </div>

            {/*  Category: Educational Institutions  */}
            <div
              className="bg-white rounded-2xl border border-outline-variant p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4 text-navy">
                <span className="material-symbols-outlined text-2xl">school</span>
                <h4 className="font-bold text-sm uppercase tracking-wide">
                  Education
                <span className="sr-only">.</span></h4>
              </div>
              <ul className="space-y-2 text-xs text-secondary-label">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span> Sony
                  World School
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span> Sony
                  convent school
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span> Sony
                  coaching
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span> A K
                  M SCHOOL
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  Antriksh Academy
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  Spectrum Academy
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  Sony Tower School
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  Doodle Play School
                <span className="sr-only">.</span></li>
              </ul>
            </div>

            {/*  Category: Retailers & Jewellers  */}
            <div
              className="bg-white rounded-2xl border border-outline-variant p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4 text-navy">
                <span className="material-symbols-outlined text-2xl"
                  >storefront</span
                >
                <h4 className="font-bold text-sm uppercase tracking-wide">
                  Jewellers &amp; Retail
                <span className="sr-only">.</span></h4>
              </div>
              <ul className="space-y-2 text-xs text-secondary-label">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  TILKDHARI jewellers
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span> R K
                  JEWELLERS
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  GOYAL ABHUSHARN
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  GOYAL ORNAMENT
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  AMARCHAND AKHALESH KUMAR
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span> BABU
                  LAAL BHAGWAN DAAS
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span> JB
                  STORE
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  Royal Furniture
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  Royal Sari Emporium
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  Lokesh Traders
                <span className="sr-only">.</span></li>
              </ul>
            </div>

            {/*  Category: Hospitality, Industrial & Corporate  */}
            <div
              className="bg-white rounded-2xl border border-outline-variant p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4 text-navy">
                <span className="material-symbols-outlined text-2xl">domain</span>
                <h4 className="font-bold text-sm uppercase tracking-wide">
                  Factories &amp; Industry
                <span className="sr-only">.</span></h4>
              </div>
              <ul className="space-y-2 text-xs text-secondary-label">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  SAKUN OIL MIL
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  MANISH OIL MIL
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span> POLY
                  PAICK FACTORY
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  SUMAN KAMAL FACTORY
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  AGARWAL WHEREHOUSE
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  Agarwal Marble
                <span className="sr-only">.</span></li>
              </ul>
            </div>
          </div>

          {/*  Secondary Client Row (Automotive, Healthcare, Electric)  */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/*  Category: Automotive  */}
            <div
              className="bg-white rounded-2xl border border-outline-variant p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4 text-navy">
                <span className="material-symbols-outlined text-2xl"
                  >directions_car</span
                >
                <h4 className="font-bold text-sm uppercase tracking-wide">
                  Automotive Showrooms
                <span className="sr-only">.</span></h4>
              </div>
              <ul className="space-y-2 text-xs text-secondary-label">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  JINDAL HONDA
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span> TVS
                  AUTOMOBILE WORKSHOP
                <span className="sr-only">.</span></li>
              </ul>
            </div>

            {/*  Category: Healthcare  */}
            <div
              className="bg-white rounded-2xl border border-outline-variant p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4 text-navy">
                <span className="material-symbols-outlined text-2xl"
                  >local_hospital</span
                >
                <h4 className="font-bold text-sm uppercase tracking-wide">
                  Healthcare
                <span className="sr-only">.</span></h4>
              </div>
              <ul className="space-y-2 text-xs text-secondary-label">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  PRADEEP HOSPITAL
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  Dr. Moresh Agarwal
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  Dr. Deepak Singhal Eye Care
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  Dr. Yogesh Agarwal
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  Ekansh Diagnostic Centre
                <span className="sr-only">.</span></li>
              </ul>
            </div>

            {/*  Category: Electrical & Services  */}
            <div
              className="bg-white rounded-2xl border border-outline-variant p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4 text-navy">
                <span className="material-symbols-outlined text-2xl"
                  >electric_bolt</span
                >
                <h4 className="font-bold text-sm uppercase tracking-wide">
                  Electrical Services
                <span className="sr-only">.</span></h4>
              </div>
              <ul className="space-y-2 text-xs text-secondary-label">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span> BESL
                  ELECTRIC SERVICES
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/40"></span>
                  TANEJA ELECTRICAL
                <span className="sr-only">.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/*  Real Project Gallery  */}
      <section
        className="py-[48px] md:py-[80px] bg-background px-margin-mobile md:px-margin-desktop border-b border-outline-variant"
        id="gallery"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-4 inline-block font-extrabold"
              >GALLERY</span
            >
            <h2 className="font-headline-lg text-headline-lg text-navy">
              Real Project Gallery
            <span className="sr-only">.</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/*  Uniview Gold Partner  */}
            <div
              className="relative rounded-xl overflow-hidden border border-outline-variant group cursor-pointer"
            >
              <img loading="lazy"
                height="1000"
                width="840"
                src="gallery-images/uniview-award.jpeg"
                alt="Uniview Gold Partner 2022"
                className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span
                  className="bg-gold text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide"
                  >Award</span
                >
              </div>
              <div
                className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#000000]/80 to-transparent p-4"
              >
                <p className="text-white text-xs font-semibold">
                  Uniview Gold Partner 2022 — Authorized Distributor
                </p>
              </div>
            </div>
            {/*  Dahua Certificate  */}
            <div
              className="relative rounded-xl overflow-hidden border border-outline-variant group cursor-pointer"
            >
              <img loading="lazy"
                height="1200"
                width="848"
                src="gallery-images/dahua-certificate.jpeg"
                alt="Dahua Authorized Dealer Partner"
                className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span
                  className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide"
                  >Certified</span
                >
              </div>
              <div
                className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#000000]/80 to-transparent p-4"
              >
                <p className="text-white text-xs font-semibold">
                  Dahua Authorized Dealer Partner — Bharatpur
                </p>
              </div>
            </div>
            {/*  CP Plus Reseller  */}
            <div
              className="relative rounded-xl overflow-hidden border border-outline-variant group cursor-pointer"
            >
              <img loading="lazy"
                height="900"
                width="1200"
                src="gallery-images/cpplus-reseller-partner.jpeg"
                alt="CP Plus Authorized Reseller Partner"
                className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span
                  className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide"
                  >Partner</span
                >
              </div>
              <div
                className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#000000]/80 to-transparent p-4"
              >
                <p className="text-white text-xs font-semibold">
                  CP Plus Authorized Reseller Partner — Bharatpur
                </p>
              </div>
            </div>
            {/*  CP Plus Bharat Award  */}
            <div
              className="relative rounded-xl overflow-hidden border border-outline-variant group cursor-pointer"
            >
              <img loading="lazy"
                height="900"
                width="1200"
                src="gallery-images/cppuls-bharat-award.jpeg"
                alt="CP Plus Bharat Technology Show Award"
                className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span
                  className="bg-gold text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide"
                  >Award</span
                >
              </div>
              <div
                className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#000000]/80 to-transparent p-4"
              >
                <p className="text-white text-xs font-semibold">
                  CP Plus — Bharat Technology Show Recognition
                </p>
              </div>
            </div>
            {/*  Expo Stall  */}
            <div
              className="relative rounded-xl overflow-hidden border border-outline-variant group cursor-pointer"
            >
              <img loading="lazy"
                height="750"
                width="1000"
                src="gallery-images/expo-stall.jpeg"
                alt="Anil Kumar & Sons at Security Expo"
                className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span
                  className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide"
                  >Exhibition</span
                >
              </div>
              <div
                className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#000000]/80 to-transparent p-4"
              >
                <p className="text-white text-xs font-semibold">
                  Security Expo Stall — Bharatpur
                </p>
              </div>
            </div>
            {/*  Lanvo Certificate  */}
            <div
              className="relative rounded-xl overflow-hidden border border-outline-variant group cursor-pointer"
            >
              <img loading="lazy"
                height="781"
                width="550"
                src="gallery-images/lanvo-certificate.png"
                alt="Lanvo Authorized Certificate"
                className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span
                  className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide"
                  >Certified</span
                >
              </div>
              <div
                className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#000000]/80 to-transparent p-4"
              >
                <p className="text-white text-xs font-semibold">
                  Lanvo Authorized Certificate — Anil Kumar &amp; Sons
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <a
              href="/gallery"
              className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-lg font-bold hover:bg-navy/90 transition-colors"
            >
              View Full Gallery
              <span className="material-symbols-outlined text-base"
                >arrow_forward</span
              >
            </a>
          </div>
        </div>
      </section>

      {/*  Client Testimonials (Google Reviews)  */}
      <section
        className="py-[48px] md:py-[80px] bg-surface-container-lowest px-margin-mobile md:px-margin-desktop border-b border-outline-variant"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span
              className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-2 inline-block"
              >REVIEWS</span
            >
            <h2 className="font-headline-lg text-headline-lg text-navy mb-4">
              Google Client Reviews
            <span className="sr-only">.</span></h2>
          </div>
          {/*  Elfsight Google Reviews | Untitled Google Reviews  */}
          <div
            className="elfsight-app-eb9d2d80-5172-404c-9918-e75e760588b0"
          ></div>
        </div>
      </section>

      {/*  FAQ Section  */}
      <section
        className="py-[48px] md:py-[80px] bg-surface-container-lowest px-margin-mobile md:px-margin-desktop border-b border-outline-variant"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span
              className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-2 inline-block"
              >FAQS</span
            >
            <h2 className="font-headline-lg text-headline-lg text-navy mb-4">
              Frequently Asked Questions
            <span className="sr-only">.</span></h2>
          </div>
          <div className="space-y-4">
            {/*  FAQ Item 1  */}
            <div
              className="faq-item bg-background border border-outline-variant rounded-lg overflow-hidden transition-all duration-300"
            >
              <button
                className="faq-trigger w-full flex justify-between items-center p-5 text-left font-bold text-navy focus:outline-none hover:bg-surface-container-low transition-colors"
                aria-expanded="false"
              >
                <span>What brands do you deal in?</span>
                <span
                  className="material-symbols-outlined transform transition-transform duration-300 text-secondary faq-icon"
                  >expand_more</span
                >
              </button>
              <div
                className="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
              >
                <div
                  className="p-5 pt-0 border-t border-outline-variant/10 text-sm text-on-surface-variant"
                >
                  We stock CP Plus, Uniview (UNV), Dahua, TP-Link, D-Link, IMOU,
                  Ezviz, Qubo, Maxemus, Tenda, Mantra, and other premium brands
                  with genuine warranties.
                </div>
              </div>
            </div>
            {/*  FAQ Item 2  */}
            <div
              className="faq-item bg-background border border-outline-variant rounded-lg overflow-hidden transition-all duration-300"
            >
              <button
                className="faq-trigger w-full flex justify-between items-center p-5 text-left font-bold text-navy focus:outline-none hover:bg-surface-container-low transition-colors"
                aria-expanded="false"
              >
                <span>Do you charge for site survey?</span>
                <span
                  className="material-symbols-outlined transform transition-transform duration-300 text-secondary faq-icon"
                  >expand_more</span
                >
              </button>
              <div
                className="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
              >
                <div
                  className="p-5 pt-0 border-t border-outline-variant/10 text-sm text-on-surface-variant"
                >
                  No, we provide a 100% free site survey and consultation
                  without any obligation in Bharatpur.
                </div>
              </div>
            </div>
            {/*  FAQ Item 3  */}
            <div
              className="faq-item bg-background border border-outline-variant rounded-lg overflow-hidden transition-all duration-300"
            >
              <button
                className="faq-trigger w-full flex justify-between items-center p-5 text-left font-bold text-navy focus:outline-none hover:bg-surface-container-low transition-colors"
                aria-expanded="false"
              >
                <span>What is the warranty on camera setups?</span>
                <span
                  className="material-symbols-outlined transform transition-transform duration-300 text-secondary faq-icon"
                  >expand_more</span
                >
              </button>
              <div
                className="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
              >
                <div
                  className="p-5 pt-0 border-t border-outline-variant/10 text-sm text-on-surface-variant"
                >
                  Surveillance equipment generally carries a standard 1-2 years
                  manufacturer brand warranty, and we provide complete support.
                </div>
              </div>
            </div>
            {/*  FAQ Item 4  */}
            <div
              className="faq-item bg-background border border-outline-variant rounded-lg overflow-hidden transition-all duration-300"
            >
              <button
                className="faq-trigger w-full flex justify-between items-center p-5 text-left font-bold text-navy focus:outline-none hover:bg-surface-container-low transition-colors"
                aria-expanded="false"
              >
                <span
                  >Which is the best security camera for home use? (Best Home
                  Security Camera)</span
                >
                <span
                  className="material-symbols-outlined transform transition-transform duration-300 text-secondary faq-icon"
                  >expand_more</span
                >
              </button>
              <div
                className="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
              >
                <div
                  className="p-5 pt-0 border-t border-outline-variant/10 text-sm text-on-surface-variant"
                >
                  For home security, there are two primary options: 1)
                  <strong>IP Cameras (Network Security)</strong> like 2MP/3MP/4MP/5MP/6MP/8MP
                  cameras from CP Plus, Dahua, or Uniview that offer
                  high-definition night vision and real-time mobile app alerts.
                  2) <strong>Smart Wi-Fi Cameras</strong> like PTZ Wi-Fi cameras
                  from Imou, Ezviz, or Qubo, which are wireless and allow you to
                  rotate and control them directly from your phone. You can
                  consult with us at +91 89479 76889 to select the perfect setup
                  for your home.
                </div>
              </div>
            </div>
            {/*  FAQ Item 5  */}
            <div
              className="faq-item bg-background border border-outline-variant rounded-lg overflow-hidden transition-all duration-300"
            >
              <button
                className="faq-trigger w-full flex justify-between items-center p-5 text-left font-bold text-navy focus:outline-none hover:bg-surface-container-low transition-colors"
                aria-expanded="false"
              >
                <span
                  >What is the difference between an IP Camera and an Analog
                  Camera? (IP Camera vs Analog Camera)</span
                >
                <span
                  className="material-symbols-outlined transform transition-transform duration-300 text-secondary faq-icon"
                  >expand_more</span
                >
              </button>
              <div
                className="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
              >
                <div
                  className="p-5 pt-0 border-t border-outline-variant/10 text-sm text-on-surface-variant"
                >
                  Analog cameras are connected to a DVR (Digital Video Recorder)
                  via coaxial cables and are more budget-friendly. IP cameras
                  connect to an NVR (Network Video Recorder) using network
                  cables (LAN/PoE), offering ultra-high-definition video quality
                  and advanced AI-based smart alerts such as motion detection
                  and line crossing detection.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  Contact Section / Location Map  */}
      <section
        className="py-[48px] md:py-[80px] bg-background px-margin-mobile md:px-margin-desktop"
        id="contact"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/*  Contact Details & Form  */}
          <div>
            <span
              className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-2 inline-block"
              >CONTACT US</span
            >
            <h2 className="font-headline-lg text-headline-lg text-navy mb-4">
              Looking for a Reliable Security Partner?
            <span className="sr-only">.</span></h2>
            <p className="text-sm text-on-surface-variant mb-6">
              Protect your home and business with advanced surveillance
              solutions. Fill the form below or contact us directly.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <a
                className="bg-secondary text-on-secondary px-6 py-2.5 rounded-lg font-bold text-xs"
                href="tel:+918947976889"
                >Call Us Today</a
              >
              <a
                className="bg-[#25D366] text-white px-6 py-2.5 rounded-lg font-bold text-xs"
                href="https://wa.me/918947976889"
                target="_blank"
                 rel="noopener noreferrer">WhatsApp Us</a
              >
            </div>

            <form id="contact-form" className="space-y-4" action="#" method="POST">
              <input
                id="contact-name"
                className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-white text-navy focus:outline-none focus:border-secondary text-sm"
                placeholder="Your Name"
                type="text"
                required
              />
              <input
                id="contact-email"
                className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-white text-navy focus:outline-none focus:border-secondary text-sm"
                placeholder="Your Email"
                type="email"
                required
              />
              <textarea
                id="contact-message"
                className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-white text-navy focus:outline-none focus:border-secondary text-sm h-32"
                placeholder="Your Message"
                required
              ></textarea>
              <button
                className="bg-secondary text-on-secondary w-full py-3 rounded-lg font-bold hover:bg-opacity-95 transition-opacity"
                type="submit"
              >
                Submit Form
              </button>
            </form>
          </div>

          {/*  Map Frame  */}
          <div
            className="flex flex-col justify-between bg-surface-container-lowest p-6 rounded-xl border border-outline-variant"
          >
            <div className="mb-4">
              <h4 className="font-bold text-navy mb-1">Our Location Address<span className="sr-only">.</span></h4>
              <p className="text-sm text-on-surface-variant">
                Anil Kumar &amp; Sons, Inside B. Narayan Gate, Near SBI Bank,
                Bahanera Wale, Bharatpur, Rajasthan - 321001
              </p>
            </div>
            <div
              className="h-64 rounded-lg overflow-hidden border border-outline-variant bg-white/10"
            >
              <iframe
                allowFullScreen={true}
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14163.660604245995!2d77.48475631720831!3d27.21228678072081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3973a38cd16599ad%3A0xc6fb69ec264662d5!2sMathura%20Gate%2C%20Bharatpur%2C%20Rajasthan%20321001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                style={{ 'border': '0' }}
                width="100%"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/*  SEO Tagline Footer Strip  */}
      <section
        className="py-6 bg-navy text-on-tertiary px-6 text-center text-xs opacity-80 border-t border-outline-variant/20"
      >
        Best CCTV Camera Dealer &amp; Security Surveillance Company in Bharatpur
        | CCTV Installation | Biometric | Access Control | IT Networking | AMC
        Services
      </section>
    </main>

    {/*  Footer  */}
    <footer
      className="bg-primary-container text-on-primary-container pt-12 pb-32 md:pb-10 px-margin-mobile md:px-margin-desktop"
      id="footer"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-8 border-b border-white/10"
        >
          {/*  Brand  */}
          <div>
            <div className="bg-white p-3 rounded-xl inline-block shadow-md mb-3">
              <img loading="lazy"
                height="724"
                width="1024"
                src="logo.png"
                alt="ANIL KUMAR &amp; SONS"
                className="h-20 w-auto object-contain"
              />
            </div>
            <p
              className="text-xs text-on-primary-container/70 mt-1 leading-relaxed"
            >
              Smart Security. Reliable Protection. Trusted Service.<br />Bharatpur,
              Rajasthan
            </p>
          </div>
          {/*  Quick Links  */}
          <div>
            <h4
              className="text-white font-bold text-sm mb-4 uppercase tracking-widest"
            >
              Quick Links
            <span className="sr-only">.</span></h4>
            <div
              className="flex flex-col gap-2 text-xs text-on-primary-container/80"
            >
              <a className="hover:text-white transition-colors" href="/"
                >Home</a
              >
              <a className="hover:text-white transition-colors" href="/services"
                >Services</a
              >
              <a className="hover:text-white transition-colors" href="/products"
                >Products</a
              >
              <a className="hover:text-white transition-colors" href="/gallery"
                >Gallery</a
              >
              <a className="hover:text-white transition-colors" href="/contact"
                >Contact</a
              >
            </div>
          </div>
          {/*  Contact Info  */}
          <div>
            <h4
              className="text-white font-bold text-sm mb-4 uppercase tracking-widest"
            >
              Contact Us
            <span className="sr-only">.</span></h4>
            <div
              className="flex flex-col gap-3 text-xs text-on-primary-container/80"
            >
              <a
                href="tel:+918947976889"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-base text-secondary"
                  >call</span
                >
                +91 89479 76889
              </a>
              <a
                href="mailto:aknscctvbtp20.ak@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-base text-secondary"
                  >mail</span
                >
                aknscctvbtp20.ak@gmail.com
              </a>
              <div className="flex items-start gap-2">
                <span
                  className="material-symbols-outlined text-base text-secondary mt-0.5"
                  >location_on</span
                >
                <span
                  >Inside B. Narayan Gate, Near SBI Bank,<br />Bahanera Wale,
                  Bharatpur, Raj - 321001</span
                >
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
    <a
      className="fixed bottom-20 right-6 md:bottom-8 md:right-8 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 hover:shadow-xl border-2 border-white"
      href="https://wa.me/918947976889"
      target="_blank"
      aria-label="WhatsApp"
     rel="noopener noreferrer">
      <svg
        className="w-8 h-8 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
         />
      </svg>
    </a>

    {/*  Counter and FAQ script  */}
    
  
    </>
  );
}
