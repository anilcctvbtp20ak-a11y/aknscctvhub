'use client';

import React, { useEffect, useState } from 'react';

interface CounterProps {
  target: number;
  suffix?: string;
  label: string;
}

export default function Counter({ target, suffix = '+', label }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // ms
    const stepTime = Math.abs(Math.floor(duration / target));

    const timer = setInterval(() => {
      start += Math.ceil(target / 50);
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime || 20);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow">
      <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy tracking-tight">
        {count}
        <span className="text-secondary">{suffix}</span>
      </div>
      <p className="mt-2 text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}
