'use client';

import { useEffect, useState } from 'react';
import RoleGuard from '@/components/auth/RoleGuard';
import axios from 'axios';
import { authService } from '@/services/auth.service';

interface Category {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    is_active: true
  });

  const fetchCategories = async () => {
    try {
      const token = authService.getToken();
      const response = await axios.get('http://localhost:8000/api/categories', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategories(response.data.data);
      setLoading(false);
    } catch (err: any) {
      setError('حدث خطأ أثناء جلب الفئات');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = authService.getToken();
      await axios.post('http://localhost:8000/api/categories', newCategory, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNewCategory({ name: '', description: '', is_active: true });
      fetchCategories();
    } catch (err: any) {
      setError('حدث خطأ أثناء إنشاء الفئة');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <RoleGuard roles={['admin']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-right">إدارة الفئات</h1>

        {/* نموذج إضافة فئة جديدة */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-right">إضافة فئة جديدة</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 text-right">اسم الفئة</label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                dir="rtl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-right">الوصف</label>
              <textarea
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={3}
                dir="rtl"
              />
            </div>
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                إضافة الفئة
              </button>
            </div>
          </form>
        </div>

        {/* قائمة الفئات */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-right">الفئات الحالية</h2>
            {loading ? (
              <p className="text-center">جاري التحميل...</p>
            ) : error ? (
              <p className="text-red-600 text-center">{error}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الاسم
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الوصف
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الحالة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        تاريخ الإنشاء
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {category.name}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {category.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            category.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {category.is_active ? 'نشط' : 'غير نشط'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          {new Date(category.created_at).toLocaleDateString('ar-SA')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
