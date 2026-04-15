'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Notifications from '@/components/Notifications';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [promoVisible, setPromoVisible] = useState(true);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      setPromoVisible(scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
   
     
      

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'bg-gradient-to-r from-[#B39977]/65 to-[#684F36]/65 backdrop-blur-[0.3rem] shadow-2xl border-b border-[#342519]/30 ' 
          : 'bg-gradient-to-r from-[#B39977]/85 to-[#684F36]/65 backdrop-blur-lg shadow-lg border-b border-[#342519]/20 '
      }`}>
      <div className="w-full px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-500 ${
          scrolled ? 'py-1' : 'py-2'
        }`}>
          {/* Logo */}
          <div className="flex items-center group">
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r from-[#EDE6D9]/40 to-[#B39977]/40 rounded-full blur-lg transition-all duration-500 ${
                scrolled ? 'scale-100' : 'scale-110 group-hover:scale-125'
              }`}></div>
              <img 
                src="/aaa.png" 
                alt="الخبير للعقارات" 
                className={`relative mx-2 transition-all duration-500 drop-shadow-lg group-hover:rotate-6 ${
                  scrolled ? 'w-14 h-12' : 'w-16 h-12'
                }`}
              />
            </div>
            <span className={` text-white/80   transition-all duration-300 ${
              scrolled ? 'text-lg ml-2' : 'text-xl ml-3'
            }`}>الخبير للعقارات</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex text-lg space-x-1 px-4 py-1.5 bg-white/60 rounded-full shadow-sm">
              <a href="/" className="relative group px-4 py-1 text-[#342519] hover:bg-white hover:text-[#684F36] hover:shadow-md transition-all duration-500 ease-out font-medium rounded-full">
                <span className="relative z-10">الرئيسية</span>
              </a>
              {!isAuthenticated && (
                <>
                  <a href="/usb" className="relative group px-4 py-1 text-[#342519] hover:bg-white hover:text-[#684F36] hover:shadow-md transition-all duration-500 ease-out font-medium rounded-full">
                    <span className="relative z-10">الفلاشة للعقار</span>
                  </a>
                  <a href="/course" className="relative group px-4 py-1 text-[#342519] hover:bg-white hover:text-[#684F36] hover:shadow-md transition-all duration-500 ease-out font-medium rounded-full">
                    <span className="relative z-10">دورة العقارات</span>
                  </a>
                  <a href="/real-estate-course" className="relative group px-4 py-1 text-[#342519] hover:bg-white hover:text-[#684F36] hover:shadow-md transition-all duration-500 ease-out font-medium rounded-full">
                    <span className="relative z-10">🔥 دورة مكثفة</span>
                  </a>
                  <a href="/challenge" className="relative group px-4 py-1 text-[#342519] hover:bg-white hover:text-[#684F36] hover:shadow-md transition-all duration-500 ease-out font-medium rounded-full">
                    <span className="relative z-10">🔥 تحدي FSD</span>
                  </a>
                </>
              )}
              <a href="/immobilier" className="relative group px-4 py-1 text-[#342519] hover:bg-white hover:text-[#684F36] hover:shadow-md transition-all duration-500 ease-out font-medium rounded-full">
                <span className="relative z-10">العقارات للبيع</span>
              </a>
              <a href="/faq" className="relative group px-4 py-1 text-[#342519] hover:bg-white hover:text-[#684F36] hover:shadow-md transition-all duration-500 ease-out font-medium rounded-full">
                <span className="relative z-10">الأسئلة</span>
              </a>
            </div>
            
            {/* Login/Logout Button */}
            <div className="relative group">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <a href="/dashboard" className="relative group px-4 py-1 text-[#342519] hover:bg-white hover:text-[#684F36] hover:shadow-md transition-all duration-500 ease-out font-medium rounded-full">
                    <span className="relative z-10">لوحة التحكم</span>
                  </a>
                  <span className="text-white/80 text-sm">مرحباً، {user?.username}</span>
                  <Notifications />
                  <button
                    onClick={handleLogout}
                    className="relative bg-red-500/80 hover:bg-red-500 text-white font-medium px-5 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg border border-red-400/30"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              ) : (
                <a href="/login" className="relative bg-white/80 hover:bg-white text-[#342519] hover:text-[#684F36] font-medium px-5 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg border border-[#B39977]/30">
                  تسجيل الدخول
                </a>
              )}
            </div>
            
            {/* CTA Button */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              <a href="/pricing" className="relative bg-gradient-to-r from-[#B39977] to-[#684F36] hover:from-[#684F36] hover:to-[#342519] text-white font-bold px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#B39977]/25">
                اطلب نسختك الآن
              </a>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative group p-3 text-[#342519] hover:text-[#684F36] transition-all duration-300 hover:scale-110 rounded-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#EDE6D9]/30 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 text-2xl">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-[#B39977]/50 mt-4 pt-6 bg-gradient-to-b from-[#B39977]/20 to-transparent rounded-b-2xl">
            <div className="flex flex-col space-y-3">
              <a href="/" className="relative group px-4 py-3 text-[#342519]/90 hover:text-[#684F36] transition-all duration-300 hover:translate-x-2 hover:bg-gradient-to-r hover:from-[#EDE6D9]/15 hover:to-transparent rounded-lg font-medium">
                <span className="relative z-10">الرئيسية</span>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#684F36] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              {!isAuthenticated && (
                <>
                  <a href="/usb" className="relative group px-4 py-3 text-[#342519]/90 hover:text-[#684F36] transition-all duration-300 hover:translate-x-2 hover:bg-gradient-to-r hover:from-[#EDE6D9]/15 hover:to-transparent rounded-lg font-medium">
                    <span className="relative z-10">الفلاشة للعقار</span>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#684F36] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                  <a href="/course" className="relative group px-4 py-3 text-[#342519]/90 hover:text-[#684F36] transition-all duration-300 hover:translate-x-2 hover:bg-gradient-to-r hover:from-[#EDE6D9]/15 hover:to-transparent rounded-lg font-medium">
                    <span className="relative z-10">دورة العقارات</span>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#684F36] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                  <a href="/real-estate-course" className="relative group px-4 py-3 text-[#342519]/90 hover:text-[#684F36] transition-all duration-300 hover:translate-x-2 hover:bg-gradient-to-r hover:from-[#EDE6D9]/15 hover:to-transparent rounded-lg font-medium">
                    <span className="relative z-10">🔥 دورة مكثفة</span>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#684F36] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                  <a href="/challenge" className="relative group px-4 py-3 text-[#342519]/90 hover:text-[#684F36] transition-all duration-300 hover:translate-x-2 hover:bg-gradient-to-r hover:from-[#EDE6D9]/15 hover:to-transparent rounded-lg font-medium">
                    <span className="relative z-10">🔥 تحدي FSD</span>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#684F36] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </>
              )}
              <a href="/immobilier" className="relative group px-4 py-3 text-[#342519]/90 hover:text-[#684F36] transition-all duration-300 hover:translate-x-2 hover:bg-gradient-to-r hover:from-[#EDE6D9]/15 hover:to-transparent rounded-lg font-medium">
                <span className="relative z-10">العقارات للبيع</span>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#684F36] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a href="/faq" className="relative group px-4 py-3 text-[#342519]/90 hover:text-[#684F36] transition-all duration-300 hover:translate-x-2 hover:bg-gradient-to-r hover:from-[#EDE6D9]/15 hover:to-transparent rounded-lg font-medium">
                <span className="relative z-10">الأسئلة</span>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#684F36] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              
              {/* Mobile Login/Logout Button */}
              <div className="pt-2">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <a href="/dashboard" className="relative group px-4 py-3 text-[#342519]/90 hover:text-[#684F36] transition-all duration-300 hover:translate-x-2 hover:bg-gradient-to-r hover:from-[#EDE6D9]/15 hover:to-transparent rounded-lg font-medium">
                      <span className="relative z-10">لوحة التحكم</span>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#684F36] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </a>
                    <div className="px-4 py-2 text-[#342519]/80 text-sm">
                      مرحباً، {user?.username}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="relative group w-full bg-red-500/80 hover:bg-red-500 text-white font-medium px-4 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg border border-red-400/30 block text-center"
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                ) : (
                  <a href="/login" className="relative group w-full bg-white/80 hover:bg-white text-[#342519] hover:text-[#684F36] font-medium px-4 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg border border-[#B39977]/30 block text-center">
                    تسجيل الدخول
                  </a>
                )}
              </div>
              
              {/* Mobile CTA Button */}
              <div className="pt-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <a href="#pricing" className="relative w-full bg-gradient-to-r from-[#B39977] to-[#684F36] hover:from-[#684F36] hover:to-[#342519] text-white font-bold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#B39977]/25 block text-center">
                    اطلب نسختك الآن
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}
