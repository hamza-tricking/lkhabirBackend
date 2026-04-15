export default function Footer() {
  return (
    <div className="relative overflow-hidden z-50 ">
      {/* Background with blur and transparency */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0  bg-gradient-to-br from-[#342519]/95 via-[#684F36]/90 to-[#342519]/95"></div>
        
        {/* Glass morphism overlay */}
        <div className="absolute inset-0 backdrop-blur-xl bg-white/5"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-[#B39977]/20 to-[#FFD700]/10 rounded-full blur-3xl animate-float hidden md:block"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 md:w-40 md:h-40 bg-gradient-to-br from-[#684F36]/20 to-[#B39977]/10 rounded-full blur-2xl animate-float hidden md:block" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-[#FFD700]/15 to-[#B39977]/10 rounded-full blur-2xl animate-pulse hidden md:block" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 md:w-28 md:h-28 bg-gradient-to-br from-[#EDE6D9]/20 to-[#684F36]/10 rounded-full blur-xl animate-float hidden md:block" style={{animationDelay: '3s'}}></div>
      </div>
      
      {/* Content */}
      <div className="relative py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Glass morphism cards */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {/* Logo Card */}
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B39977]/30 to-[#FFD700]/30 rounded-full blur-xl animate-pulse-glow"></div>
                  <img 
                    src="/aaa.png" 
                    alt="الخبير للعقارات" 
                    className="relative w-20 h-20 md:w-28 md:h-28 hover:scale-110 transition-transform duration-300 animate-float"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">الخبير للعقارات</h3>
                <p className="text-gray-300 text-sm md:text-base">El Khabir Immobilier</p>
                <div className="mt-4 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-[#B39977] rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-2 h-2 bg-[#684F36] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>

            {/* Navigation Card */}
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">روابط سريعة</h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <a href="#home" className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 md:px-4 md:py-3 text-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/10">
                  <span className="text-sm md:text-base font-medium">الرئيسية</span>
                </a>
                <a href="/usb" className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 md:px-4 md:py-3 text-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/10">
                  <span className="text-sm md:text-base font-medium">الفلاشة</span>
                </a>
                <a href="/course" className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 md:px-4 md:py-3 text-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/10">
                  <span className="text-sm md:text-base font-medium">الدورة</span>
                </a>
                <a href="/faq" className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 md:px-4 md:py-3 text-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/10">
                  <span className="text-sm md:text-base font-medium">الأسئلة</span>
                </a>
              </div>
            </div>

            {/* Contact Card */}
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">تواصل معنا</h3>
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/10 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                      <span className="text-white">📞</span>
                    </div>
                    <div>
                      <p className="text-white text-sm md:text-base font-medium">هاتف</p>
                      <p className="text-gray-300 text-xs md:text-sm">+213 674 37 95 89</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/10 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#684F36] to-[#B39977] rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                      <span className="text-white">✉️</span>
                    </div>
                    <div>
                      <p className="text-white text-sm md:text-base font-medium">بريد إلكتروني</p>
                      <p className="text-gray-300 text-xs md:text-sm">info@elkhabir-immobilier.dz</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-right mb-4 md:mb-0">
                <p className="text-white text-sm md:text-base">
                  &copy; 2026 الخبير للعقارات – El Khabir Immobilier. جميع الحقوق محفوظة.
                </p>
              </div>
              
              <div className="flex justify-center space-x-4">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 cursor-pointer">
                  <span className="text-white text-sm">📱</span>
                </div>
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 cursor-pointer">
                  <span className="text-white text-sm">💬</span>
                </div>
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 cursor-pointer">
                  <span className="text-white text-sm">📍</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
