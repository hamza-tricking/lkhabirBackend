'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Add Facebook Pixel type declaration
declare global {
  interface Window {
    fbq: (command: string, eventName: string, parameters?: object) => void;
  }
}

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    // Track successful conversion when thank you page loads
    if (typeof window !== 'undefined' && window.fbq) {
      // Track complete registration
      window.fbq('track', 'CompleteRegistration', {
        value: 17000,
        currency: 'DZD',
        content_name: 'Course Registration Complete',
        content_category: 'Education'
      });

      // Track purchase
      window.fbq('track', 'Purchase', {
        value: 17000,
        currency: 'DZD',
        content_ids: ['course_real_estate'],
        content_type: 'education',
        content_name: 'Real Estate Course'
      });

      // Track custom conversion
      window.fbq('trackCustom', 'CourseRegistrationComplete', {
        courseType: 'Real Estate',
        price: 17000,
        currency: 'DZD',
        timestamp: new Date().toISOString()
      });
    }
  }, []);

  return (
    <div className="min-h-screen mt-4 bg-gradient-to-br from-[#EDE6D9] via-[#F5E6D3] to-[#B39977] relative overflow-hidden flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle animated gradient mesh */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#B39977]/8 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-bl from-[#684F36]/6 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-gradient-to-tr from-[#EDE6D9]/10 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        {/* Elegant floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#B39977]/30 rounded-full animate-float-particle"></div>
        <div className="absolute top-32 right-20 w-3 h-3 bg-[#684F36]/25 rounded-full animate-float-particle" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-[#B39977]/20 rounded-full animate-float-particle" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-[#EDE6D9]/30 rounded-full animate-float-particle" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-[#684F36]/20 rounded-full animate-float-particle" style={{animationDelay: '5s'}}></div>
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#B39977]/10 to-transparent rounded-br-full"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#684F36]/10 to-transparent rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#EDE6D9]/15 to-transparent rounded-tr-full"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#B39977]/10 to-transparent rounded-tl-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="mb-8 animate-bounce-in">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow">
            <div className="text-white text-6xl">✓</div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="mb-8 animate-fade-in-up">
          <div className="text-2xl md:text-3xl font-bold text-[#B39977] mb-4">
            🔥 أحسنت القرار! أنت الآن خطوة واحدة فقط من دخول مجال العقارات باحتراف
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#342519] mb-6">
            تم استلام طلبك بنجاح ✅
          </h1>
        </div>
        
        <div className="w-24 h-2 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer mb-8"></div>

        {/* Success Details */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-[#B39977]/20 mb-8 animate-slide-up">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-[#342519] mb-4">خلال 24 ساعة راح يتصل بك مستشار من فريق الخبير للعقارات باش:</h3>
          </div>
          
          {/* Steps with Arrows */}
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex items-center justify-end">
                <div className="flex items-center bg-gradient-to-r from-[#B39977]/15 to-[#684F36]/15 rounded-2xl p-5 flex-1 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="ml-4 w-10 h-10 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center">
                    <div className="text-white text-lg font-bold">1</div>
                  </div>
                  <div className="text-[#342519] font-bold text-lg">يشرحلك البرنامج كامل</div>
                </div>
              </div>
            </div>
            
            {/* Arrow 1 */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="text-[#B39977] text-3xl animate-bounce">⬇️</div>
                <div className="absolute inset-0 text-[#B39977]/30 text-3xl animate-ping"></div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="flex items-center justify-end">
                <div className="flex items-center bg-gradient-to-r from-[#B39977]/20 to-[#684F36]/20 rounded-2xl p-5 flex-1 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="ml-4 w-10 h-10 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center">
                    <div className="text-white text-lg font-bold">2</div>
                  </div>
                  <div className="text-[#342519] font-bold text-lg">يجاوبك على أسئلتك</div>
                </div>
              </div>
            </div>
            
            {/* Arrow 2 */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="text-[#B39977] text-3xl animate-bounce">⬇️</div>
                <div className="absolute inset-0 text-[#B39977]/30 text-3xl animate-ping"></div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative">
              <div className="flex items-center justify-end">
                <div className="flex items-center bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 rounded-2xl p-5 flex-1 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-[#B39977]/50">
                  <div className="ml-4 w-12 h-12 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center animate-pulse">
                    <div className="text-white text-lg font-bold">✓</div>
                  </div>
                  <div className="text-[#342519] font-bold text-lg">ويأكد لك مكانك في الدورة</div>
                </div>
              </div>
              {/* Success indicator */}
              <div className="absolute -right-2 -top-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                <div className="text-white text-sm">🎉</div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-[#B39977]/20 to-[#684F36]/20 rounded-full px-6 py-3">
              <span className="text-lg font-bold text-[#B39977] animate-pulse mr-2">📞</span>
              <span className="text-lg font-bold text-[#342519]">رجاءً لا تفوت المكالمة.</span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-[#B39977]/20 to-[#684F36]/20 rounded-2xl p-6 mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <h3 className="text-xl font-bold text-[#342519] mb-4">معلومات التواصل</h3>
          <div className="space-y-2 text-[#342519]">
            <p className="flex items-center justify-center">
              <span className="ml-2">📞</span>
              <span>+213 555 123 456</span>
            </p>
            <p className="flex items-center justify-center">
              <span className="ml-2">📧</span>
              <span>info@elkhabir-immobilier.dz</span>
            </p>
            <p className="flex items-center justify-center">
              <span className="ml-2">📍</span>
              <span>الجزائر، الجزائر العاصمة</span>
            </p>
          </div>
        </div>

        {/* Manual Navigation */}
        <div className="my-8 animate-slide-up" style={{animationDelay: '0.4s'}}>
          <button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-[#B39977] to-[#684F36] hover:from-[#684F36] hover:to-[#342519] text-white font-bold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#B39977]/25"
          >
            العودة إلى الصفحة الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}
