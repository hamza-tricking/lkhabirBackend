'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Add Facebook Pixel type declaration
declare global {
  interface Window {
    fbq: (command: string, eventName: string, parameters?: object) => void;
  }
}

export default function ChallengePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    willaya: '',
    city: ''
  });

  const [phoneError, setPhoneError] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [formRef, setFormRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBubble(true);
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
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('trackCustom', 'ClickScrollToForm');
      }
    }
  };

  const validatePhone = (phone: string) => {
    const phoneDigits = phone.replace(/\D/g, '');
    const isValid = (phoneDigits.startsWith('0') && phoneDigits.length === 10) || 
                    (phoneDigits.startsWith('213') && phoneDigits.length === 12) ||
                    (phoneDigits.length >= 9 && phoneDigits.length <= 10);
    return isValid;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({...formData, phone: value});
    if (value) {
      setPhoneError('');
    }
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
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'FormFieldInteraction', {
        fieldName: name,
        fieldType: e.target.tagName.toLowerCase()
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhone(formData.phone)) {
      setPhoneError('يرجى إدخال رقم هاتف صحيح');
      return;
    }
    
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Challenge Registration',
        content_category: 'Education',
        value: 10000,
        currency: 'DZD'
      });
    }
    
    try {
      const orderData = {
        type: 'challenge',
        price: 10000,
        phoneNumber: formData.phone,
        fullName: formData.fullName,
        willaya: formData.willaya,
        city: formData.city,
        time: {
          day: new Date().toISOString().split('T')[0],
          hour: new Date().toTimeString().split(' ')[0].substring(0, 5)
        },
        description: `طلب تحدي من ${formData.fullName} - ${formData.willaya}, ${formData.city}`
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
    
    router.push('/challenge/thank-you');
    
    try {
      const response = await fetch('/api/google-sheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
body: JSON.stringify({
  ...formData,
  product: 'Challenge',
  price: '10000 دج'
}),
        
      });
      
      if (response.ok) {
        console.log('Form submitted successfully to Google Sheets');
        
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('trackCustom', 'ChallengeFormSubmitted', {
            fullName: formData.fullName,
            phone: formData.phone,
            willaya: formData.willaya,
            city: formData.city
          });
          
          window.fbq('track', 'InitiateCheckout', {
            value: 10000,
            currency: 'DZD',
            content_ids: ['challenge_fsd'],
            content_type: 'education'
          });
        }
      } else {
        console.error('Failed to submit form');
        
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('trackCustom', 'ChallengeFormError', {
            error: 'Failed to submit form'
          });
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('trackCustom', 'ChallengeFormException', {
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  };

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

  return (
    <div className="bg-gradient-to-br from-[#EDE6D9] via-[#F5E6D3]  to-[#B39977] relative">
      {/* Sophisticated Background Effects */}
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
        <div className="absolute top-1/4 left-1/2 w-3 h-3 bg-[#B39977]/25 rounded-full animate-float-particle" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-1/3 left-20 w-2 h-2 bg-[#684F36]/15 rounded-full animate-float-particle" style={{animationDelay: '6s'}}></div>
        
        {/* Subtle light streaks */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-[#B39977]/5 via-transparent to-transparent animate-shimmer-vertical"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-[#684F36]/5 via-transparent to-transparent animate-shimmer-vertical" style={{animationDelay: '3s'}}></div>
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#B39977]/10 to-transparent rounded-br-full"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#684F36]/10 to-transparent rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#EDE6D9]/15 to-transparent rounded-tr-full"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#B39977]/10 to-transparent rounded-tl-full"></div>
      </div>

      {/* Floating Order Bubble */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        showBubble ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}>
        <button
          onClick={scrollToForm}
          className="bg-gradient-to-r from-[#B39977] to-[#684F36] text-white px-6 py-3 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center space-x-2 animate-pulse-glow"
        >
          <span className="font-bold">سجل و ابدأ التحدي</span>
          <span className="text-xl">🔥</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#B39977]/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#684F36]/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Challenge Title */}
          <div className="text-center mb-12">
            <div className="inline-block">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#B8860B] mb-6 animate-pulse-glow px-8 py-4 rounded-3xl bg-gradient-to-r from-[#B39977]/10 to-[#684F36]/10 backdrop-blur-sm border-2 border-[#B39977]/20">
                🔥 FSD Challenge — First Successful Deal
              </h1>
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer mb-8"></div>
          </div>
          
          {/* Main Content */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#342519] mb-6 animate-fade-in-up">
              أقوى تحدي عقاري في الجزائر
            </h2>
            <div className="w-24 h-2 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer mb-8"></div>
            <p className="text-xl md:text-2xl text-[#342519] max-w-4xl mx-auto leading-relaxed font-bold mb-8">
              أول صفقة عقارية ناجحة في 30 يوم فقط
            </p>
            <p className="text-lg md:text-xl text-[#684F36] max-w-3xl mx-auto leading-relaxed font-medium mb-8">
              كيما سمية قدرت تدير اكثر من 30 مليون في أقل من شهر و نص انت تاني تقدرللللهههههاااا 
            </p>
            <p className="text-2xl md:text-3xl font-bold text-[#D4AF37] mb-8">
              Yes you Can Do it
            </p>
          </div>

          {/* Ramadan Message */}
          <div className="bg-gradient-to-r from-[#B39977]/20 to-[#684F36]/20 rounded-3xl p-8 mb-16 border-4 border-[#B39977]/30">
            <h3 className="text-2xl md:text-3xl font-black text-[#342519] mb-6 text-center">
              رمضان هذا… ماشي شهر تأجيل.
            </h3>
            <p className="text-xl md:text-2xl text-[#342519] text-center font-bold mb-4">
              رمضان فرصة باش تبدا طريق جديد في العقار.
            </p>
            <p className="text-lg md:text-xl text-[#684F36] text-center leading-relaxed">
              FSD هو برنامج تحدي تطبيقي 100% أونلاين
            </p>
            <p className="text-lg md:text-xl text-[#684F36] text-center leading-relaxed">
              مصمم باش يديك خطوة بخطوة من الصفر…
            </p>
            <p className="text-lg md:text-xl text-[#684F36] text-center leading-relaxed font-bold">
              حتى تولي قادر تغلق أول صفقة عقارية بطريقة قانونية واحترافية.
            </p>
          </div>

          {/* Warning Section */}
          <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-3xl p-8 mb-16 border-4 border-red-600/30">
            <h3 className="text-2xl md:text-3xl font-black text-red-700 mb-6 text-center">
              🚫 هذا البرنامج ماشي للناس المسوّفة و لي ماعندهاش التزام و انضباط
            </h3>
            <p className="text-xl md:text-2xl text-red-700 text-center font-bold">
              هذا للناس اللي صح حابة تبدل حياتها.
            </p>
          </div>

          {/* Registration Buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
            <button
              onClick={scrollToForm}
              className="bg-gradient-to-r from-[#B39977] to-[#684F36] hover:from-[#684F36] hover:to-[#342519] text-white font-bold text-xl md:text-2xl py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#B39977]/25"
            >
              ✅ ابدأ التحدي الآن
            </button>
            <button className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#FFD700] hover:to-[#D4AF37] text-[#342519] font-bold text-xl md:text-2xl py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#D4AF37]/25">
              🎥 شاهد الفيديو (دقيقة واحدة فقط)
            </button>
          </div>

          {/* Video Section */}
          <div className="bg-white rounded-3xl p-4 shadow-2xl border-4 border-[#B39977]/30 mb-16 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-black text-[#342519] mb-6 text-center">
              هذا الفيديو يشرحلك الرحلة كاملة:
            </h3>
            <p className="text-lg text-[#684F36] text-center mb-6">
              من البداية… حتى باب الموثق.
            </p>
            
            <div className="relative rounded-2xl overflow-hidden mb-6">
              <video
                className="w-full h-auto max-h-64 rounded-2xl"
                controls
              >
                <source src="https://res.cloudinary.com/dgywxqq50/video/upload/v1771377800/IMG_0217_j4kyxc.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            <div className="text-center">
              <button
                onClick={scrollToForm}
                className="bg-gradient-to-r from-[#B39977] to-[#684F36] hover:from-[#684F36] hover:to-[#342519] text-white font-bold text-xl py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#B39977]/25"
              >
                🚀 ماذا ستحقق داخل FSD؟
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Achieve Section */}
      <section className="py-20 px-4 bg-[#EDE6D9] relative">
        <div className="absolute top-15 right-15 w-32 h-32 bg-[#B39977]/15 rounded-full blur-2xl animate-float hidden md:block"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#342519] mb-6">🚀 ماذا ستحقق داخل FSD؟</h2>
            <div className="w-20 h-2 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer"></div>
            <p className="text-xl text-[#684F36] font-medium mt-6">هذا مش كورس نظري… هذا تحدي عملي.</p>
            <p className="text-lg text-[#684F36] mt-2">برنامج عملي = نتائج ملموسة.</p>
          </div>

          <div className="bg-gradient-to-br from-[#B39977]/10 to-[#684F36]/10 rounded-3xl p-8 border-4 border-[#B39977]/30">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-black text-[#342519] mb-4">بنهاية 30 يوم راح تكون قادر على:</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border-2 border-[#B39977]/20 hover:border-[#B39977]/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-start">
                  <span className="text-green-500 text-2xl ml-3 mt-1">✅</span>
                  <div>
                    <h4 className="text-xl font-bold text-[#342519] mb-2">فهم القانون العقاري وحماية نفسك</h4>
                    <p className="text-[#684F36]">قبل أي صفقة - تعلم كيف تحمي نفسك قانونياً</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-[#684F36]/20 hover:border-[#684F36]/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-start">
                  <span className="text-green-500 text-2xl ml-3 mt-1">✅</span>
                  <div>
                    <h4 className="text-xl font-bold text-[#342519] mb-2">معرفة كيفاش تجيب عروض عقارية حقيقية</h4>
                    <p className="text-[#684F36">طرق عملية لجلب العقارات بأسعار ممتازة</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-[#B39977]/20 hover:border-[#B39977]/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-start">
                  <span className="text-green-500 text-2xl ml-3 mt-1">✅</span>
                  <div>
                    <h4 className="text-xl font-bold text-[#342519] mb-2">تعلم التسويق الاحترافي وجلب الزبائن الجديين</h4>
                    <p className="text-[#684F36]">استراتيجيات تسويق تجلب لك زبائن حقيقيين</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-[#684F36]/20 hover:border-[#684F36]/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-start">
                  <span className="text-green-500 text-2xl ml-3 mt-1">✅</span>
                  <div>
                    <h4 className="text-xl font-bold text-[#342519] mb-2">بناء اسمك وبراندك كوسيط موثوق</h4>
                    <p className="text-[#684F36]">كيفاش تبني سمعة قوية في السوق</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-[#B39977]/20 hover:border-[#B39977]/40 transition-all duration-300 hover:scale-105 md:col-span-2">
                <div className="flex items-start">
                  <span className="text-green-500 text-2xl ml-3 mt-1">✅</span>
                  <div>
                    <h4 className="text-xl font-bold text-[#342519] mb-2">تطبيق كامل حتى توصل للصفقة الأولى بثقة</h4>
                    <p className="text-[#684F36]">من البداية حتى الإغلاق - خطوة بخطوة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Week Challenge Plan Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#F5E6D9] to-[#EDE6D9] relative">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#B39977]/15 rounded-full blur-2xl animate-float hidden md:block"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#684F36]/15 rounded-full blur-2xl animate-float hidden md:block" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#342519] mb-6">🗓️ خطة التحدي — 4 أسابيع نحو أول صفقة</h2>
            <div className="w-20 h-2 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer"></div>
          </div>

          <div className="space-y-8">
            {/* Week 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-[#B39977]/30 hover:border-[#B39977]/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center text-white text-2xl font-bold ml-4 animate-pulse-glow">
                  1
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#342519]">الأسبوع الأول: القانون والحماية</h3>
                  <p className="text-[#684F36] font-medium">🎯 تبدأ صح وبأمان.</p>
                </div>
              </div>
              
              <div className="space-y-3 text-right">
                <div className="flex items-center text-[#342519] font-medium">
                  <span className="text-green-500 ml-3 text-xl">✅</span>
                  <span>أساسيات القانون العقاري</span>
                </div>
                <div className="flex items-center text-[#342519] font-medium">
                  <span className="text-green-500 ml-3 text-xl">✅</span>
                  <span>الوثائق والعقود المهمة</span>
                </div>
                <div className="flex items-center text-[#342519] font-medium">
                  <span className="text-green-500 ml-3 text-xl">✅</span>
                  <span>كيفاش تحمي روحك من المشاكل</span>
                </div>
              </div>
            </div>

            {/* Week 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-[#684F36]/30 hover:border-[#684F36]/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#684F36] to-[#B39977] rounded-full flex items-center justify-center text-white text-2xl font-bold ml-4 animate-pulse-glow">
                  2
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#342519]">الأسبوع الثاني: التسويق العقاري الاحترافي</h3>
                  <p className="text-[#684F36] font-medium">🎯 تولي تجيب فرص حقيقية.</p>
                </div>
              </div>
              
              <div className="space-y-3 text-right">
                <div className="flex items-center text-[#342519] font-medium">
                  <span className="text-green-500 ml-3 text-xl">✅</span>
                  <span>كيفاش تختار العقار اللي عليه طلب</span>
                </div>
                <div className="flex items-center text-[#342519] font-medium">
                  <span className="text-green-500 ml-3 text-xl">✅</span>
                  <span>كيفاش تجيب زبون جدي</span>
                </div>
                <div className="flex items-center text-[#342519] font-medium">
                  <span className="text-green-500 ml-3 text-xl">✅</span>
                  <span>طرق تسويق بسيطة وفعالة</span>
                </div>
              </div>
            </div>

            {/* Week 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-[#B39977]/30 hover:border-[#B39977]/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center text-white text-2xl font-bold ml-4 animate-pulse-glow">
                  3
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#342519]">الأسبوع الثالث: بناء البراند على السوشيال ميديا</h3>
                  <p className="text-[#684F36] font-medium">🎯 تولي اسم معروف في مجالك.</p>
                </div>
              </div>
              
              <div className="space-y-3 text-right">
                <div className="flex items-center text-[#342519] font-medium">
                  <span className="text-green-500 ml-3 text-xl">✅</span>
                  <span>كيفاش الناس تثق فيك</span>
                </div>
                <div className="flex items-center text-[#342519] font-medium">
                  <span className="text-green-500 ml-3 text-xl">✅</span>
                  <span>كيفاش تقدم نفسك كمحترف</span>
                </div>
                <div className="flex items-center text-[#342519] font-medium">
                  <span className="text-green-500 ml-3 text-xl">✅</span>
                  <span>محتوى يجلب الملاك والزبائن</span>
                </div>
              </div>
            </div>

            {/* Week 4 */}
            <div className="bg-gradient-to-br from-[#B39977]/20 to-[#684F36]/20 rounded-3xl p-8 border-4 border-[#D4AF37]/50 hover:border-[#D4AF37]/70 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-full flex items-center justify-center text-white text-2xl font-bold ml-4 animate-pulse-glow">
                  4
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#342519]">الأسبوع الرابع: أول صفقة كاملة من البداية للنهاية</h3>
                  <p className="text-[#684F36] font-medium">🎯 أول صفقة ناجحة… خطوة بخطوة.</p>
                </div>
              </div>
              
              <div className="space-y-3 text-right">
                <div className="flex items-center text-[#342519] font-medium">
                  <span className="text-green-500 ml-3 text-xl">✅</span>
                  <span>كيفاش تربط بين الشاري والبائع</span>
                </div>
                <div className="flex items-center text-[#342519] font-medium">
                  <span className="text-green-500 ml-3 text-xl">✅</span>
                  <span>التفاوض والإغلاق</span>
                </div>
                <div className="flex items-center text-[#342519] font-medium">
                  <span className="text-green-500 ml-3 text-xl">✅</span>
                  <span>الوصول إلى الموثق بثقة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 px-4 bg-[#EDE6D9] relative">
        <div className="absolute top-15 right-15 w-32 h-32 bg-[#B39977]/15 rounded-full blur-2xl animate-float hidden md:block"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#342519] mb-6">🎯 هذا البرنامج موجه لمن؟</h2>
            <div className="w-20 h-2 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer"></div>
            <p className="text-xl text-[#684F36] font-medium mt-6">لكل واحد عندو شغف و طموح و ارادة كبيرة و مستعد يدير كلش على جال الهدف تاعو</p>
          </div>

          <div className="bg-gradient-to-br from-[#B39977]/10 to-[#684F36]/10 rounded-3xl p-8 border-4 border-[#B39977]/30">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-black text-[#342519] mb-4">مناسب لك إذا كنت:</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border-2 border-[#B39977]/20 hover:border-[#B39977]/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-start">
                  <span className="text-green-500 text-2xl ml-3 mt-1">✅</span>
                  <div>
                    <h4 className="text-lg font-bold text-[#342519] mb-2">شاب/شابة حاب تبني مستقبل قوي</h4>
                    <p className="text-[#684F36] text-sm">تبدي حياتك وتحقق أهدافك</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-[#684F36]/20 hover:border-[#684F36]/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-start">
                  <span className="text-green-500 text-2xl ml-3 mt-1">✅</span>
                  <div>
                    <h4 className="text-lg font-bold text-[#342519] mb-2">خريج جديد وتحب تدخل مجال مربح</h4>
                    <p className="text-[#684F36] text-sm">انطلاقتك المهنية في العقار</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-[#B39977]/20 hover:border-[#B39977]/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-start">
                  <span className="text-green-500 text-2xl ml-3 mt-1">✅</span>
                  <div>
                    <h4 className="text-lg font-bold text-[#342519] mb-2">موظف حاب دخل إضافي محترم</h4>
                    <p className="text-[#684F36] text-sm">مصدر دخل جانبي احترافي</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-[#684F36]/20 hover:border-[#684F36]/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-start">
                  <span className="text-green-500 text-2xl ml-3 mt-1">✅</span>
                  <div>
                    <h4 className="text-lg font-bold text-[#342519] mb-2">شخص حاب يبدل حياتو ومش حاب يبقى في نفس الروتين</h4>
                    <p className="text-[#684F36] text-sm">تغيير حقيقي في حياتك</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-[#B39977]/20 hover:border-[#B39977]/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-start">
                  <span className="text-green-500 text-2xl ml-3 mt-1">✅</span>
                  <div>
                    <h4 className="text-lg font-bold text-[#342519] mb-2">طموح حاب يبني مشروعو الخاص</h4>
                    <p className="text-[#684F36] text-sm">مشروعك الخاص في العقار</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-[#684F36]/20 hover:border-[#684F36]/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-start">
                  <span className="text-green-500 text-2xl ml-3 mt-1">✅</span>
                  <div>
                    <h4 className="text-lg font-bold text-[#342519] mb-2">ناس عندهم علاقات في السوق بصح ما يعرفوش كيفاش يستغلوها</h4>
                    <p className="text-[#684F36] text-sm">استغلال علاقاتك بشكل احترافي</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-[#B39977]/20 hover:border-[#B39977]/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-start">
                  <span className="text-green-500 text-2xl ml-3 mt-1">✅</span>
                  <div>
                    <h4 className="text-lg font-bold text-[#342519] mb-2">وسطاء مبتدئين حابين يتعلمو صح</h4>
                    <p className="text-[#684F36] text-sm">الطريقة الصحيحة للوساطة</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-[#684F36]/20 hover:border-[#684F36]/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-start">
                  <span className="text-green-500 text-2xl ml-3 mt-1">✅</span>
                  <div>
                    <h4 className="text-lg font-bold text-[#342519] mb-2">ناس حابين يخرجو من الغرقة ويبدأو طريق جديد</h4>
                    <p className="text-[#684F36] text-sm">بداية جديدة ومستقبل أفضل</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-[#B39977]/20 hover:border-[#B39977]/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-start">
                  <span className="text-green-500 text-2xl ml-3 mt-1">✅</span>
                  <div>
                    <h4 className="text-lg font-bold text-[#342519] mb-2">نساء مستقلات حابين مصدر دخل بذكاء وبوقت محدود</h4>
                    <p className="text-[#684F36] text-sm">استقلالية مادية ووقت مرن</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-[#684F36]/20 hover:border-[#684F36]/40 transition-all duration-300 hover:scale-105 md:col-span-2 lg:col-span-3">
                <div className="flex items-start">
                  <span className="text-green-500 text-2xl ml-3 mt-1">✅</span>
                  <div>
                    <h4 className="text-lg font-bold text-[#342519] mb-2">أي شخص يحب العقار ويحب يطبق مش غير يتفرج</h4>
                    <p className="text-[#684F36] text-sm">للناس العملية والجادة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Not Suitable Section */}
          <div className="mt-12 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-3xl p-8 border-4 border-red-600/30">
            <h3 className="text-2xl md:text-3xl font-black text-red-700 mb-6 text-center">
              🚫 غير مناسب للي يحوس غير على المعلومة المجانية و لا لي متكاسل و ماعندوش انضباط 
            </h3>
          </div>
        </div>
      </section>

      {/* Concerns Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#F5E6D9] to-[#EDE6D9] relative">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#B39977]/15 rounded-full blur-2xl animate-float hidden md:block"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#684F36]/15 rounded-full blur-2xl animate-float hidden md:block" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#342519] mb-6">⚠️ هل عندك مخاوف؟ هذا طبيعي</h2>
            <div className="w-20 h-2 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer"></div>
          </div>

          <div className="space-y-8">
            {/* Fear 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-[#B39977]/30 hover:border-[#B39977]/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center text-white text-2xl font-bold ml-4 animate-pulse-glow">
                  😟
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#342519]">تخاف تغلط وتخسر؟</h3>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 rounded-2xl p-6 border-2 border-green-500/30">
                <p className="text-green-800 font-bold text-lg text-center">
                  الأسبوع الأول كامل حماية قانونية.
                </p>
              </div>
            </div>

            {/* Fear 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-[#684F36]/30 hover:border-[#684F36]/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#684F36] to-[#B39977] rounded-full flex items-center justify-center text-white text-2xl font-bold ml-4 animate-pulse-glow">
                  🤔
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#342519]">ما تعرفش منين تبدا؟</h3>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 rounded-2xl p-6 border-2 border-blue-500/30">
                <p className="text-blue-800 font-bold text-lg text-center">
                  الخطة يوم بيوم واضحة.
                </p>
              </div>
            </div>

            {/* Fear 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-[#B39977]/30 hover:border-[#B39977]/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center text-white text-2xl font-bold ml-4 animate-pulse-glow">
                  ⏰
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#342519]">ما عندكش وقت؟</h3>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 rounded-2xl p-6 border-2 border-purple-500/30">
                <p className="text-purple-800 font-bold text-lg text-center">
                  البرنامج أونلاين وتطبق حسب وقتك.
                </p>
              </div>
            </div>

            {/* Fear 4 */}
            <div className="bg-gradient-to-br from-[#B39977]/20 to-[#684F36]/20 rounded-3xl p-8 border-4 border-[#D4AF37]/50 hover:border-[#D4AF37]/70 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-full flex items-center justify-center text-white text-2xl font-bold ml-4 animate-pulse-glow">
                  😰
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#342519]">تحس روحك ما تقدرش؟</h3>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-600/20 to-orange-500/20 rounded-2xl p-6 border-2 border-orange-500/30">
                <p className="text-orange-800 font-bold text-lg text-center">
                  التحدي معمول للمبتدئين… خطوة بخطوة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Process Section */}
      <section className="py-20 px-4 bg-[#EDE6D9] relative">
        <div className="absolute top-15 right-15 w-32 h-32 bg-[#B39977]/15 rounded-full blur-2xl animate-float hidden md:block"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#342519] mb-6">🤝 كيفاش التسجيل؟</h2>
            <div className="w-20 h-2 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer"></div>
            <p className="text-xl text-[#684F36] font-medium mt-6">هذا البرنامج فيه متابعة حقيقية… لذلك القبول محدود.</p>
          </div>

          <div className="bg-gradient-to-br from-[#B39977]/10 to-[#684F36]/10 rounded-3xl p-8 border-4 border-[#B39977]/30">
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl p-6 border-2 border-[#B39977]/20 hover:border-[#B39977]/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center text-white text-xl font-bold ml-4 animate-pulse-glow flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#342519] mb-2">تعمر الاستمارة لتحت</h3>
                    <p className="text-[#684F36]">املأ معلوماتك في نموذج التسجيل</p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl p-6 border-2 border-[#684F36]/20 hover:border-[#684F36]/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#684F36] to-[#B39977] rounded-full flex items-center justify-center text-white text-xl font-bold ml-4 animate-pulse-glow flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#342519] mb-2">فريقنا يتواصل معاك على واتساب</h3>
                    <p className="text-[#684F36]">نتواصل معك لتأكيد مناسبته للتحدي</p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl p-6 border-2 border-[#B39977]/20 hover:border-[#B39977]/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center text-white text-xl font-bold ml-4 animate-pulse-glow flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#342519] mb-2">نأكدوا أنك مناسب للتحدي</h3>
                    <p className="text-[#684F36]">مراجعة طلبك والموافقة على الانضمام</p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD700]/20 rounded-2xl p-6 border-2 border-[#D4AF37]/50 hover:border-[#D4AF37]/70 transition-all duration-300 hover:scale-105">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-full flex items-center justify-center text-white text-xl font-bold ml-4 animate-pulse-glow flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#342519] mb-2">تصلك التفاصيل كاملة وتبدا الرحلة</h3>
                    <p className="text-[#684F36]">استلام جميع المعلومات والبدء في التحدي</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={scrollToForm}
                className="bg-gradient-to-r from-[#B39977] to-[#684F36] hover:from-[#684F36] hover:to-[#342519] text-white font-bold text-xl md:text-2xl py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#B39977]/25"
              >
                ✅ أنا جاد — سجلني الآن
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#F5E6D9] to-[#EDE6D9] relative">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#B39977]/15 rounded-full blur-2xl animate-float hidden md:block"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#684F36]/15 rounded-full blur-2xl animate-float hidden md:block" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-gradient-to-br from-[#B39977]/20 to-[#684F36]/20 rounded-3xl p-12 border-4 border-[#D4AF37]/50 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-[#342519] mb-6">
              🔥 رمضان هذا… يا تبدا، يا تبقى فنفس البلاصة عام آخر
            </h2>
            <p className="text-xl md:text-2xl text-[#342519] mb-8 font-bold">
              إذا راك طموح وحاب أول صفقة عقارية حقيقية…
            </p>
            <button
              onClick={scrollToForm}
              className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#FFD700] hover:to-[#D4AF37] text-[#342519] font-bold text-2xl md:text-3xl py-6 px-12 rounded-3xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#D4AF37]/25 mb-6"
            >
              ✅ سجل الآن وخلي الباقي علينا 💪🔥
            </button>
            <p className="text-[#684F36] text-lg">
              الدفع عند الاستلام في جميع أنحاء الجزائر
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#B39977]/10 to-[#684F36]/10 relative">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#B39977]/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#684F36]/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="max-w-2xl mx-auto relative z-10">
          <div id="registration-form" ref={setFormRef} className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-[#684F36]/30">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-black text-[#342519] mb-6">طلب التسجيل في التحدي</h2>
              <div className="w-16 h-2 bg-gradient-to-r from-[#684F36] to-[#B39977] mx-auto rounded-full animate-shimmer mb-6"></div>
              <div className="mt-6 mb-4 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-2xl p-6 text-center">
                <p className="text-white text-xl md:text-2xl font-bold leading-relaxed">
                  سجل معلوماتك و فريق الخبير للعقارات رايح يتواصلو معاك و يفهموك فالتحدي
                </p>
              </div>
              <p className="text-[#684F36]">الدفع عند الاستلام في جميع أنحاء الجزائر</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#342519] font-bold mb-2 text-right">الاسم الكامل *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#B39977]/30 rounded-xl focus:border-[#B39977] focus:outline-none text-[#342519] font-medium"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              <div>
                <label className="block text-[#342519] font-bold mb-2 text-right">رقم الهاتف *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-[#342519] font-medium ${
                    phoneError 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-[#B39977]/30 focus:border-[#B39977]'
                  }`}
                  placeholder="أدخل رقم هاتفك"
                />
                {phoneError && (
                  <p className="text-red-500 text-sm mt-1 text-right">{phoneError}</p>
                )}
              </div>

              <div>
                <label className="block text-[#342519] font-bold mb-2 text-right">الولاية *</label>
                <select
                  name="willaya"
                  value={formData.willaya}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#B39977]/30 rounded-xl focus:border-[#B39977] focus:outline-none text-[#342519] font-medium"
                >
                  <option value="">اختر الولاية</option>
                  {algerianWillayas.map((willaya) => (
                    <option key={willaya} value={willaya}>{willaya}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#342519] font-bold mb-2 text-right">البلدية *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#B39977]/30 rounded-xl focus:border-[#B39977] focus:outline-none text-[#342519] font-medium"
                  placeholder="أدخل اسم البلدية"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#B39977] to-[#684F36] hover:from-[#684F36] hover:to-[#342519] text-white font-bold text-xl py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#B39977]/25"
              >
                سجل و ابدأ التحدي الآن
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[#684F36] text-sm">
                💳 الدفع عند الاستلام في جميع أنحاء الجزائر
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );}
