'use client';

import ProductCard from './ProductCard';

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  location: string;
  condition: 'جديد' | 'مستعمل' | 'ممتاز';
  timeAgo: string;
  image: string;
}

interface ProductGridProps {
  title: string;
  count?: number;
  products: Product[];
}

export default function ProductGrid({ title, count, products }: ProductGridProps) {
  return (
    <div className="space-y-6">
      {/* العنوان وعدد الإعلانات */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {title}
        </h2>
        {count && (
          <span className="text-[15px] text-gray-500">
            {count} إعلان
          </span>
        )}
      </div>

      {/* شبكة المنتجات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
          />
        ))}
      </div>
    </div>
  );
}
