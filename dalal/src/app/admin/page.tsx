'use client';

import { useEffect, useState } from 'react';
import RoleGuard from '@/components/auth/RoleGuard';
import DashboardStats from '@/components/shared/DashboardStats';
import { ROLES } from '@/types/roles';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { adminService } from '@/services/admin.service';
import { toast } from 'react-hot-toast';
import {
  UsersIcon,
  NewspaperIcon,
  ShieldCheckIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';
import type { ReactElement } from 'react';
import dynamic from 'next/dynamic';

function AdminPage() {مشاكل التوافق مع SSR
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalListings: 0,
    totalModerators: 0,
    newUsers: 0
  });

  // TODO: استبدل هذا بجلب البيانات الفعلية من الخادم
  useEffect(() => {
    setStats({
      totalUsers: 150,
      totalListings: 75,
      totalModerators: 5,
      newUsers: 12
    });
  }, []);

  const dashboardStats = [
    {
      title: 'إجمالي المستخدمين',
      value: stats.totalUsers,
      icon: <UsersIcon className="h-6 w-6 text-blue-600" />,
      color: 'blue'
    },
    {
      title: 'إجمالي الإعلانات',
      value: stats.totalListings,
      icon: <NewspaperIcon className="h-6 w-6 text-green-600" />,
      color: 'green'
    },
    {
      title: 'المشرفين',
      value: stats.totalModerators,
      icon: <ShieldCheckIcon className="h-6 w-6 text-yellow-600" />,
      color: 'yellow'
    },
    {
      title: 'مستخدمين جدد',
      value: stats.newUsers,
      icon: <UserPlusIcon className="h-6 w-6 text-purple-600" />,
      color: 'purple'
    }
  ];

  const content: ReactElement = (
    <RoleGuard allowedRoles={[ROLES.ADMIN]}>
      <DashboardLayout>
        <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">لوحة الإدارة</h1>
          <p className="text-gray-600">إدارة النظام والمستخدمين</p>
        </div>

        <DashboardStats stats={dashboardStats} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* إدارة المستخدمين */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">إدارة المستخدمين</h2>
              <div className="space-y-4">
                <button className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100">
                  إضافة مستخدم جديد
                </button>
                <button className="w-full px-4 py-2 bg-yellow-50 text-yellow-700 rounded-md hover:bg-yellow-100">
                  إدارة المشرفين
                </button>
              </div>
            </div>
          </div>

          {/* إعدادات النظام */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">إعدادات النظام</h2>
              <div className="space-y-4">
                <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100">
                  إعدادات عامة
                </button>
                <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100">
                  إدارة الفئات
                </button>
              </div>
            </div>
          </div>

          {/* قسم النسخ الاحتياطي */}
          <div className="col-span-1 md:col-span-2 bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">النسخ الاحتياطي لقاعدة البيانات</h2>
            <p className="text-gray-600 mb-4">قم بتحميل نسخة احتياطية كاملة من قاعدة البيانات تتضمن جميع البيانات والمستخدمين والصلاحيات.</p>
            
            <button
              onClick={async () => {
                try {
                  setIsBackingUp(true);
                  await adminService.backupDatabase();
                  toast.success('تم إنشاء وتحميل النسخة الاحتياطية بنجاح');
                } catch (error: any) {
                  toast.error(error.response?.data?.message || 'حدث خطأ أثناء إنشاء النسخة الاحتياطية');
                } finally {
                  setIsBackingUp(false);
                }
              }}
              disabled={isBackingUp}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
            >
              {isBackingUp ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري إنشاء النسخة الاحتياطية...
                </>
              ) : (
                'تحميل نسخة احتياطية'
              )}
            </button>
          </div>
                <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100">
                  سجلات النظام
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );

  if (!isMounted) {
    return null;
  }

  if (!isMounted) {
    return null;
  }

  return content;
}
