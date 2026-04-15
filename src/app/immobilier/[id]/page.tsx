'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const properties = [
  {
    id: 1,
    title: 'شقة فاخرة في حي راق',
    location: 'الجزائر العاصمة',
    price: '12,000,000 دج',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    bedrooms: 3,
    bathrooms: 2,
    area: '120 م²',
    type: 'شقة',
    description: 'شقة فاخرة تقع في حي راق ومتميز بالجزائر العاصمة، تتميز بإطلالة خلابة وتصميم عصري يوفر كل وسائل الراحة والرفاهية.',
    features: [
      'إطلالة بحرية',
      'تكييف مركزي',
      'مطبخ مجهز بالكامل',
      'مواقف سيارات',
      'أمان 24/7',
      'قرب المرافق العامة'
    ],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop'
    ],
    agent: {
      name: 'أحمد محمد',
      phone: '+213 674 37 95 89',
      email: 'ahmed@elkhabir-immobilier.dz'
    }
  },
  {
    id: 2,
    title: 'فيلا حديثة بحديقة',
    location: 'وهران',
    price: '25,000,000 دج',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop',
    bedrooms: 5,
    bathrooms: 3,
    area: '350 م²',
    type: 'فيلا'
  },
  {
    id: 3,
    title: 'شقة استوديو للطلاب',
    location: 'قسنطينة',
    price: '4,500,000 دج',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    bedrooms: 1,
    bathrooms: 1,
    area: '45 م²',
    type: 'استوديو'
  },
  {
    id: 4,
    title: 'عمارة سكنية تجارية',
    location: 'عنابة',
    price: '45,000,000 دج',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    bedrooms: 8,
    bathrooms: 4,
    area: '500 م²',
    type: 'عمارة'
  },
  {
    id: 5,
    title: 'دوبليكس فاخر',
    location: 'تلمسان',
    price: '18,000,000 دج',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop',
    bedrooms: 4,
    bathrooms: 3,
    area: '200 م²',
    type: 'دوبليكس'
  },
  {
    id: 6,
    title: 'شقة بمنظر بحر',
    location: 'المدية',
    price: '15,500,000 دج',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    bedrooms: 3,
    bathrooms: 2,
    area: '150 م²',
    type: 'شقة'
  }
];

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<typeof properties[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const propertyId = params.id ? parseInt(params.id as string) : 0;
    const foundProperty = properties.find(p => p.id === propertyId);
    console.log('Property ID:', propertyId);
    console.log('Found property:', foundProperty);
    setProperty(foundProperty || null);
  }, [params.id]);

  // Apply scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  if (!property) {
    return (
      <div className="min-h-screen" dir="rtl">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4">🏠</div>
            <h2 className="text-2xl font-bold text-gray-600 mb-2">العقار غير موجود</h2>
            <button
              onClick={() => router.push('/immobilier')}
              className="bg-gradient-to-r from-[#B39977] to-[#684F36] text-white px-6 py-3 rounded-lg hover:from-[#684F36] hover:to-[#342519] transition-all duration-300"
            >
              العودة للعقارات
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Debug: Log property data
  console.log('Rendering property:', property.title);

  const nextImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    }
  };

  return (
    <div className="min-h-screen" dir="rtl">
       
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#B39977] via-[#8B7355] to-[#684F36] text-white py-16">
        <div className="absolute inset-0 bg-black/20" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=600&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          filter: 'blur(2px)'
        }}></div>
        <div className="relative container mx-auto px-6">
          <button
            onClick={() => router.push('/immobilier')}
            className="mb-6 inline-flex items-center text-white hover:text-yellow-300 transition-all duration-300 group"
          >
            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            العودة للعقارات
          </button>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{property?.title}</h1>
            <div className="flex items-center text-white/90 text-lg">
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {property?.location}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative h-64 md:h-96 lg:h-[500px]">
                <img
                  src={property?.images?.[currentImageIndex] || property?.image}
                  alt={property?.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Buttons */}
                {property?.images && property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                    >
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                    >
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
                
                {/* Image Counter */}
                {property?.images && property.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {property?.images && property.images.length > 1 && (
                <div className="p-3 md:p-4 bg-gray-50">
                  <div className="flex space-x-2 space-x-reverse overflow-x-auto">
                    {property.images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-12 md:w-20 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${
                          currentImageIndex === index
                            ? 'border-[#B39977] shadow-lg scale-110'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${property?.title} - ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile: Price and Quick Stats */}
            <div className="lg:hidden grid grid-cols-2 gap-4">
              {/* Price Card */}
              <div className="bg-gradient-to-r from-[#B39977] to-[#684F36] text-white rounded-2xl p-4 shadow-xl">
                <div className="text-sm opacity-90 mb-1">السعر</div>
                <div className="text-xl md:text-2xl font-bold">{property?.price}</div>
              </div>
              
              {/* Quick Contact */}
              <div className="bg-gradient-to-r from-[#684F36] to-[#342519] text-white rounded-2xl p-4 shadow-xl">
                <div className="text-sm opacity-90 mb-1">اتصل الآن</div>
                <div className="text-lg md:text-xl font-bold" dir="ltr">+213 674 37 95 89</div>
              </div>
            </div>

            {/* Property Information - Creative Layout */}
            <div className="space-y-4">
              {/* Title and Location */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#342519] mb-3">{property?.title}</h2>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {property?.location}
                </div>
              </div>

              {/* Stats Grid - Mobile: 2x2, Desktop: 4 columns */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl shadow-lg p-4 text-center group hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center mx-auto mb-2 transform group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </div>
                  <div className="text-xl font-bold text-[#342519]">{property?.bedrooms}</div>
                  <div className="text-sm text-gray-600">غرف نوم</div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg p-4 text-center group hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center mx-auto mb-2 transform group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-xl font-bold text-[#342519]">{property?.bathrooms}</div>
                  <div className="text-sm text-gray-600">حمامات</div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg p-4 text-center group hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center mx-auto mb-2 transform group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <div className="text-xl font-bold text-[#342519]">{property?.area}</div>
                  <div className="text-sm text-gray-600">مساحة</div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg p-4 text-center group hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center mx-auto mb-2 transform group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-xl font-bold text-[#342519]">{property?.type}</div>
                  <div className="text-sm text-gray-600">نوع العقار</div>
                </div>
              </div>

              {/* Description and Features - Side by side on desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Description */}
                {property?.description && (
                  <div className="bg-white rounded-2xl shadow-xl p-6 lg:col-span-2">
                    <h3 className="text-xl font-semibold text-[#342519] mb-4">الوصف</h3>
                    <p className="text-gray-700 leading-relaxed">{property.description}</p>
                  </div>
                )}

                {/* Features */}
                {property?.features && (
                  <div className="bg-white rounded-2xl shadow-xl p-6 lg:col-span-2">
                    <h3 className="text-xl font-semibold text-[#342519] mb-4">المميزات</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                          <svg className="w-5 h-5 text-green-500 ml-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700 font-medium text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Desktop Only */}
          <div className="hidden lg:block space-y-6">
            
            {/* Price Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-3xl md:text-4xl font-bold text-[#B39977] mb-2">{property?.price}</div>
                <div className="text-gray-600">سعر العقار</div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-[#B39977] to-[#684F36] hover:from-[#684F36] hover:to-[#342519] text-white py-4 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105">
                  احجز الآن
                </button>
                <button className="w-full bg-white border-2 border-[#B39977] text-[#B39977] hover:bg-[#B39977] hover:text-white py-4 rounded-xl transition-all duration-300 font-bold">
                  طلب معلومات
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-[#342519] mb-6">معلومات التواصل</h3>
              
              {property?.agent ? (
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center ml-4">
                      <span className="text-white text-lg">👤</span>
                    </div>
                    <div>
                      <div className="font-bold text-[#342519]">{property.agent.name}</div>
                      <div className="text-sm text-gray-600">وكيل عقاري</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center ml-4">
                      <span className="text-white text-lg">📞</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">هاتف</div>
                      <div className="font-bold text-[#342519] text-lg" dir="ltr">{property.agent.phone}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center ml-4">
                      <span className="text-white text-lg">✉️</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">بريد إلكتروني</div>
                      <div className="font-bold text-[#342519]">{property.agent.email}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <a 
                    href="tel:+213674379589"
                    className="flex items-center p-4 bg-gradient-to-r from-[#684F36] to-[#342519] text-white rounded-lg hover:from-[#342519] hover:to-[#1a1612] transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center ml-4">
                      <span className="text-white text-xl">📞</span>
                    </div>
                    <div>
                      <div className="text-sm opacity-90">اتصل مباشرة</div>
                      <div className="font-bold text-lg" dir="ltr">+213 674 37 95 89</div>
                    </div>
                  </a>
                  
                  <a 
                    href="https://wa.me/213674379589"
                    target="_blank"
                    className="flex items-center p-4 bg-gradient-to-r from-[#B39977]/60 to-[#684F36]/60 text-white rounded-lg hover:from-[#B39977]/80 hover:to-[#684F36]/80 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center ml-4">
                      <span className="text-white text-xl">💬</span>
                    </div>
                    <div>
                      <div className="text-sm opacity-90">واتساب</div>
                      <div className="font-bold text-lg" dir="ltr">+213 674 37 95 89</div>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Action Buttons - Fixed Bottom */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl">
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-gradient-to-r from-[#B39977] to-[#684F36] text-white py-3 rounded-xl font-bold shadow-lg">
              احجز الآن
            </button>
            <a 
              href="tel:+213674379589"
              className="bg-gradient-to-r from-[#684F36] to-[#342519] text-white py-3 rounded-xl font-bold shadow-lg text-center"
            >
              📞 اتصل
            </a>
          </div>
        </div>
        
        {/* Add padding for fixed mobile buttons */}
        <div className="lg:hidden h-20"></div>
      </div>
    </div>
  );
}
