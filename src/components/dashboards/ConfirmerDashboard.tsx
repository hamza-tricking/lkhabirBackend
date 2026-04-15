'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Notifications from '@/components/Notifications';
import { getOrderTypeColor, getOrderTypeText, getStatusColor, getStatusText } from './admin/utils';

interface Order {
  _id: string;
  type: string;
  price: number;
  phoneNumber: string;
  fullName: string;
  description: string;
  time: {
    day: string;
    hour: string;
  };
  confirmer: {
    status: string;
    callAttempts: number;
    rendezvous?: {
      date: string;
      hour: string;
    };
    currentConfirmer?: {
      _id: string;
      username: string;
    };
    buyer?: {
      _id: string;
      username: string;
    };
  };
  buyer?: {
    _id: string;
    username: string;
    status: string;
    callAttemptsBuyer: number;
    buyerResponse?: string;
    paymentMethod?: string;
    reasonNotSold?: string;
    customReason?: string;
    followUpDate?: string;
    followUpTime?: string;
    addressConfirmation?: string;
    amountPaid?: number;
    remainingAmount?: number;
    isFullyPaid?: boolean;
  };
  additionalNotes?: string;
  createdAt: string;
}

interface User {
  _id: string;
  username: string;
}

// Function to clean description text
const cleanDescription = (description: string) => {
  if (!description) return '';
  
  // Remove patterns like "طلب دورة من [name]", "طلب USB من [name]", and "طلب تحدي من [name]"
  // Also remove name patterns like "ABDELKRIM ABDELALI - " and "فراجي لمياء - "
  // Clean up location formatting like "43|mila" to just "ميلة"
  const cleaned = description
    .replace(/^طلب دورة من\s+/i, '')
    .replace(/^طلب USB من\s+/i, '')
    .replace(/^طلب تحدي من\s+/i, '')
    .replace(/^طلب من\s+/i, '')
    .replace(/^[A-Z]+ [A-Z]+ -\s*/i, '') // Remove pattern like "ABDELKRIM ABDELALI - "
    .replace(/^[A-Za-z\u0621-\u064A\s]+[A-Za-z\u0621-\u064A\s]*-\s*/i, '') // Remove any name pattern ending with dash
    .replace(/\s*\|\s*[a-zA-Z]+$/g, '') // Remove "|mila" type patterns at the end
    .replace(/^\d+\|\s*/g, '') // Remove "43|" type patterns at the beginning
    .trim();
  
  return cleaned;
};

export default function ConfirmerDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [retryingOrders, setRetryingOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [buyers, setBuyers] = useState<User[]>([]);
  const [confirmers, setConfirmers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState({
    status: 'not_processed_yet',
    callAttempts: 1,
    rendezvous: {
      date: new Date().toISOString().split('T')[0],
      hour: new Date().toTimeString().slice(0, 5)
    },
    buyer: '',
    currentConfirmer: '',
    additionalNotes: ''
  });

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dmtart.pro/lkhabir/api';

  useEffect(() => {
    fetchOrders();
    fetchBuyers();
    fetchConfirmers();

    // Listen for new order events from SSE
    const handleNewOrder = (event: CustomEvent) => {
      console.log('New order event received in confirmer dashboard:', event.detail);
      // Refresh orders when a new order is received
      fetchOrders();
    };

    // Listen for order update events from SSE
    const handleOrderUpdate = (event: CustomEvent) => {
      console.log('Order update event received in confirmer dashboard:', event.detail);
      // Refresh orders when an order is updated
      fetchOrders();
    };

    window.addEventListener('newOrder', handleNewOrder as EventListener);
    window.addEventListener('orderUpdated', handleOrderUpdate as EventListener);

    return () => {
      window.removeEventListener('newOrder', handleNewOrder as EventListener);
      window.removeEventListener('orderUpdated', handleOrderUpdate as EventListener);
    };
  }, []);

  const fetchBuyers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/orders/buyers`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBuyers(data);
      }
    } catch (error) {
      console.error('Error fetching buyers:', error);
    }
  };

  const fetchConfirmers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/orders/confirmers`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setConfirmers(data);
      }
    } catch (error) {
      console.error('Error fetching confirmers:', error);
    }
  };

  const filterOrders = (status: string) => {
    setStatusFilter(status);
    if (status === 'all') {
      setFilteredOrders(orders);
    } else if (status === 'retrying') {
      setFilteredOrders(retryingOrders);
    } else {
      setFilteredOrders(orders.filter(o => o.confirmer?.status === status));
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/orders/confirmer-all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data);
        // Filter orders with buyer status 'retrying'
        const retrying = data.filter((order: Order) => 
          order.buyer && order.buyer.status === 'retrying'
        );
        setRetryingOrders(retrying);
        
        // If currently filtering by retrying, update filteredOrders
        if (statusFilter === 'retrying') {
          setFilteredOrders(retrying);
        }
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedOrder) return;

    try {
      const token = localStorage.getItem('token');
      
      // If this is a retrying order, reset buyer status to not_processed_yet
      if (statusFilter === 'retrying') {
        const buyerUpdateData = {
          status: 'not_processed_yet',
          callAttemptsBuyer: 0
        };

        const buyerResponse = await fetch(`${API_BASE_URL}/orders/${selectedOrder._id}/buyer-status`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(buyerUpdateData)
        });

        if (!buyerResponse.ok) {
          throw new Error('Failed to reset buyer status');
        }
      }

      // Proceed with normal confirmer status update
      const updateData: any = {
        status: statusUpdate.status,
        callAttempts: statusUpdate.callAttempts
      };

      // Add rendezvous, currentConfirmer, buyer, and additionalNotes if status is call_confirmed
      if (statusUpdate.status === 'call_confirmed') {
        updateData.rendezvous = statusUpdate.rendezvous;
        if (statusUpdate.buyer) {
          updateData.buyer = statusUpdate.buyer;
        }
        if (statusUpdate.currentConfirmer) {
          updateData.currentConfirmer = statusUpdate.currentConfirmer;
        }
      }
      
      // Always include additionalNotes if provided
      if (statusUpdate.additionalNotes) {
        updateData.additionalNotes = statusUpdate.additionalNotes;
      }

      const response = await fetch(`${API_BASE_URL}/orders/${selectedOrder._id}/confirmer-status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        setShowStatusModal(false);
        setSelectedOrder(null);
        // Immediate refresh to show updated values
        await fetchOrders();
        // Reset status update form
        setStatusUpdate({
          status: 'call_not_response',
          callAttempts: 1,
          rendezvous: { 
            date: new Date().toISOString().split('T')[0],
            hour: new Date().toTimeString().slice(0, 5)
          },
          buyer: '',
          currentConfirmer: '',
          additionalNotes: ''
        });
      }
    } catch (error) {
      console.error('Error updating order:', error);
      console.error('Error updating status:', error);
      alert('حدث خطأ أثناء تحديث الحالة');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'call_confirmed':
        return 'bg-green-100 text-green-800';
      case 'call_not_response':
        return 'bg-yellow-100 text-yellow-800';
      case 'phone_closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'call_confirmed':
        return 'تم تأكيد المكالمة';
      case 'call_not_response':
        return 'لم يتصل بعد';
      case 'phone_closed':
        return 'الهاتف مغلق';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#684F36]">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECE0BD] via-[#D4AF37]/10 to-[#B39977]/20">
      {/* Dashboard Navigation Bar */}
      <div className="mt-10 mb-8">
        <div className="container mx-auto px-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 rounded-2xl blur-lg opacity-75"></div>
            
            <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#B39977]/20 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Orders Count */}
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#342519] mb-2">لوحة تحكم المؤكد</h1>
            <p className="text-[#684F36]/70">مرحباً بك {user?.username}!</p>
          </div>
          <Notifications />
        </div>

        {/* Orders List */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 rounded-2xl blur-lg opacity-75"></div>
          <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#B39977]/20 p-6">
            <h2 className="text-xl font-bold text-[#342519] mb-4">الطلبات</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="border-b border-[#B39977]/20">
                    <th className="px-4 py-2 text-[#342519]">الاسم الكامل</th>
                    <th className="px-4 py-2 text-[#342519]">رقم الهاتف</th>
                    <th className="px-4 py-2 text-[#342519]">النوع</th>
                    <th className="px-4 py-2 text-[#342519]">السعر</th>
                    <th className="px-4 py-2 text-[#342519]">الحالة</th>
                    <th className="px-4 py-2 text-[#342519]">المؤكد</th>
                    <th className="px-4 py-2 text-[#342519]">البائع</th>
                    <th className="px-4 py-2 text-[#342519]">المقابلة</th>
                    <th className="px-4 py-2 text-[#342519]">العنوان</th>
                    <th className="px-4 py-2 text-[#342519]">ملاحظات إضافية</th>
                    <th className="px-4 py-2 text-[#342519]">تاريخ الإنشاء</th>
                    <th className="px-4 py-2 text-[#342519]">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="border-b border-[#B39977]/10 hover:bg-[#B39977]/5">
                      <td className="px-4 py-3 text-[#342519]">{order.fullName}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={(event) => {
                            navigator.clipboard.writeText(order.phoneNumber);
                            // Optional: Show a brief feedback
                            const button = event.currentTarget;
                            const originalText = button.textContent;
                            button.textContent = 'تم النسخ!';
                            button.className = 'px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 cursor-pointer';
                            setTimeout(() => {
                              button.textContent = originalText;
                              button.className = 'text-[#342519] hover:text-[#B39977] cursor-pointer transition-colors';
                            }, 1000);
                          }}
                          className="text-[#342519] hover:text-[#B39977] cursor-pointer transition-colors"
                          title="انقر لنسخ الرقم"
                        >
                          {order.phoneNumber}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderTypeColor(order.type)}`}>
                          {getOrderTypeText(order.type)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#342519]">{order.price} دج</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.confirmer?.status || 'call_not_response')}`}>
                          {getStatusText(order.confirmer?.status || 'call_not_response')}
                        </span>
                        {order.confirmer?.callAttempts > 0 && (
                          <span className="text-xs text-[#684F36]/70 mr-2">
                            ({order.confirmer.callAttempts} محاولة)
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {order.confirmer?.status === 'call_confirmed' && order.confirmer?.currentConfirmer ? (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {order.confirmer.currentConfirmer.username}
                          </span>
                        ) : (
                          <span className="text-xs text-[#684F36]/50">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {order.confirmer?.status === 'call_confirmed' && order.confirmer?.buyer ? (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {order.confirmer.buyer.username}
                          </span>
                        ) : (
                          <span className="text-xs text-[#684F36]/50">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {order.confirmer?.status === 'call_confirmed' && order.confirmer?.rendezvous ? (
                          <div className="text-xs">
                            <div className="text-gray-800 font-medium">
                              {new Date(order.confirmer.rendezvous.date).toLocaleDateString('en-US')}
                            </div>
                            <div className="text-[#684F36]/70">
                              {order.confirmer.rendezvous.hour}
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-[#684F36]/50">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-700 max-w-xs truncate" title={cleanDescription(order.description)}>
                        {cleanDescription(order.description)}
                      </td>
                      <td className="px-4 py-3 text-gray-700 max-w-xs truncate" title={order.additionalNotes || 'لا توجد ملاحظات'}>
                        {order.additionalNotes || 'لا توجد ملاحظات'}
                      </td>
                      <td className="px-4 py-3 text-[#684F36]/70">
                        {new Date(order.createdAt).toLocaleDateString('en-US')}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowStatusModal(true);
                            // Set current status and call attempts in the modal
                            setStatusUpdate({
                              status: order.confirmer?.status || 'call_not_response',
                              callAttempts: order.confirmer?.callAttempts || 1,
                              rendezvous: { 
                                date: order.confirmer?.rendezvous?.date ? new Date(order.confirmer.rendezvous.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                                hour: order.confirmer?.rendezvous?.hour || new Date().toTimeString().slice(0, 5)
                              },
                              buyer: order.confirmer?.buyer?._id || '',
                              currentConfirmer: order.confirmer?.currentConfirmer?._id || '',
                              additionalNotes: order.additionalNotes || ''
                            });
                          }}
                          className="bg-gradient-to-r from-[#B39977] to-[#684F36] text-white px-3 py-1 rounded-lg text-sm hover:from-[#684F36] hover:to-[#342519] transition-all duration-300"
                        >
                          {statusFilter === 'retrying' ? 'اعادة ارسال للبائع' : 'تحديث الحالة'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredOrders.length === 0 && retryingOrders.length === 0 && (
              <div className="text-center py-8">
                <p className="text-[#684F36]/70">
                  {statusFilter === 'all' ? 'لا توجد طلبات حالياً' : `لا توجد طلبات بهذه الحالة حالياً`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] flex flex-col overflow-y-auto">
            <h3 className="text-xl font-bold text-[#342519] mb-2">
              {statusFilter === 'retrying' ? 'اعادة ارسال للبائع' : 'تحديث حالة الطلب'}
            </h3>
            {selectedOrder && (
              <div className="mb-4 p-3 bg-[#B39977]/10 rounded-lg">
                <p className="text-sm font-medium text-gray-800">
                  <span className="text-[#684F36]/70">الاسم:</span> {selectedOrder.fullName}
                </p>
                <p className="text-sm font-medium text-gray-800">
                  <span className="text-[#684F36]/70">الهاتف:</span> {selectedOrder.phoneNumber}
                </p>
              </div>
            )}
            
            <div className="flex-1 overflow-y-auto space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">الحالة</label>
                <select
                  value={statusUpdate.status}
                  onChange={(e) => setStatusUpdate({...statusUpdate, status: e.target.value, buyer: '', currentConfirmer: ''})}
                  className="w-full px-3 py-2 border border-[#B39977]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B39977]/50 text-gray-800"
                >
                  <option value="call_not_response">لم يتصل بعد</option>
                  <option value="call_confirmed">تم تأكيد المكالمة</option>
                  <option value="phone_closed">الهاتف مغلق</option>
                </select>
              </div>

              {statusUpdate.status === 'call_confirmed' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">تاريخ المقابلة</label>
                    <input
                      type="date"
                      value={statusUpdate.rendezvous.date}
                      onChange={(e) => setStatusUpdate({...statusUpdate, rendezvous: {...statusUpdate.rendezvous, date: e.target.value}})}
                      className="w-full px-3 py-2 border border-[#B39977]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B39977]/50 text-gray-800"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">وقت المقابلة</label>
                    <input
                      type="time"
                      value={statusUpdate.rendezvous.hour}
                      onChange={(e) => setStatusUpdate({...statusUpdate, rendezvous: {...statusUpdate.rendezvous, hour: e.target.value}})}
                      className="w-full px-3 py-2 border border-[#B39977]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B39977]/50 text-gray-800"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">اختر المؤكد</label>
                    <select
                      value={statusUpdate.currentConfirmer || ''}
                      onChange={(e) => setStatusUpdate({...statusUpdate, currentConfirmer: e.target.value})}
                      className="w-full px-3 py-2 border border-[#B39977]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B39977]/50 text-gray-800"
                    >
                      <option value="">اختر المؤكد</option>
                      {confirmers.map((confirmer: any) => (
                        <option key={confirmer._id} value={confirmer._id}>
                          {confirmer.username}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">اختر البائع</label>
                    <select
                      value={statusUpdate.buyer || ''}
                      onChange={(e) => setStatusUpdate({...statusUpdate, buyer: e.target.value})}
                      className="w-full px-3 py-2 border border-[#B39977]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B39977]/50 text-gray-800"
                    >
                      <option value="">اختر البائع</option>
                      {buyers.map((buyer: any) => (
                        <option key={buyer._id} value={buyer._id}>
                          {buyer.username}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">عدد المحاولات</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStatusUpdate({...statusUpdate, callAttempts: Math.max(1, statusUpdate.callAttempts - 1)})}
                    className="px-3 py-2 bg-[#B39977]/20 hover:bg-[#B39977]/30 rounded-lg text-gray-800 font-bold transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={statusUpdate.callAttempts}
                    onChange={(e) => setStatusUpdate({...statusUpdate, callAttempts: parseInt(e.target.value) || 1})}
                    className="flex-1 px-3 py-2 border border-[#B39977]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B39977]/50 text-gray-800 text-center"
                  />
                  <button
                    type="button"
                    onClick={() => setStatusUpdate({...statusUpdate, callAttempts: statusUpdate.callAttempts + 1})}
                    className="px-3 py-2 bg-[#B39977]/20 hover:bg-[#B39977]/30 rounded-lg text-gray-800 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">ملاحظات إضافية</label>
                <textarea
                  value={statusUpdate.additionalNotes || ''}
                  onChange={(e) => setStatusUpdate({...statusUpdate, additionalNotes: e.target.value})}
                  className="w-full px-3 py-2 border border-[#B39977]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B39977]/50 text-gray-800"
                  rows={3}
                  placeholder="أضف أي ملاحظات إضافية..."
                />
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleStatusUpdate}
                disabled={statusUpdate.status === 'call_confirmed' && !statusUpdate.buyer}
                className={`flex-1 font-bold py-2 rounded-lg transition-all duration-300 ${
                  statusUpdate.status === 'call_confirmed' && !statusUpdate.buyer
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#B39977] to-[#684F36] text-white hover:from-[#684F36] hover:to-[#342519]'
                }`}
              >
                {statusFilter === 'retrying' ? 'اعادة ارسال للبائع' : 'تحديث'}
              </button>
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setSelectedOrder(null);
                }}
                className="flex-1 bg-gray-200 text-[#342519] font-bold py-2 rounded-lg hover:bg-gray-300 transition-all duration-300"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
