'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Add Facebook Pixel type declaration
declare global {
  interface Window {
    fbq: (command: string, eventName: string, parameters?: object) => void;
  }
}

export default function RealEstateCourseThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    // Track successful conversion when thank you page loads
    if (typeof window !== 'undefined' && window.fbq) {
      // Track complete registration
      window.fbq('track', 'CompleteRegistration', {
        content_name: 'Real Estate Intensive Course - 6900 DZD',
        content_category: 'Education',
        content_ids: ['real_estate_course_intensive_6900'],
        content_type: 'course',
        value: 6900,
        currency: 'DZD'
      });

      // Track purchase
      window.fbq('track', 'Purchase', {
        content_name: 'Real Estate Intensive Course - 6900 DZD',
        content_category: 'Education',
        content_ids: ['real_estate_course_intensive_6900'],
        content_type: 'course',
        value: 6900,
        currency: 'DZD'
      });

      // Track custom conversion
      window.fbq('trackCustom', 'RealEstateCourseOrderComplete', {
        productType: 'Real Estate Intensive Course',
        content_ids: ['real_estate_course_intensive_6900'],
        content_type: 'course',
        price: 6900,
        currency: 'DZD',
        timestamp: new Date().toISOString()
      });
    }
  }, []);

  return (
    <div className="min-h-screen mt-4 bg-gradient-to-br from-[#F5E6D9] to-[#EDE6D9] relative overflow-hidden flex items-center justify-center">
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
            <div className="text-white text-6xl">🎓</div>
          </div>
        </div>

        {/* Thank You Message */}
        <h1 className="text-4xl md:text-6xl font-black text-[#342519] mb-6 animate-fade-in-up">
          شكراً للتسجيل في الدورة المكثفة!
        </h1>
        
        <div className="w-24 h-2 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer mb-8"></div>

        {/* Success Details */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-[#B39977]/20 mb-8 animate-slide-up">
          <div className="space-y-4 text-right">
            <div className="flex items-center justify-end text-[#342519] font-medium">
              <span className="ml-3 text-green-500 text-xl">✓</span>
              <span>تم استلام طلب الدورة المكثفة بنجاح</span>
            </div>
            <div className="flex items-center justify-end text-[#342519] font-medium">
              <span className="ml-3 text-green-500 text-xl">✓</span>
              <span>سنتواصل معك خلال 24 ساعة للتأكيد</span>
            </div>
            <div className="flex items-center justify-end text-[#342519] font-medium">
              <span className="ml-3 text-green-500 text-xl">🔥</span>
              <span>فريق الخبير للعقارات رايح يتواصل معاك و يفهمك فالدورة و فالسعر</span>
            </div>
          </div>
        </div>

        {/* Course Features */}
        <div className="bg-gradient-to-r from-[#B39977]/20 to-[#684F36]/20 rounded-2xl p-6 mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <h3 className="text-xl font-bold text-[#342519] mb-4">ما ستحصل عليه:</h3>
          <div className="space-y-2 text-[#342519]">
            <p className="flex items-center justify-center">
              <span className="ml-2">📚</span>
              <span>فهم سوق العقارات في الجزائر</span>
            </p>
            <p className="flex items-center justify-center">
              <span className="ml-2">🏠</span>
              <span>كيف تجيب أول عقار</span>
            </p>
            <p className="flex items-center justify-center">
              <span className="ml-2">👥</span>
              <span>كيف تجيب أول زبون وتغلق صفقة</span>
            </p>
            <p className="flex items-center justify-center">
              <span className="ml-2">🎯</span>
              <span>تطبيق عملي في السوق</span>
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-[#684F36]/20 to-[#B39977]/20 rounded-2xl p-6 mb-8 animate-slide-up" style={{animationDelay: '0.3s'}}>
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
              <span>مكان الدورة سيتم تحديده لاحقاً</span>
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
