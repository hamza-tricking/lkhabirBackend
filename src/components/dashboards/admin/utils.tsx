import { Order } from './types';

export const getStatusColor = (status: string) => {
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

export const getStatusText = (status: string) => {
  switch (status) {
    case 'call_confirmed':
      return 'تم تأكيد المكالمة';
    case 'call_not_response':
      return 'لم يتصل بعد';
    case 'phone_closed':
      return 'الهاتف مغلق';
    default:
      return 'غير معروف';
  }
};

export const getUserRoleText = (role: string) => {
  switch (role) {
    case 'admin':
      return 'مسؤول';
    case 'confirmer':
      return 'مؤكد';
    case 'buyer':
      return 'بائع';
    default:
      return 'عميل';
  }
};

export const getUserRoleColor = (role: string) => {
  switch (role) {
    case 'admin':
      return 'bg-red-100 text-red-800';
    case 'confirmer':
      return 'bg-blue-100 text-blue-800';
    case 'buyer':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getOrderTypeColor = (type: string) => {
  switch (type) {
    case 'usb':
      return 'bg-purple-100 text-purple-800';
    case 'course':
      return 'bg-orange-100 text-orange-800';
    case 'challenge':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getOrderTypeText = (type: string) => {
  switch (type) {
    case 'usb':
      return 'USB';
    case 'course':
      return 'دورة';
    case 'challenge':
      return '🔥 تحدي';
    default:
      return type;
  }
};
