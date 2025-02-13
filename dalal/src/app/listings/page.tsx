'use client';

import SidebarFilter from '@/components/filters/SidebarFilter';
import ListingsGrid from '@/components/listings/ListingsGrid';

export default function ListingsPage() {
  return (
    <main className="pt-20 min-h-screen bg-gray-50">
      <div className="flex">
        <SidebarFilter />
        <div className="flex-1 mr-80">
          <ListingsGrid />
        </div>
      </div>
    </main>
  );
}
