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

export default function CoursePage() {
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
        content_name: 'Course Registration',
        content_category: 'Education',
        value: 17000,
        currency: 'DZD'
      });
    }
    
    // Create order in backend
    try {
      const orderData = {
        type: 'course',
        price: 17000,
        phoneNumber: formData.phone,
        fullName: formData.fullName,
        willaya: formData.willaya,
        city: formData.city,
        time: {
          day: new Date().toISOString().split('T')[0],
          hour: new Date().toTimeString().split(' ')[0].substring(0, 5)
        },
        description: `طلب دورة من ${formData.fullName} - ${formData.willaya}, ${formData.city}`
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
    router.push('/thank-you');
    
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
        console.log('Form submitted successfully to Google Sheets');
        
        // Track successful form submission
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('trackCustom', 'CourseFormSubmitted', {
            fullName: formData.fullName,
            phone: formData.phone,
            willaya: formData.willaya,
            city: formData.city
          });
          
          // Track purchase/initiate checkout
          window.fbq('track', 'InitiateCheckout', {
            value: 17000,
            currency: 'DZD',
            content_ids: ['course_real_estate'],
            content_type: 'education'
          });
        }
      } else {
        console.error('Failed to submit form');
        
        // Track form submission error
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('trackCustom', 'CourseFormError', {
            error: 'Failed to submit form'
          });
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Track form submission exception
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('trackCustom', 'CourseFormException', {
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

      {/* Hero Section with Responsive Layout */}
      <section className="relative py-20 px-4">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#B39977]/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#684F36]/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Powerful Opening Heading */}
          <div className="text-center mb-12">
            <div className="inline-block">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#B8860B] mb-6 animate-pulse-glow px-8 py-4 rounded-3xl bg-gradient-to-r from-[#B39977]/10 to-[#684F36]/10 backdrop-blur-sm border-2 border-[#B39977]/20">
اول منصة جزائرية دير دورة اونلاين في مجال العقارات بطريقة احترافية 
و تزيد توفرلكم مناصب شغل              </h1>
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer mb-8"></div>
          </div>
          
          {/* Desktop Layout: Full Width Content */}
          <div className="hidden lg:block">
            {/* Full Width Header Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#342519] mb-6 animate-fade-in-up">
                دورة العقارات المتكاملة
              </h1>
              <div className="w-24 h-2 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer mb-8"></div>
              <p className="text-xl md:text-2xl text-[#342519] max-w-4xl mx-auto leading-relaxed font-medium">
                دورة اونلاين لمدة 3 اشهر في مجال العقارات + متابعة من طرف محامية عقارية و خبير تسويق و موثق و مستشار عقاري
              </p>
            </div>

            {/* Course Images - Full Width Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-white rounded-2xl p-4 shadow-2xl border-4 border-[#B39977]/30 hover:border-[#B39977]/50 transition-all duration-300 hover:scale-105">
                  <Image
                    src="https://res.cloudinary.com/dicpjm1dz/image/upload/v1769374054/image_23_xvmb83.png"
                    alt="محامية عقارية"
                    width={600}
                    height={400}
                    className="w-full h-64 md:h-80 object-cover rounded-xl"
                  />
                  <div className="mt-4 text-center">
                    <h3 className="text-2xl font-bold text-[#342519]">متابعة قانونية</h3>
                    <p className="text-[#684F36] mt-2">محامية عقارية متخصصة</p>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#684F36]/30 to-[#B39977]/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-white rounded-2xl p-4 shadow-2xl border-4 border-[#684F36]/30 hover:border-[#684F36]/50 transition-all duration-300 hover:scale-105">
                  <Image
                    src="https://res.cloudinary.com/dicpjm1dz/image/upload/v1769374038/image_21_vdja5c.png"
                    alt="خبير تسويق عقاري"
                    width={600}
                    height={400}
                    className="w-full h-64 md:h-80 object-cover rounded-xl"
                  />
                  <div className="mt-4 text-center">
                    <h3 className="text-2xl font-bold text-[#342519]">تسويق عقاري</h3>
                    <p className="text-[#684F36] mt-2">خبير في التسويق العقاري</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Section - Full Width Desktop */}
          <div className="hidden lg:block mt-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#B39977]/25 to-[#684F36]/25 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
              <div className="relative bg-white rounded-3xl p-10 shadow-2xl border-4 border-[#B39977]/30 hover:border-[#B39977]/50 transition-all duration-300 hover:scale-105">
                {/* Certificate Image with Overlay Text */}
                <div className="relative flex justify-center">
                  <Image
                    src="https://res.cloudinary.com/dicpjm1dz/image/upload/v1769374180/IMG_7129.JPG_1_snf1wb.jpg"
                    alt="شهادة الدورة"
                    width={800}
                    height={600}
                    className="max-w-full h-auto object-contain rounded-2xl"
                  />
                  
                  {/* Overlay Information Text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl">
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-2xl font-bold mb-2">شهادة حضور في مجال العقارات</h4>
                          <p className="text-lg opacity-90"> من الخبير للعقارات</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm opacity-80 mb-1">رقم الشهادة</div>
                          <div className="text-xl font-bold">RE-2026-001</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center border-t border-white/20 pt-4">
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <div className="text-center">
                            <div className="text-xs opacity-80">تاريخ الإصدار</div>
                            <div className="font-semibold">2026</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs opacity-80">مدة صلاحية</div>
                            <div className="font-semibold">مدى الحياة</div>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 text-center">
                  <h3 className="text-4xl font-black text-[#342519] mb-4">شهادة حضور في مجال العقارات</h3>
                  <div className="w-32 h-1 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full mb-6"></div>
                  <p className="text-[#684F36] text-xl font-medium mb-8">تحصل على شهادة حضور في مجال العقارات  من الخبير للعقارات</p>
                  <div className="mt-8 flex justify-center space-x-8 space-x-reverse">
                    <div className="flex items-center text-[#342519] font-medium text-lg">
                      <span className="text-green-500 ml-3 text-xl">✅</span>
                      <span>شهادة </span>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Content - After Form */}
          <div className="lg:hidden space-y-12">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#342519] mb-6 animate-fade-in-up">
                دورة العقارات المتكاملة
              </h1>
              <div className="w-20 h-2 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer mb-6"></div>
              <p className="text-lg md:text-xl text-[#342519] max-w-4xl mx-auto leading-relaxed font-medium">
                دورة اونلاين لمدة 3 اشهر في مجال العقارات + متابعة من طرف محامية عقارية و خبير تسويق و موثق و مستشار عقاري
              </p>
            </div>

              {/* Course Images */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-white rounded-2xl p-3 shadow-xl border-4 border-[#B39977]/30 hover:border-[#B39977]/50 transition-all duration-300 hover:scale-105">
                    <Image
                      src="https://res.cloudinary.com/dicpjm1dz/image/upload/v1769374054/image_23_xvmb83.png"
                      alt="محامية عقارية"
                      width={600}
                      height={400}
                      className="w-full h-48 md:h-64 object-cover rounded-xl"
                    />
                    <div className="mt-3 text-center">
                      <h3 className="text-lg md:text-xl font-bold text-[#342519]">متابعة قانونية</h3>
                      <p className="text-[#684F36] mt-1 text-sm">محامية عقارية متخصصة</p>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#684F36]/30 to-[#B39977]/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-white rounded-2xl p-3 shadow-xl border-4 border-[#684F36]/30 hover:border-[#684F36]/50 transition-all duration-300 hover:scale-105">
                    <Image
                      src="https://res.cloudinary.com/dicpjm1dz/image/upload/v1769374038/image_21_vdja5c.png"
                      alt="خبير تسويق عقاري"
                      width={600}
                      height={400}
                      className="w-full h-48 md:h-64 object-cover rounded-xl"
                    />
                    <div className="mt-3 text-center">
                      <h3 className="text-lg md:text-xl font-bold text-[#342519]">تسويق عقاري</h3>
                      <p className="text-[#684F36] mt-1 text-sm">خبير في التسويق العقاري</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Course Image */}
              <div className="mt-8 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#B39977]/25 to-[#684F36]/25 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
                <div className="relative bg-white rounded-3xl p-6 shadow-2xl border-4 border-[#B39977]/30 hover:border-[#B39977]/50 transition-all duration-300 hover:scale-105">
                  {/* Certificate Image with Overlay Text */}
                  <div className="relative flex justify-center">
                    <Image
                      src="https://res.cloudinary.com/dicpjm1dz/image/upload/v1769374180/IMG_7129.JPG_1_snf1wb.jpg"
                      alt="شهادة الدورة"
                      width={600}
                      height={450}
                      className="max-w-full h-auto object-contain rounded-2xl"
                    />
                    
                    {/* Overlay Information Text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-bold mb-1">شهادة إتمام الدورة</h4>
                            <p className="text-sm opacity-90"> من الخبير للعقارات</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xs opacity-80 mb-1">رقم الشهادة</div>
                            <div className="text-sm font-bold">RE-2026-001</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center border-t border-white/20 pt-3">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="text-center">
                              <div className="text-xs opacity-80">تاريخ</div>
                              <div className="text-sm font-semibold">2026</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs opacity-80">صلاحية</div>
                              <div className="text-sm font-semibold">مدى الحياة</div>
                            </div>
                          </div>
                        
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-2xl md:text-3xl font-black text-[#342519] mb-3">شهادة حضور في مجال العقارات</h3>
                    <div className="w-20 h-1 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full mb-4"></div>
                    <p className="text-[#684F36] text-lg font-medium">تحصل على شهادة حضور في مجال العقارات  من الخبير للعقارات</p>
                    <div className="mt-4 flex justify-center space-x-4 space-x-reverse">
                      <div className="flex items-center text-[#342519] font-medium">
                        <span className="text-green-500 ml-2 text-xl">✅</span>
                        <span>شهادة </span>
                      </div>
                    
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-20 px-4 bg-[#EDE6D9] relative">
        <div className="absolute top-15 right-15 w-32 h-32 bg-[#B39977]/15 rounded-full blur-2xl animate-float hidden md:block"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#342519] mb-6">ماذا تحتوي الدورة؟</h2>
            <div className="w-20 h-2 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Legal Section */}
            <div 
              className="relative rounded-3xl p-8 shadow-2xl border-4 border-[#B39977]/20 hover:border-[#B39977]/40 transition-all duration-300 hover:scale-105 overflow-hidden"
              style={{
                backgroundImage: `url('https://res.cloudinary.com/dicpjm1dz/image/upload/v1769366012/image_20_wkkfff.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-white/85"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center text-white text-2xl font-bold ml-4 animate-pulse-glow">
                    ⚖️
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#342519]">القانون العقاري</h3>
                </div>
                
                <div className="space-y-3 text-right">
                  <div className="flex items-center text-[#342519] font-medium">
                    <span className="text-green-500 ml-3 text-xl">✅</span>
                    <span>الأراضي بمختلف أنواعها</span>
                  </div>
                  <div className="flex items-center text-[#342519] font-medium">
                    <span className="text-green-500 ml-3 text-xl">✅</span>
                    <span>الشقق المبنية من طرف الدولة</span>
                  </div>
                  <div className="flex items-center text-[#342519] font-medium">
                    <span className="text-green-500 ml-3 text-xl">✅</span>
                    <span>الشقق المبنية من طرف المرقي العقاري</span>
                  </div>
                  <div className="flex items-center text-[#342519] font-medium">
                    <span className="text-green-500 ml-3 text-xl">✅</span>
                    <span>الوثائق و العقود</span>
                  </div>
                  <div className="flex items-center text-[#342519] font-medium">
                    <span className="text-green-500 ml-3 text-xl">✅</span>
                    <span>المحافظة العقارية</span>
                  </div>
                  <div className="flex items-center text-[#342519] font-medium">
                    <span className="text-green-500 ml-3 text-xl">✅</span>
                    <span>الفريصة</span>
                  </div>
                  <div className="flex items-center text-[#342519] font-medium">
                    <span className="text-green-500 ml-3 text-xl">✅</span>
                    <span>الشيوع و الخروج من الشيوع</span>
                  </div>
                  <div className="flex items-center text-[#342519] font-medium">
                    <span className="text-green-500 ml-3 text-xl">✅</span>
                    <span>كيفية تسوية الوثائق و العقود</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Marketing Section */}
            <div 
              className="relative rounded-3xl p-8 shadow-2xl border-4 border-[#684F36]/20 hover:border-[#684F36]/40 transition-all duration-300 hover:scale-105 overflow-hidden"
              style={{
                backgroundImage: `url('https://res.cloudinary.com/dicpjm1dz/image/upload/v1769366012/image_20_wkkfff.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-white/85"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#684F36] to-[#B39977] rounded-full flex items-center justify-center text-white text-2xl font-bold ml-4 animate-pulse-glow">
                    📈
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#342519]">التسويق العقاري</h3>
                </div>
                
                <div className="space-y-3 text-right">
                  <div className="flex items-center text-[#342519] font-medium">
                    <span className="text-green-500 ml-3 text-xl">✅</span>
                    <span>كيفاش نجيب العقارات و كيفاش نتفاوض مع أصحاب العقارات و كيفاش نضمن حقي</span>
                  </div>
                  <div className="flex items-center text-[#342519] font-medium">
                    <span className="text-green-500 ml-3 text-xl">✅</span>
                    <span>كيفاش نجيب زبائن و كيفاش نتفاوض مع الزبائن و كيفاش نضمن حقي</span>
                  </div>
                  <div className="flex items-center text-[#342519] font-medium">
                    <span className="text-green-500 ml-3 text-xl">✅</span>
                    <span>كيفاش نبني علامة تجارية</span>
                  </div>
                  <div className="flex items-center text-[#342519] font-medium">
                    <span className="text-green-500 ml-3 text-xl">✅</span>
                    <span>طرق التسويق الحديثة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Follow-up Section */}
          <div className="mt-12 bg-gradient-to-br from-[#B39977]/10 to-[#684F36]/10 rounded-3xl p-8 border-4 border-[#B39977]/30">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-4xl font-black text-[#342519] mb-4">متابعة من طرف 4 خبراء</h3>
              <div className="w-16 h-2 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer"></div>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 text-center border-2 border-[#B39977]/20 hover:border-[#B39977]/40 transition-all duration-300">
                <div className="relative z-10">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4 animate-pulse-glow overflow-hidden relative"
                    style={{
                      backgroundImage: `url('https://res.cloudinary.com/dicpjm1dz/image/upload/v1769374037/image_22_f66lol.png')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    {/* Overlay for icon visibility */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B39977]/80 to-[#684F36]/80"></div>
                    <span className="relative z-10">👩‍⚖️</span>
                  </div>
                  <h4 className="text-xl font-bold text-[#342519] mb-2">محامية عقارية</h4>
                  <p className="text-[#684F36]">متابعة في الواتساب و تلغرام ترافقكم دائماً حتى أول صفقة لكم</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 text-center border-2 border-[#684F36]/20 hover:border-[#684F36]/40 transition-all duration-300">
                <div className="relative z-10">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4 animate-pulse-glow overflow-hidden relative"
                    style={{
                      backgroundImage: `url('https://res.cloudinary.com/dicpjm1dz/image/upload/v1769374054/image_23_xvmb83.png')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    {/* Overlay for icon visibility */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#684F36]/80 to-[#B39977]/80"></div>
                    <span className="relative z-10">📝</span>
                  </div>
                  <h4 className="text-xl font-bold text-[#342519] mb-2">موثقة عقارية</h4>
                  <p className="text-[#684F36]">متابعة في واتساب و تلغرام</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 text-center border-2 border-[#B39977]/20 hover:border-[#B39977]/40 transition-all duration-300">
                <div className="relative z-10">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4 animate-pulse-glow overflow-hidden relative"
                    style={{
                      backgroundImage: `url('https://res.cloudinary.com/dicpjm1dz/image/upload/v1769374038/image_21_vdja5c.png')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    {/* Overlay for icon visibility */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B39977]/80 to-[#684F36]/80"></div>
                    <span className="relative z-10">🎯</span>
                  </div>
                  <h4 className="text-xl font-bold text-[#342519] mb-2">خبير تسويق</h4>
                  <p className="text-[#684F36]">متابعة يومية في التسويق العقاري</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 text-center border-2 border-[#684F36]/20 hover:border-[#684F36]/40 transition-all duration-300">
                <div className="relative z-10">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4 animate-pulse-glow overflow-hidden relative"
                    style={{
                      backgroundImage: `url('https://res.cloudinary.com/dgywxqq50/image/upload/v1770478931/WhatsApp_Image_2026-02-07_at_3.43.41_PM_y07f0c.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    {/* Overlay for icon visibility */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B39977]/80 to-[#684F36]/80"></div>
                    <span className="relative z-10">🏢</span>
                  </div>
                  <h4 className="text-xl font-bold text-[#342519] mb-2">الخبير الرابع</h4>
                  <p className="text-[#684F36]">مستشار عقاري</p>
                  <p className="text-[#684F36]">مدرب دولي</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-[#B39977] to-[#684F36] text-white rounded-2xl p-6 inline-block">
                <h4 className="text-2xl font-bold mb-2">مجموعات VIP مغلوقة</h4>
                <p className="text-lg">مع المتدربين للتواصل و المشاركة</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Course Features Section - Before Form */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#F5E6D9] to-[#EDE6D9] relative">
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#B39977]/15 rounded-full blur-2xl animate-float hidden md:block"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#684F36]/15 rounded-full blur-2xl animate-float hidden md:block" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-[#B39977]/30">
            {/* Price Header */}
           

            {/* Features Grid */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🔥</span>
                <h3 className="text-2xl font-bold text-[#342519]">يشمل:</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <span className="text-green-500 text-xl ml-3 mt-1">✔</span>
                  <span className="text-[#342519] font-medium">القانون العقاري</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 text-xl ml-3 mt-1">✔</span>
                  <span className="text-[#342519] font-medium">التسويق العقاري</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 text-xl ml-3 mt-1">✔</span>
                  <span className="text-[#342519] font-medium">تدريب عملي + تصحيح</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 text-xl ml-3 mt-1">✔</span>
                  <span className="text-[#342519] font-medium">متابعة 3 أشهر</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 text-xl ml-3 mt-1">✔</span>
                  <span className="text-[#342519] font-medium">مرافقة 4 خبراء</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 text-xl ml-3 mt-1">✔</span>
                  <span className="text-[#342519] font-medium">ملفات + فيديوهات</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 text-xl ml-3 mt-1">✔</span>
                  <span className="text-[#342519] font-medium">مجتمع خاص للطلاب</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mb-6">
              <div className="flex items-center justify-center bg-gradient-to-r from-[#684F36]/10 to-[#B39977]/10 rounded-2xl p-4">
                <span className="text-2xl mr-3">💳</span>
                <span className="text-[#342519] font-medium text-lg">الدفع عند الاستلام داخل الجزائر</span>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-gradient-to-r from-[#B39977]/5 to-[#684F36]/5 rounded-2xl p-6 border-2 border-[#B39977]/20">
              <div className="flex items-start mb-4">
                <span className="text-2xl mr-3 mt-1">📝</span>
                <div>
                  <h4 className="font-bold text-[#342519] mb-2">ملاحظة مهمة:</h4>
                  <p className="text-[#684F36] leading-relaxed">هذا برنامج تطبيقي… ماشي مجرد فيديوهات جاهزة.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-2xl mr-3 mt-1">📈</span>
                <div>
                  <h4 className="font-bold text-[#342519] mb-2">والنتائج موجودة:</h4>
                  <p className="text-[#684F36] leading-relaxed">بعض المشاركين دارو أول صفقات في أقل من شهر ونص 💪</p>
                  <p className="text-[#684F36] leading-relaxed mt-2">وكاين شهادات وتجارب حقيقية من الناس اللي خدت الدورة.</p>
                </div>
              </div>
              
              {/* Free Book Gift */}
              <div className="mt-6 bg-gradient-to-r from-[#FFD700]/20 to-[#D4AF37]/20 rounded-2xl p-6 text-center border-2 border-[#D4AF37]/30">
                <div className="flex items-center justify-center mb-3">
                  <span className="text-3xl mr-3">🎁</span>
                  <h4 className="text-xl font-bold text-[#342519]">هدية كتاب مجانا</h4>
                </div>
                <p className="text-[#684F36] font-medium">كل مسجل يحصل على كتاب عقاري مجاني مع الدورة</p>
              </div>
              
              {/* Important Call-to-Action Notice */}
             
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#EDE6D9] to-[#F5E6D9] relative">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#B39977]/15 rounded-full blur-2xl animate-float hidden md:block"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#684F36]/15 rounded-full blur-2xl animate-float hidden md:block" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-[#342519] mb-6">آراء المتدربين</h2>
            <div className="w-24 h-2 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer mb-8"></div>
            <p className="text-xl text-[#684F36] font-medium mb-4">مجموعات VIP مغلوقة</p>
            <p className="text-lg text-[#684F36]">مع المتدربين للتواصل و المشاركة</p>
          </div>

          <div className="lg:hidden overflow-x-auto pb-4">
            <div className="flex space-x-4 space-x-reverse w-max">
              {/* Review 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-2xl border-4 border-[#B39977]/20 hover:border-[#B39977]/40 transition-all duration-300 hover:scale-105 w-80 flex-shrink-0">
                <div className="relative mb-4">
                  <Image
                    src="https://res.cloudinary.com/dicpjm1dz/image/upload/v1769433853/image_26_wciwtr.png"
                    alt="مراجعة المتدرب 1"
                    width={300}
                    height={400}
                    className="w-full h-64 object-cover rounded-xl"
                  />
        
                </div>
                <div className="text-center">
                  <p className="text-[#342519] font-medium mb-2">تجربة رائعة!</p>
                  <p className="text-[#684F36] text-sm">دورة ممتازة changed my life
                     ⭐⭐⭐⭐⭐
                  </p>
                </div>
              </div>

              {/* Review 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-2xl border-4 border-[#684F36]/20 hover:border-[#684F36]/40 transition-all duration-300 hover:scale-105 w-80 flex-shrink-0">
                <div className="relative mb-4">
                  <Image
                    src="https://res.cloudinary.com/dicpjm1dz/image/upload/v1769433847/image_24_zqugly.png"
                    alt="مراجعة المتدرب 2"
                    width={300}
                    height={400}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  
                </div>
                <div className="text-center">
                  <p className="text-[#342519] font-medium mb-2">أفضل استثمار</p>
                  <p className="text-[#684F36] text-sm">نتائج مذهلة في وقت قياسي 
                     ⭐⭐⭐⭐⭐
                  </p>
                </div>
              </div>

              {/* Review 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-2xl border-4 border-[#B39977]/20 hover:border-[#B39977]/40 transition-all duration-300 hover:scale-105 w-80 flex-shrink-0">
                <div className="relative mb-4">
                  <Image
                    src="https://res.cloudinary.com/dicpjm1dz/image/upload/v1769433838/image_25_jr6vcq.png"
                    alt="مراجعة المتدرب 3"
                    width={300}
                    height={400}
                    className="w-full h-64 object-cover rounded-xl"
                  />
        
                </div>
                <div className="text-center">
                  <p className="text-[#342519] font-medium mb-2">محتوى غني</p>
                  <p className="text-[#684F36] text-sm">متابعة ممتازة وخبراء محترفين
                     ⭐⭐⭐⭐⭐
                  </p>
                </div>
              </div>

              {/* Review 4 */}
              <div className="bg-white rounded-2xl p-6 shadow-2xl border-4 border-[#684F36]/20 hover:border-[#684F36]/40 transition-all duration-300 hover:scale-105 w-80 flex-shrink-0">
                <div className="relative mb-4">
                  <Image
                    src="https://res.cloudinary.com/dicpjm1dz/image/upload/v1769433839/image_27_qsr1mt.png"
                    alt="مراجعة المتدرب 4"
                    width={300}
                    height={400}
                    className="w-full h-64 object-cover rounded-xl"
                  />
             
                </div>
                <div className="text-center">
                  <p className="text-[#342519] font-medium mb-2">توصي بشدة</p>
                  <p className="text-[#684F36] text-sm">أول صفقة بعد شهرين فقط!
                     ⭐⭐⭐⭐⭐
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            {/* Review 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl border-4 border-[#B39977]/20 hover:border-[#B39977]/40 transition-all duration-300 hover:scale-105">
              <div className="relative mb-4">
                <Image
                  src="https://res.cloudinary.com/dicpjm1dz/image/upload/v1769433853/image_26_wciwtr.png"
                  alt="مراجعة المتدرب 1"
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
              <div className="text-center">
                <p className="text-[#342519] font-medium mb-2">تجربة رائعة!</p>
                <p className="text-[#684F36] text-sm">دورة ممتازة changed my life
                   ⭐⭐⭐⭐⭐
                </p>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl border-4 border-[#684F36]/20 hover:border-[#684F36]/40 transition-all duration-300 hover:scale-105">
              <div className="relative mb-4">
                <Image
                  src="https://res.cloudinary.com/dicpjm1dz/image/upload/v1769433847/image_24_zqugly.png"
                  alt="مراجعة المتدرب 2"
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
              <div className="text-center">
                <p className="text-[#342519] font-medium mb-2">أفضل استثمار</p>
                <p className="text-[#684F36] text-sm">نتائج مذهلة في وقت قياسي 
                   ⭐⭐⭐⭐⭐
                </p>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl border-4 border-[#B39977]/20 hover:border-[#B39977]/40 transition-all duration-300 hover:scale-105">
              <div className="relative mb-4">
                <Image
                  src="https://res.cloudinary.com/dicpjm1dz/image/upload/v1769433838/image_25_jr6vcq.png"
                  alt="مراجعة المتدرب 3"
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
              <div className="text-center">
                <p className="text-[#342519] font-medium mb-2">محتوى غني</p>
                <p className="text-[#684F36] text-sm">متابعة ممتازة وخبراء محترفين
                   ⭐⭐⭐⭐⭐
                </p>
              </div>
            </div>

            {/* Review 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl border-4 border-[#684F36]/20 hover:border-[#684F36]/40 transition-all duration-300 hover:scale-105">
              <div className="relative mb-4">
                <Image
                  src="https://res.cloudinary.com/dicpjm1dz/image/upload/v1769433839/image_27_qsr1mt.png"
                  alt="مراجعة المتدرب 4"
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
              <div className="text-center">
                <p className="text-[#342519] font-medium mb-2">توصي بشدة</p>
                <p className="text-[#684F36] text-sm">أول صفقة بعد شهرين فقط!
                   ⭐⭐⭐⭐⭐
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center bg-gradient-to-r from-[#B39977]/10 to-[#684F36]/10 rounded-full px-6 py-3 border-2 border-[#B39977]/30">
              <span className="text-2xl mr-3">👥</span>
              <span className="text-[#342519] font-bold text-lg">انضم لمئات المتدربين الناجحين</span>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section - At the End */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#B39977]/10 to-[#684F36]/10 relative">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#B39977]/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#684F36]/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="max-w-2xl mx-auto relative z-10">
          <div id="registration-form" ref={setFormRef} className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-[#684F36]/30">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-black text-[#342519] mb-6">طلب التسجيل</h2>
              <div className="w-16 h-2  bg-gradient-to-r from-[#684F36] to-[#B39977] mx-auto rounded-full animate-shimmer mb-6"></div>
               <div className="mt-6 mb-4 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-2xl p-6 text-center">
                <p className="text-white text-xl md:text-2xl font-bold leading-relaxed">
                  سجل معلوماتك و فريق الخبير للعقارات رايح يتواصلو معاك و يفهموك فالدورة
                </p>
              </div>
              {/* Price Display */}
            
              
              <p className="text-[#684F36]">الدفع عند الاستلام في جميع أنحاء الجزائر</p>
              <p className="text-red-600 text-lg">
مع توفير فرصة عمل داخل المنصة 
تكوين + عمل</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Hidden field for product identification */}
              <input type="hidden" name="product" value="Course" />
              
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
                طلب التسجيل الآن
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
  );
}
