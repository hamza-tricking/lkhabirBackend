'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import CustomFolderAnimation from "./CustomFolderAnimation";
import CustomFolderAnimation2 from "./CustomFolderAnimation2";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  const features = [
    "دورة اونلاين احترافية في مجال العقارات",
    "فرص عمل في المنصة تاعنا", 
    "عقارات بكل الوثائق القانونية",
    "تسويق احترافي للعقارات"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible, features.length]);

  return (
    <section id="home" className={`relative min-h-screen py-16 md:py-32 px-4 overflow-hidden transition-all duration-1000 ease-in-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`} style={{
      backgroundImage: 'url(https://res.cloudinary.com/dicpjm1dz/image/upload/v1769195373/alberto-castillo-q-mx4mSkK9zeo-unsplash_suw33u.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
      {/* Enhanced Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/70 via-orange-800/60 to-yellow-700/50"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4">
        {/* Animated Badge */}
        <div className="mb-6 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg animate-pulse">
            <span className="text-lg">🇩🇿</span>
            أول منصة جزائرية متخصصة
          </span>
        </div>

        {/* Main Title with enhanced animation */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight animate-fade-in-up">
          <span className="block text-white drop-shadow-2xl animate-glow-pulse">
            أول منصة جزائرية
          </span>
          <span className="block text-4xl md:text-6xl lg:text-7xl mt-2 text-yellow-300 drop-shadow-xl transform hover:scale-105 transition-transform duration-300">
            توفرلك
          </span>
        </h1>
        
        {/* Rotating Feature Display */}
        <div className="mb-12 h-20 flex items-center justify-center animate-fade-in-up animation-delay-200">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl px-8 py-4 shadow-2xl border border-white/30">
            <div className="flex items-center gap-4 text-2xl md:text-3xl text-white font-bold">
              <span className="text-amber-400 text-4xl animate-bounce">✅</span>
              <span className="transition-all duration-500 ease-in-out">
                {features[currentFeatureIndex]}
              </span>
            </div>
          </div>
        </div>

        {/* Static Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl w-full animate-fade-in-up animation-delay-400">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-2xl ${
                index === currentFeatureIndex ? 'ring-4 ring-yellow-400/50 bg-white/25' : ''
              }`}
            >
              <span className={`text-3xl transition-all duration-300 ${
                index === currentFeatureIndex ? 'text-yellow-300 scale-125' : 'text-amber-400'
              }`}>
                ✅
              </span>
              <span className={`text-xl text-white font-semibold transition-all duration-300 ${
                index === currentFeatureIndex ? 'text-yellow-100 text-2xl' : ''
              }`}>
                {feature}
              </span>
            </div>
          ))}
        </div>
        
        {/* Enhanced Explanation Text */}
        <div className="max-w-4xl mx-auto animate-fade-in-up animation-delay-600">
          <p className="text-2xl md:text-3xl text-white/95 leading-relaxed bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md rounded-3xl px-10 py-8 shadow-2xl border border-white/30 font-bold">
            <span className="text-yellow-200">تعلم القانون العقاري،</span>
            <br className="hidden md:block" />
            <span className="text-orange-300">التسويق العقاري،</span>
            <br className="hidden md:block" />
            <span className="text-amber-300">وادخل مجال العقارات بطريقة احترافية</span>
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-800">
          <button 
            onClick={() => window.location.href = '/course'}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:from-yellow-500 hover:to-orange-600 cursor-pointer"
          >
            ابدأ الآن
          </button>
          <button 
            onClick={() => {
              const servicesSection = document.getElementById('services');
              if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-8 py-4 bg-white/20 backdrop-blur-md text-white font-bold rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/30 hover:bg-white/30 cursor-pointer"
          >
            اعرف المزيد
          </button>
        </div>
      </div>
    </section>
  );
}
