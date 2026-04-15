'use client';

import { useAuth } from '@/contexts/AuthContext';
import ClientDashboard from '@/components/dashboards/ClientDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import ConfirmerDashboard from '@/components/dashboards/ConfirmerDashboard';
import BuyerDashboard from '@/components/dashboards/BuyerDashboard';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#684F36]">جاري التحميل...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#684F36]">يجب تسجيل الدخول أولاً</div>
      </div>
    );
  }

  // Render dashboard based on user role
  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'confirmer':
      return <ConfirmerDashboard />;
    case 'buyer':
      return <BuyerDashboard />;
    case 'client':
    default:
      return <ClientDashboard />;
  }
}
