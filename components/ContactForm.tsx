'use client';

import React, { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('New CCTV Installation');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const text = `Hello Anil Kumar & Sons,\n\nI have submitted a new service request from your website:\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Requirement:* ${service}\n*Details:* ${message || 'N/A'}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/918947976889?text=${encoded}`, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 space-y-5">
      <div>
        <label htmlFor="name" className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
          Your Full Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Rajesh Kumar"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy text-sm transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
            Mobile Number *
          </label>
          <input
            type="tel"
            id="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy text-sm transition-all"
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
            Service Required
          </label>
          <select
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy text-sm bg-white transition-all"
          >
            <option>New CCTV Installation</option>
            <option>DVR / NVR Repair</option>
            <option>Annual Maintenance Contract (AMC)</option>
            <option>WiFi &amp; IT Networking</option>
            <option>Buy Security Equipment</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
          Project Details / Address
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your location, number of cameras required, or repair issues..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy text-sm transition-all resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-navy hover:bg-navy/90 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-base flex items-center justify-center gap-2 active:scale-98"
      >
        <span className="material-symbols-outlined text-emerald-400">send</span>
        <span>Submit Request via WhatsApp</span>
      </button>

      <p className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-1">
        <span className="material-symbols-outlined text-sm text-emerald-600">lock</span>
        <span>Directly connects with Er. Rajat Garg. Instant reply expected within minutes.</span>
      </p>
    </form>
  );
}
