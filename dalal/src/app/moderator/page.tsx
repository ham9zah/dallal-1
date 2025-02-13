'use client';

import { useEffect, useState } from 'react';
import RoleGuard from '@/components/auth/RoleGuard';
import DashboardStats from '@/components/shared/DashboardStats';
import { ROLES } from '@/types/roles';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import {
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function ModeratorPage() {
  const [listings, setListings] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0
  });

  // TODO: استبدل هذا بجلب البيانات الفعلية من الخادم
  useEffect(() => {
    setListings({
      pending: 5,
      approved: 25,
      rejected: 3,
      total: 33
    });
  }, []);

  const stats = [
    {
      title: 'إجمالي الإعلانات',
      value: listings.total,
      icon: <ClipboardDocumentListIcon className="h-6 w-6 text-blue-600" />,
      color: 'blue'
    },
    {
      title: 'قيد المراجعة',
      value: listings.pending,
      icon: <ClockIcon className="h-6 w-6 text-yellow-600" />,
      color: 'yellow'
    },
    {
      title: 'تمت الموافقة',
      value: listings.approved,
      icon: <CheckCircleIcon className="h-6 w-6 text-green-600" />,
      color: 'green'
    },
    {
      title: 'تم الرفض',
      value: listings.rejected,
      icon: <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />,
      color: 'red'
    }
  ];

  return (
    <RoleGuard allowedRoles={[ROLES.MODERATOR, ROLES.ADMIN]}>
      <DashboardLayout>
        <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">لوحة الإشراف</h1>
          <p className="text-gray-600">مراجعة وإدارة الإعلانات</p>
        </div>

        <DashboardStats stats={stats} />

        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">الإعلانات قيد المراجعة</h2>
              
              {/* قائمة الإعلانات قيد المراجعة */}
              <div className="space-y-4">
                {listings.pending === 0 ? (
                  <p className="text-gray-600 text-center py-4">لا توجد إعلانات قيد المراجعة</p>
                ) : (
                  <div className="border rounded-lg divide-y">
                    {/* TODO: استبدل هذا بقائمة فعلية من الإعلانات */}
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">عنوان الإعلان</h3>
                        <p className="text-sm text-gray-600">تم النشر: قبل 2 ساعات</p>
                      </div>
                      <div className="flex space-x-2 space-x-reverse">
                        <button className="px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100">
                          موافقة
                        </button>
                        <button className="px-4 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100">
                          رفض
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
}
