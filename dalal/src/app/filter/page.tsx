'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdvancedFilter() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    category: 'all',
    city: 'all',
    condition: 'all'
  });

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'cars', label: 'سيارات' },
    { id: 'real-estate', label: 'عقارات' },
    { id: 'electronics', label: 'إلكترونيات' },
    { id: 'services', label: 'خدمات' }
  ];

  const cities = [
    { id: 'all', label: 'كل المدن' },
    { id: 'riyadh', label: 'الرياض' },
    { id: 'jeddah', label: 'جدة' },
    { id: 'dammam', label: 'الدمام' },
    { id: 'makkah', label: 'مكة' }
  ];

  const conditions = [
    { id: 'all', label: 'الكل' },
    { id: 'new', label: 'جديد' },
    { id: 'used', label: 'مستعمل' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // يمكن إضافة المنطق هنا لتطبيق الفلاتر
    router.push(`/search?${new URLSearchParams(filters as any).toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[150px]">
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="flex items-center h-16 px-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="mr-4 text-xl font-semibold text-gray-900">تصفية النتائج</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">الفئة</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                type="button"
                onClick={() => setFilters(prev => ({ ...prev, category: category.id }))}
                className={`px-4 py-3 rounded-lg border text-right ${
                  filters.category === category.id 
                  ? 'border-[#f5ca58] bg-[#fff9e6] text-gray-900' 
                  : 'border-gray-200 text-gray-900'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">المدينة</h2>
          <div className="grid grid-cols-2 gap-3">
            {cities.map(city => (
              <button
                key={city.id}
                type="button"
                onClick={() => setFilters(prev => ({ ...prev, city: city.id }))}
                className={`px-4 py-3 rounded-lg border text-right ${
                  filters.city === city.id 
                  ? 'border-[#f5ca58] bg-[#fff9e6] text-gray-900' 
                  : 'border-gray-200 text-gray-900'
                }`}
              >
                {city.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">الحالة</h2>
          <div className="grid grid-cols-2 gap-3">
            {conditions.map(condition => (
              <button
                key={condition.id}
                type="button"
                onClick={() => setFilters(prev => ({ ...prev, condition: condition.id }))}
                className={`px-4 py-3 rounded-lg border text-right ${
                  filters.condition === condition.id 
                  ? 'border-[#f5ca58] bg-[#fff9e6] text-gray-900' 
                  : 'border-gray-200 text-gray-900'
                }`}
              >
                {condition.label}
              </button>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-[#f5ca58] text-gray-900 rounded-lg py-4 font-medium text-[15px] hover:bg-[#e5ba48] active:bg-[#d5aa38] transition-colors shadow-sm hover:shadow"
        >
          تطبيق
        </button>
      </form>
    </div>
  );
}
