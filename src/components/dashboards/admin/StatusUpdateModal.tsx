'use client';

import { Order, User, StatusUpdate } from './types';

interface StatusUpdateModalProps {
  showStatusModal: boolean;
  selectedOrder: Order | null;
  statusFilter: string;
  statusUpdate: StatusUpdate;
  setStatusUpdate: (update: StatusUpdate) => void;
  handleStatusUpdate: () => void;
  setShowStatusModal: (show: boolean) => void;
  setSelectedOrder: (order: Order | null) => void;
  buyers: User[];
  confirmers: User[];
}

export default function StatusUpdateModal({
  showStatusModal,
  selectedOrder,
  statusFilter,
  statusUpdate,
  setStatusUpdate,
  handleStatusUpdate,
  setShowStatusModal,
  setSelectedOrder,
  buyers,
  confirmers
}: StatusUpdateModalProps) {
  if (!showStatusModal || !selectedOrder) return null;

  return (
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
                  {confirmers.map((confirmer) => (
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
                  {buyers.map((buyer) => (
                    <option key={buyer._id} value={buyer._id}>
                      {buyer.username}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          
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
  );
}
