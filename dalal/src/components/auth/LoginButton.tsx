'use client';

import { useState } from 'react';
import AuthModal from './AuthModal';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function LoginButton() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      {/* زر تسجيل الدخول للشاشات الكبيرة */}
      <div 
        className="flex items-center gap-3 border rounded-full pl-4 pr-3 py-2 hover:shadow-md transition-all cursor-pointer mr-1 group/menu bg-white"
        onClick={() => setShowAuthModal(true)}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#f5ca58] to-[#e5ba48] rounded-full text-white flex items-center justify-center shadow-sm">
            <UserCircleIcon className="w-7 h-7" />
          </div>
          <span className="text-sm text-gray-600">الدخول | التسجيل</span>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
