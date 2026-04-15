'use client';

import { User } from './types';

interface DashboardNavigationProps {
  activeTab: 'users' | 'orders' | 'buyer-orders' | 'create-user';
  setActiveTab: (tab: 'users' | 'orders' | 'buyer-orders' | 'create-user') => void;
  users: User[];
  user?: { username: string };
}

export default function DashboardNavigation({ activeTab, setActiveTab, users, user }: DashboardNavigationProps) {
  return (
    <div className="mt-10 mb-8">
      <div className="container mx-auto px-4">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 rounded-2xl blur-lg opacity-75"></div>
          
          <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#B39977]/20 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {/* Users Management */}
              <div 
                className="group cursor-pointer flex flex-col items-center space-y-2"
                onClick={() => setActiveTab('users')}
              >
                <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-all duration-300 border-2 flex items-center justify-center ${
                  activeTab === 'users' 
                    ? 'bg-gradient-to-r from-[#B39977] to-[#684F36] border-[#B39977]/50 ring-2 ring-[#B39977]/30'
                    : 'bg-gradient-to-r from-[#B39977]/20 to-[#684F36]/20 border-[#B39977]/30 hover:border-[#B39977]/50'
                }`}>
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className="text-xs sm:text-sm font-bold text-[#342519]">إدارة المستخدمين</h3>
                  <p className="text-xs text-[#684F36]/70">{users.length} مستخدم</p>
                </div>
              </div>

              {/* Orders Management */}
              <div 
                className="group cursor-pointer flex flex-col items-center space-y-2"
                onClick={() => setActiveTab('orders')}
              >
                <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-all duration-300 border-2 flex items-center justify-center ${
                  activeTab === 'orders' 
                    ? 'bg-gradient-to-r from-[#684F36] to-[#B39977] border-[#B39977]/50 ring-2 ring-[#B39977]/30'
                    : 'bg-gradient-to-r from-[#684F36]/20 to-[#B39977]/20 border-[#B39977]/30 hover:border-[#B39977]/50'
                }`}>
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.293a1 1 0 00-1.414 1.414L14.586 10l-1.293 1.293a1 1 0 101.414 1.414L16 11.414l1.293 1.293a1 1 0 001.414-1.414L17.414 10l1.293-1.293a1 1 0 00-1.414-1.414L16 8.586l-1.293-1.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className="text-xs sm:text-sm font-bold text-[#342519]">إدارة الطلبات</h3>
                  <p className="text-xs text-[#684F36]/70">طلبات</p>
                </div>
              </div>

              {/* Buyer Orders Management */}
              <div 
                className="group cursor-pointer flex flex-col items-center space-y-2"
                onClick={() => setActiveTab('buyer-orders')}
              >
                <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-all duration-300 border-2 flex items-center justify-center ${
                  activeTab === 'buyer-orders' 
                    ? 'bg-gradient-to-r from-[#B39977] to-[#684F36] border-[#B39977]/50 ring-2 ring-[#B39977]/30'
                    : 'bg-gradient-to-r from-[#B39977]/20 to-[#684F36]/20 border-[#B39977]/30 hover:border-[#B39977]/50'
                }`}>
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className="text-xs sm:text-sm font-bold text-[#342519]">إدارة الطلبات للبائعين</h3>
                  <p className="text-xs text-[#684F36]/70">طلبات البائعين</p>
                </div>
              </div>
            </div>

            {/* Small Admin Info */}
            <div className="flex justify-center mt-4">
              <div className="group cursor-pointer flex flex-col items-center space-y-1">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 border border-[#B39977]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className="text-xs text-[#342519]/80">المسؤول</h3>
                  <p className="text-xs text-[#684F36]/60">{user?.username}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
