'use client';

import { useState, useEffect } from 'react';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    {
      title: "🎯 رؤيتنا",
      content: "نصنع جيلاً جديد من الخبراء العقاريين الجزائريين، مؤهلين بمعرفة عملية وفرص حقيقية في السوق.",
      icon: "👁️"
    },
    {
      title: "💪 رسالتنا", 
      content: "نحوّل المعرفة النظرية إلى خبرة عملية، ونوفر جسراً بين التعلم والتطبيق في السوق العقاري.",
      icon: "🎯"
    },
    {
      title: "🌟 قيمنا",
      content: "الشفافية، الجدية، المرافقة الحقيقية، والالتزام بنتائج ملموسة لكل متدرب.",
      icon: "⭐"
    }
  ];

  const stats = [
    { number: "500+", label: "متدرب", icon: "👥" },
    { number: "50+", label: "عقار مُسوّق", icon: "🏠" },
    { number: "30+", label: "فرصة عمل", icon: "💼" },
    { number: "95%", label: "نسبة الرضا", icon: "😊" }
  ];

  const timeline = [
    {
      phase: "📚 التعلم",
      title: "تكوين متخصص",
      description: "دورات عملية مبنية على واقع السوق الجزائري",
      color: "from-[#FFD700] to-[#B39977]"
    },
    {
      phase: "🏗️ التطبيق", 
      title: "ممارسة حقيقية",
      description: "تطبيق مباشر على عقارات وحالات واقعية",
      color: "from-[#B39977] to-[#684F36]"
    },
    {
      phase: "🚀 النجاح",
      title: "فرص مؤكدة",
      description: "ربط مباشر بفرص عمل وشراكات حقيقية",
      color: "from-[#684F36] to-[#342519]"
    }
  ];

  return (
    <section id="about" className={`py-20 px-4 transition-all duration-1000 ease-in-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Epic Section Title */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="relative inline-block">
            {/* Enhanced image design */}
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-brand-primary-30 rounded-full blur-xl scale-110"></div>
                <div className="relative w-32 h-32 lg:w-40 lg:h-40 bg-gradient-brand-secondary-30 rounded-full p-1 shadow-2xl border-2 border-brand-primary-50">
                  <div className="w-full h-full bg-white rounded-full p-2">
                    <div className="w-full h-full rounded-full" style={{
                      backgroundImage: 'url(https://res.cloudinary.com/dicpjm1dz/image/upload/v1769366012/image_20_wkkfff.png)',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Animated background rings */}
            <div className="absolute inset-0 bg-gradient-brand-primary-40 rounded-full blur-3xl scale-150 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-brand-secondary-30 rounded-full blur-2xl scale-125"></div>
            
            <h2 className="relative text-6xl md:text-8xl lg:text-9xl font-black mb-8">
              <span className="inline-block text-gradient-brand-full drop-shadow-3xl transform hover:scale-110 transition-all duration-500">
                👤 من نحن
              </span>
            </h2>
            
            {/* Floating elements */}
            <div className="absolute -top-8 -left-8 w-12 h-12 bg-brand-primary-50 rounded-full animate-bounce"></div>
            <div className="absolute -top-4 -right-12 w-8 h-8 bg-brand-secondary-50 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
            <div className="absolute -bottom-6 left-16 w-6 h-6 bg-brand-tertiary-50 rounded-full animate-bounce" style={{animationDelay: '0.6s'}}></div>
          </div>
        </div>

        {/* Hero Introduction */}
        <div className="mb-20 animate-fade-in-up animation-delay-200">
          <div className="relative bg-gradient-brand-secondary-50 rounded-3xl p-12 lg:p-16 border border-brand-secondary-30 overflow-hidden mobile-gradient-fix">
            {/* Background pattern with image */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'url(https://res.cloudinary.com/dicpjm1dz/image/upload/v1769374054/image_23_xvmb83.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-4 mb-8">
                <span className="text-6xl animate-pulse">🏢</span>
                <h3 className="text-4xl lg:text-5xl font-black brand-tertiary">
                  الخبير للعقارات
                </h3>
              </div>
              
              <p className="text-xl lg:text-2xl text-gray-800 mb-8 leading-relaxed max-w-4xl mx-auto">
                منصة جزائرية <span className="font-bold brand-primary">رائدة</span> متخصصة في تحويل الطموح إلى خبرة حقيقية في السوق العقاري
              </p>
              
              <div className="grid grid-cols-3 gap-2 lg:gap-6 max-w-3xl mx-auto">
                <div className="bg-white/70 rounded-xl lg:rounded-2xl p-2 lg:p-6 border border-brand-secondary-30 hover:bg-white/90 transition-all duration-300 mobile-color-fix">
                  <span className="text-xl lg:text-3xl mb-2 lg:mb-3 block">🎓</span>
                  <span className="text-xs lg:text-lg font-bold brand-tertiary">تكوين عقاري</span>
                </div>
                <div className="bg-white/70 rounded-xl lg:rounded-2xl p-2 lg:p-6 border border-brand-secondary-30 hover:bg-white/90 transition-all duration-300 mobile-color-fix">
                  <span className="text-xl lg:text-3xl mb-2 lg:mb-3 block">📈</span>
                  <span className="text-xs lg:text-lg font-bold brand-tertiary">تسويق احترافي</span>
                </div>
                <div className="bg-white/70 rounded-xl lg:rounded-2xl p-2 lg:p-6 border border-brand-secondary-30 hover:bg-white/90 transition-all duration-300 mobile-color-fix">
                  <span className="text-xl lg:text-3xl mb-2 lg:mb-3 block">🤝</span>
                  <span className="text-xs lg:text-lg font-bold brand-tertiary">فرص حقيقية</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Tabs */}
        <div className="mb-20 animate-fade-in-up animation-delay-400">
          <div className="bg-gradient-brand-secondary-20 rounded-3xl p-8 lg:p-12 border border-brand-secondary-30 mobile-gradient-fix">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 rounded-full font-bold transition-all duration-300 mobile-color-fix ${
                    activeTab === index 
                      ? 'bg-gradient-brand text-white shadow-lg scale-105' 
                      : 'bg-white/70 text-gray-700 hover:bg-white/90'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.title}
                </button>
              ))}
            </div>
            
            <div className="bg-white/80 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">{tabs[activeTab].icon}</div>
              <p className="text-xl lg:text-2xl text-gray-800 leading-relaxed max-w-3xl mx-auto">
                {tabs[activeTab].content}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section - Removed */}

        {/* Journey Timeline */}
        <div className="mb-20 animate-fade-in-up animation-delay-800">
          <h3 className="text-3xl lg:text-4xl font-black text-center brand-tertiary mb-12">
            🛤️ رحلتك معانا
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {timeline.map((step, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-brand-primary-30 rounded-3xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className={`relative bg-gradient-to-r ${step.color} rounded-3xl p-8 text-white border border-white/20`}>
                  <div className="text-5xl mb-4 text-center">{step.phase}</div>
                  <h4 className="text-2xl font-black mb-4 text-center">{step.title}</h4>
                  <p className="text-lg leading-relaxed text-center">{step.description}</p>
                  {index < timeline.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-3xl brand-secondary">
                      →
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us - Enhanced */}
        <div className="mb-20 animate-fade-in-up animation-delay-1000">
          <div className="bg-gradient-brand-primary-20 rounded-3xl p-8 lg:p-12 border border-brand-secondary-30 mobile-gradient-fix">
            <h3 className="text-3xl lg:text-4xl font-black text-center brand-tertiary mb-12">
              ⭐ علاش تختار الخبير للعقارات؟
            </h3>
            
            <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-4xl mx-auto">
              {[
                { icon: "🎯", title: "خبرة مبنية على الواقع", desc: "محتوى وتكوين من صلب السوق الجزائري" },
                { icon: "🏗️", title: "تطبيق لا نظري", desc: "تمارس مباشرة على حالات وعقارات حقيقية" },
                { icon: "🤝", title: "مرافقة شخصية", desc: "متابعة فردية لكل متدرب حتى النجاح" },
                { icon: "📜", title: "وثائق موثوقة", desc: "كل العقارات موثقة ومتحقق منها" },
                { icon: "📢", title: "تسويق احترافي", desc: "فريق متخصص في التسويق العقاري" },
                { icon: "🌟", title: "منصة متكاملة", desc: "من تعلم إلى تطبيق إلى فرص عمل" }
              ].map((item, index) => (
                <div key={index} className="group bg-white/70 rounded-xl p-3 md:p-6 hover:bg-white/90 transition-all duration-300 transform hover:scale-105 mobile-color-fix">
                  <div className="flex items-center gap-2 md:gap-4">
                    <span className="text-2xl md:text-4xl group-hover:scale-125 transition-transform">{item.icon}</span>
                    <div>
                      <h4 className="text-sm md:text-xl font-bold brand-tertiary mb-1">{item.title}</h4>
                      <p className="text-xs md:text-base text-gray-700 hidden md:block">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Epic CTA */}
        <div className="animate-fade-in-up animation-delay-1200">
          <div className="relative bg-gradient-brand-full rounded-3xl p-12 lg:p-16 text-white overflow-hidden mobile-gradient-fix">
            {/* Animated background - Mobile Optimized */}
            <div className="absolute inset-0 opacity-20">
              {/* Desktop: Large positioned elements */}
              <div className="hidden lg:block">
                <div className="absolute top-8 right-8 w-32 h-32 bg-white/30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 left-8 w-24 h-24 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
              
              {/* Mobile: Smaller, centered elements */}
              <div className="lg:hidden">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white/30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
            </div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-3xl lg:text-4xl font-black mb-8">
                🔚 هنا بداية نجاحك
              </h3>
              
              <p className="text-xl lg:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto">
                هنا ما نبيعوش وعود... نوفّر <span className="font-bold brand-primary">أدوات حقيقية</span> و<span className="font-bold brand-primary">فرص مؤكدة</span>
              </p>
              
              <div className="bg-white/20 backdrop-blur rounded-2xl p-8 mb-8">
                <p className="text-xl mb-6">سواء كنت تريد:</p>
                <div className="grid grid-cols-3 gap-2 md:gap-6 mb-8">
                  <div className="bg-white/30 rounded-lg md:rounded-xl p-2 md:p-4">
                    <span className="text-xl md:text-3xl mb-1 md:mb-2 block">🎓</span>
                    <span className="font-bold text-xs md:text-base">تدخل مجال العقارات</span>
                  </div>
                  <div className="bg-white/30 rounded-lg md:rounded-xl p-2 md:p-4">
                    <span className="text-xl md:text-3xl mb-1 md:mb-2 block">🏠</span>
                    <span className="font-bold text-xs md:text-base">تشري عقار بثقة</span>
                  </div>
                  <div className="bg-white/30 rounded-lg md:rounded-xl p-2 md:p-4">
                    <span className="text-xl md:text-3xl mb-1 md:mb-2 block">📈</span>
                    <span className="font-bold text-xs md:text-base">تسوّق باحترافية</span>
                  </div>
                </div>
                
                <p className="text-2xl font-black mb-8">
                  الخبير للعقارات هو <span className="brand-primary">المكان الصحيح</span>
                </p>
                
                <button className="group relative px-16 py-6 bg-gradient-brand-full text-white font-black rounded-full text-xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 overflow-hidden mobile-gradient-fix">
                  <span className="relative z-10 flex items-center gap-3">
                    <span>➡️ ابدأ رحلتك الآن</span>
                    <span className="transform group-hover:translate-x-3 transition-transform duration-300 text-2xl">🚀</span>
                  </span>
                  {/* Multiple animated layers */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-brand-primary-40 to-transparent translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-brand-secondary-30 to-transparent translate-y-full group-hover:translate-y-full transition-transform duration-800"></div>
                  {/* Pulsing glow */}
                  <div className="absolute inset-0 bg-gradient-brand-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  {/* Premium golden border with multiple effects */}
                  <div className="absolute inset-0 rounded-full border-4 border-brand-primary-60 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-brand-primary-50"></div>
                  <div className="absolute inset-0 rounded-full border-2 border-brand-secondary-80 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  <div className="absolute inset-0 rounded-full border border-brand-primary opacity-0 group-hover:opacity-60 transition-all duration-900 animate-pulse"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
