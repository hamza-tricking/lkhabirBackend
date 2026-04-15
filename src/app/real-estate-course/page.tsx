'use client';

import { useState, useEffect, useRef } from 'react';
import { Check, Clock, Users, Target, Star, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';

// Add Facebook Pixel type declaration
declare global {
  interface Window {
    fbq: (command: string, eventName: string, parameters?: object) => void;
  }
}

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function RealEstateCourse() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    willaya: '',
    city: '',
    personType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Refs for GSAP animations
  const heroRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const cardsRef = useRef([]);
  const sectionsRef = useRef([]);
  const timelineRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  const [showBubble, setShowBubble] = useState(false);
  const [formRef, setFormRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBubble(true);
        // Track when user scrolls to form area
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('trackCustom', 'ScrollToForm');
        }
      } else {
        setShowBubble(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById('registration-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Track when user clicks to scroll to form
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('trackCustom', 'ClickScrollToForm');
      }
    }
  };

  const validatePhone = (phone: string) => {
    // Remove any non-digit characters
    const phoneDigits = phone.replace(/\D/g, '');
    
    // Check if it's a valid Algerian phone number (starts with 0 and has 10 digits, or starts with 213 and has 12 digits)
    const isValid = (phoneDigits.startsWith('0') && phoneDigits.length === 10) || 
                    (phoneDigits.startsWith('213') && phoneDigits.length === 12) ||
                    (phoneDigits.length >= 9 && phoneDigits.length <= 10); // More flexible validation
    
    return isValid;
  };

  const [phoneError, setPhoneError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({...formData, phone: value});
    
    // Clear error when user starts typing
    if (value) {
      setPhoneError('');
    }
    
    // Track form field interactions
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'FormFieldInteraction', {
        fieldName: 'phone',
        fieldType: 'input'
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Track form field interactions
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'FormFieldInteraction', {
        fieldName: name,
        fieldType: e.target.tagName.toLowerCase()
      });
    }
  };

  useEffect(() => {
    // GSAP Timeline for hero section animations
    const tl = gsap.timeline();
    
    // Hero badge animation
    tl.from('.hero-badge', {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out'
    })
    .from('.hero-title', {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-cards', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-message', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.3')
    .from('.hero-box', {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-button', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5');

    // Parallax floating elements
    gsap.to('.floating-orb-1', {
      y: -100,
      x: 50,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      }
    });

    gsap.to('.floating-orb-2', {
      y: -150,
      x: -80,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 2
      }
    });

    gsap.to('.floating-orb-3', {
      y: -120,
      x: -60,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.8
      }
    });

    // Small dots with rotation
    gsap.to('.floating-dot-1', {
      y: -200,
      rotation: 360,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 2.5
      }
    });

    gsap.to('.floating-dot-2', {
      y: -180,
      rotation: -270,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 2.2
      }
    });

    gsap.to('.floating-dot-3', {
      y: -190,
      rotation: 300,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 2.3
      }
    });

    // Grid pattern parallax
    gsap.to('.grid-pattern', {
      y: -50,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Hero elements parallax
    gsap.to('.hero-badge', {
      y: -30,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      }
    });

    gsap.to('.hero-title', {
      y: -40,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.3
      }
    });

    gsap.to('.hero-cards', {
      y: -50,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.4
      }
    });

    gsap.to('.hero-message', {
      y: -60,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      }
    });

    gsap.to('.hero-box', {
      y: -80,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.6
      }
    });

    gsap.to('.hero-button', {
      y: -100,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.7
      }
    });

    // Section animations
    gsap.utils.toArray('.section-animate').forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Card hover animations
    gsap.utils.toArray('.course-card').forEach((card: any) => {
      const cardTl = gsap.timeline({ paused: true });
      
      cardTl.to(card, {
        scale: 1.05,
        y: -10,
        duration: 0.3,
        ease: 'power2.out'
      })
      .to(card.querySelector('.card-number'), {
        rotation: 12,
        duration: 0.3,
        ease: 'power2.out'
      }, '-=0.3')
      .to(card.querySelector('.card-bg-circle'), {
        scale: 1.5,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.3');

      card.addEventListener('mouseenter', () => cardTl.play());
      card.addEventListener('mouseleave', () => cardTl.reverse());
    });

    // Continuous floating animation
    gsap.to('.hero-badge', {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    // Fire emoji bounce
    gsap.to('.fire-emoji', {
      scale: 1.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    // Pulse animations
    gsap.to('.pulse-dot', {
      scale: 1.5,
      opacity: 0,
      duration: 2,
      repeat: -1,
      ease: 'power2.out'
    });

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf('*');
    };
  }, []);

  const algerianWillayas = [
  'أدرار', 'الشلف', 'أغواط', 'أم البواقي', 'باتنة', 'بجاية', 'بسكرة', 'بشار', 'البليدة', 'البويرة',
  'تمنراست', 'تبسة', 'تلمسان', 'تيارت', 'تيزي وزو', 'الجزائر العاصمة', 'الجلفة', 'جيجل', 'سطيف', 'سعيدة',
  'سكيكدة', 'سيدي بلعباس', 'عنابة', 'قالمة', 'قسنطينة', 'المدية', 'ميلة', 'المسيلة', 'معسكر', 'ورقلة',
  'وهران', 'البيض', 'إليزي', 'برج بوعريريج', 'بومرداس', 'الطارف', 'تندوف', 'تيسمسيلت', 'الوادي', 'خنشلة',
  'سوق أهراس', 'تيبازة', 'عين الدفلى', 'النعامة', 'عين تموشنت', 'غرداية', 'غليزان', 'تيميمون', 'برج باجي مختار',
  'المنيعة', 'عين صالح', 'عين قزام', 'القرارم قوق', 'الدراعية', 'الغيشة', 'حمام الأرhna', 'المغير', 'تمالست',
  'أولاد جلال', 'بئر بوحوش', 'بوسعادة', 'الرويبة', 'ذراع بن خدة', 'سيدي المختار', 'سيدي عيسى', 'سيدي علي',
  'سيدي رحال', 'الشطية', 'صالح باي', 'الطالب العربي'
];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number
    if (!validatePhone(formData.phone)) {
      setPhoneError('يرجى إدخال رقم هاتف صحيح');
      return;
    }
    
    // Track form submission attempt
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Real Estate Intensive Course - 6900 DZD',
        content_category: 'Education',
        content_ids: ['real_estate_course_intensive_6900'],
        content_type: 'course',
        value: 6900,
        currency: 'DZD'
      });
    }
    
    // Create order in backend
    try {
      console.log('Form data being submitted:', formData);
      console.log('Person type value:', formData.personType);
      
      const orderData = {
        type: 'دورة مكثفة',
        price: 6900,
        phoneNumber: formData.phone,
        fullName: formData.name,
        personType: formData.personType,
        willaya: formData.willaya,
        city: formData.city,
        time: {
          day: new Date().toISOString().split('T')[0],
          hour: new Date().toTimeString().split(' ')[0].substring(0, 5)
        },
        description: `${formData.name} - ${formData.willaya}, ${formData.city}`
      };

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dmtart.pro/lkhabir/api';
      const response = await fetch(`${API_BASE_URL}/public-orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        console.log('Order created successfully');
      } else {
        console.log('Order creation failed, but continuing with Google Sheets');
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
    
    // Redirect to thank you page
    router.push('/thank-you-real-estate-course');
    
    // Send data to Google Sheets in background
    try {
      const response = await fetch('/api/google-sheets-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          product: 'دورة مكثفة',
          price: 6900,
          willaya: formData.willaya,
          personType: formData.personType
        }),
      });
      
      if (response.ok) {
        console.log('Course registration submitted successfully to Google Sheets');
        
        // Track successful form submission
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Purchase', {
            content_name: 'Real Estate Intensive Course - 6900 DZD',
            content_category: 'Education',
            content_ids: ['real_estate_course_intensive_6900'],
            content_type: 'course',
            willaya: formData.willaya,
            value: 6900,
            currency: 'DZD'
          });
          
          // Track purchase/initiate checkout
          window.fbq('track', 'InitiateCheckout', {
            content_name: 'Real Estate Intensive Course - 6900 DZD',
            content_category: 'Education',
            content_ids: ['real_estate_course_intensive_6900'],
            content_type: 'course',
            value: 6900,
            currency: 'DZD'
          });
        }
      } else {
        console.error('Failed to submit course registration');
        
        // Track form submission error
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('trackCustom', 'RealEstateCourseFormError', {
            error: 'Failed to submit form'
          });
        }
      }
    } catch (error) {
      console.error('Error submitting course registration:', error);
      
      // Track form submission exception
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('trackCustom', 'RealEstateCourseFormException', {
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Floating Order Bubble - All Screens */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        showBubble ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}>
        <button
          onClick={scrollToForm}
          className="bg-yellow-800 text-white px-6 py-3 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center space-x-2 animate-pulse-glow"
        >
          <span className="font-bold">احجز الآن</span>
          <span className="text-xl">📝</span>
        </button>
      </div>

      {/* Top Pricing Announcement Banner */}
      <div className="relative bg-gradient-to-r from-purple-800 via-pink-800 to-red-800 text-white py-6 px-4 overflow-hidden animate-slide-down">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-600/30 to-orange-600/30 animate-shimmer"></div>
          <div className="absolute top-2 left-4 w-6 h-6 bg-yellow-500 rounded-full animate-bounce shadow-lg shadow-yellow-500/50" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-2 right-4 w-6 h-6 bg-orange-500 rounded-full animate-bounce shadow-lg shadow-orange-500/50" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute bottom-2 left-8 w-4 h-4 bg-pink-500 rounded-full animate-bounce shadow-lg shadow-pink-500/50" style={{ animationDelay: '0.6s' }}></div>
          <div className="absolute bottom-2 right-8 w-4 h-4 bg-yellow-400 rounded-full animate-bounce shadow-lg shadow-yellow-400/50" style={{ animationDelay: '0.9s' }}></div>
          
          {/* Floating sparkles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center animate-fade-in-up">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
              {/* Main call-to-action text */}
              <div className="flex items-center gap-3 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <span className="text-3xl lg:text-5xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-3 rounded-xl shadow-2xl shadow-yellow-400/30 border-2 border-yellow-400/50 animate-glow">
                  احجز مكانك الان الآن
                </span>
              </div>
              
              {/* Urgency message */}
              <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-full animate-bounce-in shadow-2xl shadow-yellow-400/40 border-2 border-yellow-300" style={{ animationDelay: '0.5s' }}>
                <span className="text-2xl lg:text-3xl font-black animate-pulse">⏰</span>
                <span className="text-xl lg:text-2xl font-black">سوف ينتهي التخفيض قريبا جدا</span>
              </div>
            </div>
            
            {/* Additional urgency indicators */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:scale-105 transition-transform border-2 border-gray-700/50">
                <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping shadow-lg shadow-yellow-400/50"></div>
                <span className="font-bold text-lg text-gray-900">محدود</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:scale-105 transition-transform border-2 border-gray-700/50">
                <div className="w-4 h-4 bg-orange-400 rounded-full animate-ping shadow-lg shadow-orange-400/50" style={{ animationDelay: '1s' }}></div>
                <span className="font-bold text-lg text-gray-900">العرض ينتهي قريباً</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:scale-105 transition-transform border-2 border-gray-700/50">
                <div className="w-4 h-4 bg-pink-400 rounded-full animate-ping shadow-lg shadow-pink-400/50" style={{ animationDelay: '2s' }}></div>
                <span className="font-bold text-lg text-gray-900">لا تفوت الفرصة</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fade-in-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes scale-in {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(250, 204, 21, 0.5), 0 0 40px rgba(250, 204, 21, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(250, 204, 21, 0.8), 0 0 60px rgba(250, 204, 21, 0.5);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }
        
        .animate-scale-in {
          animation: scale-in 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden min-h-screen flex items-center">
        {/* Multi-layer Parallax Background */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-brand-secondary/20 to-brand-tertiary/30"></div>
          
          {/* Floating elements with GSAP parallax */}
          <div className="floating-orb-1 absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-brand-primary/40 to-brand-secondary/40 rounded-full blur-xl"></div>
          <div className="floating-orb-2 absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-brand-secondary/40 to-brand-tertiary/40 rounded-full blur-xl"></div>
          <div className="floating-orb-3 absolute bottom-20 left-1/3 w-36 h-36 bg-gradient-to-r from-brand-tertiary/40 to-brand-primary/40 rounded-full blur-xl"></div>
          
          {/* Small floating dots with rotation */}
          <div className="floating-dot-1 absolute top-32 left-1/4 w-4 h-4 bg-brand-primary/60 rounded-full"></div>
          <div className="floating-dot-2 absolute top-60 right-1/3 w-6 h-6 bg-brand-secondary/60 rounded-full"></div>
          <div className="floating-dot-3 absolute bottom-40 left-20 w-5 h-5 bg-brand-tertiary/60 rounded-full"></div>
          
          {/* Grid pattern */}
          <div 
            className="grid-pattern absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, var(--brand-primary) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          ></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Hero title and subtitle */}
            <h1 className="hero-title text-5xl md:text-7xl font-bold brand-tertiary mb-6 leading-tight">
              حاب تدخل لعالم العقار وتبدأ تدخل دراهم صح.. حتى وإذا كنت راح تبدأ من الزيرو؟
            </h1>
            
            <p className="hero-message text-2xl brand-secondary mb-8 max-w-4xl mx-auto">
              دورة أونلاين تطبيقية وسهلة، تعاونك باش تفهم العقار من الساس، وتكتشف كيفاش هاد المجال يقدر يكون فرصة حقيقية باش تبني دخل محترم ومستقبل قوي.
            </p>
            
            {/* Video section */}
            <div className="hero-box bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl mb-8">
              <p className="text-xl brand-tertiary mb-6 font-semibold">
                شوف هاد الفيديو درك، لأنو واش راح تفهم في دقائق، قادر يغير نظرتك تماماً لعالم العقار والفرص الكبيرة اللي فيه.
              </p>
              
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <video 
                  className="w-full rounded-2xl"
                  controls
                  preload="metadata"
                >
                  <source src="https://res.cloudinary.com/dgywxqq50/video/upload/v1774899019/IMG_0149_1_ghegn2.mp4" type="video/mp4" />
                  متصفحك لا يدعم تشغيل الفيديو.
                </video>
              </div>
            </div>
            
            {/* Promotional Section */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-tertiary p-1 rounded-3xl shadow-2xl">
                <div className="bg-white p-10 rounded-3xl">
                  <div className="text-center space-y-6">
                    <h3 className="text-3xl md:text-4xl font-bold brand-tertiary leading-relaxed">
                      ابدأ رحلتك الاحترافية في عالم العقار اليوم! 🏗️
                    </h3>
                    
                    <div className="space-y-4">
                      <p className="text-xl md:text-2xl brand-secondary font-semibold">
                        الصيف راهو قريب ☀️ وهادي هي الفرصة الحقيقية باش تغتنمها
                      </p>
                      
                      <p className="text-xl md:text-2xl brand-primary font-semibold">
                        ودير أول صفقة عقارية ناجحة ليك. 💸
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 p-6 rounded-2xl border-2 border-brand-primary/20">
                      <p className="text-lg md:text-xl brand-tertiary font-medium">
                        سجل الآن في الدورة التطبيقية (100% أونلاين) 🖥️ واحجز مكانك لنتواصل معك ونشرح لك كل التفاصيل. 📈🤝
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                      <div className="flex items-center gap-2 bg-brand-primary/20 px-4 py-2 rounded-full">
                        <span className="text-2xl">🎯</span>
                        <span className="font-bold brand-primary">تطبيق عملي</span>
                      </div>
                      <div className="flex items-center gap-2 bg-brand-secondary/20 px-4 py-2 rounded-full">
                        <span className="text-2xl">💰</span>
                        <span className="font-bold brand-secondary">دخل مضمون</span>
                      </div>
                      <div className="flex items-center gap-2 bg-brand-tertiary/20 px-4 py-2 rounded-full">
                        <span className="text-2xl">🚀</span>
                        <span className="font-bold brand-tertiary">بداية سريعة</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Registration Form - separate section directly after video */}
            <div id="registration-form" className="mt-12 px-4">
              <h2 className="text-3xl font-bold text-center brand-tertiary mb-8">
                🔘 احجز مكانك الآن
              </h2>
                  <div className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-tertiary p-1 rounded-3xl shadow-2xl mb-8">
                <div className="bg-white p-8 rounded-3xl">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <span className="text-4xl">🏠</span>
                      <h2 className="text-3xl font-bold brand-tertiary">
                        فريق الخبير للعقارات رايح يتواصل معاك و يفهمك فالدورة و فالسعر
                      </h2>
                      <span className="text-4xl">📞</span>
                    </div>
                    <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 p-4 rounded-2xl border-2 border-brand-primary/20">
                      <p className="text-lg brand-secondary font-medium">
                        فريق متخصص سيقوم بالاتصال بك لشرح تفاصيل الدورة والإجابة على جميع استفساراتك
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {showSuccess && (
                <div className="bg-brand-primary/20 border-2 border-brand-primary text-brand-tertiary p-6 rounded-2xl mb-8 text-center animate-scale-in">
                  <p className="text-xl font-bold">تم استلام طلبك بنجاح!</p>
                  <p>سنتواصل معك قريباً لتأكيد حجزك.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl shadow-lg max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block brand-tertiary font-bold mb-3 text-lg">الاسم الكامل</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 text-lg border border-brand-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary brand-tertiary"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  
                  <div>
                    <label className="block brand-tertiary font-bold mb-3 text-lg">رقم الهاتف</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      required
                      className={`w-full px-6 py-4 text-lg rounded-lg border-2 focus:outline-none transition-colors brand-tertiary ${
                        phoneError 
                          ? 'border-red-500 focus:border-red-600' 
                          : 'border-brand-secondary/30 focus:border-brand-primary'
                      }`}
                      placeholder="أدخل رقم هاتفك"
                    />
                    {phoneError && (
                      <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block brand-tertiary font-bold mb-3 text-lg">هل أنت؟</label>
                    <select
                      value={formData.personType}
                      onChange={(e) => setFormData({...formData, personType: e.target.value})}
                      className="w-full px-6 py-4 text-lg rounded-lg border-2 border-brand-secondary/30 focus:border-brand-primary focus:outline-none transition-colors brand-tertiary"
                    >
                      <option value="">اختر النوع</option>
                      <option value="وسيط عقاري">وسيط عقاري</option>
                      <option value="مبتدئ">مبتدئ</option>
                      <option value="موظف">موظف</option>
                      <option value="امرأة رائدة">امرأة رائدة</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block brand-tertiary font-bold mb-3 text-lg">الولاية *</label>
                    <select
                      required
                      value={formData.willaya}
                      onChange={(e) => setFormData({...formData, willaya: e.target.value})}
                      className="w-full px-6 py-4 text-lg rounded-lg border-2 border-brand-secondary/30 focus:border-brand-primary focus:outline-none transition-colors brand-tertiary"
                    >
                      <option value="">اختر الولاية</option>
                      {algerianWillayas.map((willaya) => (
                        <option key={willaya} value={willaya}>{willaya}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block brand-tertiary font-bold mb-3 text-lg">البلدية *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 text-lg border border-brand-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary brand-tertiary"
                      placeholder="أدخل بلديتك"
                    />
                  </div>
                </div>
                
                <div className="mt-10">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-brand text-white px-8 py-6 rounded-full font-bold text-xl hover:from-brand-secondary hover:to-brand-tertiary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'جاري الحجز...' : 'احجز مكانك الآن'}
                  </button>
                </div>
                
               
              </form>
            </div>
            
      
          </div>
        </div>
        

      </section>

        {/* Section 2: Building Curiosity */}
      <section className="section-animate py-16 bg-white relative overflow-hidden">
        <div className="absolute top-10 left-10 w-16 h-16 bg-brand-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-brand-secondary/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold brand-tertiary mb-8">
              بالاك راك قريب لأول صفقة ناجحة كتر ملي راك تتخيل!
            </h2>
            
            <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 p-8 rounded-3xl shadow-xl">
              <p className="text-xl md:text-2xl brand-tertiary mb-6 leading-relaxed">
                بزاف ناس يحسابو بلي عالم العقار بعيد عليهم، معقد، ولازمو سنين باش تشوف النتائج.
              </p>
              
              <p className="text-xl md:text-2xl brand-secondary mb-6 font-semibold">
                بصح الحقيقة حاجة وحدة خرى.
              </p>
              
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-brand-primary/30">
                <p className="text-lg brand-tertiary mb-4">
                  أنا شخصياً، قدرت ندخل كتر من 20 مليون في أول صفقة درتها.
                </p>
                <p className="text-lg brand-tertiary">
                  وكاين متدربين قراو عندي، وقدروا يديروا كتر من 30 مليون في أقل من شهر ونص.
                </p>
              </div>
              
              <p className="text-xl md:text-2xl brand-primary mt-6 font-bold">
                هاد الناس ماشي "محظوظين" كتر منك.. بصح دخلوا للمجال بفهم صحيح، وبخطوات مدروسة ومضمونة.
              </p>
            </div>
          </div>
        </div>
      </section>

        {/* Section 3: Who is this for */}
      <section className="section-animate py-16 bg-brand-primary/10 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-20 h-20 bg-brand-secondary/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-brand-tertiary/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold brand-tertiary mb-12 text-center">
              هاد الدورة ليك إذا كنت واحد من هادو:
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-brand-primary/30 hover:scale-105 transition-all duration-300 hover:shadow-brand-primary/50">
                <div className="text-3xl mb-4 text-center">👔</div>
                <h3 className="text-xl font-bold brand-primary mb-2 text-center">موظف</h3>
                <p className="brand-tertiary text-center">حاب تفتح باب تاع دخل إضافي يريحك.</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-brand-secondary/30 hover:scale-105 transition-all duration-300 hover:shadow-brand-secondary/50">
                <div className="text-3xl mb-4 text-center">🎓</div>
                <h3 className="text-xl font-bold brand-secondary mb-2 text-center">طالب</h3>
                <p className="brand-tertiary text-center">حاب تبدأ بداية قوية في مجال عندو مستقبل كبير.</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-brand-tertiary/30 hover:scale-105 transition-all duration-300 hover:shadow-brand-tertiary/50">
                <div className="text-3xl mb-4 text-center">💼</div>
                <h3 className="text-xl font-bold brand-tertiary mb-2 text-center">امرأة طموحة</h3>
                <p className="brand-tertiary text-center">حابة تبني استقلالها المالي وتكون سيدة أعمال.</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-brand-primary/30 hover:scale-105 transition-all duration-300 hover:shadow-brand-primary/50">
                <div className="text-3xl mb-4 text-center">💻</div>
                <h3 className="text-xl font-bold brand-primary mb-2 text-center">فريلانسر</h3>
                <p className="brand-tertiary text-center">تحوس على فرصة جديدة وقوية.</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-brand-secondary/30 hover:scale-105 transition-all duration-300 hover:shadow-brand-secondary/50 md:col-span-2 lg:col-span-2">
                <div className="text-3xl mb-4 text-center">🌟</div>
                <h3 className="text-xl font-bold brand-secondary mb-2 text-center">أي واحد</h3>
                <p className="brand-tertiary text-center text-lg">حاب يدخل للعقار وماعرفش منين يبدأ.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Section 4: The Real Problem */}
      <section className="section-animate py-16 bg-white relative overflow-hidden">
        <div className="absolute top-10 left-10 w-16 h-16 bg-brand-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-brand-secondary/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold brand-tertiary mb-8">
              المشكلة ماشي في قلة الفرص.. المشكلة بلي الطريق ماشي واضح!
            </h2>
            
            <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 p-8 rounded-3xl shadow-xl">
              <p className="text-xl md:text-2xl brand-tertiary mb-6 leading-relaxed">
                سوق العقار في الجزائر راهو معمر بالفرص، والناس راهي تدخل فيه الدراهم صح. الصفقات والطلبات كاينين، خاصة مع دخلة الصيف وين الحركة تزيد بزاااف.
              </p>
              
              <p className="text-xl md:text-2xl brand-secondary mb-8 font-semibold">
                بصح علاش أغلب الناس ما يتحركوش؟ لأنهم:
              </p>
              
              <div className="grid md:grid-cols-1 gap-4 mb-8">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-brand-primary/30 hover:scale-105 transition-transform duration-300">
                  <p className="text-lg brand-tertiary font-medium">❌ ما يعرفوش منين يبداو.</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-brand-secondary/30 hover:scale-105 transition-transform duration-300">
                  <p className="text-lg brand-tertiary font-medium">❌ خايفين يدخلوا بطريقة غارطة ويخسروا وقتهم.</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-brand-tertiary/30 hover:scale-105 transition-transform duration-300">
                  <p className="text-lg brand-tertiary font-medium">❌ مترددين حتى تضيع عليهم الفرصة.</p>
                </div>
              </div>
              
              <div className="bg-brand-primary/20 p-6 rounded-2xl border-2 border-brand-primary">
                <p className="text-xl md:text-2xl brand-primary font-bold">
                  والنتيجة؟ يبقاو يتفرجوا من بعيد.. وغيرهم راهو يدخل، يتعلم، ويغتم في الفرص.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Section 5: Summer Opportunity */}
      <section className="section-animate py-16 bg-brand-primary/10 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-20 h-20 bg-brand-secondary/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-brand-tertiary/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold brand-tertiary mb-8">
              الصيف الجاي ماشي غير فصل وسخانة.. راهو فرصة العمر في العقار!
            </h2>
            
            <div className="bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 p-8 rounded-3xl shadow-xl">
              <p className="text-xl md:text-2xl brand-tertiary mb-6 leading-relaxed">
                في هاد الفترة بالذات: الحركة تزيد، الطلب يطلع، والناس تحوس تشري وتكري كتر من أي وقت فات.
              </p>
              
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-brand-primary/30 mb-6">
                <p className="text-lg brand-tertiary mb-4">
                  <span className="font-bold text-brand-primary">الفرق وين راه؟</span> اللي يدخل للصيف وهو فاهم اللعبة، ماشي كما اللي يدخل وهو حايز.
                </p>
                <p className="text-xl md:text-2xl brand-primary font-bold">
                  هادا هو أحسن وقت باش تدير الخطوة الأولى وتوجد روحك لذروة الفرص.
                </p>
              </div>
              
              <div className="flex justify-center">
                <div className="bg-yellow-400 text-gray-800 px-8 py-4 rounded-full font-bold text-xl animate-pulse">
                  🌞 الصيف فرصة ما تتعوضش!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Section 6: The Course as Solution */}
      <section className="section-animate py-16 bg-white relative overflow-hidden">
        <div className="absolute top-10 left-10 w-16 h-16 bg-brand-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-brand-secondary/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold brand-tertiary mb-8">
              على هاديك درنا هاد الدورة!
            </h2>
            
            <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 p-8 rounded-3xl shadow-xl">
              <p className="text-xl md:text-2xl brand-tertiary mb-6 leading-relaxed">
                هاد الدورة أونلاين صممناها باش تكون هي البداية الصحيحة ليك. ماشي مجرد هدرة "نظرية"، بل هي "خريطة" تعاونك باش:
              </p>
              
              <div className="grid md:grid-cols-1 gap-4 mb-6">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-brand-primary/30 hover:scale-105 transition-transform duration-300">
                  <p className="text-lg brand-tertiary font-medium">✅ تفهم كيفاش يمشي سوق العقار في الجزائر.</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-brand-secondary/30 hover:scale-105 transition-transform duration-300">
                  <p className="text-lg brand-tertiary font-medium">✅ تعرف كيفاش يخمموا الناجحين في هاد السيكتور.</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-brand-tertiary/30 hover:scale-105 transition-transform duration-300">
                  <p className="text-lg brand-tertiary font-medium">✅ تجنب الغلطات اللي تضيعلك وقتك ودراهمك.</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-brand-primary/30 hover:scale-105 transition-transform duration-300">
                  <p className="text-lg brand-tertiary font-medium">✅ تبدأ بداية احترافية ماشي عشوائية.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Section 7: What You'll Discover */}
      <section className="section-animate py-16 bg-brand-secondary/10 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-20 h-20 bg-brand-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-brand-tertiary/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold brand-tertiary mb-8">
              واش راح تكتشف لداخل؟
            </h2>
            
            <div className="bg-gradient-to-r from-brand-secondary/20 to-brand-tertiary/20 p-8 rounded-3xl shadow-xl">
              <div className="grid md:grid-cols-1 gap-4">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-brand-primary/30 hover:scale-105 transition-transform duration-300">
                  <p className="text-lg brand-tertiary font-medium">🔍 السر اللي يخلي العقار أحسن مجال للدخل.</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-brand-secondary/30 hover:scale-105 transition-transform duration-300">
                  <p className="text-lg brand-tertiary font-medium">🧠 كيفاش تولي تشوف السوق بعقلية "الخبير".</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-brand-tertiary/30 hover:scale-105 transition-transform duration-300">
                  <p className="text-lg brand-tertiary font-medium">🤝 كيفاش تبني ثقتك وتبدأ تتعامل مع الزبائن والصفقات.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Section 8: About Wael */}
      <section className="section-animate py-16 bg-white relative overflow-hidden">
        <div className="absolute top-10 left-10 w-16 h-16 bg-brand-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-brand-secondary/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold brand-tertiary mb-8">
              شكون هو وائل؟
            </h2>
            
            <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 p-8 rounded-3xl shadow-xl">
              <p className="text-xl md:text-2xl brand-tertiary mb-6 leading-relaxed">
                أنا وائل، وسيط عقاري، درت كتر من 100 صفقة ناجحة (بيع وكراء)، ومؤلف كتاب "دليل أول صفقة عقارية"، ومؤسس "الخبير للعقارات".
              </p>
              
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-brand-primary/30">
                <p className="text-lg brand-tertiary mb-4">
                  رأيت بلي أكبر عائق هو غياب التوجيه، على هاديك وجدتلك هاد الدورة اللي فيها عصارة تجربتي، ومعايا فريق من الخبراء (محامية، موثق، وخبير تسويق) باش نعطولك الصح.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Section 9: Addressing Concerns */}
      <section className="section-animate py-16 bg-brand-primary/10 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-20 h-20 bg-brand-secondary/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-brand-tertiary/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold brand-tertiary mb-8">
              معالجة المخاوف (الاعتراضات)
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-2 border-brand-primary/30 hover:scale-105 transition-all duration-300">
                <p className="text-2xl font-bold brand-primary mb-3">"ماعنديش خبرة"</p>
                <p className="text-lg brand-tertiary">هاد الدورة مخدومة للناس اللي راح تبدأ من الزيرو.</p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-2 border-brand-secondary/30 hover:scale-105 transition-all duration-300">
                <p className="text-2xl font-bold brand-secondary mb-3">"ماعنديش وقت"</p>
                <p className="text-lg brand-tertiary">الدورة أونلاين، تقدر تشوفها من تليفونك وقت ما حبيت.</p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-2 border-brand-tertiary/30 hover:scale-105 transition-all duration-300">
                <p className="text-2xl font-bold brand-tertiary mb-3">"خايف نغلط"</p>
                <p className="text-lg brand-tertiary">على هاديك لازمك توجيه "الخبير" باش تبدأ صح.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Section 10: Value and Offer */}
      <section className="section-animate py-16 bg-white relative overflow-hidden">
        <div className="absolute top-10 left-10 w-16 h-16 bg-brand-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-brand-secondary/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold brand-tertiary mb-8">
              القيمة الحقيقية للدورة كتر بزااف!
            </h2>
            
            <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 p-8 rounded-3xl shadow-xl">
              <p className="text-xl md:text-2xl brand-tertiary mb-6 leading-relaxed">
                واش راح تتعلم لداخل قادر يرجعلك قيمة كبيرة في أول صفقة تديرها. هاد الدورة راهو عرض خاص باش نساعد أكبر عدد منكم يبدأ رحلته الاحترافية في عالم العقار.
              </p>
              
              <div className="bg-brand-primary/20 p-6 rounded-2xl border-2 border-brand-primary mb-6">
                <p className="text-xl md:text-2xl brand-primary font-bold">
                  أنت ماراكش تشري في دورة.. راك تشري في اختصار للطريق ووضوح للمستقبل.
                </p>
              </div>
              
              {/* Final CTA button */}
              <div className="mt-8">
                <button 
                  onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-12 py-6 rounded-full font-bold text-xl hover:from-brand-secondary hover:to-brand-tertiary transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-brand-primary/50 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <span className="relative flex items-center gap-3">
                    <span className="text-gray-800">🔘</span>
                    <span className="text-gray-800">حاب نبدأ درك ونستفاد من التخفيض!</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Client Reviews Section */}
      <section className="section-animate py-16 bg-brand-secondary/10 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-20 h-20 bg-brand-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-brand-tertiary/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center brand-tertiary mb-12">
              💬 آراء العملاء
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-2xl shadow-lg border border-brand-primary/20 hover:scale-105 transition-transform duration-300">
                <div className="cursor-pointer" onClick={() => window.open('https://res.cloudinary.com/dgywxqq50/image/upload/v1774899778/5933647721048772188_trnw0b.jpg', '_blank')}>
                  <img 
                    src="https://res.cloudinary.com/dgywxqq50/image/upload/v1774899778/5933647721048772188_trnw0b.jpg" 
                    alt="Client review 1" 
                    className="w-full h-auto object-contain rounded-xl mb-4 hover:opacity-90 transition-opacity"
                    onError={(e) => {
                      e.currentTarget.src = 'https://res.cloudinary.com/dgywxqq50/image/upload/v1774899778/5933647721048772189_cvaacz.jpg';
                    }}
                  />
                </div>
                <div className="flex items-center gap-1 mb-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 brand-primary fill-current" />
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-lg border border-brand-secondary/20 hover:scale-105 transition-transform duration-300">
                <div className="cursor-pointer" onClick={() => window.open('https://res.cloudinary.com/dgywxqq50/image/upload/v1774899778/5933647721048772186_ivor7j.jpg', '_blank')}>
                  <img 
                    src="https://res.cloudinary.com/dgywxqq50/image/upload/v1774899778/5933647721048772186_ivor7j.jpg" 
                    alt="Client review 2" 
                    className="w-full h-auto object-contain rounded-xl mb-4 hover:opacity-90 transition-opacity"
                    onError={(e) => {
                      e.currentTarget.src = 'https://res.cloudinary.com/dgywxqq50/image/upload/v1774899777/5933647721048772189_cvaacz.jpg';
                    }}
                  />
                </div>
                <div className="flex items-center gap-1 mb-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 brand-primary fill-current" />
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-lg border border-brand-tertiary/20 hover:scale-105 transition-transform duration-300">
                <div className="cursor-pointer" onClick={() => window.open('https://res.cloudinary.com/dgywxqq50/image/upload/v1774899778/5933647721048772187_hoddab.jpg', '_blank')}>
                  <img 
                    src="https://res.cloudinary.com/dgywxqq50/image/upload/v1774899778/5933647721048772187_hoddab.jpg" 
                    alt="Client review 3" 
                    className="w-full h-auto object-contain rounded-xl mb-4 hover:opacity-90 transition-opacity"
                    onError={(e) => {
                      e.currentTarget.src = 'https://res.cloudinary.com/dgywxqq50/image/upload/v1774899777/5933647721048772189_cvaacz.jpg';
                    }}
                  />
                </div>
                <div className="flex items-center gap-1 mb-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 brand-primary fill-current" />
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-lg border border-brand-primary/20 hover:scale-105 transition-transform duration-300">
                <div className="cursor-pointer" onClick={() => window.open('https://res.cloudinary.com/dgywxqq50/image/upload/v1774899777/5933647721048772189_cvaacz.jpg', '_blank')}>
                  <img 
                    src="https://res.cloudinary.com/dgywxqq50/image/upload/v1774899777/5933647721048772189_cvaacz.jpg" 
                    alt="Client review 4" 
                    className="w-full h-auto object-contain rounded-xl mb-4 hover:opacity-90 transition-opacity"
                    onError={(e) => {
                      e.currentTarget.src = 'https://res.cloudinary.com/dgywxqq50/image/upload/v1774899778/5933647721048772188_trnw0b.jpg';
                    }}
                  />
                </div>
                <div className="flex items-center gap-1 mb-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 brand-primary fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        
        {/* Contact Info */}
        <section className="py-16 bg-brand-tertiary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">للمزيد من المعلومات</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center gap-3">
                  <Phone className="w-8 h-8 brand-primary" />
                  <p className="font-bold">الهاتف</p>
                  <p className="brand-secondary">+213 123 456 789</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Mail className="w-8 h-8 brand-primary" />
                  <p className="font-bold">البريد الإلكتروني</p>
                  <p className="brand-secondary">info@elkhabir-immobilier.com</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <MapPin className="w-8 h-8 brand-primary" />
                  <p className="font-bold">العنوان</p>
                  <p className="brand-secondary">الجزائر، العاصمة</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
 