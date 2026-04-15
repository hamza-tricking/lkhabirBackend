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

export default function UsbProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    willaya: '',
    city: '',
    product: 'USB'
  });

  const [phoneError, setPhoneError] = useState('');

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
        content_name: 'USB Order',
        content_category: 'Product',
        value: 5000,
        currency: 'DZD'
      });
    }
    
    // Create order in backend
    try {
      const orderData = {
        type: 'USB',
        price: 5000,
        phoneNumber: formData.phone,
        fullName: formData.fullName,
        willaya: formData.willaya,
        city: formData.city,
        time: {
          day: new Date().toISOString().split('T')[0],
          hour: new Date().toTimeString().split(' ')[0].substring(0, 5)
        },
        description: `طلب USB من ${formData.fullName} - ${formData.willaya}, ${formData.city}`
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
    router.push('/thank-you-usb');
    
    // Send data to Google Sheets in background
    try {
      const response = await fetch('/api/google-sheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        console.log('USB Order submitted successfully to Google Sheets');
        
        // Track successful form submission
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('trackCustom', 'USBFormSubmitted', {
            fullName: formData.fullName,
            phone: formData.phone,
            willaya: formData.willaya,
            city: formData.city
          });
          
          // Track purchase/initiate checkout
          window.fbq('track', 'InitiateCheckout', {
            value: 5000,
            currency: 'DZD',
            content_ids: ['usb_flash_drive'],
            content_type: 'product'
          });
        }
      } else {
        console.error('Failed to submit USB order');
        
        // Track form submission error
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('trackCustom', 'USBFormError', {
            error: 'Failed to submit form'
          });
        }
      }
    } catch (error) {
      console.error('Error submitting USB order:', error);
      
      // Track form submission exception
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('trackCustom', 'USBFormException', {
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
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D9] to-[#EDE6D9]" dir="rtl">
      {/* Floating Order Bubble - All Screens */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        showBubble ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}>
        <button
          onClick={scrollToForm}
          className="bg-gradient-to-r from-[#B39977] to-[#684F36] text-white px-6 py-3 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center space-x-2 animate-pulse-glow"
        >
          <span className="font-bold">اطلب الآن</span>
          <span className="text-xl">📝</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#B39977]/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#684F36]/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Powerful Opening Heading */}
          <div className="text-center mb-12">
            <div className="inline-block">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#B8860B] mb-6 animate-pulse-glow px-8 py-4 rounded-3xl bg-gradient-to-r from-[#B39977]/10 to-[#684F36]/10 backdrop-blur-sm border-2 border-[#B39977]/20">
                أفضل فلاش عقاري في الجزائر
              </h1>
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer mb-8"></div>
          </div>

          {/* Product Images */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white rounded-2xl p-6 shadow-2xl border-4 border-[#B39977]/30 hover:border-[#B39977]/50 transition-all duration-300 hover:scale-105">
                <Image
                  src="https://res.cloudinary.com/dicpjm1dz/image/upload/v1769435351/image_29_yaqiwn.png"
                  alt="فلاش ديسك عقاري"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-bold text-[#342519]">محتوى كامل</h3>
                  <p className="text-[#684F36] mt-2">قانون + تسويق + نماذج</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#684F36]/30 to-[#B39977]/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white rounded-2xl p-6 shadow-2xl border-4 border-[#684F36]/30 hover:border-[#684F36]/50 transition-all duration-300 hover:scale-105">
                <Image
                  src="https://res.cloudinary.com/dicpjm1dz/image/upload/v1769435328/WhatsApp_Image_2026-01-24_at_4.35.30_PM_1_kftwxp.png"
                  alt="محتوى الفلاشة"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-bold text-[#342519">منظم وجاهز</h3>
                  <p className="text-[#684F36] mt-2">ملفات + فيديو + PDF</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white rounded-2xl p-6 shadow-2xl border-4 border-[#B39977]/30 hover:border-[#B39977]/50 transition-all duration-300 hover:scale-105">
                <Image
                  src="https://res.cloudinary.com/dicpjm1dz/image/upload/v1769435315/image_28_x7uorr.png"
                  alt="نتائج الفلاشة"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-bold text-[#342519]">نتائج مضمونة</h3>
                  <p className="text-[#684F36] mt-2">فهم + تطبيق = نجاح</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#342519] mb-6">📁 وش كاين داخل الفلاشة؟</h2>
            <div className="w-16 h-2 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-[#B39977]/10 to-[#684F36]/10 rounded-2xl p-8 border-2 border-[#B39977]/30">
              <h3 className="text-2xl font-bold text-[#342519] mb-4">1) القانون العقاري</h3>
              <p className="text-[#684F36] font-medium mb-4">باش تفهم:</p>
              <ul className="space-y-2 text-[#342519]">
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>أنواع العقارات</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>العقود والوثائق</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>دفتر عقاري / ملكية / رخصة بناء</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>الأخطاء القانونية اللي يديروها أغلب المبتدئين</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#684F36]/10 to-[#B39977]/10 rounded-2xl p-8 border-2 border-[#684F36]/30">
              <h3 className="text-2xl font-bold text-[#342519] mb-4">2) التسويق العقاري</h3>
              <p className="text-[#684F36] font-medium mb-4">باش تعرف:</p>
              <ul className="space-y-2 text-[#342519]">
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>كيف تجمع عروض</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>كيف تجيب زبائن</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>كيف تكتب إعلان عقاري</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>كيف تخدم صفقات بذكاء</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#B39977]/10 to-[#684F36]/10 rounded-2xl p-8 border-2 border-[#B39977]/30">
              <h3 className="text-2xl font-bold text-[#342519] mb-4">3) نماذج وملفات جاهزة</h3>
              <p className="text-[#684F36] font-medium mb-4">تحصل على:</p>
              <ul className="space-y-2 text-[#342519]">
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>نماذج عقود</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>Checklists</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>دراسات حالة</span>
                </li>
              </ul>
            </div>
          </div>

          {/* How it Works */}
          <div className="bg-gradient-to-r from-[#B39977]/20 to-[#684F36]/20 rounded-3xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-[#342519] mb-6 text-center">📌 كيف يخدم؟</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl">✔</span>
                </div>
                <p className="text-[#342519] font-medium">الفلاشة تخدم بدون إنترنت</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl">📁</span>
                </div>
                <p className="text-[#342519] font-medium">المحتوى منظم في ملفات</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl">🎥</span>
                </div>
                <p className="text-[#342519] font-medium">فيديو + PDF + نماذج</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl">👥</span>
                </div>
                <p className="text-[#342519] font-medium">مناسب للمبتدئين والوسطاء</p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold text-[#342519] mb-6">وش النتيجة؟</h3>
            <p className="text-lg text-[#684F36] mb-4">تخرج بـ صورة واضحة على:</p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#B39977]/20">
                <span className="text-3xl mb-3 block">🚀</span>
                <p className="text-[#342519] font-bold">كيفاش تبدأ</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#684F36]/20">
                <span className="text-3xl mb-3 block">⚠️</span>
                <p className="text-[#342519] font-bold">كيفاش تتفادى الأخطاء</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#B39977]/20">
                <span className="text-3xl mb-3 block">🎯</span>
                <p className="text-[#342519] font-bold">كيفاش تستعد للصفقة الأولى</p>
              </div>
            </div>
            <p className="text-xl font-bold text-[#684F36] mt-6">مش سحر… فهم + تطبيق = نتائج أفضل.</p>
          </div>

          {/* What's Ahead - Unique Style */}
          <div className="mb-16 relative">
            {/* Clean Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F5E6D9]/50 via-transparent to-[#EDE6D9]/50"></div>
            
            <div className="relative z-10">
              {/* Unique Header */}
              <div className="text-center mb-16">
                <div className="inline-block relative">
                  <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#B39977] via-[#684F36] to-[#B39977] bg-300% animate-gradient mb-4">
                    وش كاين قدامك الآن؟
                  </h3>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-[#FFD700] to-[#D4AF37] rounded-full animate-pulse"></div>
                </div>
                <p className="text-xl text-[#684F36] font-medium mt-6">رحلتك نحو الاحتراف تبدأ من هنا:</p>
              </div>
              
              {/* Unique Timeline Style */}
              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  {/* Center Line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#B39977] via-[#684F36] to-[#B39977] rounded-full"></div>
                  
                  {/* Timeline Items */}
                  <div className="space-y-12">
                    <div className="flex items-center">
                      <div className="w-1/2 text-left pr-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-[#B39977]/30 hover:shadow-2xl transition-all duration-300">
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-lg flex items-center justify-center text-white font-bold mr-3">
                              1
                            </div>
                            <h4 className="font-bold text-[#342519] text-lg">محتوى يعمل Offline</h4>
                          </div>
                          <p className="text-[#684F36]">فلاش ديسك عقاري يخدم بلا إنترنت، وفر الوقت والمال</p>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold z-10">
                        💾
                      </div>
                      <div className="w-1/2"></div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-1/2"></div>
                      <div className="w-12 h-12 bg-gradient-to-r from-[#684F36] to-[#B39977] rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold z-10">
                        📋
                      </div>
                      <div className="w-1/2 text-right pl-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-[#684F36]/30 hover:shadow-2xl transition-all duration-300">
                          <div className="flex items-center mb-3 justify-end">
                            <h4 className="font-bold text-[#342519] text-lg">منظم ومركز</h4>
                            <div className="w-10 h-10 bg-gradient-to-r from-[#684F36] to-[#B39977] rounded-lg flex items-center justify-center text-white font-bold ml-3">
                              2
                            </div>
                          </div>
                          <p className="text-[#684F36]">فيه أساسيات المجال بدون لف ودوران على نفسك</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-1/2 text-left pr-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-[#B39977]/30 hover:shadow-2xl transition-all duration-300">
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-lg flex items-center justify-center text-white font-bold mr-3">
                              3
                            </div>
                            <h4 className="font-bold text-[#342519] text-lg">شامل ومتكامل</h4>
                          </div>
                          <p className="text-[#684F36]">يجمع القانون + التسويق + نماذج جاهزة في مكان واحد</p>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold z-10">
                        🎯
                      </div>
                      <div className="w-1/2"></div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-1/2"></div>
                      <div className="w-12 h-12 bg-gradient-to-r from-[#684F36] to-[#B39977] rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold z-10">
                        👥
                      </div>
                      <div className="w-1/2 text-right pl-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-[#684F36]/30 hover:shadow-2xl transition-all duration-300">
                          <div className="flex items-center mb-3 justify-end">
                            <h4 className="font-bold text-[#342519] text-lg">للجميع</h4>
                            <div className="w-10 h-10 bg-gradient-to-r from-[#684F36] to-[#B39977] rounded-lg flex items-center justify-center text-white font-bold ml-3">
                              4
                            </div>
                          </div>
                          <p className="text-[#684F36]">مناسب للمبتدئين والوسطاء والخبراء على حد سواء</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-1/2 text-left pr-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-[#B39977]/30 hover:shadow-2xl transition-all duration-300">
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-lg flex items-center justify-center text-white font-bold mr-3">
                              5
                            </div>
                            <h4 className="font-bold text-[#342519] text-lg">رؤية واضحة</h4>
                          </div>
                          <p className="text-[#684F36]">يعطيك خريطة طريق واضحة قبل أي خطوة أو استثمار</p>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold z-10">
                        🔮
                      </div>
                      <div className="w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Unique Bottom Banner */}
              <div className="text-center mt-16">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#D4AF37] rounded-full blur-xl animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-[#B39977] to-[#684F36] text-white rounded-full px-12 py-6 shadow-2xl border-2 border-white/20">
                    <div className="flex items-center">
                      <span className="text-4xl mr-4 animate-bounce">🚀</span>
                      <div className="text-right">
                        <p className="font-bold text-2xl mb-1">انطلاقتك الاحترافية</p>
                        <p className="text-lg opacity-90">تبدأ الآن مع الفلاش العقاري</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Target Audience */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-black text-[#342519] mb-6">لمن هذا المنتج؟</h3>
              <div className="w-20 h-2 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer mb-8"></div>
              <p className="text-xl text-[#684F36] font-medium">هذا الدليل مناسب للناس اللي:</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-2xl border-4 border-[#B39977]/30 hover:border-[#B39977]/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center text-white text-xl font-bold mr-3">
                      🚀
                    </div>
                    <h4 className="font-bold text-[#342519] text-lg">المبتدئين الطموحين</h4>
                  </div>
                  <p className="text-[#684F36]">حابة تدخل مجال العقار بدون عشوائية وتبدأ بطريقة صحيحة</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#684F36]/30 to-[#B39977]/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-2xl border-4 border-[#684F36]/30 hover:border-[#684F36]/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#684F36] to-[#B39977] rounded-full flex items-center justify-center text-white text-xl font-bold mr-3">
                      ⚖️
                    </div>
                    <h4 className="font-bold text-[#342519] text-lg">الوسطاء العقاريين</h4>
                  </div>
                  <p className="text-[#684F36]">تخدم وساطة عقارية وتفهم القانون والنماذج بذكاء</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-2xl border-4 border-[#B39977]/30 hover:border-[#B39977]/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center text-white text-xl font-bold mr-3">
                      📈
                    </div>
                    <h4 className="font-bold text-[#342519] text-lg">الباحثين عن النمو</h4>
                  </div>
                  <p className="text-[#684F36]">تزيد الصفقات وتتعامل بذكاء وتطور مهاراتك</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#684F36]/30 to-[#B39977]/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-2xl border-4 border-[#684F36]/30 hover:border-[#684F36]/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#684F36] to-[#B39977] rounded-full flex items-center justify-center text-white text-xl font-bold mr-3">
                      ⏰
                    </div>
                    <h4 className="font-bold text-[#342519] text-lg">أصحاب الوقت المحدود</h4>
                  </div>
                  <p className="text-[#684F36]">ما عندهاش وقت تقرأ 50 فيديو متشتتين، محتوى منظم ومركز</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-2xl border-4 border-[#B39977]/30 hover:border-[#B39977]/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center text-white text-xl font-bold mr-3">
                      📱
                    </div>
                    <h4 className="font-bold text-[#342519] text-lg">المستخدمين Offline</h4>
                  </div>
                  <p className="text-[#684F36]">الإنترنت عندهم ضعيف، محتوى كامل يعمل بدون اتصال</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#684F36]/30 to-[#B39977]/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-2xl border-4 border-[#684F36]/30 hover:border-[#684F36]/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#684F36] to-[#B39977] rounded-full flex items-center justify-center text-white text-xl font-bold mr-3">
                      💡
                    </div>
                    <h4 className="font-bold text-[#342519] text-lg">الباحثين عن المعرفة</h4>
                  </div>
                  <p className="text-[#684F36]">حابين يفهموا المجال بعمق قبل ما يبدأوا أي استثمار</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <div className="inline-flex items-center bg-gradient-to-r from-[#FFD700]/20 to-[#D4AF37]/20 rounded-full px-8 py-4 border-2 border-[#D4AF37]/30">
                <span className="text-3xl mr-3">🎯</span>
                <span className="text-[#342519] font-bold text-xl">مناسب لك إذا كنت جاد في النجاح في العقارات</span>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#342519] mb-8 text-center">❓ الأسئلة المتكررة</h3>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#B39977]/20">
                <h4 className="font-bold text-[#342519] mb-2">هل الفلاشة تعوض الدورة الكاملة؟</h4>
                <p className="text-[#684F36]">لا. الفلاشة تعطيك محتوى نظري + قانون + تسويق + نماذج باش تفهم المجال وتبدأ بطريقة صحيحة. الدورة الكاملة (17,000 دج) فيها متابعة + تطبيق + تصحيح + صفقات وهذا مستوى آخر.</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#684F36]/20">
                <h4 className="font-bold text-[#342519] mb-2">هل نحتاج إنترنت باش نشوف المحتوى؟</h4>
                <p className="text-[#684F36]">لا. المحتوى كامل Offline: PDF + فيديوهات + ملفات + نماذج.</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#B39977]/20">
                <h4 className="font-bold text-[#342519] mb-2">كيفاش نخدم الفلاشة؟</h4>
                <p className="text-[#684F36]">تركب USB في الكمبيوتر وتدخل للملفات مباشرة، كلش منظم داخل دوسيات.</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#684F36]/20">
                <h4 className="font-bold text-[#342519] mb-2">هل فيها متابعة أو أسئلة؟</h4>
                <p className="text-[#684F36]">لا. الفلاشة بدون متابعة. إذا حبيت المتابعة 3 أشهر، كاين دورة منفصلة.</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#B39977]/20">
                <h4 className="font-bold text-[#342519] mb-2">هل نقدر نرقّي من الفلاشة للدورة الكاملة؟</h4>
                <p className="text-[#684F36]">نعم. تقدر تدير Upgrade وتخلص غير الفرق.</p>
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-3xl p-8 text-white shadow-2xl">
              <h3 className="text-3xl font-black mb-4">السعر</h3>
              <div className="text-5xl font-black mb-4">5000 دج</div>
              <div className="bg-white/20 rounded-2xl p-4 mb-4">
                <p className="text-xl font-bold">زايد كتاب 📕 دليل أول صفقة عقارية</p>
              </div>
              <p className="text-lg">الدفع عند الاستلام في معظم الولايات</p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#F5E6D9] to-[#EDE6D9]">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-[#B39977]/30">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-black text-[#342519] mb-6">اطلب فلاشك العقاري الآن</h3>
              <p className="text-[#684F36] text-lg">املأ النموذج و فريق الخبير للعقارات رايح يتواصلو معاك</p>
            </div>

            {/* Price Display */}
            <div className="bg-gradient-to-r from-[#B39977]/10 to-[#684F36]/10 text-center  rounded-2xl p-6 mb-6">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text py-4 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#B8860B] mb-2">5000 دج</div>
              <p className="text-lg text-[#684F36] font-medium">خمسة آلاف</p>
            </div>

            <form id="registration-form" onSubmit={handleSubmit} className="space-y-6">
              {/* Hidden field for product identification */}
              <input type="hidden" name="product" value="USB" />
              
              <div>
                <label className="block text-[#342519] font-bold mb-2">الاسم الكامل *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#B39977]/30 focus:border-[#B39977] focus:outline-none transition-colors text-[#1a0f08] placeholder-[#684F36]"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              <div>
                <label className="block text-[#342519] font-bold mb-2">رقم الهاتف *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors text-[#1a0f08] placeholder-[#684F36] ${
                    phoneError 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-[#B39977]/30 focus:border-[#B39977]'
                  }`}
                  placeholder="أدخل رقم هاتفك"
                />
                {phoneError && (
                  <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                )}
              </div>

              <div>
                <label className="block text-[#342519] font-bold mb-2">الولاية *</label>
                <select
                  required
                  value={formData.willaya}
                  onChange={(e) => setFormData({...formData, willaya: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#B39977]/30 focus:border-[#B39977] focus:outline-none transition-colors text-[#1a0f08]"
                >
                  <option value="">اختر الولاية</option>
                  {algerianWillayas.map((willaya) => (
                    <option key={willaya} value={willaya}>{willaya}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#342519] font-bold mb-2">البلدية *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#B39977]/30 focus:border-[#B39977] focus:outline-none transition-colors text-[#1a0f08] placeholder-[#684F36]"
                  placeholder="أدخل بلديتك"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#B39977] to-[#684F36] text-white font-bold py-4 rounded-xl hover:from-[#684F36] hover:to-[#B39977] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                اطلب الآن
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[#684F36] font-medium">💳 الدفع عند الاستلام</p>
              <p className="text-[#684F36] text-sm mt-2">نخدمو التوصيل لكل الولايات</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
