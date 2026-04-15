export default function Results() {
  return (
    <section className="py-16 md:py-24 px-4 bg-[#EDE6D9] relative scroll-animate">
      <div className="absolute top-15 right-15 w-20 h-20 md:w-32 md:h-32 bg-[#B39977]/10 rounded-full blur-lg md:blur-2xl animate-float hidden md:block"></div>
      <div className="absolute bottom-15 left-15 w-16 h-16 md:w-28 md:h-28 bg-[#684F36]/10 rounded-full blur-lg md:blur-2xl animate-float hidden md:block" style={{animationDelay: '1s'}}></div>
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-gradient mb-4">وش النتيجة؟</h2>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer mb-6 md:mb-8"></div>
          <p className="text-lg md:text-2xl text-[#684F36] max-w-3xl mx-auto">
            تخرج بـ رؤية واضحة وخطة عمل جاهزة للنجاح في مجال العقارات
          </p>
        </div>
        
        {/* Results Cards with Visual Design */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {/* Start Right Card */}
          <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-up" style={{animationDelay: '0.1s'}}>
            <div className="relative h-32 overflow-hidden">
              <div 
                className="absolute inset-0 bg-gradient-to-br from-[#B39977]/20 to-[#684F36]/20"
                style={{
                  backgroundImage: `url('https://res.cloudinary.com/dicpjm1dz/image/upload/v1769435315/image_28_x7uorr.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#B39977]/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-lg">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-white font-bold text-lg">كيفاش تبدأ</h3>
              </div>
            </div>
            <div className="p-6 text-right">
              <ul className="space-y-2 text-[#342519]">
                <li className="flex items-center">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>خطة عمل واضحة من اليوم الأول</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>خطوات عملية للدخول في السوق</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>أدوات وتقنيات احترافية</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Avoid Mistakes Card */}
          <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="relative h-32 overflow-hidden">
              <div 
                className="absolute inset-0 bg-gradient-to-br from-[#684F36]/20 to-[#B39977]/20"
                style={{
                  backgroundImage: `url('https://res.cloudinary.com/dicpjm1dz/image/upload/v1769435328/WhatsApp_Image_2026-01-24_at_4.35.30_PM_1_kftwxp.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#684F36]/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-lg">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-white font-bold text-lg">كيفاش تتفادى الأخطاء</h3>
              </div>
            </div>
            <div className="p-6 text-right">
              <ul className="space-y-2 text-[#342519]">
                <li className="flex items-center">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>أشهر الأخطاء للمبتدئين</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>كيفية تجنب الخسائر</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>نصائح قانونية هامة</span>
                </li>
              </ul>
            </div>
          </div>

          {/* First Deal Card */}
          <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="relative h-32 overflow-hidden">
              <div 
                className="absolute inset-0 bg-gradient-to-br from-[#B39977]/20 to-[#684F36]/20"
                style={{
                  backgroundImage: `url('https://res.cloudinary.com/dicpjm1dz/image/upload/v1769435351/image_29_yaqiwn.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#B39977]/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-lg">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-white font-bold text-lg">الصفقة الأولى</h3>
              </div>
            </div>
            <div className="p-6 text-right">
              <ul className="space-y-2 text-[#342519]">
                <li className="flex items-center">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>استراتيجية إتمام الصفقات</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>فن التفاوض والإقناع</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>بناء سمعة قوية</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="bg-gradient-to-r from-[#B39977]/20 to-[#684F36]/20 p-8 md:p-12 rounded-3xl max-w-4xl mx-auto animate-fade-in-up border-2 border-[#B39977]/30" style={{animationDelay: '0.4s'}}>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <span className="text-3xl">💎</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#342519] mb-4">النتيجة النهائية</h3>
            <p className="text-lg md:text-xl text-[#684F36] mb-6 leading-relaxed">
              مش سحر… فهم + تطبيق = نتائج أفضل.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#B8860B] mb-2">100%</div>
                <p className="text-[#684F36] font-medium">خطة عمل</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#B8860B] mb-2">0%</div>
                <p className="text-[#684F36] font-medium">عشوائية</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#B8860B] mb-2">∞</div>
                <p className="text-[#684F36] font-medium">فرص نجاح</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
