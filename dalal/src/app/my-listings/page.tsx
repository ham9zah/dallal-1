'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import RoleGuard from '@/components/auth/RoleGuard';

export default function MyListingsPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // سيتم إضافة جلب الإعلانات لاحقاً
        setListings([]);
      } catch (error) {
        console.error('خطأ في جلب الإعلانات:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchListings();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#f5ca58] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <RoleGuard>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">إعلاناتي</h1>
        <div className="bg-white rounded-lg shadow p-6">
          {listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing: any) => (
                <div key={listing.id} className="border rounded-lg p-4">
                  {/* سيتم إضافة تفاصيل الإعلان لاحقاً */}
                  <p className="text-gray-600">عنوان الإعلان</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">لا توجد إعلانات حالياً</p>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}
