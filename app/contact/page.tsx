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
                <a className="text-white font-medium hover:text-secondary transition-colors duration-200 font-body-md text-body-md" href="/gallery">Gallery</a>
                <a className="text-secondary border-b-2 border-secondary pb-1 font-medium font-body-md text-body-md" href="/contact">Contact</a>
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
            <a className="flex flex-col items-center text-secondary" href="/contact" >
                <span className="material-symbols-outlined" style={{ 'fontVariationSettings': '\'FILL\' 1' }}>contact_support</span>
                <span className="text-[10px] font-medium mt-1">Contact</span>
            </a>
        </div>
    </nav>

    <main className="flex-grow ">
{/*  Page Header  */}
<section className="py-section-padding bg-surface-container-low px-margin-mobile md:px-margin-desktop text-center">
<h1 className="font-display-hero text-display-hero text-primary mb-stack-sm">Get in Touch with Our Security Experts</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto">We are here to help you choose the best security cameras, networking tools, and smart home solutions in Bharatpur. Reach out to Er. Rajat Garg for personal guidance and quick quotes.</p>
<div className="mt-4 flex flex-wrap justify-center gap-4 text-xs font-bold text-primary uppercase tracking-wider">
<span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full">Open All 7 Days • 9:30 AM to 7:30 PM</span>
<span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full">Free Site Survey Available</span>
<span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full">Same Day Support</span>
</div>
</section>
{/*  Split Layout  */}
<section className="py-section-padding px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
{/*  Left: Contact Details  */}
<div className="md:col-span-5 bg-surface-container-lowest p-8 border border-outline-variant rounded-lg hover-lift flex flex-col justify-between">
<div>
<h2 className="font-headline-md text-headline-md text-primary mb-stack-lg border-b border-outline-variant pb-4">Contact Details</h2>
<div className="space-y-6">
<div className="flex items-start gap-stack-md">
<span className="material-symbols-outlined text-secondary mt-1">call</span>
<div>
<h3 className="font-body-md text-body-md font-bold text-primary">Phone &amp; WhatsApp</h3>
<p className="text-on-surface-variant font-body-md text-body-md">+91 89479 76889</p>
<p className="text-xs text-on-surface-variant/70 mt-1">Call us directly or send a message on WhatsApp for instant replies.</p>
</div>
</div>
<div className="flex items-start gap-stack-md">
<span className="material-symbols-outlined text-secondary mt-1">location_on</span>
<div>
<h3 className="font-body-md text-body-md font-bold text-primary">Store Location</h3>
<p className="text-on-surface-variant font-body-md text-body-md">Inside B. Narayan Gate, Near SBI Bank, Bahanera Wale, Bharatpur, Rajasthan - 321001</p>
<p className="text-xs text-on-surface-variant/70 mt-1">Convenient parking space available right in front of our store entrance.</p>
</div>
</div>
<div className="flex items-start gap-stack-md">
<span className="material-symbols-outlined text-secondary mt-1">person</span>
<div>
<h3 className="font-body-md text-body-md font-bold text-primary">Proprietor &amp; Lead Engineer</h3>
<p className="text-on-surface-variant font-body-md text-body-md">Er. Rajat Garg</p>
<p className="text-xs text-on-surface-variant/70 mt-1">Certified surveillance expert with hands-on technical experience.</p>
</div>
</div>
<div className="flex items-start gap-stack-md">
<span className="material-symbols-outlined text-secondary mt-1">schedule</span>
<div>
<h3 className="font-body-md text-body-md font-bold text-primary">Operating Hours</h3>
<p className="text-on-surface-variant font-body-md text-body-md">Monday – Sunday: 9:30 AM – 7:30 PM</p>
<p className="text-xs text-on-surface-variant/70 mt-1">We are active every single day to support your security needs.</p>
</div>
</div>
</div>
</div>
<div className="mt-8 pt-6 border-t border-outline-variant">
<h3 className="font-bold text-primary text-sm mb-2">Service Regions Covered</h3>
<p className="text-xs text-on-surface-variant leading-relaxed">We serve all areas in Bharatpur including Bahanera, Mathura Gate, Circular Road, Sewar, Kumher, Deeg, Bayana, Kaman, Nadbai, Weir, and Nagar.</p>
</div>
</div>
{/*  Right: Enquiry Form  */}
<div className="md:col-span-7 bg-surface-container-lowest p-8 border border-outline-variant rounded-lg hover-lift">
<h2 className="font-headline-md text-headline-md text-primary mb-stack-lg border-b border-outline-variant pb-4">Send an Instant Enquiry</h2>
<p className="text-sm text-on-surface-variant mb-6">Fill out this quick form to get a custom quote or request a free site visit. Our team will contact you within two hours.</p>
<form id="enquiry-form" className="space-y-stack-md">
<div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
<div>
<label className="block font-caption text-caption font-bold text-primary mb-2" htmlFor="name">Name</label>
<input className="w-full border border-[#C0C0C0] rounded bg-surface-container-lowest px-4 py-2 focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container outline-none transition-colors" id="name" placeholder="Your Name" type="text" required/>
</div>
<div>
<label className="block font-caption text-caption font-bold text-primary mb-2" htmlFor="phone">Phone Number</label>
<input className="w-full border border-[#C0C0C0] rounded bg-surface-container-lowest px-4 py-2 focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container outline-none transition-colors" id="phone" placeholder="Your Phone Number" type="tel" required/>
</div>
</div>
<div>
<label className="block font-caption text-caption font-bold text-primary mb-2" htmlFor="requirement">Requirement</label>
<select className="w-full border border-[#C0C0C0] rounded bg-surface-container-lowest px-4 py-2 focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container outline-none transition-colors appearance-none" id="requirement" required>
<option value="">Select Requirement</option>
<option value="Wholesale Order">Wholesale Order</option>
<option value="Installation Services">Installation Services</option>
<option value="Product Inquiry">Product Inquiry</option>
<option value="Free Site Survey">Free Site Survey</option>
<option value="AMC Contract">AMC Contract Support</option>
<option value="Other">Other</option>
</select>
</div>
<div>
<label className="block font-caption text-caption font-bold text-primary mb-2" htmlFor="message">Message</label>
<textarea className="w-full border border-[#C0C0C0] rounded bg-surface-container-lowest px-4 py-2 focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container outline-none transition-colors" id="message" placeholder="Describe your requirement or location..." rows={4} required></textarea>
</div>
<button className="bg-[#e63946] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#cf333f] transition-colors shadow-sm cursor-pointer" type="submit">
                            Send Enquiry via WhatsApp
                        </button>
</form>
</div>
</div>
</section>

{/*  Additional Information Section for High Readability & SEO  */}
<section className="py-12 bg-surface-container-low px-margin-mobile md:px-margin-desktop border-t border-b border-outline-variant">
<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
<div className="bg-white p-6 rounded-xl border border-outline-variant">
<div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mb-3">
<span className="material-symbols-outlined text-secondary">verified</span>
</div>
<h3 className="font-bold text-primary text-base mb-2">Free On-Site Assessment</h3>
<p className="text-sm text-on-surface-variant leading-relaxed">We provide free site visits across Bharatpur. Our technician visits your property, identifies security needs, and suggests clear, affordable camera options without extra fees.</p>
</div>
<div className="bg-white p-6 rounded-xl border border-outline-variant">
<div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mb-3">
<span className="material-symbols-outlined text-secondary">handshake</span>
</div>
<h3 className="font-bold text-primary text-base mb-2">Official Authorized Dealer</h3>
<p className="text-sm text-on-surface-variant leading-relaxed">We sell 100% genuine products with full manufacturer warranty. As official partners of CP Plus, Dahua, and Uniview, we offer original hardware at low rates.</p>
</div>
<div className="bg-white p-6 rounded-xl border border-outline-variant">
<div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mb-3">
<span className="material-symbols-outlined text-secondary">headset_mic</span>
</div>
<h3 className="font-bold text-primary text-base mb-2">Fast Repair &amp; AMC Service</h3>
<p className="text-sm text-on-surface-variant leading-relaxed">Our support team helps you set up mobile viewing, fix camera wiring, or resolve DVR passwords quickly. We ensure your security system stays online without downtime.</p>
</div>
</div>
</section>

{/*  How to Reach Our Store  */}
<section className="py-12 px-margin-mobile md:px-margin-desktop bg-surface max-w-7xl mx-auto">
<div className="border-t border-outline-variant pt-8">
<h2 className="font-headline-md text-headline-md text-primary mb-4">How to Reach Our Store in Bharatpur</h2>
<p className="text-on-surface-variant text-body-md mb-4 leading-relaxed">Our store is located in the central market area of Bharatpur, right inside B. Narayan Gate near SBI Bank. You can reach us easily by bike, car, or e-rickshaw from any part of the city.</p>
<p className="text-on-surface-variant text-body-md leading-relaxed">If you need help finding our shop, simply call us at +91 89479 76889. Our team will guide you step by step. We look forward to meeting you and helping you build a safe home and business.</p>
</div>
</section>

{/*  Map Section  */}
<section className="w-full h-[500px] bg-surface-container-high border-t border-outline-variant relative">
<div className="w-full h-full bg-cover bg-center" data-alt="A highly detailed overhead view map placeholder showing a corporate grid in a clean, modern style. The map features crisp, flat colors predominantly in white and light gray, with subtle deep navy blue accents indicating main roads or zones. A striking, vibrant red map marker pin is placed prominently near the center, creating a sharp contrast. The aesthetic is extremely clean, technical, and professional, reflecting a secure infrastructure layout." data-location="Bharatpur" style={{ 'backgroundImage': 'url(\'gallery-images/contact-map-placeholder.jpg\')' }}></div>
<div className="absolute bottom-stack-md left-stack-md bg-surface-container-lowest p-4 border border-outline-variant shadow-sm rounded-lg flex items-center gap-2">
<span className="material-symbols-outlined text-secondary">my_location</span>
<span className="font-caption text-caption font-medium text-primary">27.2122868, 77.4950562</span>
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
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
    </a>

    {/*  WhatsApp Form Submission Handler  */}
    

    </>
  );
}
