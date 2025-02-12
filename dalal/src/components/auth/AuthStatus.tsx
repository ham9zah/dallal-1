'use client';

import { useAuth } from '@/providers/AuthProvider';
import LoginButton from './LoginButton';
import UserMenu from '../layout/UserMenu';

export default function AuthStatus() {
  const { user, loading } = useAuth();
  console.log('AuthStatus - User:', user);
  console.log('AuthStatus - Loading:', loading);

  if (loading) {
    return (
      <div className="animate-pulse flex items-center gap-3 border rounded-full pl-4 pr-3 py-2 mr-1">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!user) {
    console.log('AuthStatus - No user, showing LoginButton');
    return <LoginButton />;
  }

  console.log('AuthStatus - User found, showing UserMenu');
  return <UserMenu user={user} />;
}
