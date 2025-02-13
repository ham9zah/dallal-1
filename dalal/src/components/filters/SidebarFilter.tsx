'use client';


import {
  FunnelIcon,
} from '@heroicons/react/24/outline';

export default function SidebarFilter() {

  const filters = [
    {
      title: 'الفئة',
      type: 'radio',
      options: [
        { id: 'all', label: 'الكل' },
        { id: 'cars', label: 'سيارات' },
        { id: 'real-estate', label: 'عقارات' },
        { id: 'electronics', label: 'إلكترونيات' },
        { id: 'services', label: 'خدمات' },
      ]
    },
    {
      title: 'المدينة',
      type: 'radio',
      options: [
        { id: 'all-cities', label: 'كل المدن' },
        { id: 'riyadh', label: 'الرياض' },
        { id: 'jeddah', label: 'جدة' },
        { id: 'dammam', label: 'الدمام' },
        { id: 'makkah', label: 'مكة' },
      ]
    },
    {
      title: 'الحالة',
      type: 'radio',
      options: [
        { id: 'all-conditions', label: 'الكل' },
        { id: 'new', label: 'جديد' },
        { id: 'used', label: 'مستعمل' },
      ]
    },
  ];

  return (
    <div className="w-80 h-full overflow-y-auto">
      {/* رأس الفلتر */}
      <div className="p-4 border-b flex items-center justify-between bg-[#191c1f] text-white">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FunnelIcon className="h-5 w-5" />
          تصفية النتائج
        </h2>
      </div>

      {/* محتوى الفلتر */}
      <div className="divide-y">
        {filters.map((filter, index) => (
          <div key={index} className="p-4 space-y-3">
            <h3 className="font-medium text-[#191c1f]">{filter.title}</h3>
            <div className="space-y-1">
              {filter.options.map(option => (
                <label 
                  key={option.id} 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input 
                    type={filter.type}
                    name={filter.title}
                    className="w-4 h-4 text-[#f5ca58] focus:ring-[#f5ca58]"
                  />
                  <span className="text-gray-600">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* زر التطبيق */}
        <div className="p-4">
          <button className="w-full bg-[#f5ca58] hover:bg-[#e5ba48] text-[#191c1f] rounded-lg py-3 font-medium transition-colors">
            تطبيق
          </button>
        </div>
      </div>


    </div>
  );
}
