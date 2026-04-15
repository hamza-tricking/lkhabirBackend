'use client';

import { useEffect } from 'react';
import Pricing from '@/app/components/Pricing';

export default function PricingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDE6D9] via-[#F5E6D3] to-[#B39977]" dir="rtl">
      <Pricing />
    </div>
  );
}
