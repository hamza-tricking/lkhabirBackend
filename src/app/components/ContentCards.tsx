export default function ContentCards() {
  return (
    <section id="content" className="py-16 md:py-24 px-4 bg-[#EDE6D9] relative scroll-animate">
      <div className="absolute top-10 left-10 w-20 h-20 md:w-36 md:h-36 bg-[#B39977]/10 rounded-full blur-xl md:blur-3xl animate-float hidden md:block"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 md:w-28 md:h-28 bg-[#684F36]/10 rounded-full blur-lg md:blur-2xl animate-float hidden md:block" style={{animationDelay: '1.5s'}}></div>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-gradient mb-4">مميزات إضافية</h2>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="group bg-gradient-to-br from-[#EDE6D9]/50 to-transparent p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#B39977]/20 hover-lift scroll-animate" style={{animationDelay: '0.1s'}}>
            <div className="text-3xl md:text-5xl mb-4 md:mb-6 group-hover:scale-110 transition-transform animate-float">📁</div>
            <h3 className="text-lg md:text-2xl font-bold text-[#342519] mb-4 md:mb-6">القانون العقاري</h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-lg text-gray-700">
              <li className="flex items-center"><span className="text-[#B39977] ml-2">•</span> أنواع العقارات</li>
              <li className="flex items-center"><span className="text-[#B39977] ml-2">•</span> العقود والوثائق</li>
              <li className="flex items-center"><span className="text-[#B39977] ml-2">•</span> دفتر عقاري / ملكية / رخصة بناء</li>
              <li className="flex items-center"><span className="text-[#B39977] ml-2">•</span> الأخطاء القانونية اللي يديروها أغلب المبتدئين</li>
            </ul>
          </div>
          
          <div className="group bg-gradient-to-br from-[#EDE6D9]/50 to-transparent p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#B39977]/20 hover-lift scroll-animate" style={{animationDelay: '0.2s'}}>
            <div className="text-3xl md:text-5xl mb-4 md:mb-6 group-hover:scale-110 transition-transform animate-float" style={{animationDelay: '0.5s'}}>📁</div>
            <h3 className="text-lg md:text-2xl font-bold text-[#342519] mb-4 md:mb-6">التسويق العقاري</h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-lg text-gray-700">
              <li className="flex items-center"><span className="text-[#B39977] ml-2">•</span> كيف تجمع عروض</li>
              <li className="flex items-center"><span className="text-[#B39977] ml-2">•</span> كيف تجيب زبائن</li>
              <li className="flex items-center"><span className="text-[#B39977] ml-2">•</span> كيف تكتب إعلان عقاري</li>
              <li className="flex items-center"><span className="text-[#B39977] ml-2">•</span> كيف تخدم صفقات بذكاء</li>
            </ul>
          </div>
          
          <div className="group bg-gradient-to-br from-[#EDE6D9]/50 to-transparent p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#B39977]/20 hover-lift scroll-animate" style={{animationDelay: '0.3s'}}>
            <div className="text-3xl md:text-5xl mb-4 md:mb-6 group-hover:scale-110 transition-transform animate-float" style={{animationDelay: '1s'}}>📁</div>
            <h3 className="text-lg md:text-2xl font-bold text-[#342519] mb-4 md:mb-6">نماذج وملفات جاهزة</h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-lg text-gray-700">
              <li className="flex items-center"><span className="text-[#B39977] ml-2">•</span> نماذج عقود</li>
              <li className="flex items-center"><span className="text-[#B39977] ml-2">•</span> Checklists</li>
              <li className="flex items-center"><span className="text-[#B39977] ml-2">•</span> دراسات حالة</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
