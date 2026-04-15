'use client';

import { Order } from './types';
import { getOrderTypeColor, getOrderTypeText } from './utils';

interface BuyerOrdersTableProps {
  buyerOrders: Order[];
  setSelectedOrder: (order: Order) => void;
  setShowStatusModal: (show: boolean) => void;
  setStatusUpdate: (update: any) => void;
  handleDeleteOrder: (orderId: string) => void;
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

export default function BuyerOrdersTable({ 
  buyerOrders, 
  setSelectedOrder, 
  setShowStatusModal, 
  setStatusUpdate, 
  handleDeleteOrder 
}: BuyerOrdersTableProps) {
  console.log('BuyerOrdersTable received:', buyerOrders);
  
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 rounded-2xl blur-lg opacity-75"></div>
      <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#B39977]/20 p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#B39977]/10 to-[#684F36]/10 border-b border-[#B39977]/20">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-bold text-black">اسم العميل</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-black">رقم الهاتف</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-black">النوع</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-black">السعر</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-black">المؤكد</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-black">البائع</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-black">حالة المشتري</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-black">تفاصيل إضافية</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-black">موعد المقابلة</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-black">العنوان</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-black">ملاحظات إضافية</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-black">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B39977]/10">
              {buyerOrders.map((order: Order) => (
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
                  <td className="px-6 py-4 text-gray-700">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {order.confirmer.buyer?.username || 'غير محدد'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      order.buyer?.status === 'user_response' ? 'bg-blue-100 text-blue-800' :
                      order.buyer?.status === 'user_phone_closed' ? 'bg-red-100 text-red-800' :
                      order.buyer?.status === 'not_processed_yet' ? 'bg-gray-100 text-gray-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {order.buyer?.status === 'user_response' ? 
                        (order.buyer?.buyerResponse === 'sold' ? '✅ تم البيع' :
                         order.buyer?.buyerResponse === 'interested_later' ? '🕒 مهتم لكن بعد مدة' :
                         order.buyer?.buyerResponse === 'not_sold' ? '❌ لم يتم البيع' :
                         '📞 استجابة المستخدم') :
                       order.buyer?.status === 'user_phone_closed' ? 'الهاتف مغلق' : 
                       order.buyer?.status === 'not_processed_yet' ? '⏳ لم تتم المعالجة بعد' :
                       'ملغى'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-sm max-w-xs">
                    {order.buyer?.buyerResponse === 'sold' && order.buyer?.paymentMethod && (
                      <div className="text-blue-600">
                        💳 {order.buyer.paymentMethod === 'online_payment' ? 'Paiement en ligne' : 'الدفع عند الاستلام'}
                      </div>
                    )}
                    {order.buyer?.buyerResponse === 'not_sold' && order.buyer?.reasonNotSold && (
                      <div className="text-red-600">
                        ❌ {order.buyer.reasonNotSold === 'price_high' ? 'السعر مرتفع' :
                             order.buyer.reasonNotSold === 'needs_time' ? 'لازم يفكر' :
                             order.buyer.reasonNotSold === 'afraid_scam' ? 'خايف من النصب' :
                             order.buyer.reasonNotSold === 'not_interested' ? 'غير مهتم حاليا' :
                             order.buyer.reasonNotSold === 'no_decision' ? 'قرار مش عنده' :
                             order.buyer.reasonNotSold === 'other' ? (order.buyer.customReason || 'أخرى') : ''}
                      </div>
                    )}
                    {(order.buyer?.buyerResponse === 'interested_later' || order.buyer?.buyerResponse === 'not_sold') && 
                     order.buyer?.followUpDate && (
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
                  <td className="px-6 py-4 text-gray-700">
                    {order.additionalNotes || 'لا توجد ملاحظات'}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setStatusUpdate({
                          status: order.buyer?.status || 'not_processed_yet',
                          callAttemptsBuyer: order.buyer?.callAttemptsBuyer || 0,
                          buyerResponse: order.buyer?.buyerResponse || '',
                          paymentMethod: order.buyer?.paymentMethod || '',
                          reasonNotSold: order.buyer?.reasonNotSold || '',
                          customReason: '',
                          followUpDate: order.buyer?.followUpDate || '',
                          followUpTime: order.buyer?.followUpTime || ''
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
          
          {buyerOrders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[#684F36]/70">لا توجد طلبات للبائعين حالياً</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
