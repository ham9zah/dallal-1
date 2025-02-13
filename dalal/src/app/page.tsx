'use client';

import { useEffect, useState } from 'react';
import SidebarFilter from '@/components/filters/SidebarFilter';
import ListingsGrid from '@/components/listings/ListingsGrid';

export default function Home() {
  const [showFilter, setShowFilter] = useState(false);

  // الاستماع لتغييرات حالة الفلتر من الهيدر
  useEffect(() => {
    const handleStorageChange = () => {
      const filterState = localStorage.getItem('showAdvancedFilter');
      setShowFilter(filterState === 'true');
    };

    // تحديث الحالة الأولية
    handleStorageChange();

    // الاستماع للتغييرات
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('showFilterChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('showFilterChange', handleStorageChange);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pt-[168px]">
      <div className="flex relative">
        <div className={`fixed right-0 top-[168px] h-[calc(100vh-168px)] w-80 bg-white border-l shadow-sm transition-transform duration-300 transform ${showFilter ? 'translate-x-0' : 'translate-x-full'}`}>
          <SidebarFilter />
        </div>
        <div className={`flex-1 transition-all duration-300 ${showFilter ? 'mr-80' : ''}`}>
          <div className="max-w-[1600px] mx-auto px-6 py-8">
            <ListingsGrid />
          </div>
        </div>
      </div>
    </main>
  );
}
