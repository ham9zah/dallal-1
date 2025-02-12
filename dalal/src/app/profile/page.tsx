'use client';

import { useEffect, useState } from 'react';
import RoleGuard from '@/components/auth/RoleGuard';
import { useAuth } from '@/providers/AuthProvider';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // سيتم إضافة وظيفة تحديث الملف الشخصي لاحقاً
    setIsEditing(false);
  };

  return (
    <RoleGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">الملف الشخصي</h1>
          
          <div className="bg-white rounded-lg shadow p-6">
            {!isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">الاسم</label>
                  <p className="mt-1 text-gray-900">{formData.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">البريد الإلكتروني</label>
                  <p className="mt-1 text-gray-900">{formData.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">رقم الجوال</label>
                  <p className="mt-1 text-gray-900">{formData.phone || 'لم يتم تحديده'}</p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 px-4 py-2 bg-[#f5ca58] text-gray-900 rounded-md hover:bg-[#e5ba48] focus:outline-none focus:ring-2 focus:ring-[#f5ca58] focus:ring-offset-2"
                >
                  تعديل الملف الشخصي
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                    الاسم
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-[#f5ca58] focus:ring-[#f5ca58]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-[#f5ca58] focus:ring-[#f5ca58]"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                    رقم الجوال
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-[#f5ca58] focus:ring-[#f5ca58]"
                  />
                </div>
                <div className="flex space-x-4 space-x-reverse">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#f5ca58] text-gray-900 rounded-md hover:bg-[#e5ba48] focus:outline-none focus:ring-2 focus:ring-[#f5ca58] focus:ring-offset-2"
                  >
                    حفظ التغييرات
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
