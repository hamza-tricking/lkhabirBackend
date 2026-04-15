'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const algeriaWilayas = [
  'الجزائر',
  'وهران',
  'قسنطينة',
  'عنابة',
  'بلدة',
  'تلمسان',
  'المدية',
  'مستغانم',
  'بجاية',
  'باتنة',
  'سكيكدة',
  'سيدي بلعباس',
  'الطارف',
  'تيزي وزو',
  'جيجل',
  'برج بوعريريج',
  'بومرداس',
  'البويرة',
  'الشلف',
  'خنشلة',
  'سوق أهراس',
  'ميلة',
  'عين الدفلى',
  'غليزان',
  'تمنراست',
  'أدرار',
  'الوادي',
  'خميسات',
  'سعيدة',
  'معسكر',
  'برج باجي مختار',
  'تندوف',
  'تيسمسيلت',
  'النعامة',
  'غرداية',
  'البيض',
  'إليزي',
  'تقرت',
  'تميمون',
  'جانت',
  'عين صالح',
  'عين قزام',
  'المغير'
];

const properties = [
  {
    id: 1,
    title: 'شقة فاخرة في حي راق',
    location: 'الجزائر العاصمة',
    price: '12,000,000 دج',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    bedrooms: 3,
    bathrooms: 2,
    area: '120 م²',
    type: 'شقة'
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

export default function ImmobilierPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 3;

  const handleSearch = () => {
    let filtered = properties;

    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedWilaya) {
      filtered = filtered.filter(property =>
        property.location.includes(selectedWilaya)
      );
    }

    setFilteredProperties(filtered);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Pagination calculations
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handlePropertyClick = (propertyId: number) => {
    console.log('Clicked property:', propertyId);
    router.push(`/immobilier/${propertyId}`);
  };

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

  return (
    <div className="min-h-screen" dir="rtl">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#B39977] via-[#8B7355] to-[#684F36] text-white py-20">
        <div className="absolute inset-0 bg-black/20" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=600&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          filter: 'blur(2px)'
        }}></div>
        <div className="relative container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              الخبير للعقارات 🏡 | لا وثائق ناقصة، لا أسعار خيالية
            </h2>
            <p className="text-xl text-yellow-300 max-w-3xl mx-auto font-semibold bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-yellow-300/30 shadow-lg">
              جميع العقارات المعروضة تم التحقق منها قانونيًا، وتم تقييم أسعارها بعقلانية حسب السوق.
            </p>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 text-center">العقارات للبيع</h1>
          <p className="text-xl text-center mb-8 text-white/90">اكتشف أفضل العقارات في جميع أنحاء الجزائر</p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="ابحث عن عقار..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-3 border border-[#B39977]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B39977] text-gray-700"
              />
              
              <select
                value={selectedWilaya}
                onChange={(e) => setSelectedWilaya(e.target.value)}
                className="px-4 py-3 border border-[#B39977]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B39977] text-gray-700"
              >
                <option value="">اختر الولاية</option>
                {algeriaWilayas.map((wilaya) => (
                  <option key={wilaya} value={wilaya}>{wilaya}</option>
                ))}
              </select>
              
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-[#B39977] to-[#684F36] text-white px-6 py-3 rounded-lg hover:from-[#684F36] hover:to-[#342519] transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                بحث
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#342519] mb-4">العقارات المتاحة</h2>
          <p className="text-gray-600">عرض {filteredProperties.length} عقار</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProperties.map((property) => (
            <div 
              key={property.id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden group cursor-pointer"
              onClick={() => handlePropertyClick(property.id)}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-[#B39977] to-[#684F36] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {property.type}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#342519] mb-2">{property.title}</h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {property.location}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    {property.bedrooms} غرف
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {property.bathrooms} حمام
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    {property.area}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-2xl font-bold text-[#B39977]">{property.price}</div>
                  <button 
                    className="bg-gradient-to-r from-[#B39977] to-[#684F36] text-white px-4 py-2 rounded-lg hover:from-[#684F36] hover:to-[#342519] transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePropertyClick(property.id);
                    }}
                  >
                    تفاصيل أكثر
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {currentProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-500">جرب تغيير معايير البحث</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-4 inline-flex items-center space-x-2 space-x-reverse">
              {/* Previous Button */}
              <button
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#B39977] to-[#684F36] text-white hover:from-[#684F36] hover:to-[#342519] shadow-md hover:shadow-lg transform hover:scale-105'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1 space-x-reverse">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                      currentPage === pageNumber
                        ? 'bg-gradient-to-r from-[#B39977] to-[#684F36] text-white shadow-lg transform scale-110'
                        : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-[#B39977]/20 hover:to-[#684F36]/20 hover:text-[#684F36] hover:shadow-md'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#B39977] to-[#684F36] text-white hover:from-[#684F36] hover:to-[#342519] shadow-md hover:shadow-lg transform hover:scale-105'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
