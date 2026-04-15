export default function RamadanOffer() {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-[#EDE6D9] via-[#F5E6D3] to-[#B39977]/20 relative overflow-hidden scroll-animate">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#B39977]/10 to-[#684F36]/10"></div>
      <div className="absolute top-10 left-10 w-20 h-20 md:w-40 md:h-40 bg-[#B39977]/15 rounded-full blur-xl md:blur-3xl animate-float hidden md:block"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 md:w-32 md:h-32 bg-[#684F36]/15 rounded-full blur-lg md:blur-2xl animate-float hidden md:block" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 md:w-24 md:h-24 bg-[#FFD700]/10 rounded-full blur-lg md:blur-xl animate-pulse hidden md:block" style={{animationDelay: '2s'}}></div>
      
      {/* Ramadan Decorative Elements */}
      <div className="absolute top-5 right-5 text-4xl md:text-6xl animate-pulse">🌙</div>
      <div className="absolute top-5 left-5 text-3xl md:text-5xl animate-pulse" style={{animationDelay: '0.5s'}}>⭐</div>
      <div className="absolute bottom-5 right-10 text-3xl md:text-5xl animate-pulse" style={{animationDelay: '1s'}}>🎁</div>
      <div className="absolute bottom-5 left-10 text-3xl md:text-5xl animate-pulse" style={{animationDelay: '1.5s'}}>✨</div>
      
      <div className="relative max-w-6xl mx-auto text-center">
        <div className="mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-gradient mb-4">عرض رمضان محدود 🎁</h2>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer"></div>
          <p className="text-lg md:text-xl text-[#684F36] mt-4 max-w-2xl mx-auto">
            احتفالاً بشهر رمضان المبارك، استفد من هديتنا الحصرية
          </p>
        </div>
        
        {/* Main Offer Card */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Book Preview Card */}
          <div className="group relative bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-slide-up" style={{animationDelay: '0.1s'}}>
            <div className="relative h-64 md:h-80 overflow-hidden">
              <div 
                className="absolute inset-0 bg-gradient-to-br from-[#B39977]/30 to-[#684F36]/30"
                style={{
                  backgroundImage: `url('https://res.cloudinary.com/dicpjm1dz/image/upload/v1769435328/WhatsApp_Image_2026-01-24_at_4.35.30_PM_1_kftwxp.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              
              {/* Floating Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full font-bold text-sm md:text-base animate-pulse shadow-lg">
                مجاني 100%
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl animate-bounce">
                  <span className="text-3xl">📖</span>
                </div>
                <h3 className="text-white font-bold text-xl md:text-2xl mb-2">كتاب العقار PDF</h3>
                <p className="text-gray-200 text-sm md:text-base">دليلك الشامل للنجاح في العقارات</p>
              </div>
            </div>
          </div>

          {/* Benefits Card */}
          <div className="bg-gradient-to-br from-white to-[#F5E6D9] rounded-3xl shadow-2xl p-8 md:p-10 border-2 border-[#B39977]/30 hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="text-center mb-6">
              <div className="inline-block bg-gradient-to-r from-[#B39977] to-[#684F36] text-white px-6 py-3 rounded-full text-lg md:text-xl font-bold mb-4 animate-shimmer shadow-lg">
                🎁 هدية رمضان مجانية
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#342519] mb-2">ما ستحصل عليه:</h3>
            </div>
            
            <div className="space-y-4 text-right">
              <div className="flex items-start group hover:bg-[#B39977]/10 p-3 rounded-xl transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center ml-3 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-white text-lg">🎯</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#342519] text-lg mb-1">فهم المبادئ الأساسية</h4>
                  <p className="text-gray-600 text-sm">أساسيات العقارات من الصفر</p>
                </div>
              </div>
              
              <div className="flex items-start group hover:bg-[#B39977]/10 p-3 rounded-xl transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-[#684F36] to-[#B39977] rounded-full flex items-center justify-center ml-3 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-white text-lg">🔧</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#342519] text-lg mb-1">تصحيح المفاهيم</h4>
                  <p className="text-gray-600 text-sm">تغيير طريقة تفكيرك في العقارات</p>
                </div>
              </div>
              
              <div className="flex items-start group hover:bg-[#B39977]/10 p-3 rounded-xl transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center ml-3 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-white text-lg">🚀</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#342519] text-lg mb-1">تطوير نظرتك للوساطة</h4>
                  <p className="text-gray-600 text-sm">احتراف الوساطة العقارية</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 text-center">
              <button className="group relative bg-gradient-to-r from-[#B39977] to-[#684F36] hover:from-[#684F36] hover:to-[#B39977] text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-pulse-glow">
                <span className="relative z-10">اطلب الهدية الآن</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Urgency Message */}
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-300 rounded-3xl p-6 md:p-8 max-w-4xl mx-auto animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto ml-4 animate-pulse">
              <span className="text-white text-xl">⏰</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-red-700">العرض محدود!</h3>
          </div>
          <p className="text-red-600 text-center text-lg">
    استفد من هديتنا المجانية قبل انتهاء شهر رمضان المبارك
          </p>
          <div className="text-center mt-4">
            <span className="inline-block bg-red-500 text-white px-4 py-2 rounded-full font-bold animate-pulse">
              متاح لفترة محدودة فقط
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
