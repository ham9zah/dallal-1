'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
  id: string;
  title: string;
  category: string;
  price: number;
  location: string;
  condition: 'جديد' | 'مستعمل' | 'ممتاز';
  timeAgo: string;
  image: string;
}

export default function ProductCard({
  id,
  title,
  category,
  price,
  location,
  condition,
  timeAgo,
  image
}: ProductCardProps) {
  const conditionColor = {
    جديد: 'bg-green-50 text-green-700',
    مستعمل: 'bg-gray-50 text-gray-700',
    ممتاز: 'bg-blue-50 text-blue-700'
  }[condition];

  return (
    <Link href={`/products/${id}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden border hover:border-[#f5ca58] transition-colors">
        {/* صورة المنتج */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <span className={`text-[12px] px-2 py-1 rounded-full font-medium ${conditionColor}`}>
              {condition}
            </span>
          </div>
        </div>

        {/* تفاصيل المنتج */}
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-medium text-[15px] text-gray-900 line-clamp-1">
                {title}
              </h3>
              <span className="text-[15px] font-medium text-gray-900 whitespace-nowrap">
                {price.toLocaleString('ar-SA')} ريال
              </span>
            </div>
            <p className="text-[13px] text-gray-500">
              {category}
            </p>
          </div>

          <div className="flex items-center justify-between text-[13px] text-gray-500">
            <div className="flex items-center gap-1">
              <MapPinIcon className="w-4 h-4" />
              {location}
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {timeAgo}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
