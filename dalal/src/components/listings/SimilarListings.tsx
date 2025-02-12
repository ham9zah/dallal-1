'use client';

import Link from 'next/link';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface Listing {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  date: string;
  priceType: 'fixed' | 'auction';
  price?: string;
  highestBid?: string;
}

interface SimilarListingsProps {
  currentListingId: string;
  category: string;
  city: string;
}

export default function SimilarListings({ currentListingId, category, city }: SimilarListingsProps) {
  // بيانات تجريبية للإعلانات المشابهة
  const similarListings: Listing[] = [
    {
      id: '2',
      title: 'شقة فاخرة للإيجار في حي الياسمين مع مسبح خاص',
      category: 'عقارات',
      location: city,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      date: 'منذ 3 ساعات',
      priceType: 'auction',
      highestBid: '300'
    },
    {
      id: '3',
      title: 'شقة مفروشة للإيجار في حي الروضة',
      category: 'عقارات',
      location: city,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      date: 'منذ ساعتين',
      priceType: 'fixed',
      price: '2,500'
    },
    {
      id: '4',
      title: 'شقة دوبلكس للبيع في حي الملقا',
      category: 'عقارات',
      location: city,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      date: 'منذ 5 ساعات',
      priceType: 'auction',
      highestBid: '1,200,000'
    }
  ].filter(listing => listing.id !== currentListingId);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">إعلانات مشابهة في {city}</h2>
      <div className="space-y-4">
        {similarListings.map((listing) => (
          <Link
            key={listing.id}
            href={`/listings/${listing.id}`}
            className="block group"
          >
            <div className="bg-white rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="flex gap-4 p-4">
                <div className="relative w-40 h-40 flex-shrink-0">
                  <ImageWithFallback
                    src={listing.image}
                    alt={listing.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0 py-2">
                  <h3 className="font-medium text-gray-900 text-lg leading-7 mb-2">{listing.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded-md">{listing.category}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPinIcon className="w-4 h-4" />
                    {listing.location}
                  </div>
                  <p className="text-sm text-gray-500">{listing.date}</p>
                  <div className="mt-3">
                    {listing.priceType === 'auction' ? (
                      <div>
                        <p className="text-sm text-gray-600">سوم</p>
                        <p className="text-lg font-semibold text-gray-900">أعلى سوم {listing.highestBid} ريال</p>
                      </div>
                    ) : (
                      <p className="text-lg font-semibold text-gray-900">{listing.price} ريال</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
        <Link 
          href={`/listings/similar?category=${category}&city=${city}`} 
          className="block text-center py-3 px-4 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200"
        >
          عرض المزيد من الإعلانات المشابهة
        </Link>
      </div>
    </div>
  );
}
