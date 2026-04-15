'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, Order, StatusUpdate, NewUser } from './admin/types';
import { getStatusColor, getStatusText } from './admin/utils';
import DashboardNavigation from './admin/DashboardNavigation';
import UsersManagement from './admin/UsersManagement';
import OrdersStatistics from './admin/OrdersStatistics';
import OrdersTable from './admin/OrdersTable';
import BuyerOrdersTable from './admin/BuyerOrdersTable';
import StatusUpdateModal from './admin/StatusUpdateModal';
import BuyerStatusUpdateModal from './admin/BuyerStatusUpdateModal';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dmtart.pro/lkhabir/api';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [retryingOrders, setRetryingOrders] = useState<Order[]>([]);
  const [buyerOrders, setBuyerOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'users' | 'orders' | 'buyer-orders' | 'create-user'>('orders');
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showBuyerStatusModal, setShowBuyerStatusModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusUpdate, setStatusUpdate] = useState<StatusUpdate>({
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
  const [buyerStatusUpdate, setBuyerStatusUpdate] = useState({
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
  const [buyers, setBuyers] = useState<User[]>([]);
  const [confirmers, setConfirmers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<NewUser>({
    username: '',
    password: '',
    role: 'client'
  });

  useEffect(() => {
    fetchData();

    // Listen for new order events from SSE
    const handleNewOrder = (event: CustomEvent) => {
      console.log('New order event received in dashboard:', event.detail);
      // Refresh orders when a new order is received
      fetchData();
    };

    window.addEventListener('newOrder', handleNewOrder as EventListener);

    return () => {
      window.removeEventListener('newOrder', handleNewOrder as EventListener);
    };
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch users
      const usersResponse = await fetch(`${API_BASE_URL}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Fetch orders
      const ordersResponse = await fetch(`${API_BASE_URL}/orders/all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Fetch buyers
      const buyersResponse = await fetch(`${API_BASE_URL}/orders/buyers`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Fetch confirmers
      const confirmersResponse = await fetch(`${API_BASE_URL}/orders/confirmers`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Fetch buyer orders
      const buyerOrdersResponse = await fetch(`${API_BASE_URL}/orders/buyer-orders`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (usersResponse.ok && ordersResponse.ok && buyersResponse.ok && confirmersResponse.ok && buyerOrdersResponse.ok) {
        const usersData = await usersResponse.json();
        const ordersData = await ordersResponse.json();
         console.log(ordersData)
        const buyersData = await buyersResponse.json();
        const confirmersData = await confirmersResponse.json();
        const buyerOrdersData = await buyerOrdersResponse.json();
        
        console.log('Buyer orders data:', buyerOrdersData);
        console.log('Sample buyer order:', buyerOrdersData[0]);
        
        // Filter out orders without assigned buyers
        const filteredBuyerOrders = buyerOrdersData.filter((order: Order) => 
          order.confirmer && order.confirmer.buyer
        );
        
        console.log('Filtered buyer orders (with assigned buyers):', filteredBuyerOrders.length);
        
        setUsers(usersData);
        setOrders(ordersData);
        setFilteredOrders(ordersData);
        setBuyerOrders(filteredBuyerOrders);
        setBuyers(buyersData);
        setConfirmers(confirmersData);
        
        // Filter orders with buyer status 'retrying'
        const retrying = ordersData.filter((order: Order) => 
          order.buyer && order.buyer.status === 'retrying'
        );
        setRetryingOrders(retrying);
        
        // If currently filtering by retrying, update filteredOrders
        if (statusFilter === 'retrying') {
          setFilteredOrders(retrying);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
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

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        const createdUser = await response.json();
        setUsers([...users, createdUser.user]);
        setNewUser({ username: '', password: '', role: 'client' });
        setShowCreateUserForm(false);
        alert('تم إنشاء المستخدم بنجاح');
      } else {
        const error = await response.json();
        alert(error.message || 'فشل إنشاء المستخدم');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('حدث خطأ أثناء إنشاء المستخدم');
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedOrder) return;

    try {
      const token = localStorage.getItem('token');
      console.log('AdminDashboard - Token:', token);
      console.log('AdminDashboard - Selected Order ID:', selectedOrder._id);
      
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

      console.log('AdminDashboard - Update Data:', updateData);
      console.log('AdminDashboard - API URL:', `${API_BASE_URL}/orders/${selectedOrder._id}/confirmer-status`);

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
        fetchData();
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

  const handleBuyerStatusUpdate = async () => {
    if (!selectedOrder) return;

    try {
      const token = localStorage.getItem('token');
      
      // If this is a retrying order, reset status to not_processed_yet
      if (statusFilter === 'retrying') {
        // First reset buyer status
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

        // Then update confirmer status as well
        const confirmerUpdateData: any = {
          status: 'call_not_response', // Reset to default for retry orders
          callAttempts: 1
        };

        const confirmerResponse = await fetch(`${API_BASE_URL}/orders/${selectedOrder._id}/confirmer-status`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(confirmerUpdateData)
        });

        if (!confirmerResponse.ok) {
          throw new Error('Failed to update confirmer status');
        }
      } else {
        // Normal buyer status update
        const updateData = buyerStatusUpdate;

        const response = await fetch(`${API_BASE_URL}/orders/${selectedOrder._id}/buyer-status`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateData)
        });

        if (!response.ok) {
          throw new Error('Failed to update buyer status');
        }
      }

      await fetchData();
      setShowBuyerStatusModal(false);
      setSelectedOrder(null);
      setBuyerStatusUpdate({
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
    } catch (error) {
      console.error('Error updating buyer status:', error);
      alert('حدث خطأ أثناء تحديث حالة البائع');
    }
  };

  const handleUpdateUserSections = async (userId: string, unlockedSections: string[]) => {
    try {
      console.log('Sending unlockedSections:', unlockedSections);
      console.log('UserId:', userId);
      
      const token = localStorage.getItem('token');
      const requestBody = { unlockedSections };
      console.log('Request body:', JSON.stringify(requestBody));
      
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/unlocked-sections`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        await fetchData();
        alert('تم تحديث أقسام المستخدم بنجاح');
      } else {
        const error = await response.json();
        console.log('Error response:', error);
        alert(error.message || 'فشل تحديث أقسام المستخدم');
      }
    } catch (error) {
      console.error('Error updating user sections:', error);
      alert('حدث خطأ أثناء تحديث أقسام المستخدم');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        await fetchData();
      } else {
        alert('فشل حذف المستخدم');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('حدث خطأ أثناء حذف المستخدم');
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        await fetchData();
      } else {
        alert('فشل حذف الطلب');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('حدث خطأ أثناء حذف الطلب');
    }
  };

  const handleDeleteAllOrders = async () => {
    if (!confirm('هل أنت متأكد من حذف جميع الطلبات؟ هذا الإجراء لا يمكن التراجع عنه!')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        await fetchData();
      } else {
        alert('فشل حذف جميع الطلبات');
      }
    } catch (error) {
      console.error('Error deleting all orders:', error);
      alert('حدث خطأ أثناء حذف جميع الطلبات');
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
      {/* Dashboard Navigation */}
      <DashboardNavigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        users={users} 
        user={user || undefined} 
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#342519] mb-2">لوحة تحكم المسؤول</h1>
            <p className="text-[#684F36]/70">مرحباً بك {user?.username}!</p>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'users' && (
          <UsersManagement
            users={users}
            showCreateUserForm={showCreateUserForm}
            setShowCreateUserForm={setShowCreateUserForm}
            newUser={newUser}
            setNewUser={setNewUser}
            handleCreateUser={handleCreateUser}
            handleDeleteUser={handleDeleteUser}
            handleUpdateUserSections={handleUpdateUserSections}
          />
        )}

        {activeTab === 'orders' && (
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 rounded-2xl blur-lg opacity-75"></div>
            <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#B39977]/20 p-6">
              <OrdersStatistics
                orders={orders}
                retryingOrders={retryingOrders}
                statusFilter={statusFilter}
                filterOrders={filterOrders}
                handleDeleteAllOrders={handleDeleteAllOrders}
              />

              <h2 className="text-xl font-bold text-[#342519] mb-4">الطلبات</h2>
              
              <OrdersTable
                filteredOrders={filteredOrders}
                statusFilter={statusFilter}
                setSelectedOrder={setSelectedOrder}
                setShowStatusModal={setShowStatusModal}
                setStatusUpdate={setStatusUpdate}
                handleDeleteOrder={handleDeleteOrder}
              />
            </div>
          </div>
        )}

        {activeTab === 'buyer-orders' && (
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 rounded-2xl blur-lg opacity-75"></div>
            <div className="relative p-6">
              <h2 className="text-xl font-bold text-[#342519] mb-4">طلبات البائعين</h2>
              
              <BuyerOrdersTable
                buyerOrders={buyerOrders}
                setSelectedOrder={setSelectedOrder}
                setShowStatusModal={setShowBuyerStatusModal}
                setStatusUpdate={setBuyerStatusUpdate}
                handleDeleteOrder={handleDeleteOrder}
              />
            </div>
          </div>
        )}
      </div>

      {/* Status Update Modal */}
      <StatusUpdateModal
        showStatusModal={showStatusModal}
        selectedOrder={selectedOrder}
        statusFilter={statusFilter}
        statusUpdate={statusUpdate}
        setStatusUpdate={setStatusUpdate}
        handleStatusUpdate={handleStatusUpdate}
        setShowStatusModal={setShowStatusModal}
        setSelectedOrder={setSelectedOrder}
        buyers={buyers}
        confirmers={confirmers}
      />

      {/* Buyer Status Update Modal */}
      <BuyerStatusUpdateModal
        showStatusModal={showBuyerStatusModal}
        selectedOrder={selectedOrder}
        statusFilter={statusFilter}
        statusUpdate={buyerStatusUpdate}
        setStatusUpdate={setBuyerStatusUpdate}
        handleStatusUpdate={handleBuyerStatusUpdate}
        setShowStatusModal={setShowBuyerStatusModal}
        setSelectedOrder={setSelectedOrder}
      />
    </div>
  );
}