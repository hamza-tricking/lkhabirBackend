export default function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 px-4 bg-[#EDE6D9] relative scroll-animate">
      <div className="absolute top-20 left-20 w-20 h-20 md:w-36 md:h-36 bg-[#B39977]/10 rounded-full blur-xl md:blur-3xl animate-float hidden md:block"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 md:w-32 md:h-32 bg-[#684F36]/10 rounded-full blur-lg md:blur-2xl animate-float hidden md:block" style={{animationDelay: '1s'}}></div>
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-gradient mb-4">السعر وطرق الدفع</h2>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer"></div>
          <p className="text-lg md:text-xl text-[#684F36] mt-4 max-w-2xl mx-auto">
            اختر المنتج المناسب لك وابدأ رحلتك في عالم العقارات
          </p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* USB Product Card */}
          <div className="group bg-gradient-to-br from-white to-[#EDE6D9]/50 p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-[#B39977]/30 relative overflow-hidden animate-slide-up" style={{animationDelay: '0.1s'}}>
            {/* Background Image */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url('https://res.cloudinary.com/dicpjm1dz/image/upload/v1769435351/image_29_yaqiwn.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
            
            <div className="relative z-10">
              {/* Product Icon */}
              <div className="w-20 h-20 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-3xl">💾</span>
              </div>
              
              {/* Product Name */}
              <h3 className="text-2xl md:text-3xl font-bold text-[#342519] mb-4">الفلاشة للعقار</h3>
              
              {/* Price */}
              <div className="mb-6">
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#B8860B] mb-2">8200 دج</div>
                <div className="text-lg md:text-xl text-gray-600 font-medium">الدفع عند الاستلام</div>
              </div>
              
              {/* Features */}
              <div className="text-right space-y-3 mb-8">
                <div className="flex items-center group hover:translate-x-2 transition-transform duration-300">
                  <span className="text-green-500 ml-3 text-xl group-hover:scale-110 transition-transform">✓</span>
                  <span className="font-medium text-gray-700">محتوى قانون + تسويق</span>
                </div>
                <div className="flex items-center group hover:translate-x-2 transition-transform duration-300">
                  <span className="text-green-500 ml-3 text-xl group-hover:scale-110 transition-transform">✓</span>
                  <span className="font-medium text-gray-700">نماذج عقود جاهزة</span>
                </div>
                <div className="flex items-center group hover:translate-x-2 transition-transform duration-300">
                  <span className="text-green-500 ml-3 text-xl group-hover:scale-110 transition-transform">✓</span>
                  <span className="font-medium text-gray-700">يعمل بدون إنترنت</span>
                </div>
                <div className="flex items-center group hover:translate-x-2 transition-transform duration-300">
                  <span className="text-green-500 ml-3 text-xl group-hover:scale-110 transition-transform">✓</span>
                  <span className="font-medium text-gray-700">كتاب هدية رمضان</span>
                </div>
              </div>
              
              {/* CTA Button */}
              <a 
                href="/usb"
                className="group relative block bg-gradient-to-r from-[#B39977] to-[#684F36] hover:from-[#684F36] hover:to-[#B39977] text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-pulse-glow"
              >
                <span className="relative z-10">اطلب الفلاشة الآن</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>

          {/* Course Product Card */}
          <div className="group bg-gradient-to-br from-white to-[#F5E6D9]/50 p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-[#684F36]/30 relative overflow-hidden animate-slide-up" style={{animationDelay: '0.2s'}}>
            {/* Background Image */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url('https://res.cloudinary.com/dicpjm1dz/image/upload/v1769374054/image_23_xvmb83.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
            
            <div className="relative z-10">
              {/* Product Icon */}
              <div className="w-20 h-20 bg-gradient-to-r from-[#684F36] to-[#B39977] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-3xl">🎓</span>
              </div>
              
              {/* Product Name */}
              <h3 className="text-2xl md:text-3xl font-bold text-[#342519] mb-4">دورة العقارات المتكاملة</h3>
              
              {/* Price */}
              <div className="mb-6">
                <div className="text-lg md:text-xl text-gray-600 font-medium">الدفع عند الاستلام</div>
              </div>
              
              {/* Features */}
              <div className="text-right space-y-3 mb-8">
                <div className="flex items-center group hover:translate-x-2 transition-transform duration-300">
                  <span className="text-green-500 ml-3 text-xl group-hover:scale-110 transition-transform">✓</span>
                  <span className="font-medium text-gray-700">متابعة 3 أشهر</span>
                </div>
                <div className="flex items-center group hover:translate-x-2 transition-transform duration-300">
                  <span className="text-green-500 ml-3 text-xl group-hover:scale-110 transition-transform">✓</span>
                  <span className="font-medium text-gray-700">محامية + خبير تسويق</span>
                </div>
                <div className="flex items-center group hover:translate-x-2 transition-transform duration-300">
                  <span className="text-green-500 ml-3 text-xl group-hover:scale-110 transition-transform">✓</span>
                  <span className="font-medium text-gray-700">شهادة معتمدة</span>
                </div>
                <div className="flex items-center group hover:translate-x-2 transition-transform duration-300">
                  <span className="text-green-500 ml-3 text-xl group-hover:scale-110 transition-transform">✓</span>
                  <span className="font-medium text-gray-700">تطبيق عملي + صفقات</span>
                </div>
              </div>
              
              {/* CTA Button */}
              <a 
                href="/course"
                className="group relative block bg-gradient-to-r from-[#684F36] to-[#B39977] hover:from-[#B39977] hover:to-[#684F36] text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-pulse-glow"
              >
                <span className="relative z-10">اطلب الدورة الآن</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#684F36] to-[#B39977] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mt-12 bg-gradient-to-r from-[#B39977]/20 to-[#684F36]/20 rounded-3xl p-6 md:p-8 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <span className="text-2xl">💳</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#342519] mb-4">طرق الدفع</h3>
            <p className="text-gray-700 text-lg">
              الدفع عند الاستلام في جميع أنحاء الجزائر - خدمة توصيل لكل الولايات
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
