'use client';

import { useState } from 'react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Link from 'next/link';
import {
  Squares2X2Icon,
  ListBulletIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export default function ListingsGrid() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // بيانات تجريبية للإعلانات
  const allListings = [
    { 
      id: 1, 
      title: 'سيارة مرسيدس S-Class 2024 فل كامل مع جميع الإضافات والكماليات للبيع', 
      price: '350,000', 
      location: 'الرياض', 
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800',
      category: 'سيارات',
      date: 'منذ يومين',
      condition: 'جديد',
      negotiable: true,
      highestBid: null
    },
    { 
      id: 2, 
      title: 'شقة فاخرة للإيجار في حي الياسمين مع مسبح خاص وإطلالة مميزة على المدينة', 
      price: null, 
      location: 'جدة', 
      image: '/images/apartment.jpg',
      category: 'عقارات',
      date: 'منذ 3 ساعات',
      condition: 'جديد',
      negotiable: true,
      highestBid: '300'
    },
    { 
      id: 3, 
      title: 'ايفون 15 برو ماكس تيتانيوم 256GB مع جميع الملحقات والضمان الأصلي', 
      price: '4,500', 
      location: 'الدمام', 
      image: '/images/iphone.jpg',
      category: 'إلكترونيات',
      date: 'منذ 5 دقائق',
      condition: 'مستعمل',
      negotiable: true,
      highestBid: null
    },
    { 
      id: 4, 
      title: 'كاميرا كانون EOS R5 احترافية مع عدسات متعددة وحقيبة كاملة', 
      price: null, 
      location: 'الرياض', 
      image: '/images/camera.jpg',
      category: 'إلكترونيات',
      date: 'منذ ساعة',
      condition: 'مستعمل',
      negotiable: true,
      highestBid: '300'
    },
    { 
      id: 5, 
      title: 'لابتوب ماك بوك برو M3 ماكس مع شاشة 16 بوصة وذاكرة 32GB للبيع', 
      price: '8,500', 
      location: 'مكة', 
      image: '/images/macbook.jpg',
      category: 'إلكترونيات',
      date: 'منذ 30 دقيقة',
      condition: 'جديد',
      negotiable: true,
      highestBid: null
    },
  ];

  // تكرار الإعلانات مع إضافة معرفات فريدة
  const repeatedListings = [...Array(3)].flatMap((_, index) => 
    allListings.map(listing => ({
      ...listing,
      id: listing.id + (index * allListings.length)
    }))
  );

  // حساب إجمالي عدد الصفحات
  const totalPages = Math.ceil(repeatedListings.length / itemsPerPage);

  // الحصول على الإعلانات للصفحة الحالية
  const listings = repeatedListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* العنوان وعدد الإعلانات */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-semibold text-gray-900">أحدث الإعلانات</h2>
          <div className="flex items-center gap-2 bg-gray-100/50 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow text-[#f5ca58]' : 'text-gray-500 hover:bg-gray-50'}`}
              title="عرض شبكي"
            >
              <Squares2X2Icon className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow text-[#f5ca58]' : 'text-gray-500 hover:bg-gray-50'}`}
              title="عرض قائمة"
            >
              <ListBulletIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <span className="text-[15px] text-gray-500">{repeatedListings.length} إعلان</span>
      </div>

      {/* عرض الإعلانات */}
      <div className={`
        ${viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3' 
          : 'space-y-3'}
      `}>
        {listings.map(listing => (
          <Link 
            href={`/listings/${listing.id}`}
            key={listing.id}
            className={`
              group bg-white rounded-xl overflow-hidden border hover:border-[#f5ca58] transition-colors
              ${viewMode === 'list' ? 'flex' : ''}
            `}
          >
            <div className={`relative ${viewMode === 'list' ? 'w-48 h-48' : 'aspect-[4/3]'} overflow-hidden`}>
              <div className="absolute top-3 right-3 z-10">
                <span className={`text-[12px] px-2 py-1 rounded-full font-medium ${
                  listing.condition === 'جديد' 
                    ? 'bg-green-50 text-green-700'
                    : 'bg-gray-50 text-gray-700'
                }`}>
                  {listing.condition}
                </span>
              </div>
              <div className="absolute inset-0 bg-gray-100 animate-pulse" />
              <ImageWithFallback 
                src={listing.image}
                alt={listing.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={listing.id <= 2} // تحميل أول إعلانين فقط بشكل مسبق
                loading={listing.id <= 2 ? 'eager' : 'lazy'}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className={`p-3 ${viewMode === 'list' ? 'flex-1' : ''} space-y-2`}>
              <div className="space-y-2">
                <div className="space-y-1">
                  <h3 className="font-medium text-[15px] text-gray-900 line-clamp-2">{listing.title}</h3>
                  <p className="text-[13px] text-gray-500">{listing.category}</p>
                </div>

                <div className="flex items-center justify-between text-[13px] text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    {listing.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {listing.date}
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  {listing.price ? (
                    <div className="flex items-center justify-between">
                      <span className="text-[15px] font-medium text-gray-900">
                        {listing.price} ريال
                      </span>
                      {listing.negotiable && (
                        <span className="text-[13px] text-gray-500">قابل للتفاوض</span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-[15px] font-semibold text-[#f5ca58]">سوم</span>
                      {listing.highestBid && (
                        <span className="text-[13px] text-gray-500">أعلى سوم {listing.highestBid} ريال</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* أزرار التنقل بين الصفحات */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2 select-none">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`
              px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border'}
            `}
          >
            السابق
          </button>

          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`
                  w-8 h-8 rounded-lg text-sm font-medium transition-colors
                  ${currentPage === i + 1
                    ? 'bg-[#f5ca58] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border'}
                `}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`
              px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border'}
            `}
          >
            التالي
          </button>
        </div>
      )}
    </div>
  );
}
