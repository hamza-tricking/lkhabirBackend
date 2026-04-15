'use client';

import { Order, User } from './types';
import { getStatusColor, getStatusText, getOrderTypeColor, getOrderTypeText } from './utils';

interface OrdersTableProps {
  filteredOrders: Order[];
  statusFilter: string;
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

export default function OrdersTable({ 
  filteredOrders, 
  statusFilter,
  setSelectedOrder, 
  setShowStatusModal, 
  setStatusUpdate, 
  handleDeleteOrder 
}: OrdersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-right">
        <thead>
          <tr className="border-b border-[#B39977]/20">
            <th className="px-4 py-2 text-[#342519]">الاسم الكامل</th>
            <th className="px-4 py-2 text-[#342519]">رقم الهاتف</th>
            <th className="px-4 py-2 text-[#342519]">نوع الشخص</th>
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
              <td className="px-4 py-3 text-[#342519]">{order.personType || '-'}</td>
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
                <div className="flex gap-2">
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
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition-all duration-300"
                  >
                    حذف
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {filteredOrders.length === 0 && (
        <div className="text-center py-8">
          <p className="text-[#684F36]/70">لا توجد طلبات حالياً</p>
        </div>
      )}
    </div>
  );
}
