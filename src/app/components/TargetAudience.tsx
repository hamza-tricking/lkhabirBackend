export default function TargetAudience() {
  return (
    <section id="about" className="py-12 md:py-12 px-4 relative scroll-animate bg-[#EDE6D9]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#EDE6D9]/30 to-transparent"></div>
      <div className="absolute top-10 right-10 w-20 h-20 md:w-32 md:h-32 bg-[#B39977]/10 rounded-full blur-xl md:blur-2xl animate-float hidden md:block"></div>
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black py-4 text-gradient ">لمن هذه المنتجات؟</h2>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer"></div>
          <p className="text-lg md:text-xl text-[#684F36] mt-4 max-w-3xl mx-auto">
            منتجاتنا مصممة للجميع الذين يريدون النجاح في مجال العقارات
          </p>
        </div>
        
        {/* Product-specific audience sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* USB Audience */}
          <div 
            className="bg-gradient-to-br from-[#B39977]/10 to-[#684F36]/10 rounded-3xl p-6 border-2 border-[#B39977]/30 relative overflow-hidden"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dicpjm1dz/image/upload/v1769435351/image_29_yaqiwn.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#B39977]/90 to-[#684F36]/90"></div>
            <div className="relative z-10">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💾</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">الفلاشة للعقار مناسب لـ:</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-white to-gray-200 rounded-full flex items-center justify-center ml-3 md:ml-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg animate-bounce-in" style={{animationDelay: '0.1s'}}>
                    <span className="text-[#342519] text-sm md:text-lg md:text-xl font-bold">1</span>
                  </div>
                  <div className="flex-1 opacity-0 translate-y-[5px] animate-slide-up" style={{animationDelay: '0.2s'}}>
                    <span className="text-sm md:text-lg md:text-2xl text-white font-medium block">المبتدئين الذين يريدون بداية سريعة</span>
                    <span className="text-xs md:text-sm md:text-base text-gray-200 mt-1 block">محتوى منظم للفهم الأساسي</span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-white to-gray-200 rounded-full flex items-center justify-center ml-3 md:ml-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg animate-bounce-in" style={{animationDelay: '0.3s'}}>
                    <span className="text-[#342519] text-sm md:text-lg md:text-xl font-bold">2</span>
                  </div>
                  <div className="flex-1 opacity-0 translate-y-[5px] animate-slide-up" style={{animationDelay: '0.4s'}}>
                    <span className="text-sm md:text-lg md:text-2xl text-white font-medium block">أصحاب الإنترنت الضعيف</span>
                    <span className="text-xs md:text-sm md:text-base text-gray-200 mt-1 block">يعمل بدون اتصال بالإنترنت</span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-white to-gray-200 rounded-full flex items-center justify-center ml-3 md:ml-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg animate-bounce-in" style={{animationDelay: '0.5s'}}>
                    <span className="text-[#342519] text-sm md:text-lg md:text-xl font-bold">3</span>
                  </div>
                  <div className="flex-1 opacity-0 translate-y-[5px] animate-slide-up" style={{animationDelay: '0.6s'}}>
                    <span className="text-sm md:text-lg md:text-2xl text-white font-medium block">الباحثين عن معرفة نظرية</span>
                    <span className="text-xs md:text-sm md:text-base text-gray-200 mt-1 block">قانون وتسويق ونماذج</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Audience */}
          <div 
            className="bg-gradient-to-br from-[#684F36]/10 to-[#B39977]/10 rounded-3xl p-6 border-2 border-[#684F36]/30 relative overflow-hidden"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dicpjm1dz/image/upload/v1769374054/image_23_xvmb83.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#684F36]/90 to-[#B39977]/90"></div>
            <div className="relative z-10">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#684F36] to-[#B39977] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">الدورة المناسبة لـ:</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-white to-gray-200 rounded-full flex items-center justify-center ml-3 md:ml-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg animate-bounce-in" style={{animationDelay: '0.2s'}}>
                    <span className="text-[#342519] text-sm md:text-lg md:text-xl font-bold">1</span>
                  </div>
                  <div className="flex-1 opacity-0 translate-y-[5px] animate-slide-up" style={{animationDelay: '0.3s'}}>
                    <span className="text-sm md:text-lg md:text-2xl text-white font-medium block">الجديدين في المجال</span>
                    <span className="text-xs md:text-sm md:text-base text-gray-200 mt-1 block">متابعة شخصية وتطبيق عملي</span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-white to-gray-200 rounded-full flex items-center justify-center ml-3 md:ml-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg animate-bounce-in" style={{animationDelay: '0.4s'}}>
                    <span className="text-[#342519] text-sm md:text-lg md:text-xl font-bold">2</span>
                  </div>
                  <div className="flex-1 opacity-0 translate-y-[5px] animate-slide-up" style={{animationDelay: '0.5s'}}>
                    <span className="text-sm md:text-lg md:text-2xl text-white font-medium block">الوسطاء الذين يريدون التطور</span>
                    <span className="text-xs md:text-sm md:text-base text-gray-200 mt-1 block">زيادة الصفقات والمهارات</span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-white to-gray-200 rounded-full flex items-center justify-center ml-3 md:ml-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg animate-bounce-in" style={{animationDelay: '0.6s'}}>
                    <span className="text-[#342519] text-sm md:text-lg md:text-xl font-bold">3</span>
                  </div>
                  <div className="flex-1 opacity-0 translate-y-[5px] animate-slide-up" style={{animationDelay: '0.7s'}}>
                    <span className="text-sm md:text-lg md:text-2xl text-white font-medium block">الباحثين عن الاحتراف</span>
                    <span className="text-xs md:text-sm md:text-base text-gray-200 mt-1 block">شهادة معتمدة وخبراء</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
