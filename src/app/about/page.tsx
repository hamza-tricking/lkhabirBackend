'use client';

import { useEffect } from 'react';
import TargetAudience from '@/app/components/TargetAudience';
import HowItWorks from '@/app/components/HowItWorks';

export default function About() {
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
      <TargetAudience />
      <HowItWorks />
    </div>
  );
}
