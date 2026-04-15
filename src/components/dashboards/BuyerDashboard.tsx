'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getOrderTypeColor, getOrderTypeText } from './admin/utils';

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
    currentConfirmer: {
      username: string;
    };
  };
  buyer: {
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

export default function BuyerDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState({
    status: 'not_processed_yet',
    callAttemptsBuyer: 0,
    buyerResponse: '',
    paymentMethod: '',
    reasonNotSold: '',
    customReason: '',
    followUpDate: '',
    followUpTime: '',
    addressConfirmation: '',
    amountPaid: '',
    remainingAmount: '',
    isFullyPaid: false
  });

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dmtart.pro/lkhabir/api';

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/orders/buyer`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Show all orders assigned to the buyer
        setOrders(data);
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
      const response = await fetch(`${API_BASE_URL}/orders/${selectedOrder._id}/buyer-status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(statusUpdate)
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        // Update the local state with the updated order
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === selectedOrder._id ? updatedOrder.order : order
          )
        );
        setShowStatusModal(false);
        setSelectedOrder(null);
      } else {
        console.error('Failed to update status');
        alert('فشل تحديث الحالة');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('حدث خطأ أثناء تحديث الحالة');
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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#342519] mb-2">لوحة تحكم البائع</h1>
        <p className="text-[#684F36]/70 mb-8">مرحباً بك {user?.username}!</p>

        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[#684F36]/70">لا توجد طلبات حالياً</p>
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#B39977]/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#B39977]/10 to-[#684F36]/10 border-b border-[#B39977]/20">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-bold text-black">اسم العميل</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-black">رقم الهاتف</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-black">النوع</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-black">السعر</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-black">المؤكد</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-black">حالة المشتري</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-black">تفاصيل إضافية</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-black">موعد المقابلة</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-black">العنوان</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-black">ملاحظات إضافية</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-black">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#B39977]/10">
                  {orders.map((order: Order) => (
                    <tr key={order._id} className="hover:bg-[#B39977]/5 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center ml-3">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="font-medium text-black">{order.fullName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
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
                              button.className = 'text-gray-700 hover:text-[#B39977] cursor-pointer transition-colors';
                            }, 1000);
                          }}
                          className="text-gray-700 hover:text-[#B39977] cursor-pointer transition-colors"
                          title="انقر لنسخ الرقم"
                        >
                          {order.phoneNumber}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getOrderTypeColor(order.type)}`}>
                          {getOrderTypeText(order.type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-black">{order.price} دج</td>
                      <td className="px-6 py-4 text-gray-700">{order.confirmer.currentConfirmer?.username || 'غير محدد'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          order.buyer.status === 'user_response' ? 'bg-blue-100 text-blue-800' :
                          order.buyer.status === 'user_phone_closed' ? 'bg-red-100 text-red-800' :
                          order.buyer.status === 'not_processed_yet' ? 'bg-gray-100 text-gray-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {order.buyer.status === 'user_response' ? 
                            (order.buyer.buyerResponse === 'sold' ? '✅ تم البيع' :
                             order.buyer.buyerResponse === 'interested_later' ? '🕒 مهتم لكن بعد مدة' :
                             order.buyer.buyerResponse === 'not_sold' ? '❌ لم يتم البيع' :
                             '📞 استجابة المستخدم') :
                           order.buyer.status === 'user_phone_closed' ? 'الهاتف مغلق' : 
                           order.buyer.status === 'not_processed_yet' ? '⏳ لم تتم المعالجة بعد' :
                           'ملغى'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 text-sm max-w-xs">
                        {order.buyer.buyerResponse === 'sold' && order.buyer.paymentMethod && (
                          <div className="text-blue-600">
                            💳 {order.buyer.paymentMethod === 'online_payment' ? 'Paiement en ligne' : 'الدفع عند الاستلام'}
                          </div>
                        )}
                        {order.buyer.buyerResponse === 'not_sold' && order.buyer.reasonNotSold && (
                          <div className="text-red-600">
                            ❌ {order.buyer.reasonNotSold === 'price_high' ? 'السعر مرتفع' :
                                 order.buyer.reasonNotSold === 'needs_time' ? 'لازم يفكر' :
                                 order.buyer.reasonNotSold === 'afraid_scam' ? 'خايف من النصب' :
                                 order.buyer.reasonNotSold === 'not_interested' ? 'غير مهتم حاليا' :
                                 order.buyer.reasonNotSold === 'no_decision' ? 'قرار مش عنده' :
                                 order.buyer.reasonNotSold === 'other' ? (order.buyer.customReason || 'أخرى') : ''}
                          </div>
                        )}
                        {(order.buyer.buyerResponse === 'interested_later' || order.buyer.buyerResponse === 'not_sold') && 
                         order.buyer.followUpDate && (
                          <div className="text-orange-600 text-xs">
                            📅 {new Date(order.buyer.followUpDate).toLocaleDateString('en-US')}
                            {order.buyer.followUpTime && ` ⏰ ${order.buyer.followUpTime}`}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {order.confirmer.rendezvous ? 
                          `${new Date(order.confirmer.rendezvous.date).toLocaleDateString('en-US')} ${order.confirmer.rendezvous.hour}` : 
                          'غير محدد'
                        }
                      </td>
                      <td className="px-6 py-4 text-gray-700 max-w-xs truncate" title={cleanDescription(order.description)}>
                        {cleanDescription(order.description)}
                      </td>
                      <td className="px-6 py-4 text-gray-700 max-w-xs truncate" title={order.additionalNotes || 'لا توجد ملاحظات'}>
                        {order.additionalNotes || 'لا توجد ملاحظات'}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setStatusUpdate({
                              status: order.buyer.status,
                              callAttemptsBuyer: order.buyer.callAttemptsBuyer || 0,
                              buyerResponse: order.buyer.buyerResponse || '',
                              paymentMethod: order.buyer.paymentMethod || '',
                              reasonNotSold: order.buyer.reasonNotSold || '',
                              customReason: '',
                              followUpDate: order.buyer.followUpDate || '',
                              followUpTime: order.buyer.followUpTime || '',
                              addressConfirmation: order.buyer.addressConfirmation || '',
                              amountPaid: order.buyer.amountPaid?.toString() || '',
                              remainingAmount: order.buyer.remainingAmount?.toString() || '',
                              isFullyPaid: order.buyer.isFullyPaid || false
                            });
                            setShowStatusModal(true);
                          }}
                          className="bg-gradient-to-r from-[#B39977] to-[#684F36] text-white font-medium px-4 py-2 rounded-lg hover:from-[#684F36] hover:to-[#342519] transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          تحديث الحالة
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Status Modal */}
      {showStatusModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md max-h-[90vh] shadow-2xl border border-[#B39977]/30 transform transition-all duration-300 scale-100 hover:scale-[1.02] overflow-y-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#B39977]/40 via-[#684F36]/40 to-[#B39977]/40 rounded-3xl blur-xl opacity-80 animate-pulse"></div>
            
            {/* Header with icon */}
            <div className="relative flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div className="relative">
              <h3 className="text-2xl font-bold text-black text-center mb-2">تحديث حالتك</h3>
              <p className="text-sm text-gray-600 text-center mb-6">قم بتحديث حالة الطلب الحالي</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-black mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#B39977]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                    الحالة
                  </label>
                  <select
                    value={statusUpdate.status}
                    onChange={(e) => setStatusUpdate({...statusUpdate, status: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-[#B39977]/20 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B39977]/20 text-black font-medium bg-white/80 backdrop-blur-sm transition-all duration-200"
                    style={{ color: 'black' }}
                  >
                    <option value="not_processed_yet" style={{ color: 'black' }}>⏳ لم تتم المعالجة بعد</option>
                    <option value="user_response" style={{ color: 'black' }}>📞 استجابة المستخدم</option>
                    <option value="user_phone_closed" style={{ color: 'black' }}>📱 الهاتف مغلق</option>
                    <option value="retrying" style={{ color: 'black' }}>ملغى</option>
                  </select>
                </div>

                {/* Address Confirmation - Show when status is user_response */}
                {statusUpdate.status === 'user_response' && (
                  <div>
                    <label className="block text-sm font-bold text-black mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#B39977]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      اعادة تأكيد العنوان
                    </label>
                    <input
                      type="text"
                      value={statusUpdate.addressConfirmation || ''}
                      onChange={(e) => setStatusUpdate({...statusUpdate, addressConfirmation: e.target.value})}
                      placeholder="أدخل العنوان المؤكد"
                      className="w-full px-4 py-3 border-2 border-[#B39977]/20 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B39977]/20 text-black font-medium bg-white/80 backdrop-blur-sm transition-all duration-200"
                      style={{ color: 'black' }}
                    />
                  </div>
                )}

                {/* Buyer Response Options - Show when status is user_response */}
                {statusUpdate.status === 'user_response' && (
                  <div>
                    <label className="block text-sm font-bold text-black mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#B39977]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                      </svg>
                      استجابة المشتري
                    </label>
                    <select
                      value={statusUpdate.buyerResponse || ''}
                      onChange={(e) => setStatusUpdate({...statusUpdate, buyerResponse: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-[#B39977]/20 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B39977]/20 text-black font-medium bg-white/80 backdrop-blur-sm transition-all duration-200"
                      style={{ color: 'black' }}
                    >
                      <option value="" style={{ color: 'black' }}>اختر استجابة المشتري</option>
                      <option value="sold" style={{ color: 'black' }}>✅ تم البيع (Sold)</option>
                      <option value="interested_later" style={{ color: 'black' }}>🕒 مهتم لكن بعد مدة (Interested – Later)</option>
                      <option value="not_sold" style={{ color: 'black' }}>❌ لم يتم البيع (Not Sold)</option>
                    </select>
                  </div>
                )}

                {/* Payment Method - Show when buyer response is "sold" */}
                {statusUpdate.status === 'user_response' && statusUpdate.buyerResponse === 'sold' && (
                  <div>
                    <label className="block text-sm font-bold text-black mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#B39977]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                      </svg>
                      طريقة الدفع
                    </label>
                    <select
                      value={statusUpdate.paymentMethod || ''}
                      onChange={(e) => setStatusUpdate({...statusUpdate, paymentMethod: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-[#B39977]/20 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B39977]/20 text-black font-medium bg-white/80 backdrop-blur-sm transition-all duration-200"
                      style={{ color: 'black' }}
                    >
                      <option value="" style={{ color: 'black' }}>اختر طريقة الدفع</option>
                      <option value="online_payment" style={{ color: 'black' }}>💳 Paiement en ligne</option>
                      <option value="cash_on_delivery" style={{ color: 'black' }}>📦 الدفع عند الاستلام (Cash on Delivery)</option>
                    </select>
                  </div>
                )}

                {/* Payment Amount Fields - Show when buyer response is "sold" */}
                {statusUpdate.status === 'user_response' && statusUpdate.buyerResponse === 'sold' && (
                  <div>
                    <label className="block text-sm font-bold text-black mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#B39977]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                      </svg>
                      المبلغ المدفوع
                    </label>
                    <input
                      type="number"
                      value={statusUpdate.amountPaid || ''}
                      onChange={(e) => {
                        const amountPaid = parseFloat(e.target.value) || 0;
                        const remainingAmount = (selectedOrder?.price || 0) - amountPaid;
                        setStatusUpdate({
                          ...statusUpdate, 
                          amountPaid: e.target.value,
                          remainingAmount: remainingAmount.toString(),
                          isFullyPaid: remainingAmount <= 0
                        });
                      }}
                      placeholder="أدخل المبلغ المدفوع"
                      className="w-full px-4 py-3 border-2 border-[#B39977]/20 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B39977]/20 text-black font-medium bg-white/80 backdrop-blur-sm transition-all duration-200 mb-3"
                      style={{ color: 'black' }}
                    />
                    
                    <label className="block text-sm font-bold text-black mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#B39977]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-2a1 1 0 100 2h.01a1 1 0 100-2H13z" clipRule="evenodd" />
                      </svg>
                      المبلغ المتبقي
                    </label>
                    <input
                      type="number"
                      value={statusUpdate.remainingAmount || ''}
                      readOnly
                      placeholder="المبلغ المتبقي"
                      className="w-full px-4 py-3 border-2 border-[#B39977]/20 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B39977]/20 text-black font-medium bg-white/80 backdrop-blur-sm transition-all duration-200 mb-3"
                      style={{ color: 'black', backgroundColor: '#f5f5f5' }}
                    />
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={statusUpdate.isFullyPaid || false}
                        readOnly
                        className="ml-2 w-4 h-4 text-[#B39977] focus:ring-[#B39977]"
                      />
                      <span className="text-black font-medium">تم تسديد كامل المبلغ</span>
                    </div>
                  </div>
                )}

                {/* Reason Not Sold - Show when buyer response is "not_sold" */}
                {statusUpdate.status === 'user_response' && statusUpdate.buyerResponse === 'not_sold' && (
                  <div>
                    <label className="block text-sm font-bold text-black mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#B39977]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      سبب عدم البيع
                    </label>
                    <select
                      value={statusUpdate.reasonNotSold || ''}
                      onChange={(e) => setStatusUpdate({...statusUpdate, reasonNotSold: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-[#B39977]/20 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B39977]/20 text-black font-medium bg-white/80 backdrop-blur-sm transition-all duration-200 mb-3"
                      style={{ color: 'black' }}
                    >
                      <option value="" style={{ color: 'black' }}>اختر سبب الرفض</option>
                      <option value="price_high" style={{ color: 'black' }}>السعر مرتفع</option>
                      <option value="needs_time" style={{ color: 'black' }}>لازم يفكر</option>
                      <option value="afraid_scam" style={{ color: 'black' }}>خايف من النصب</option>
                      <option value="not_interested" style={{ color: 'black' }}>غير مهتم حاليا</option>
                      <option value="no_decision" style={{ color: 'black' }}>قرار مش عنده</option>
                      <option value="other" style={{ color: 'black' }}>أخرى</option>
                    </select>
                    {statusUpdate.reasonNotSold === 'other' && (
                      <input
                        type="text"
                        value={statusUpdate.customReason || ''}
                        onChange={(e) => setStatusUpdate({...statusUpdate, customReason: e.target.value})}
                        placeholder="اكتب السبب هنا"
                        className="w-full px-4 py-3 border-2 border-[#B39977]/20 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B39977]/20 text-black font-medium bg-white/80 backdrop-blur-sm transition-all duration-200"
                        style={{ color: 'black' }}
                      />
                    )}
                  </div>
                )}

                {/* Follow-up Reminder - Show when "interested_later" or "not_sold" */}
                {statusUpdate.status === 'user_response' && (statusUpdate.buyerResponse === 'interested_later' || statusUpdate.buyerResponse === 'not_sold') && (
                  <div>
                    <label className="block text-sm font-bold text-black mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#B39977]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      إعادة الاتصال بعد مدة
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-black mb-1">📅 تاريخ إعادة الاتصال</label>
                        <input
                          type="date"
                          value={statusUpdate.followUpDate || ''}
                          onChange={(e) => setStatusUpdate({...statusUpdate, followUpDate: e.target.value})}
                          className="w-full px-3 py-2 border-2 border-[#B39977]/20 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#B39977]/20 text-black font-medium bg-white/80 backdrop-blur-sm transition-all duration-200"
                          style={{ color: 'black' }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-black mb-1">⏰ الساعة</label>
                        <input
                          type="time"
                          value={statusUpdate.followUpTime || ''}
                          onChange={(e) => setStatusUpdate({...statusUpdate, followUpTime: e.target.value})}
                          className="w-full px-3 py-2 border-2 border-[#B39977]/20 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#B39977]/20 text-black font-medium bg-white/80 backdrop-blur-sm transition-all duration-200"
                          style={{ color: 'black' }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-black mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#B39977]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
                    </svg>
                    عدد المحاولات
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={statusUpdate.callAttemptsBuyer || 0}
                    onChange={(e) => setStatusUpdate({...statusUpdate, callAttemptsBuyer: parseInt(e.target.value) || 0})}
                    placeholder="أدخل عدد المحاولات"
                    className="w-full px-4 py-3 border-2 border-[#B39977]/20 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B39977]/20 text-black font-medium bg-white/80 backdrop-blur-sm transition-all duration-200"
                    style={{ color: 'black' }}
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={handleStatusUpdate} 
                    className="flex-1 bg-gradient-to-r from-[#B39977] to-[#684F36] text-white font-bold py-4 rounded-xl hover:from-[#684F36] hover:to-[#342519] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    تحديث
                  </button>
                  <button 
                    onClick={() => setShowStatusModal(false)} 
                    className="flex-1 bg-gradient-to-r from-gray-200 to-gray-300 text-black font-bold py-4 rounded-xl hover:from-gray-300 hover:to-gray-400 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
