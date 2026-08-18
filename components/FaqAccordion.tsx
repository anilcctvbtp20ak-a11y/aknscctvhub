'use client';

import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What CCTV camera brands do you deal with in Bharatpur?",
    answer: "We are authorized dealers and service providers for top brands including CP Plus, Hikvision, Dahua, Honeywell, and Imou. All our products come with original manufacturer warranty and genuine support."
  },
  {
    question: "Do you offer Annual Maintenance Contracts (AMC) for existing CCTV installations?",
    answer: "Yes, we provide comprehensive and non-comprehensive AMC packages for commercial buildings, retail shops, schools, hospitals, and residences across Bharatpur and neighboring districts."
  },
  {
    question: "How long does a standard home or shop CCTV installation take?",
    answer: "A standard 4 to 8 camera system installation usually takes 1 full day. Our certified engineers handle wiring, mounting, DVR/NVR configuration, and mobile app setup for remote viewing."
  },
  {
    question: "Can I view my CCTV cameras on my smartphone remotely?",
    answer: "Absolutely! Every system installed by Er. Rajat Garg & team includes remote live viewing setup on Android & iOS devices via official mobile apps."
  },
  {
    question: "Where is your digital shop located in Bharatpur?",
    answer: "Our shop is located near New Mandi, Bharatpur, Rajasthan (Pin code 321001). You can also reach out to us at +91 89479 76889 for doorstep consultation."
  }
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`border rounded-2xl transition-all duration-200 overflow-hidden bg-white ${
              isOpen ? 'border-secondary shadow-md' : 'border-gray-200'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-navy text-base md:text-lg focus:outline-none"
              aria-expanded={isOpen}
            >
              <span>{faq.question}</span>
              <span
                className={`material-symbols-outlined shrink-0 text-secondary transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`}
              >
                expand_more
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-5 text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-100 pt-3">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
