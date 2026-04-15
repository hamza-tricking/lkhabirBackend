export default function HowItWorks() {
  return (
    <section className="px-4 bg-[#EDE6D9] scroll-animate relative">
      <div className="absolute top-20 left-20 w-20 h-20 md:w-40 md:h-40 bg-[#B39977]/10 rounded-full blur-xl md:blur-3xl animate-float hidden md:block"></div>
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-gradient mb-4">وش كاين داخل الفلاشة؟</h2>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer mb-6 md:mb-8"></div>
          <p className="text-lg md:text-2xl text-[#342519] max-w-3xl mx-auto leading-relaxed">
            محتوى عقاري كامل ومتكامل، كلش في مكان واحد وبلا إنترنت
          </p>
        </div>
        
        {/* Content Cards with Images */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {/* Legal Content Card */}
          <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-up" style={{animationDelay: '0.1s'}}>
            <div className="relative h-48 overflow-hidden">
              <div 
                className="absolute inset-0 bg-gradient-to-br from-[#B39977]/20 to-[#684F36]/20"
                style={{
                  backgroundImage: `url('https://res.cloudinary.com/dicpjm1dz/image/upload/v1769435328/WhatsApp_Image_2026-01-24_at_4.35.30_PM_1_kftwxp.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-lg">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h3 className="text-white font-bold text-lg md:text-xl">القانون العقاري</h3>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-2 text-right text-[#342519]">
                <li className="flex items-center">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>قوانين البيع والشراء</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>الحقوق والواجبات</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>الإجراءات القانونية</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Marketing Content Card */}
          <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="relative h-48 overflow-hidden">
              <div 
                className="absolute inset-0 bg-gradient-to-br from-[#684F36]/20 to-[#B39977]/20"
                style={{
                  backgroundImage: `url('https://res.cloudinary.com/dicpjm1dz/image/upload/v1769435315/image_28_x7uorr.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-lg">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-white font-bold text-lg md:text-xl">التسويق العقاري</h3>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-2 text-right text-[#342519]">
                <li className="flex items-center">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>استراتيجيات البيع</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>جذب العملاء</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>التسعير والتفاوض</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Templates Content Card */}
          <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="relative h-48 overflow-hidden">
              <div 
                className="absolute inset-0 bg-gradient-to-br from-[#B39977]/20 to-[#684F36]/20"
                style={{
                  backgroundImage: `url('https://res.cloudinary.com/dicpjm1dz/image/upload/v1769435351/image_29_yaqiwn.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-lg">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-white font-bold text-lg md:text-xl">نماذج وعقود</h3>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-2 text-right text-[#342519]">
                <li className="flex items-center">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>عقود بيع جاهزة</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>نماذج إدارية</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>قوائم تحقق</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-4">
          <button className="group relative bg-gradient-to-r from-[#B39977] to-[#684F36] hover:from-[#684F36] hover:to-[#342519] text-white font-bold py-4 md:py-6 px-8 md:px-12 rounded-2xl text-lg md:text-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#B39977]/25 animate-pulse-glow scroll-animate" style={{animationDelay: '0.4s'}}>
            <span className="relative z-10">اطلب نسختك الآن – الدفع عند الاستلام</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
}
