'use client';

import { useAuth } from '@/providers/AuthProvider';
import { ROLES } from '@/types/roles';
import Link from 'next/link';
import { UserCircleIcon, Cog6ToothIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function DashboardContent() {
  const { user } = useAuth();

  return (
    <div>
      <div>
        <div>
          {/* معلومات المستخدم */}
          <div className="flex items-center space-x-4 space-x-reverse mb-6">
            <div className="bg-gray-100 p-3 rounded-full">
              <UserCircleIcon className="h-12 w-12 text-gray-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          {/* القائمة الرئيسية */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Link
              href="/my-listings"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">إعلاناتي</h3>
                <p className="text-sm text-gray-600">إدارة إعلاناتك الشخصية</p>
              </div>
            </Link>
            
            <Link
              href="/profile"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">الملف الشخصي</h3>
                <p className="text-sm text-gray-600">تعديل معلوماتك الشخصية</p>
              </div>
            </Link>
          </div>

          {/* أزرار الصلاحيات */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">لوحات التحكم</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* زر لوحة الإشراف - يظهر للمشرفين والمدراء فقط */}
              {(user?.roles?.includes(ROLES.MODERATOR) || user?.roles?.includes(ROLES.ADMIN)) && (
                <Link
                  href="/moderator"
                  className="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  <ShieldCheckIcon className="h-6 w-6 text-yellow-600 ml-3" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">لوحة الإشراف</h3>
                    <p className="text-sm text-gray-600">إدارة المحتوى والإعلانات</p>
                  </div>
                </Link>
              )}

              {/* زر لوحة الإدارة - يظهر للمدراء فقط */}
              {user?.roles?.includes(ROLES.ADMIN) && (
                <Link
                  href="/admin"
                  className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Cog6ToothIcon className="h-6 w-6 text-blue-600 ml-3" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">لوحة الإدارة</h3>
                    <p className="text-sm text-gray-600">إدارة النظام والمستخدمين</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
