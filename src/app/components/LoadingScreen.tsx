'use client';

import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [fadeOut, setFadeOut] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);

  useEffect(() => {
    // Start fade out and zoom out after 1.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      setZoomOut(true);
    }, 1500);

    // Remove component after 2.5 seconds total
    const removeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen z-[999999] flex items-center justify-center bg-gradient-to-br from-[#f3f3f3] to-[#D4AF37] transition-opacity duration-1000 ease-in-out ${
      fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      <div className="relative -mt-8">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#684F36]/20 to-[#B39977]/20 rounded-full blur-3xl scale-150 animate-pulse"></div>
        
        {/* Logo container with zoom animation - Pure CSS */}
        <div className={`relative ${zoomOut ? 'animate-zoom-out' : 'animate-zoom-in'}`}>
          {/* Perfect circular container */}
          <div className="w-[280px] h-[280px] flex items-center justify-center bg-gradient-to-br from-white/50 to-white/20 backdrop-blur-2xl rounded-full shadow-2xl border-2 border-white/30 relative overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#B39977]/30 via-[#684F36]/30 to-[#B39977]/30 rounded-full animate-spin-slow"></div>
            
            {/* Inner glow ring */}
            <div className="absolute inset-2 bg-gradient-to-br from-white/40 to-transparent rounded-full backdrop-blur-sm"></div>
            
            <div className="relative text-center z-20">
              {/* Logo icon using CSS */}
              <div className="w-28 h-28 mx-auto mb-3 bg-gradient-to-br from-[#B39977] via-[#684F36] to-[#342519] rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow relative overflow-hidden">
                {/* Shimmer effect on logo */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-shimmer-slow"></div>
                <div className="text-white text-5xl font-black relative z-10 drop-shadow-lg">مرحبا</div>
              </div>
              
              {/* Company name */}
              <div className="text-3xl font-black text-[#342519] mb-1 drop-shadow-xl">الخبير</div>
              <div className="text-lg font-bold text-[#684F36] drop-shadow-lg">للعقارات</div>
              
              {/* Decorative line */}
              <div className="w-16 h-2 bg-gradient-to-r from-[#B39977] via-[#684F36] to-[#B39977] mx-auto mt-3 rounded-full animate-shimmer shadow-xl"></div>
            </div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2">
            <span className="text-[#684F36] font-semibold text-lg">الخبير للعقارات</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-[#684F36] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
              <div className="w-2 h-2 bg-[#684F36] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
              <div className="w-2 h-2 bg-[#684F36] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
