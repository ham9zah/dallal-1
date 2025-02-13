'use client';

import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-4 py-8 mt-16">
        {/* المحتوى */}
        <main className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
