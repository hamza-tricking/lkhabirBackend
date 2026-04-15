'use client';

import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import TargetAudience from './components/TargetAudience';
import HowItWorks from './components/HowItWorks';
import ContentCards from './components/ContentCards';
import Results from './components/Results';
import RamadanOffer from './components/RamadanOffer';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import LoadingScreen from './components/LoadingScreen';
import Footer from './components/Footer';

export default function Home() {
 

  // Apply scroll animations
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
<div className="min-h-screen " dir="rtl">
   <LoadingScreen />
    <Hero />
    <ServicesSection />
    <AboutSection />   
    </div>
  );
}