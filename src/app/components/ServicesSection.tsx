'use client';

import { useState, useEffect } from 'react';

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      icon: '🎓',
      title: 'الدورة العقارية الأونلاين',
      description: 'دورة تدريبية احترافية في مجال العقارات، مبنية على الواقع الجزائري، تخليك تفهم القانون العقاري وتتعلم التسويق العقاري وتطبق مباشرة في الميدان.',
      features: [
        'برنامج تطبيقي مع متابعة من خبراء',
        'إمكانية الاستفادة من فرص عمل داخل المنصة بعد التكوين'
      ],
      buttonText: 'اطلب الآن',
      buttonLink: '/course',
      note: 'التفاصيل الكاملة داخل صفحة الدورة'
    },
    {
      icon: '🏠',
      title: 'عقارات للبيع',
      description: 'قسم خاص بالعقارات المعروضة للبيع، يضم عقارات موثّقة بكل الوثائق القانونية ومعروضة بطريقة احترافية لتسهيل الشراء والبيع.',
      features: [
        '✔ شقق – فيلات – أراضي – محلات',
        '✔ معلومات واضحة وصور حقيقية',
        '✔ تواصل مباشر وبشفافية'
      ],
      buttonText: 'تصفح العقارات',
      buttonLink: '/immobilier'
    },
    {
      icon: '📣',
      title: 'تسويق احترافي للعقارات',
      description: 'إذا كان عندك عقار وحاب تديرلو تسويق، نحن نوفرلك حلول تسويقية مدروسة توصل عقارك للناس المهتمة فعليًا وبطريقة احترافية.',
      features: [
        '✅ إعلانات موجّهة',
        '✅ عرض وتصوير احترافي',
        '✅ نشر في منصاتنا وصفحاتنا',
        '✅ جذب مشترين حقيقيين'
      ],
      buttonText: 'سوّق عقارك معنا',
      buttonLink: '#marketing'
    }
  ];

  return (
    <section id="services" className={`py-20 px-4 transition-all duration-1000 ease-in-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Ultra Premium Section Title */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="relative inline-block">
            {/* Multiple background layers */}
            <div className="absolute inset-0 bg-gradient-brand-primary-30 rounded-3xl blur-2xl scale-125 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-brand-secondary-20 rounded-2xl blur-xl scale-110"></div>
            
            {/* Main title with effects */}
            <h2 className="relative text-6xl md:text-8xl font-black mb-6">
              <span className="inline-block text-gradient-brand-full drop-shadow-2xl transform hover:scale-110 hover:rotate-1 transition-all duration-500 animate-pulse">
                خدماتنا
              </span>
              <br />
              <span className="inline-block text-gradient-brand-full drop-shadow-2xl transform hover:scale-110 hover:-rotate-1 transition-all duration-500 animate-pulse" style={{animationDelay: '0.3s'}}>
                المتكاملة
              </span>
            </h2>
            
            {/* Floating particles */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-brand-primary-40 rounded-full animate-bounce"></div>
            <div className="absolute -top-2 -right-6 w-6 h-6 bg-brand-secondary-40 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute -bottom-4 left-8 w-4 h-4 bg-brand-tertiary-40 rounded-full animate-bounce" style={{animationDelay: '0.7s'}}></div>
          </div>
          
          {/* Enhanced description */}
          <p className="text-xl md:text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed px-4 mb-8">
            <span className="font-bold text-2xl">✨</span> نقدم لك 
            <span className="font-bold text-xl brand-secondary"> كل ما تحتاجه</span> للنجاح في مجال العقارات من 
            <span className="font-bold text-xl brand-tertiary"> تعليم احترافي</span> إلى 
            <span className="font-bold text-xl brand-quaternary"> فرص عمل</span> و
            <span className="font-bold text-xl brand-secondary"> تسويق فعال</span>
            <span className="font-bold text-2xl"> ✨</span>
          </p>
          
          {/* Ultra enhanced decorative line */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="h-3 w-64 bg-gradient-brand-full rounded-full shadow-2xl mobile-gradient-fix"></div>
              <div className="absolute inset-0 h-3 w-64 bg-brand-primary-50 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Services Grid - Better Mobile Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl lg:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-102 overflow-hidden animate-fade-in-up animation-delay-${index * 200} border border-brand-secondary-30 mobile-color-fix ${
                hoveredCard === index ? 'ring-4 ring-brand-secondary-30' : ''
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Hover glow effect */}
              <div className={`absolute inset-0 bg-gradient-brand-secondary-5 transition-opacity duration-500 ${
                hoveredCard === index ? 'opacity-100' : 'opacity-0'
              }`}></div>
              
              {/* Compact Header */}
              <div className={`relative p-4 lg:p-6 text-white overflow-hidden mobile-gradient-fix ${
                index === 0 ? 'bg-gradient-brand' :
                index === 1 ? 'bg-gradient-brand-secondary' :
                'bg-gradient-brand-tertiary'
              }`}>
                <div className="relative z-10 flex items-center gap-3">
                  <div className={`text-3xl lg:text-5xl transform transition-all duration-500 ${
                    hoveredCard === index ? 'scale-110 rotate-6' : 'scale-100 rotate-0'
                  }`}>
                    {service.icon}
                  </div>
                  <h3 className="text-lg lg:text-2xl font-bold">{service.title}</h3>
                </div>
              </div>

              {/* Compact Content */}
              <div className="p-4 lg:p-6">
                <p className="text-gray-700 mb-4 leading-relaxed text-sm lg:text-base line-clamp-2">
                  {service.description}
                </p>

                {/* Compact Features */}
                <div className="space-y-2 lg:space-y-3 mb-4 lg:mb-6">
                  {service.features.slice(0, 2).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <span className={`text-sm lg:text-lg transition-all duration-300 ${
                        index === 0 ? `hoveredCard === index ? 'brand-primary scale-125 rotate-12' : 'brand-secondary'` :
                        index === 1 ? `hoveredCard === index ? 'brand-primary scale-110' : 'brand-tertiary'` :
                        `hoveredCard === index ? 'brand-primary scale-120' : 'brand-secondary'`
                      }`}>✓</span>
                      <span className="text-gray-600 text-xs lg:text-sm leading-tight">{feature}</span>
                    </div>
                  ))}
                  {service.features.length > 2 && (
                    <div className="text-xs text-gray-500 italic">+{service.features.length - 2} أكثر</div>
                  )}
                </div>

                {/* Compact Note */}
                {service.note && (
                  <div className={`mb-4 p-2 lg:p-3 bg-brand-secondary-30 rounded-xl border border-brand-secondary-20 transition-all duration-300 ${
                    hoveredCard === index ? 'bg-brand-secondary-50 border-brand-secondary-40' : ''
                  }`}>
                    <p className="text-xs lg:text-sm brand-tertiary font-medium text-center">
                      💡 {service.note}
                    </p>
                  </div>
                )}

                {/* Compact Button */}
                <button 
                  onClick={() => window.location.href = service.buttonLink}
                  className={`w-full text-white font-bold py-2 lg:py-3 px-4 rounded-full transform transition-all duration-300 shadow hover:shadow-lg relative overflow-hidden group/btn text-sm lg:text-base cursor-pointer mobile-gradient-fix ${
                    hoveredCard === index ? 'scale-105' : ''
                  } ${
                    index === 0 ? 'bg-gradient-brand hover:bg-gradient-brand hover:shadow-brand-primary-30' :
                    index === 1 ? 'bg-gradient-brand-secondary hover:bg-gradient-brand-secondary hover:shadow-brand-primary-25' :
                    'bg-gradient-brand-tertiary hover:bg-gradient-brand-tertiary hover:shadow-brand-primary-35'
                  }`}>
                  <span className="relative z-10 flex text-black/80 items-center justify-center gap-2">
                    {service.buttonText}
                    <span className={`transform transition-all duration-300 ${
                      hoveredCard === index ? 'translate-x-2' : 'translate-x-0'
                    }`}>
                      {index === 0 ? '🚀' : index === 1 ? '⭐' : '🎯'}
                    </span>
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Bottom CTA - Mobile Optimized */}
        <div className="text-center mt-16 lg:mt-24 animate-fade-in-up animation-delay-800">
          <div className="relative bg-gradient-brand-secondary-50 rounded-2xl lg:rounded-3xl p-8 lg:p-16 max-w-6xl mx-auto border border-brand-secondary-30 overflow-hidden mobile-gradient-fix" style={{
            backgroundImage: 'url(https://res.cloudinary.com/dicpjm1dz/image/upload/v1769374038/image_21_vdja5c.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
            <div className="absolute inset-0 bg-gradient-brand-secondary-80"></div>
            <div className="relative z-10">
              {/* Premium heading with mobile optimization */}
              <div className="mb-6 lg:mb-8">
                <div className="relative">
                  <h3 className="text-3xl md:text-5xl lg:text-7xl font-black text-center mb-4 lg:mb-6">
                    <span className="inline-block brand-primary drop-shadow-lg transform hover:scale-105 transition-all duration-300 text-2xl md:text-4xl lg:text-5xl">
                      جاهز للبدء
                    </span>
                    <br />
                    <span className="inline-block brand-tertiary drop-shadow-lg transform hover:scale-105 transition-all duration-300 text-2xl md:text-4xl lg:text-5xl">
                      في عالم العقارات؟
                    </span>
                  </h3>
                  <div className="flex justify-center">
                    <div className="h-1 lg:h-2 w-32 lg:w-48 bg-gradient-brand-full rounded-full shadow-lg mobile-gradient-fix"></div>
                  </div>
                </div>
              </div>
              
              <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 lg:mb-10 leading-relaxed max-w-4xl mx-auto px-4">
                انضم إلى <span className="font-bold brand-secondary">العديد من الجزائريين</span> الذين استفادوا من منصتنا و
                <span className="font-bold brand-tertiary"> حققوا نجاحًا</span> في مجال العقارات
              </p>
              
              {/* Compact buttons for mobile */}
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-8 justify-center items-center mb-8 lg:mb-12">
                <button className="group relative px-6 lg:px-12 py-3 lg:py-6 bg-gradient-brand-secondary text-white font-bold rounded-full text-sm lg:text-xl shadow-lg lg:shadow-2xl hover:shadow-xl lg:hover:shadow-3xl transform hover:scale-105 transition-all duration-500 overflow-hidden mobile-gradient-fix">
                  <span className="relative z-10 flex items-center gap-2 lg:gap-3">
                    <span className="text-sm lg:text-base">ابدأ رحلتك الآن</span>
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-lg lg:text-2xl">🚀</span>
                  </span>
                  <div className="absolute inset-0 bg-brand-primary-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
                
                <button className="group px-6 lg:px-12 py-3 lg:py-6 bg-white text-gray-800 font-bold rounded-full text-sm lg:text-xl shadow-lg lg:shadow-2xl hover:shadow-xl lg:hover:shadow-3xl transform hover:scale-105 transition-all duration-500 border-2 lg:border-3 border-brand-secondary-30 hover:border-brand-secondary-60 flex items-center gap-2 lg:gap-3 mobile-color-fix">
                  <span className="text-sm lg:text-base">تواصل معنا</span>
                  <span className="transform group-hover:scale-125 transition-transform duration-300 text-lg lg:text-2xl">💬</span>
                </button>
              </div>
              
              {/* Compact trust indicators */}
              <div className="grid grid-cols-3 gap-2 lg:gap-8 max-w-3xl mx-auto">
                <div className="group flex flex-col items-center gap-1 lg:gap-3 p-2 lg:p-6 bg-white/50 rounded-xl lg:rounded-2xl border border-brand-secondary-20 hover:bg-white/70 transition-all duration-300 mobile-color-fix">
                  <span className="text-lg lg:text-4xl transform group-hover:scale-125 transition-transform duration-300">🏆</span>
                  <span className="font-bold brand-tertiary text-xs lg:text-lg">خبراء متخصصون</span>
                  <span className="text-xs lg:text-sm text-gray-600 hidden lg:block">أفضل الخبرات في المجال</span>
                </div>
                <div className="group flex flex-col items-center gap-1 lg:gap-3 p-2 lg:p-6 bg-white/50 rounded-xl lg:rounded-2xl border border-brand-secondary-20 hover:bg-white/70 transition-all duration-300 mobile-color-fix">
                  <span className="text-lg lg:text-4xl transform group-hover:scale-125 transition-transform duration-300">👥</span>
                  <span className="font-bold brand-tertiary text-xs lg:text-lg"> ثقة</span>
                  <span className="text-xs lg:text-sm text-gray-600 hidden lg:block">ثقة من العملاء</span>
                </div>
                <div className="group flex flex-col items-center gap-1 lg:gap-3 p-2 lg:p-6 bg-white/50 rounded-xl lg:rounded-2xl border border-brand-secondary-20 hover:bg-white/70 transition-all duration-300 mobile-color-fix">
                  <span className="text-lg lg:text-4xl transform group-hover:scale-125 transition-transform duration-300">🇩🇿</span>
                  <span className="font-bold brand-tertiary text-xs lg:text-lg">مصمم للجزائر</span>
                  <span className="text-xs lg:text-sm text-gray-600 hidden lg:block">مخصص للسوق الجزائري</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
