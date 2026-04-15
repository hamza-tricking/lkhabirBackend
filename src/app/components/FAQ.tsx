'use client';

import { useState } from 'react';

const faqs = [
  // USB Flash Drive Questions
  { 
    question: "هل الفلاشة تعوض الدورة الكاملة؟", 
    answer: "لا. الفلاشة تعطيك محتوى نظري + قانون + تسويق + نماذج باش تفهم المجال وتبدأ بطريقة صحيحة. الدورة الكاملة (17,000 دج) فيها متابعة + تطبيق + تصحيح + صفقات وهذا مستوى آخر." 
  },
  { 
    question: "هل نحتاج إنترنت باش نشوف المحتوى؟", 
    answer: "لا. المحتوى كامل Offline: PDF + فيديوهات + ملفات + نماذج." 
  },
  { 
    question: "كيفاش نخدم الفلاشة؟", 
    answer: "تركب USB في الكمبيوتر وتدخل للملفات مباشرة، كلش منظم داخل دوسيات." 
  },
  { 
    question: "هل فيها متابعة أو أسئلة؟", 
    answer: "لا. الفلاشة بدون متابعة. إذا حبيت المتابعة 3 أشهر، كاين دورة منفصلة." 
  },
  { 
    question: "هل نقدر نرقّي من الفلاشة للدورة الكاملة؟", 
    answer: "نعم. تقدر تدير Upgrade وتخلص غير الفرق." 
  },
  
  // Course Questions
  { 
    question: "ما هي مدة الدورة؟", 
    answer: "الدورة مدتها 6 أشهر كاملة، تشمل قانون + تسويق + تطبيق عملي + متابعة شخصية." 
  },
  { 
    question: "هل الدورة أونلاين أو حضورية؟", 
    answer: "الدورة أونلاين كاملة، تقدر تخدم من أي مكان وفي أي وقت يناسبك." 
  },
  { 
    question: "هل في شهادة بعد الدورة؟", 
    answer: "نعم، تحصل على شهادة حضور  في مجال العقارات." 
  },
  { 
    question: "من هم المدربين في الدورة؟", 
    answer: "محامية عقارية + خبير تسويق عقاري + موثق، كلهم خبراء في مجالهم." 
  },
  { 
    question: "هل نقدر نبدأ بدون خبرة؟", 
    answer: "نعم، الدورة مصممة للمبتدئين تماماً، تبدأ من الصفر وتوصل للاحتراف." 
  },
  
  // General Questions
  { 
    question: "كيفاش نخلص؟", 
    answer: "الدفع عند الاستلام في معظم الولايات الجزائرية." 
  },
  { 
    question: "واش تجي مع الفلاشة؟", 
    answer: "محتوى كامل + كتاب هدية 'دليل أول صفقة عقارية'." 
  }
  
];

export default function FAQ() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 px-4 bg-[#EDE6D9] relative scroll-animate">
      <div className="absolute top-15 right-15 w-20 h-20 md:w-32 md:h-32 bg-[#B39977]/10 rounded-full blur-lg md:blur-2xl animate-float hidden md:block"></div>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-gradient mb-4">الأسئلة الشائعة</h2>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-[#B39977] to-[#684F36] mx-auto rounded-full animate-shimmer"></div>
        </div>
        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="group bg-gradient-to-r from-[#EDE6D9]/50 to-transparent border border-[#B39977]/20 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover-lift scroll-animate" style={{animationDelay: `${index * 0.1}s`}}>
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 md:px-8 py-4 md:py-6 text-right flex justify-between items-center hover:bg-gradient-to-r hover:from-[#EDE6D9]/70 hover:to-transparent transition-all duration-300"
              >
                <span className="text-base md:text-xl font-medium text-[#342519]">{faq.question}</span>
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center text-white text-sm md:text-lg group-hover:scale-110 transition-transform animate-pulse-glow">
                  {expandedFaq === index ? '−' : '+'}
                </div>
              </button>
              {expandedFaq === index && (
                <div className="px-6 md:px-8 py-4 md:py-6 text-sm md:text-lg text-gray-700 bg-gradient-to-r from-[#EDE6D9]/50 to-transparent border-t border-[#B39977]/20 animate-fade-in-up">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
