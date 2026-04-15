'use client';

import { Order } from './types';
import { getStatusColor, getStatusText } from './utils';

interface OrdersStatisticsProps {
  orders: Order[];
  retryingOrders: Order[];
  statusFilter: string;
  filterOrders: (status: string) => void;
  handleDeleteAllOrders: () => void;
}

export default function OrdersStatistics({ orders, retryingOrders, statusFilter, filterOrders, handleDeleteAllOrders }: OrdersStatisticsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* All Orders */}
      <div className={`group cursor-pointer ${statusFilter === 'all' ? 'ring-2 ring-[#B39977]/50' : ''}`} onClick={() => filterOrders('all')}>
        <div className="flex items-center space-x-4 space-x-reverse p-4 rounded-xl bg-gradient-to-r from-[#B39977]/10 to-[#684F36]/10 hover:from-[#B39977]/20 hover:to-[#684F36]/20 transition-all duration-300 border-2 border-[#B39977]/20 hover:border-[#B39977]/40">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 mx-2 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100 4h2a1 1 0 100 2 2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#342519] mb-1">جميع الطلبات</h3>
            <p className="text-sm text-[#684F36]/70">{orders.length} طلب</p>
          </div>
        </div>
      </div>

      {/* Confirmed Calls */}
      <div className={`group cursor-pointer ${statusFilter === 'call_confirmed' ? 'ring-2 ring-green-500/50' : ''}`} onClick={() => filterOrders('call_confirmed')}>
        <div className="flex items-center space-x-4 space-x-reverse p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300 border-2 border-green-500/20 hover:border-green-500/40">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 mx-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#342519] mb-1">مكالمات مؤكدة</h3>
            <p className="text-sm text-[#684F36]/70">
              {orders.filter(o => o.confirmer?.status === 'call_confirmed').length} طلب
            </p>
          </div>
        </div>
      </div>

      {/* Pending Calls */}
      <div className={`group cursor-pointer ${statusFilter === 'call_not_response' ? 'ring-2 ring-yellow-500/50' : ''}`} onClick={() => filterOrders('call_not_response')}>
        <div className="flex items-center space-x-4 space-x-reverse p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 hover:from-yellow-500/20 hover:to-orange-500/20 transition-all duration-300 border-2 border-yellow-500/20 hover:border-yellow-500/40">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 mx-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#342519] mb-1">مكالمات معلقة</h3>
            <p className="text-sm text-[#684F36]/70">
              {orders.filter(o => o.confirmer?.status === 'call_not_response').length} طلب
            </p>
          </div>
        </div>
      </div>

      {/* Phone Closed Calls */}
      <div className={`group cursor-pointer ${statusFilter === 'phone_closed' ? 'ring-2 ring-red-500/50' : ''}`} onClick={() => filterOrders('phone_closed')}>
        <div className="flex items-center space-x-4 space-x-reverse p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-red-600/10 hover:from-red-500/20 hover:to-red-600/20 transition-all duration-300 border-2 border-red-500/20 hover:border-red-500/40">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 mx-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l6.921 6.92a6.004 6.004 0 016.92 6.92l6.921-6.921a1 1 0 00-1.414-1.414l-6.92 6.921a6.004 6.004 0 01-6.92-6.92z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#342519] mb-1">الهاتف مغلق</h3>
            <p className="text-sm text-[#684F36]/70">
              {orders.filter(o => o.confirmer?.status === 'phone_closed').length} طلب
            </p>
          </div>
        </div>
      </div>

      {/* Retrying Orders */}
      <div className={`group cursor-pointer ${statusFilter === 'retrying' ? 'ring-2 ring-orange-500/50' : ''}`} onClick={() => filterOrders('retrying')}>
        <div className="flex items-center space-x-4 space-x-reverse p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 border-2 border-orange-500/20 hover:border-orange-500/40">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 mx-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#342519] mb-1">الطلبات الملغاة</h3>
            <p className="text-sm text-[#684F36]/70">
              {retryingOrders.length} طلب
            </p>
          </div>
        </div>
      </div>
      
      {orders.length > 0 && (
        <div className="col-span-full flex justify-end">
          <button
            onClick={handleDeleteAllOrders}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            حذف جميع الطلبات
          </button>
        </div>
      )}
    </div>
  );
}
