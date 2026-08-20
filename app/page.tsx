'use client';

import React, { useEffect } from 'react';

export default function Page() {
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

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
          <video class="w-full h-full object-cover rounded-2xl md:rounded-3xl relative z-10" autoplay muted loop playsinline id="main-cctv-video">
            <source src="/video/cctvVideo.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <div class="cctv-scan-line z-20"></div>
          <div class="absolute top-4 right-4 z-30 bg-navy/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-white text-[10px] font-bold tracking-widest flex items-center gap-2 shadow-lg">
            <span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span class="text-secondary uppercase">● REC</span>
            <span class="text-white/60">4K HD</span>
          </div>
          <div class="absolute top-4 left-4 z-20 w-6 h-6 border-t-2 border-l-2 border-white/40"></div>
          <div class="absolute bottom-4 left-4 z-20 w-6 h-6 border-b-2 border-l-2 border-white/40"></div>
          <div class="absolute bottom-4 right-4 z-20 w-6 h-6 border-b-2 border-r-2 border-white/40"></div>
          <div class="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-30 flex items-center gap-3.5 bg-black/60 backdrop-blur-md px-4 py-2.5 md:px-5 md:py-3.5 rounded-xl md:rounded-2xl border border-white/15 text-white select-none transition-all duration-300 shadow-xl cursor-pointer" id="video-volume-overlay">
            <div class="relative shrink-0">
              <div class="play-ring-pulse"></div>
              <div class="w-9 h-9 md:w-11 md:h-11 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg" id="video-volume-btn">
                <span class="material-symbols-outlined text-white text-base md:text-xl" id="volume-icon" style="font-variation-settings: 'FILL' 1;">volume_off</span>
              </div>
            </div>
            <div class="flex flex-col">
              <p class="text-[9px] md:text-xs font-bold text-secondary uppercase tracking-widest mb-0.5" id="video-volume-status">Autoplay Muted</p>
              <h3 class="font-bold text-xs md:text-sm leading-tight text-white" id="video-volume-title">Click to Unmute</h3>
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
      {/*  Hero Section (Original Navy Background)  */}
      <section
        className="bg-navy text-on-tertiary pt-20 pb-32 px-margin-mobile md:px-margin-desktop relative overflow-hidden"
      >
        <div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10 items-stretch"
        >
          <div className="md:col-span-7 flex flex-col justify-center py-6">
            <span
              className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-4 inline-block"
              >Protecting What Matters Most</span
            >
            <h1
              className="font-display-hero text-[32px] sm:text-[40px] md:text-display-hero mb-6 font-black tracking-tight text-white leading-tight"
            >
              CCTV Installation &amp; Smart Security Solutions
            <span className="sr-only">.</span></h1>
            <p
              className="font-body-lg text-body-lg text-inverse-on-surface/80 mb-8 max-w-2xl leading-relaxed"
            >
              We provide end-to-end security solutions with premium products,
              expert installation, and reliable after-sales support. From homes
              to commercial spaces, industries, schools, hospitals, and
              offices—we ensure complete protection with advanced surveillance
              technology.
            </p>

            {/*  Bullet checklist (Compact Responsive 2-Column Mobile Grid)  */}
            <div
              className="grid grid-cols-2 gap-2.5 mb-8 text-inverse-on-surface/90 font-semibold text-xs sm:text-sm"
            >
              <div className="flex items-center gap-1.5 bg-white/5 p-2 rounded-xl border border-white/10 shadow-sm">
                <span className="material-symbols-outlined text-secondary text-base shrink-0"
                  >check_circle</span
                >
                <span>Free Site Survey</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 p-2 rounded-xl border border-white/10 shadow-sm">
                <span className="material-symbols-outlined text-secondary text-base shrink-0"
                  >check_circle</span
                >
                <span>Professional Install</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 p-2 rounded-xl border border-white/10 shadow-sm">
                <span className="material-symbols-outlined text-secondary text-base shrink-0"
                  >check_circle</span
                >
                <span>Genuine Products</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 p-2 rounded-xl border border-white/10 shadow-sm">
                <span className="material-symbols-outlined text-secondary text-base shrink-0"
                  >check_circle</span
                >
                <span>After-Sales Support</span>
              </div>
            </div>

            {/*  Hero Buttons (2-Column Grid on Mobile, Flex on Desktop)  */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
              <a
                className="bg-secondary text-on-secondary px-4 sm:px-8 py-3 rounded-xl font-bold hover:brightness-90 transition-all shadow-md text-center text-xs sm:text-base flex items-center justify-center gap-1.5"
                href="/contact"
              >
                <span>Free Consultation</span>
              </a>
              <a
                className="bg-transparent border-2 border-outline-variant text-on-tertiary px-4 sm:px-8 py-3 rounded-xl font-bold hover:bg-outline-variant hover:text-navy transition-all text-center text-xs sm:text-base flex items-center justify-center gap-1.5"
                href="/contact"
              >
                <span>Contact Us</span>
              </a>
            </div>
          </div>

          {/*  Hero Camera Pole Image (Grounded flush to bottom)  */}
          <div className="hidden md:flex md:col-span-5 justify-center items-end relative z-10 self-end -mb-32">
            <img
              height="700"
              width="600"
              className="h-[480px] lg:h-[580px] max-w-none w-auto object-contain object-bottom filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] transform hover:scale-[1.01] transition-transform duration-500"
              alt="Anil Kumar and Sons CCTV Surveillance Cameras on Pole"
              src="/hero-cctv-pole.png"
            />
          </div>
        </div>

        {/*  Decorative Tech Background (Original)  */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
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
      {/*  Featured Video Section (Ultra Security Theme Animations)  */}
      <section className="py-[48px] md:py-[80px] bg-[#f4f7f5] border-b border-outline-variant px-margin-mobile md:px-margin-desktop relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            Featured Walkthrough
          </div>
          <h2 className="font-headline-lg text-headline-lg text-navy mb-4">
            Professional Security Installation: <span className="text-secondary border-b-2 border-secondary pb-1">See Us In Action</span>
          <span className="sr-only">.</span></h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Take a look at how we design, mount, and configure custom CCTV setups. We ensure high-definition surveillance with zero blind zones and expert cable management.
          </p>
        </div>

        {/*  Video Player Wrapper with Ultra Security Animations  */}
        <div className="max-w-4xl mx-auto">
          <div 
            className="relative w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden border border-outline-variant shadow-2xl bg-[#0a1628] group cursor-pointer transition-all duration-500 group-hover:shadow-[0_10px_50px_rgba(230,57,70,0.25)] group-hover:border-secondary/40"
            id="featured-video-player"
            style={{ 'transform': 'translateZ(0)', 'WebkitMaskImage': '-webkit-radial-gradient(white, black)' }}
          >
            {/*  Animated CCTV Laser Scan Beam Line  */}
            <div className="cctv-scan-line"></div>

            {/*  Live REC 4K Security Badge Overlay  */}
            <div className="absolute top-4 right-4 z-30 bg-navy/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-white text-[10px] font-bold tracking-widest flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-secondary uppercase">● REC</span>
              <span className="text-white/60">4K HD</span>
            </div>

            {/*  Camera Target Reticle Corners  */}
            <div className="absolute top-4 left-4 z-20 w-6 h-6 border-t-2 border-l-2 border-white/40 group-hover:border-secondary transition-colors duration-300"></div>
            <div className="absolute top-4 right-4 z-20 w-6 h-6 border-t-2 border-r-2 border-white/40 group-hover:border-secondary transition-colors duration-300"></div>
            <div className="absolute bottom-4 left-4 z-20 w-6 h-6 border-b-2 border-l-2 border-white/40 group-hover:border-secondary transition-colors duration-300"></div>
            <div className="absolute bottom-4 right-4 z-20 w-6 h-6 border-b-2 border-r-2 border-white/40 group-hover:border-secondary transition-colors duration-300"></div>

            {/*  Thumbnail Image  */}
            <img loading="lazy" 
              src="gallery-images/video-thumbnail-1.jpg" 
              alt="Security installation walkthrough demo video thumbnail" 
              width="640"
              height="360"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 rounded-2xl md:rounded-3xl"
            />
            {/*  Dark Overlay  */}
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-300 rounded-2xl md:rounded-3xl"></div>

            {/*  Custom Play Overlay with Concentric Pulsating Rings  */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-30 flex items-center gap-3 md:gap-4 bg-black/50 backdrop-blur-md px-3.5 py-2.5 md:px-5 md:py-3.5 rounded-xl md:rounded-2xl border border-white/15 text-white select-none">
              {/*  Pulsating Play Button  */}
              <div className="relative">
                <div className="play-ring-pulse"></div>
                <div className="play-ring-pulse-2"></div>
                <button 
                  className="relative w-10 h-10 md:w-12 md:h-12 bg-secondary text-white rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300"
                  aria-label="Play Walkthrough Video"
                >
                  <span className="material-symbols-outlined text-white text-lg md:text-2xl" style={{ 'fontVariationSettings': '\'FILL\' 1' }}>play_arrow</span>
                </button>
              </div>
              <div>
                <p className="text-[9px] md:text-xs font-bold text-secondary uppercase tracking-widest mb-0.5">Live Walkthrough Demo</p>
                <h3 className="font-bold text-xs md:text-sm md:text-base leading-tight text-white">Click to Watch Full CCTV Installation<span className="sr-only">.</span></h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  About Us Section (Centered Text + Interactive Animated Highlight Badges)  */}
      <section
        className="py-[48px] md:py-[80px] bg-surface-container-lowest px-margin-mobile md:px-margin-desktop border-b border-outline-variant relative overflow-hidden"
        id="about"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span
              className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-3 inline-block font-extrabold"
              >OUR STORY &amp; MISSION</span
            >
            <h2 className="font-headline-lg text-3xl md:text-4xl font-extrabold text-navy mb-5">
              Who We Are
            <span className="sr-only">.</span></h2>
            <p
              className="font-body-lg text-base md:text-lg text-on-surface-variant mb-4 leading-relaxed font-medium"
            >
              At <span className="font-bold text-navy">Anil Kumar And Sons</span>,
              we believe security is not just about installing cameras—it’s about
              protecting people, businesses, and peace of mind.
            </p>
            <p
              className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed"
            >
              With years of experience in Security Surveillance and IT Networking,
              we provide customized security solutions backed by genuine products,
              expert installation, and prompt technical support. Our mission is to
              build long-term relationships by delivering quality, trust, and
              exceptional client service.
            </p>
          </div>

          {/*  3 Interactive Animated Highlight Badges Spanning Full 7xl Width  */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left mt-8">
            {/*  Badge 1  */}
            <div className="group bg-white p-7 rounded-2xl border border-outline-variant shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-5 group-hover:bg-secondary group-hover:text-white transition-colors duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform duration-300" style={{ fontVariationSettings: "'FILL' 1" }}>
                    workspace_premium
                  </span>
                </div>
                <h3 className="font-bold text-navy text-lg mb-2 group-hover:text-secondary transition-colors">
                  100% Genuine Products
                </h3>
                <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  Authorized dealer for CP Plus, Dahua, Uniview &amp; TP-Link with full manufacturer brand warranty.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs font-bold text-secondary">
                <span>Authorized Hardware</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/*  Badge 2  */}
            <div className="group bg-white p-7 rounded-2xl border border-outline-variant shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-5 group-hover:bg-secondary group-hover:text-white transition-colors duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform duration-300" style={{ fontVariationSettings: "'FILL' 1" }}>
                    engineering
                  </span>
                </div>
                <h3 className="font-bold text-navy text-lg mb-2 group-hover:text-secondary transition-colors">
                  Certified Engineers
                </h3>
                <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  CP Plus CSE certified technicians providing clean PVC pipe wiring &amp; zero-blindspot camera angles.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs font-bold text-secondary">
                <span>Expert Installation</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/*  Badge 3  */}
            <div className="group bg-white p-7 rounded-2xl border border-outline-variant shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-5 group-hover:bg-secondary group-hover:text-white transition-colors duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform duration-300" style={{ fontVariationSettings: "'FILL' 1" }}>
                    support_agent
                  </span>
                </div>
                <h3 className="font-bold text-navy text-lg mb-2 group-hover:text-secondary transition-colors">
                  Reliable After-Sales
                </h3>
                <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  Fast local service in Bharatpur, free mobile phone setup, password reset, and instant AMC support.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs font-bold text-secondary">
                <span>Fast Service</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  Meet The Owner Section (Ultra Leadership Frame Animations)  */}
      <section
        className="py-[48px] md:py-[80px] bg-navy text-on-tertiary px-margin-mobile md:px-margin-desktop relative overflow-hidden border-b border-white/10"
      >
        {/* Subtle Ambient Red/Gold Radial Glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none"></div>

        <div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10"
        >
          {/* Owner Photo Container with Glass Frame & Floating Badges */}
          <div className="md:col-span-5">
            <div
              className="group relative rounded-2xl overflow-hidden border-2 border-white/20 aspect-[4/5] max-w-sm mx-auto shadow-2xl bg-navy/80 transition-all duration-500 hover:border-secondary/60 hover:shadow-[0_15px_40px_rgba(230,57,70,0.3)] cursor-pointer"
            >
              {/* Owner Photo with Hover Scale */}
              <img loading="lazy"
                height="1024"
                width="801"
                className="w-full h-full object-cover object-[65%_20%] transform group-hover:scale-105 transition-transform duration-700"
                alt="Er Rajat Garg standing in store"
                src="owner.jpg"
              />

              {/* Floating Top Badge: 7+ Years Legacy */}
              <div className="absolute top-4 right-4 bg-navy/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-[10px] font-bold tracking-widest flex items-center gap-1.5 shadow-xl group-hover:border-secondary/40 transition-colors">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-gold uppercase">7+ YRS LEGACY</span>
              </div>

              {/* Floating Bottom Badge Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/65 backdrop-blur-md p-3.5 rounded-xl border border-white/15 text-white flex items-center justify-between shadow-2xl group-hover:bg-black/80 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow">
                    <span className="material-symbols-outlined text-base">verified_user</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">Er Rajat Garg</p>
                    <p className="text-[10px] text-white/70">Proprietor &amp; Lead Engineer</p>
                  </div>
                </div>
                <span className="bg-gold/20 text-gold text-[10px] font-bold px-2 py-0.5 rounded uppercase border border-gold/30">
                  CP Plus CSE
                </span>
              </div>
            </div>
          </div>

          {/* Owner Details & Trust Badges */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <span
              className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-3 inline-block font-extrabold"
              >LEADERSHIP &amp; EXPERTISE</span
            >
            <h2 className="font-headline-lg text-3xl md:text-4xl font-extrabold text-white mb-2">
              Er Rajat Garg
            <span className="sr-only">.</span></h2>
            <p className="text-gold font-body-lg text-body-lg mb-5 font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-gold text-lg">badge</span>
              Proprietor · Anil Kumar and Sons
            </p>

            <p
              className="font-body-md text-body-md text-inverse-on-surface/85 mb-5 leading-relaxed"
            >
              Continuing the proud legacy of Anil Kumar, I have been running
              this shop for over 7 years with a strict commitment to honesty,
              technical expertise, service, and client satisfaction. We don't just sell
              equipment; we engineer peace of mind for families and businesses
              across Bharatpur.
            </p>

            {/* Google Trust Quote Box */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm flex items-center gap-3">
              <div className="w-10 h-10 bg-gold/20 text-gold rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">reviews</span>
              </div>
              <div>
                <p className="text-white text-xs font-semibold italic">
                  "Over 109+ families and local businesses trust Er Rajat Garg on Google Reviews with 5.0 Star Rating."
                </p>
              </div>
            </div>
                     {/*  Animated Interactive Stats & Rating Badges (Compact Mobile Grid)  */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-8">
              <div
                className="bg-white/10 hover:bg-gold/20 px-3 sm:px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 border border-white/15 hover:border-gold/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer shadow-sm text-center"
              >
                <span className="material-symbols-outlined text-gold text-base shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-caption text-[11px] sm:text-xs font-bold text-white leading-tight"
                  >5.0 Rated on Google</span
                >
              </div>
              <div
                className="bg-white/10 hover:bg-secondary/20 px-3 sm:px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 border border-white/15 hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer shadow-sm text-center"
              >
                <span className="material-symbols-outlined text-secondary text-base shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
                <span className="font-caption text-[11px] sm:text-xs font-bold text-white leading-tight"
                  >Trusted Local Partner</span
                >
              </div>
              <div
                className="col-span-2 sm:col-auto bg-white/10 hover:bg-white/20 px-3 sm:px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 border border-white/15 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer shadow-sm text-center"
              >
                <span className="material-symbols-outlined text-white text-base shrink-0">verified</span>
                <span className="font-caption text-[11px] sm:text-xs font-bold text-white leading-tight"
                  >Certified Engineer</span
                >
              </div>
            </div>

            {/*  WhatsApp CTA Button  */}
            <a
              className="group relative bg-secondary text-white px-6 sm:px-8 py-3.5 rounded-xl font-bold flex items-center gap-2.5 hover:bg-[#cf333f] transition-all w-full sm:w-fit justify-center shadow-xl hover:shadow-[0_10px_30px_rgba(230,57,70,0.4)] cursor-pointer text-xs sm:text-base text-center"
              href="https://wa.me/918947976889"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-white group-hover:scale-110 transition-transform">chat</span>
              <span>Talk to Er Rajat on WhatsApp</span>
              <span className="material-symbols-outlined text-white/70 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
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
              >THE ANIL KUMAR ADVANTAGE</span
            >
            <h2 className="font-headline-lg text-headline-lg text-navy">
              Why Clients Trust Us
            <span className="sr-only">.</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Card 1 */}
            <div className="group bg-white border border-outline-variant p-6 rounded-2xl text-center shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-3xl">groups</span>
              </div>
              <h4 className="font-bold text-navy text-sm mb-1 group-hover:text-secondary transition-colors">
                Experienced Technical Team
              <span className="sr-only">.</span></h4>
              <div className="w-0 group-hover:w-10 h-1 bg-secondary rounded-full transition-all duration-300 mt-2"></div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white border border-outline-variant p-6 rounded-2xl text-center shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-3xl">verified</span>
              </div>
              <h4 className="font-bold text-navy text-sm mb-1 group-hover:text-secondary transition-colors">
                Certified Installation
              <span className="sr-only">.</span></h4>
              <div className="w-0 group-hover:w-10 h-1 bg-secondary rounded-full transition-all duration-300 mt-2"></div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white border border-outline-variant p-6 rounded-2xl text-center shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-3xl">high_quality</span>
              </div>
              <h4 className="font-bold text-navy text-sm mb-1 group-hover:text-secondary transition-colors">
                Premium Quality Products
              <span className="sr-only">.</span></h4>
              <div className="w-0 group-hover:w-10 h-1 bg-secondary rounded-full transition-all duration-300 mt-2"></div>
            </div>

            {/* Card 4 */}
            <div className="group bg-white border border-outline-variant p-6 rounded-2xl text-center shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-3xl">workspace_premium</span>
              </div>
              <h4 className="font-bold text-navy text-sm mb-1 group-hover:text-secondary transition-colors">
                Genuine Brand Warranty
              <span className="sr-only">.</span></h4>
              <div className="w-0 group-hover:w-10 h-1 bg-secondary rounded-full transition-all duration-300 mt-2"></div>
            </div>

            {/* Card 5 */}
            <div className="group bg-white border border-outline-variant p-6 rounded-2xl text-center shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-3xl">tune</span>
              </div>
              <h4 className="font-bold text-navy text-sm mb-1 group-hover:text-secondary transition-colors">
                Customized Security Solutions
              <span className="sr-only">.</span></h4>
              <div className="w-0 group-hover:w-10 h-1 bg-secondary rounded-full transition-all duration-300 mt-2"></div>
            </div>

            {/* Card 6 */}
            <div className="group bg-white border border-outline-variant p-6 rounded-2xl text-center shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-3xl">payments</span>
              </div>
              <h4 className="font-bold text-navy text-sm mb-1 group-hover:text-secondary transition-colors">
                Affordable Pricing
              <span className="sr-only">.</span></h4>
              <div className="w-0 group-hover:w-10 h-1 bg-secondary rounded-full transition-all duration-300 mt-2"></div>
            </div>

            {/* Card 7 */}
            <div className="group bg-white border border-outline-variant p-6 rounded-2xl text-center shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-3xl">support_agent</span>
              </div>
              <h4 className="font-bold text-navy text-sm mb-1 group-hover:text-secondary transition-colors">
                Quick Service Support
              <span className="sr-only">.</span></h4>
              <div className="w-0 group-hover:w-10 h-1 bg-secondary rounded-full transition-all duration-300 mt-2"></div>
            </div>

            {/* Card 8 */}
            <div className="group bg-white border border-outline-variant p-6 rounded-2xl text-center shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-3xl">handyman</span>
              </div>
              <h4 className="font-bold text-navy text-sm mb-1 group-hover:text-secondary transition-colors">
                Annual Maintenance Contracts (AMC)
              <span className="sr-only">.</span></h4>
              <div className="w-0 group-hover:w-10 h-1 bg-secondary rounded-full transition-all duration-300 mt-2"></div>
            </div>

            {/* Card 9 */}
            <div className="group bg-white border border-outline-variant p-6 rounded-2xl text-center shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-3xl">search</span>
              </div>
              <h4 className="font-bold text-navy text-sm mb-1 group-hover:text-secondary transition-colors">
                Free Site Survey
              <span className="sr-only">.</span></h4>
              <div className="w-0 group-hover:w-10 h-1 bg-secondary rounded-full transition-all duration-300 mt-2"></div>
            </div>

            {/* Card 10 */}
            <div className="group bg-white border border-outline-variant p-6 rounded-2xl text-center shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-3xl">sentiment_very_satisfied</span>
              </div>
              <h4 className="font-bold text-navy text-sm mb-1 group-hover:text-secondary transition-colors">
                Client Satisfaction Guaranteed
              <span className="sr-only">.</span></h4>
              <div className="w-0 group-hover:w-10 h-1 bg-secondary rounded-full transition-all duration-300 mt-2"></div>
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
              >CORE CAPABILITIES</span
            >
            <h2 className="font-headline-lg text-headline-lg text-navy">
              Complete Security &amp; IT Solutions
            <span className="sr-only">.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/*  Service 1  */}
            <div
              className="group bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-4 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm"
                >
                  <span className="material-symbols-outlined text-3xl">videocam</span>
                </div>
                <h3 className="font-bold text-lg text-navy mb-2 group-hover:text-secondary transition-colors">
                  CCTV Surveillance Systems
                <span className="sr-only">.</span></h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mb-4">
                  High-definition CCTV camera setups for homes, offices, shops, factories, schools, and hospitals in Bharatpur.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-xs font-bold text-secondary">
                <span>Book Consultation</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/*  Service 2  */}
            <div
              className="group bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-4 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm"
                >
                  <span className="material-symbols-outlined text-3xl">photo_camera</span>
                </div>
                <h3 className="font-bold text-lg text-navy mb-2 group-hover:text-secondary transition-colors">
                  AI-Enabled IP Cameras
                <span className="sr-only">.</span></h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mb-4">
                  Smart AI motion-detecting IP surveillance with 4K resolution, night vision, and remote phone monitoring.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-xs font-bold text-secondary">
                <span>Explore IP Setup</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/*  Service 3  */}
            <div
              className="group bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-4 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm"
                >
                  <span className="material-symbols-outlined text-3xl">wifi</span>
                </div>
                <h3 className="font-bold text-lg text-navy mb-2 group-hover:text-secondary transition-colors">
                  Wi-Fi &amp; 4G SIM Cameras
                <span className="sr-only">.</span></h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mb-4">
                  Wireless 360-degree rotating cameras with built-in 4G SIM slots and instant smartphone alerts.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-xs font-bold text-secondary">
                <span>View Wireless Models</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/*  Service 4  */}
            <div
              className="group bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-4 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm"
                >
                  <span className="material-symbols-outlined text-3xl">door_front</span>
                </div>
                <h3 className="font-bold text-lg text-navy mb-2 group-hover:text-secondary transition-colors">
                  Video Door Phone (VDP)
                <span className="sr-only">.</span></h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mb-4">
                  Two-way audio and HD video doorbells to talk and grant access to visitors safely from indoors.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-xs font-bold text-secondary">
                <span>Check VDP Kits</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/*  Service 5  */}
            <div
              className="group bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-4 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm"
                >
                  <span className="material-symbols-outlined text-3xl">fingerprint</span>
                </div>
                <h3 className="font-bold text-lg text-navy mb-2 group-hover:text-secondary transition-colors">
                  Biometric Attendance Systems
                <span className="sr-only">.</span></h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mb-4">
                  Fingerprint, RFID card, and AI face recognition attendance devices with automated payroll software.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-xs font-bold text-secondary">
                <span>View Biometric Gear</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/*  Service 6  */}
            <div
              className="group bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-4 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm"
                >
                  <span className="material-symbols-outlined text-3xl">lock</span>
                </div>
                <h3 className="font-bold text-lg text-navy mb-2 group-hover:text-secondary transition-colors">
                  Smart Access Control Locks
                <span className="sr-only">.</span></h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mb-4">
                  Electromagnetic &amp; digital door locks for commercial offices, banks, server rooms, and institutions.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-xs font-bold text-secondary">
                <span>View Access Locks</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>

          {/*  IT Networking Hub Box (Dark Navy Glassmorphism)  */}
          <div
            className="mt-10 bg-navy text-white p-8 rounded-2xl border border-white/15 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary text-white rounded-xl flex items-center justify-center shadow">
                    <span className="material-symbols-outlined text-xl">lan</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-white">
                      Structured IT Networking &amp; Fiber Solutions
                    </h3>
                    <p className="text-xs text-white/70">Complete Commercial Network Architecture &amp; Rack Setup</p>
                  </div>
                </div>
                <span className="bg-white/10 text-secondary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/15 shrink-0 w-fit">
                  Gigabit Certified
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
                <div className="p-3.5 bg-white/10 hover:bg-secondary hover:text-white rounded-xl text-xs font-bold border border-white/15 transition-all duration-300 transform hover:-translate-y-1 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer">
                  <span className="material-symbols-outlined text-sm">cable</span>
                  LAN Cabling
                </div>
                <div className="p-3.5 bg-white/10 hover:bg-secondary hover:text-white rounded-xl text-xs font-bold border border-white/15 transition-all duration-300 transform hover:-translate-y-1 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer">
                  <span className="material-symbols-outlined text-sm">account_tree</span>
                  Structured Cabling
                </div>
                <div className="p-3.5 bg-white/10 hover:bg-secondary hover:text-white rounded-xl text-xs font-bold border border-white/15 transition-all duration-300 transform hover:-translate-y-1 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer">
                  <span className="material-symbols-outlined text-sm">dns</span>
                  Server Racks
                </div>
                <div className="p-3.5 bg-white/10 hover:bg-secondary hover:text-white rounded-xl text-xs font-bold border border-white/15 transition-all duration-300 transform hover:-translate-y-1 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer">
                  <span className="material-symbols-outlined text-sm">router</span>
                  Wi-Fi Mesh Setup
                </div>
                <div className="p-3.5 bg-white/10 hover:bg-secondary hover:text-white rounded-xl text-xs font-bold border border-white/15 transition-all duration-300 transform hover:-translate-y-1 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer">
                  <span className="material-symbols-outlined text-sm">settings_ethernet</span>
                  PoE Switches
                </div>
                <div className="p-3.5 bg-white/10 hover:bg-secondary hover:text-white rounded-xl text-xs font-bold border border-white/15 transition-all duration-300 transform hover:-translate-y-1 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer">
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  Fiber Splicing
                </div>
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
            >OUR COMMITMENT</span
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

      {/*  Our Work Process Section (Interactive Connected Stepper Animations)  */}
      <section
        className="py-[48px] md:py-[80px] bg-surface-container-lowest px-margin-mobile md:px-margin-desktop border-b border-outline-variant relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-4 inline-block font-extrabold"
              >HOW WE EXECUTE</span
            >
            <h2 className="font-headline-lg text-headline-lg text-navy">
              Our Step-by-Step Work Process
            <span className="sr-only">.</span></h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center relative pt-4">
            {/* Step 1 */}
            <div
              className="group relative bg-white p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-between"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-black px-3 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                STEP 01
              </div>
              <div
                className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 mt-2 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm"
              >
                <span className="material-symbols-outlined text-3xl">support_agent</span>
              </div>
              <h4 className="font-bold text-navy text-sm mb-1 group-hover:text-secondary transition-colors">
                Initial Consultation
              <span className="sr-only">.</span></h4>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Understanding security needs &amp; site layout.
              </p>
              <div className="w-0 group-hover:w-10 h-1 bg-secondary rounded-full transition-all duration-300 mt-3"></div>
            </div>

            {/* Step 2 */}
            <div
              className="group relative bg-white p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-between"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-black px-3 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                STEP 02
              </div>
              <div
                className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 mt-2 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm"
              >
                <span className="material-symbols-outlined text-3xl">travel_explore</span>
              </div>
              <h4 className="font-bold text-navy text-sm mb-1 group-hover:text-secondary transition-colors">
                Security Assessment
              <span className="sr-only">.</span></h4>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Free site survey &amp; camera angle planning.
              </p>
              <div className="w-0 group-hover:w-10 h-1 bg-secondary rounded-full transition-all duration-300 mt-3"></div>
            </div>

            {/* Step 3 */}
            <div
              className="group relative bg-white p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-between"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-black px-3 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                STEP 03
              </div>
              <div
                className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 mt-2 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm"
              >
                <span className="material-symbols-outlined text-3xl">architecture</span>
              </div>
              <h4 className="font-bold text-navy text-sm mb-1 group-hover:text-secondary transition-colors">
                Customized Solution
              <span className="sr-only">.</span></h4>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Selecting brand &amp; transparent quotation.
              </p>
              <div className="w-0 group-hover:w-10 h-1 bg-secondary rounded-full transition-all duration-300 mt-3"></div>
            </div>

            {/* Step 4 */}
            <div
              className="group relative bg-white p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-between"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-black px-3 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                STEP 04
              </div>
              <div
                className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 mt-2 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm"
              >
                <span className="material-symbols-outlined text-3xl">engineering</span>
              </div>
              <h4 className="font-bold text-navy text-sm mb-1 group-hover:text-secondary transition-colors">
                Professional Setup
              <span className="sr-only">.</span></h4>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Clean PVC pipe wiring &amp; expert mounting.
              </p>
              <div className="w-0 group-hover:w-10 h-1 bg-secondary rounded-full transition-all duration-300 mt-3"></div>
            </div>

            {/* Step 5 */}
            <div
              className="group relative bg-white p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-between"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-black px-3 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                STEP 05
              </div>
              <div
                className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 mt-2 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm"
              >
                <span className="material-symbols-outlined text-3xl">checklist</span>
              </div>
              <h4 className="font-bold text-navy text-sm mb-1 group-hover:text-secondary transition-colors">
                Testing &amp; Training
              <span className="sr-only">.</span></h4>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Mobile app setup &amp; client walkthrough.
              </p>
              <div className="w-0 group-hover:w-10 h-1 bg-secondary rounded-full transition-all duration-300 mt-3"></div>
            </div>

            {/* Step 6 */}
            <div
              className="group relative bg-white p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-between"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-black px-3 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                STEP 06
              </div>
              <div
                className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 mt-2 group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm"
              >
                <span className="material-symbols-outlined text-3xl">headset_mic</span>
              </div>
              <h4 className="font-bold text-navy text-sm mb-1 group-hover:text-secondary transition-colors">
                After Sales Support
              <span className="sr-only">.</span></h4>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Warranty support &amp; fast site visits.
              </p>
              <div className="w-0 group-hover:w-10 h-1 bg-secondary rounded-full transition-all duration-300 mt-3"></div>
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
            >AUTHORIZED HARDWARE</span
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



      {/*  Our Valued Clients (Glassmorphism & Live Active Badges)  */}
      <section
        className="py-[48px] md:py-[80px] bg-surface-container-lowest px-margin-mobile md:px-margin-desktop border-b border-outline-variant relative overflow-hidden"
        id="clients"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-3 inline-block font-extrabold"
              >PROVEN TRACK RECORD</span
            >
            <h2 className="font-headline-lg text-3xl md:text-4xl font-extrabold text-navy mb-3">
              Our Valued Clients &amp; Key Deployments
            <span className="sr-only">.</span></h2>
            <p className="text-on-surface-variant text-sm max-w-2xl mx-auto leading-relaxed">
              We are proud to have deployed secure, high-performance security &amp; IT infrastructure for 100+ leading institutions, resorts, factories, and commercial enterprises in Bharatpur.
            </p>
          </div>

          {/*  Ongoing Projects (Running Live Clients)  */}
          <div className="mb-14">
            <div className="flex items-center justify-between mb-5 border-b border-outline-variant/40 pb-3">
              <h4
                className="text-xs font-bold uppercase tracking-wider text-navy flex items-center gap-2"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                ></span>
                <span>Active Live Integrations / Running Clients</span>
              <span className="sr-only">.</span></h4>
              <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                24/7 LIVE SUPPORT
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/*  Mukund Resort  */}
              <div
                className="group relative bg-white rounded-2xl border-2 border-emerald-300/80 shadow-md p-6 flex flex-col justify-between hover:border-emerald-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase bg-emerald-100/70 px-2.5 py-1 rounded-full border border-emerald-200"
                      >Resort &amp; Hospitality</span
                    >
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-sm"
                    >
                      <span
                        className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"
                      ></span>
                      Active Client
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-navy flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600">hotel</span>
                    Mukund Resort
                    <span className="text-xs text-on-surface-variant font-medium"
                      >(Bharatpur)</span
                    >
                  <span className="sr-only">.</span></h3>
                  <p className="text-on-surface-variant text-xs mt-2 leading-relaxed">
                    Full deployment of enterprise-grade CCTV security cameras, high-capacity NVR storage, and optical fiber network connectivity.
                  </p>
                </div>
              </div>

              {/*  Ananta Resort  */}
              <div
                className="group relative bg-white rounded-2xl border-2 border-emerald-300/80 shadow-md p-6 flex flex-col justify-between hover:border-emerald-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase bg-emerald-100/70 px-2.5 py-1 rounded-full border border-emerald-200"
                      >Resort &amp; Hospitality</span
                    >
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-sm"
                    >
                      <span
                        className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"
                      ></span>
                      Active Client
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-navy flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600">villa</span>
                    Ananta Resort
                    <span className="text-xs text-on-surface-variant font-medium"
                      >(VMD Resort)</span
                    >
                  <span className="sr-only">.</span></h3>
                  <p className="text-on-surface-variant text-xs mt-2 leading-relaxed">
                    Deployment of centralized CCTV surveillance network and long-range high-speed wireless outdoor link systems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/*  Categorized Client List Grid (Top 4 Categories)  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/*  Category: Food & Confectionery  */}
            <div
              className="group bg-white rounded-2xl border border-outline-variant p-6 shadow-sm hover:shadow-2xl hover:border-secondary/40 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-outline-variant/30 text-navy">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors duration-300 shrink-0">
                  <span className="material-symbols-outlined text-xl">restaurant</span>
                </div>
                <h4 className="font-bold text-sm text-navy uppercase tracking-wide group-hover:text-secondary transition-colors">
                  Food &amp; Sweets
                <span className="sr-only">.</span></h4>
              </div>
              <ul className="space-y-2.5 text-xs text-on-surface-variant">
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span>
                  Saini Madhur Vyjan
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span>
                  Saini Mithas
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span>
                  Saini Sweets
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span>
                  AKSHAR FOOD
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span>
                  Sai Bakery
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span>
                  Standard Bakery
                <span className="sr-only">.</span></li>
              </ul>
            </div>

            {/*  Category: Educational Institutions  */}
            <div
              className="group bg-white rounded-2xl border border-outline-variant p-6 shadow-sm hover:shadow-2xl hover:border-secondary/40 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-outline-variant/30 text-navy">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors duration-300 shrink-0">
                  <span className="material-symbols-outlined text-xl">school</span>
                </div>
                <h4 className="font-bold text-sm text-navy uppercase tracking-wide group-hover:text-secondary transition-colors">
                  Education
                <span className="sr-only">.</span></h4>
              </div>
              <ul className="space-y-2.5 text-xs text-on-surface-variant">
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Sony World School
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Sony Convent School
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Sony Coaching
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> A K M School
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Antriksh Academy
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Spectrum Academy
                <span className="sr-only">.</span></li>
              </ul>
            </div>

            {/*  Category: Retailers & Jewellers  */}
            <div
              className="group bg-white rounded-2xl border border-outline-variant p-6 shadow-sm hover:shadow-2xl hover:border-secondary/40 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-outline-variant/30 text-navy">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors duration-300 shrink-0">
                  <span className="material-symbols-outlined text-xl">storefront</span>
                </div>
                <h4 className="font-bold text-sm text-navy uppercase tracking-wide group-hover:text-secondary transition-colors">
                  Jewellers &amp; Retail
                <span className="sr-only">.</span></h4>
              </div>
              <ul className="space-y-2.5 text-xs text-on-surface-variant">
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Tilkdhari Jewellers
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> R K Jewellers
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Goyal Abhusharn
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Goyal Ornament
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Amarchand Akhalesh Kumar
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Royal Furniture &amp; Sari
                <span className="sr-only">.</span></li>
              </ul>
            </div>

            {/*  Category: Factories & Industry  */}
            <div
              className="group bg-white rounded-2xl border border-outline-variant p-6 shadow-sm hover:shadow-2xl hover:border-secondary/40 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-outline-variant/30 text-navy">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors duration-300 shrink-0">
                  <span className="material-symbols-outlined text-xl">domain</span>
                </div>
                <h4 className="font-bold text-sm text-navy uppercase tracking-wide group-hover:text-secondary transition-colors">
                  Factories &amp; Industry
                <span className="sr-only">.</span></h4>
              </div>
              <ul className="space-y-2.5 text-xs text-on-surface-variant">
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Sakun Oil Mill
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Manish Oil Mill
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Poly Pack Factory
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Suman Kamal Factory
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Agarwal Warehouse
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Agarwal Marble
                <span className="sr-only">.</span></li>
              </ul>
            </div>
          </div>

          {/*  Secondary Client Row (Automotive, Healthcare, Electric)  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/*  Category: Automotive  */}
            <div
              className="group bg-white rounded-2xl border border-outline-variant p-6 shadow-sm hover:shadow-2xl hover:border-secondary/40 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-outline-variant/30 text-navy">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors duration-300 shrink-0">
                  <span className="material-symbols-outlined text-xl">directions_car</span>
                </div>
                <h4 className="font-bold text-sm text-navy uppercase tracking-wide group-hover:text-secondary transition-colors">
                  Automotive Showrooms
                <span className="sr-only">.</span></h4>
              </div>
              <ul className="space-y-2.5 text-xs text-on-surface-variant">
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Jindal Honda
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> TVS Automobile Workshop
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Shivam Motors
                <span className="sr-only">.</span></li>
              </ul>
            </div>

            {/*  Category: Healthcare  */}
            <div
              className="group bg-white rounded-2xl border border-outline-variant p-6 shadow-sm hover:shadow-2xl hover:border-secondary/40 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-outline-variant/30 text-navy">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors duration-300 shrink-0">
                  <span className="material-symbols-outlined text-xl">local_hospital</span>
                </div>
                <h4 className="font-bold text-sm text-navy uppercase tracking-wide group-hover:text-secondary transition-colors">
                  Healthcare &amp; Clinics
                <span className="sr-only">.</span></h4>
              </div>
              <ul className="space-y-2.5 text-xs text-on-surface-variant">
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Pradeep Hospital
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Dr. Moresh Agarwal Clinic
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Dr. Deepak Singhal Eye Care
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Ekansh Diagnostic Centre
                <span className="sr-only">.</span></li>
              </ul>
            </div>

            {/*  Category: Electrical & Services  */}
            <div
              className="group bg-white rounded-2xl border border-outline-variant p-6 shadow-sm hover:shadow-2xl hover:border-secondary/40 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-outline-variant/30 text-navy">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors duration-300 shrink-0">
                  <span className="material-symbols-outlined text-xl">electric_bolt</span>
                </div>
                <h4 className="font-bold text-sm text-navy uppercase tracking-wide group-hover:text-secondary transition-colors">
                  Electrical Services
                <span className="sr-only">.</span></h4>
              </div>
              <ul className="space-y-2.5 text-xs text-on-surface-variant">
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> BESL Electric Services
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Taneja Electricals
                <span className="sr-only">.</span></li>
                <li className="flex items-center gap-2.5 font-medium hover:text-secondary transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span> Bansal Hardware &amp; Trade
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
              >ON-SITE PORTFOLIO</span
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
              >CUSTOMER FEEDBACK</span
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

      {/*  FAQ Section (React Controlled Accordion)  */}
      <section
        className="py-[48px] md:py-[80px] bg-surface-container-lowest px-margin-mobile md:px-margin-desktop border-b border-outline-variant"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span
              className="font-section-tagline text-section-tagline text-secondary uppercase tracking-widest mb-2 inline-block font-extrabold"
              >GOT QUESTIONS?</span
            >
            <h2 className="font-headline-lg text-headline-lg text-navy mb-4">
              Frequently Asked Questions
            <span className="sr-only">.</span></h2>
          </div>

          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <div
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm ${
                openFaqIndex === 0 ? 'border-secondary shadow-lg' : 'border-outline-variant hover:border-secondary/50'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
                className="w-full flex justify-between items-center p-5 text-left font-bold text-navy focus:outline-none hover:bg-surface-container-low transition-colors cursor-pointer"
                aria-expanded={openFaqIndex === 0}
              >
                <span className="text-base text-navy font-bold">What brands do you deal in?</span>
                <span
                  className={`material-symbols-outlined transform transition-transform duration-300 text-secondary text-2xl ${
                    openFaqIndex === 0 ? 'rotate-180 text-secondary' : 'rotate-0 text-navy/60'
                  }`}
                >
                  expand_more
                </span>
              </button>
              {openFaqIndex === 0 && (
                <div className="px-5 pb-5 pt-1 border-t border-outline-variant/30 text-sm text-on-surface-variant leading-relaxed animate-fadeIn">
                  We stock CP Plus, Uniview (UNV), Dahua, TP-Link, D-Link, IMOU, Ezviz, Qubo, Maxemus, Tenda, Mantra, and other premium security &amp; IT brands with genuine manufacturer warranties.
                </div>
              )}
            </div>

            {/* FAQ Item 2 */}
            <div
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm ${
                openFaqIndex === 1 ? 'border-secondary shadow-lg' : 'border-outline-variant hover:border-secondary/50'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
                className="w-full flex justify-between items-center p-5 text-left font-bold text-navy focus:outline-none hover:bg-surface-container-low transition-colors cursor-pointer"
                aria-expanded={openFaqIndex === 1}
              >
                <span className="text-base text-navy font-bold">Do you charge for site survey?</span>
                <span
                  className={`material-symbols-outlined transform transition-transform duration-300 text-secondary text-2xl ${
                    openFaqIndex === 1 ? 'rotate-180 text-secondary' : 'rotate-0 text-navy/60'
                  }`}
                >
                  expand_more
                </span>
              </button>
              {openFaqIndex === 1 && (
                <div className="px-5 pb-5 pt-1 border-t border-outline-variant/30 text-sm text-on-surface-variant leading-relaxed animate-fadeIn">
                  No! We provide a 100% free site survey, camera positioning advice, and transparent quotation without any obligation across Bharatpur.
                </div>
              )}
            </div>

            {/* FAQ Item 3 */}
            <div
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm ${
                openFaqIndex === 2 ? 'border-secondary shadow-lg' : 'border-outline-variant hover:border-secondary/50'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}
                className="w-full flex justify-between items-center p-5 text-left font-bold text-navy focus:outline-none hover:bg-surface-container-low transition-colors cursor-pointer"
                aria-expanded={openFaqIndex === 2}
              >
                <span className="text-base text-navy font-bold">What is the warranty on camera setups?</span>
                <span
                  className={`material-symbols-outlined transform transition-transform duration-300 text-secondary text-2xl ${
                    openFaqIndex === 2 ? 'rotate-180 text-secondary' : 'rotate-0 text-navy/60'
                  }`}
                >
                  expand_more
                </span>
              </button>
              {openFaqIndex === 2 && (
                <div className="px-5 pb-5 pt-1 border-t border-outline-variant/30 text-sm text-on-surface-variant leading-relaxed animate-fadeIn">
                  Surveillance equipment generally carries a standard 1-2 years brand warranty. In addition, we provide complete post-installation technical service support.
                </div>
              )}
            </div>

            {/* FAQ Item 4 */}
            <div
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm ${
                openFaqIndex === 3 ? 'border-secondary shadow-lg' : 'border-outline-variant hover:border-secondary/50'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenFaqIndex(openFaqIndex === 3 ? null : 3)}
                className="w-full flex justify-between items-center p-5 text-left font-bold text-navy focus:outline-none hover:bg-surface-container-low transition-colors cursor-pointer"
                aria-expanded={openFaqIndex === 3}
              >
                <span className="text-base text-navy font-bold">Which is the best security camera for home use?</span>
                <span
                  className={`material-symbols-outlined transform transition-transform duration-300 text-secondary text-2xl ${
                    openFaqIndex === 3 ? 'rotate-180 text-secondary' : 'rotate-0 text-navy/60'
                  }`}
                >
                  expand_more
                </span>
              </button>
              {openFaqIndex === 3 && (
                <div className="px-5 pb-5 pt-1 border-t border-outline-variant/30 text-sm text-on-surface-variant leading-relaxed animate-fadeIn space-y-2">
                  <p>For home security, there are two primary options:</p>
                  <p>1) <strong>IP Cameras (Network Security)</strong> like 2MP/3MP/4MP/5MP/6MP/8MP cameras from CP Plus, Dahua, or Uniview that offer HD night vision and real-time mobile app alerts.</p>
                  <p>2) <strong>Smart Wi-Fi &amp; 4G SIM Cameras</strong> like 360-degree PTZ cameras from Imou, Ezviz, or Qubo, which allow direct smartphone rotation control.</p>
                  <p>Call or WhatsApp us at <strong>+91 89479 76889</strong> for personalized recommendations.</p>
                </div>
              )}
            </div>

            {/* FAQ Item 5 */}
            <div
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm ${
                openFaqIndex === 4 ? 'border-secondary shadow-lg' : 'border-outline-variant hover:border-secondary/50'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenFaqIndex(openFaqIndex === 4 ? null : 4)}
                className="w-full flex justify-between items-center p-5 text-left font-bold text-navy focus:outline-none hover:bg-surface-container-low transition-colors cursor-pointer"
                aria-expanded={openFaqIndex === 4}
              >
                <span className="text-base text-navy font-bold">What is the difference between an IP Camera and an Analog Camera?</span>
                <span
                  className={`material-symbols-outlined transform transition-transform duration-300 text-secondary text-2xl ${
                    openFaqIndex === 4 ? 'rotate-180 text-secondary' : 'rotate-0 text-navy/60'
                  }`}
                >
                  expand_more
                </span>
              </button>
              {openFaqIndex === 4 && (
                <div className="px-5 pb-5 pt-1 border-t border-outline-variant/30 text-sm text-on-surface-variant leading-relaxed animate-fadeIn">
                  Analog cameras connect to a DVR via coaxial cables and are budget-friendly. IP cameras connect to an NVR via network cables (Cat6 / PoE), offering 4K video clarity, remote IP monitoring, and advanced AI smart motion detection.
                </div>
              )}
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
              >GET IN TOUCH</span
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
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-navy mb-1">Our Location Address<span className="sr-only">.</span></h4>
                <p className="text-sm text-on-surface-variant">
                  Anil Kumar &amp; Sons, Inside B. Narayan Gate, Near SBI Bank,
                  Bahanera Wale, Bharatpur, Rajasthan - 321001
                </p>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Anil+kumar+and+Sons+(+Bahanera+wale+)+Bharatpur"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#e63946] text-white px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap hover:bg-[#cf333f] transition-colors shrink-0 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">near_me</span>
                Open Maps
              </a>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Anil+kumar+and+Sons+(+Bahanera+wale+)+Bharatpur"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative h-64 rounded-lg overflow-hidden border border-outline-variant bg-white/10 group cursor-pointer"
              title="Click to open store location in Google Maps"
            >
              <iframe
                title="Store Location Map"
                allowFullScreen={true}
                height="100%"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3372.6618781201437!2d77.49321747523537!3d27.21208167647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3973a30d1e8b672b%3A0x251227a6a12ebdb0!2sAnil%20kumar%20and%20Sons%20(%20Bahanera%20wale%20)!5e1!3m2!1sen!2sin!4v1787155780030!5m2!1sen!2sin"
                style={{ 'border': '0', 'pointerEvents': 'none' }}
                width="100%"
              ></iframe>
              <div className="absolute bottom-3 left-3 bg-navy/90 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5 shadow-md group-hover:bg-navy transition-all">
                <span className="material-symbols-outlined text-secondary text-sm">open_in_new</span>
                <span>Click to open in Google Maps</span>
              </div>
            </a>
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
            <a className="flex items-center gap-2 mb-3 inline-block" href="/">
              <img loading="lazy"
                height="724"
                width="1024"
                src="logo.png"
                alt="ANIL KUMAR &amp; SONS"
                className="h-20 w-auto object-contain py-1"
              />
            </a>
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
