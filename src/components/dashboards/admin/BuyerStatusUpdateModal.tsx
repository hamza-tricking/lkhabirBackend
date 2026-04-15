'use client';

import { Order } from './types';
import { getOrderTypeColor, getOrderTypeText } from './utils';

interface BuyerStatusUpdateModalProps {
  showStatusModal: boolean;
  selectedOrder: Order | null;
  statusFilter: string;
  statusUpdate: {
    status: string;
    callAttemptsBuyer: number;
    buyerResponse?: string;
    paymentMethod?: string;
    reasonNotSold?: string;
    customReason?: string;
    followUpDate?: string;
    followUpTime?: string;
    addressConfirmation?: string;
    amountPaid?: string;
    remainingAmount?: string;
    isFullyPaid?: boolean;
  };
  setStatusUpdate: (update: any) => void;
  handleStatusUpdate: () => void;
  setShowStatusModal: (show: boolean) => void;
  setSelectedOrder: (order: Order | null) => void;
}

export default function BuyerStatusUpdateModal({
  showStatusModal,
  selectedOrder,
  statusFilter,
  statusUpdate,
  setStatusUpdate,
  handleStatusUpdate,
  setShowStatusModal,
  setSelectedOrder
}: BuyerStatusUpdateModalProps) {
  if (!showStatusModal || !selectedOrder) return null;

  return (
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
          <h3 className="text-2xl font-bold text-black text-center mb-2">
            {statusFilter === 'retrying' ? 'اعادة ارسال للبائع' : 'تحديث حالة البائع'}
          </h3>
          <p className="text-sm text-gray-600 text-center mb-6">
            {statusFilter === 'retrying' ? 'قم بإعادة ارسال الطلب للبائع' : 'قم بتحديث حالة البائع للطلب الحالي'}
          </p>
          
          {/* Order info */}
          <div className="mb-6 p-4 bg-gradient-to-r from-[#B39977]/10 to-[#684F36]/10 rounded-2xl border border-[#B39977]/20">
            <div className="flex items-center justify-center mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
            </div>
            <p className="text-center font-medium text-black mb-1">{selectedOrder.fullName}</p>
            <p className="text-center text-sm text-gray-600">{selectedOrder.phoneNumber}</p>
            <div className="flex items-center justify-center mt-2 space-x-2 space-x-reverse">
              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getOrderTypeColor(selectedOrder.type)}`}>
                {getOrderTypeText(selectedOrder.type)}
              </span>
              <span className="font-bold text-black">{selectedOrder.price} دج</span>
            </div>
          </div>
          
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
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
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
                {statusFilter === 'retrying' ? 'اعادة ارسال للبائع' : 'تحديث'}
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
  );
}
