'use client';

import { useState } from 'react';
import { User } from './types';
import { getUserRoleText, getUserRoleColor } from './utils';

interface UsersManagementProps {
  users: User[];
  showCreateUserForm: boolean;
  setShowCreateUserForm: (show: boolean) => void;
  newUser: { username: string; password: string; role: string };
  setNewUser: (user: { username: string; password: string; role: string }) => void;
  handleCreateUser: (e: React.FormEvent) => void;
  handleDeleteUser: (userId: string) => void;
  handleUpdateUserSections: (userId: string, unlockedSections: string[]) => void;
}

const AVAILABLE_SECTIONS = [
  'القانون العقاري',
  'قسم التسويق العقاري',
  'الدورة المكثفة',
  'البيع العقاري'
];

// Function to convert old section names to new ones
const convertSectionNames = (sections: string[]): string[] => {
  return sections.map(section => {
    if (section === 'المستوى الأول: أساسيات العقارات') {
      return 'القانون العقاري';
    }
    return section;
  });
};

export default function UsersManagement({ 
  users, 
  showCreateUserForm, 
  setShowCreateUserForm, 
  newUser, 
  setNewUser, 
  handleCreateUser, 
  handleDeleteUser,
  handleUpdateUserSections
}: UsersManagementProps) {
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [tempUnlockedSections, setTempUnlockedSections] = useState<string[]>([]);

  const startEditingSections = (user: User) => {
    setEditingUserId(user._id);
    const convertedSections = convertSectionNames(user.unlockedSections || []);
    setTempUnlockedSections(convertedSections);
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    setTempUnlockedSections([]);
  };

  const saveSections = () => {
    if (editingUserId) {
      handleUpdateUserSections(editingUserId, tempUnlockedSections);
      cancelEditing();
    }
  };

  const toggleSection = (section: string) => {
    setTempUnlockedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 rounded-2xl blur-lg opacity-75"></div>
      <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#B39977]/20 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#342519]">المستخدمون</h2>
          <button
            onClick={() => setShowCreateUserForm(true)}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
          >
            إضافة مستخدم جديد
          </button>
        </div>
        
        {showCreateUserForm && (
          <div className="mb-6 p-4 bg-[#B39977]/10 rounded-lg">
            <h3 className="text-lg font-bold text-[#342519] mb-3">إنشاء مستخدم جديد</h3>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#342519] mb-1">اسم المستخدم</label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  className="w-full px-3 py-2 border border-[#B39977]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B39977]/50 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#342519] mb-1">كلمة المرور</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  className="w-full px-3 py-2 border border-[#B39977]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B39977]/50 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#342519] mb-1">الدور</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full px-3 py-2 border border-[#B39977]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B39977]/50 text-black"
                >
                  <option value="client">عميل</option>
                  <option value="buyer">بائع</option>
                  <option value="confirmer">مؤكد</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#B39977] to-[#684F36] text-white font-medium rounded-lg hover:from-[#684F36] hover:to-[#342519] transition-all duration-300"
                >
                  إنشاء
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateUserForm(false)}
                  className="px-4 py-2 bg-gray-200 text-[#342519] font-medium rounded-lg hover:bg-gray-300 transition-all duration-300"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-[#B39977]/20">
                <th className="px-4 py-2 text-[#342519]">اسم المستخدم</th>
                <th className="px-4 py-2 text-[#342519]">الدور</th>
                <th className="px-4 py-2 text-[#342519]">الأقسام المفتوحة</th>
                <th className="px-4 py-2 text-[#342519]">تاريخ الإنشاء</th>
                <th className="px-4 py-2 text-[#342519]">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-[#B39977]/10 hover:bg-[#B39977]/5">
                  <td className="px-4 py-3 text-[#342519]">{user.username}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUserRoleColor(user.role)}`}>
                      {getUserRoleText(user.role)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {user.role === 'client' ? (
                      editingUserId === user._id ? (
                        <div className="space-y-2">
                          {AVAILABLE_SECTIONS.map(section => (
                            <label key={section} className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                              <input
                                type="checkbox"
                                checked={tempUnlockedSections.includes(section)}
                                onChange={() => toggleSection(section)}
                                className="w-4 h-4 text-[#B39977] border-[#B39977]/20 rounded focus:ring-[#B39977]/50"
                              />
                              <span className="text-sm text-[#342519]">{section}</span>
                            </label>
                          ))}
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={saveSections}
                              className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded hover:bg-green-600 transition-colors"
                            >
                              حفظ
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="px-3 py-1 bg-gray-300 text-[#342519] text-xs font-medium rounded hover:bg-gray-400 transition-colors"
                            >
                              إلغاء
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-sm text-[#684F36]/70">
                            {convertSectionNames(user.unlockedSections || []).join(', ') || 'لا توجد أقسام مفتوحة'}
                          </div>
                          <button
                            onClick={() => startEditingSections(user)}
                            className="mt-1 text-xs text-[#B39977] hover:text-[#684F36] font-medium"
                          >
                            تعديل الأقسام
                          </button>
                        </div>
                      )
                    ) : (
                      <span className="text-sm text-gray-400">غير متاح</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[#684F36]/70">
                    {new Date(user.createdAt).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="px-4 py-3">
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        حذف
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
