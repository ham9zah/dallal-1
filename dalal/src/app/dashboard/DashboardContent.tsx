'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardClient from "./DashboardClient";
import { authService } from '@/services/auth.service';
import RoleGuard from '@/components/auth/RoleGuard';

export default function DashboardContent() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = authService.getCurrentUser();
    console.log('DashboardContent - Current user:', user);
    
    if (!user) {
      console.log('DashboardContent - No user found, redirecting to login');
      router.push('/login');
      return;
    }

    // تحويل بيانات المستخدم إلى الشكل المطلوب
    const formattedUserData = {
      name: user.name,
      email: user.email,
      memberSince: new Date(user.created_at).getFullYear().toString(),
      roles: user.roles,
      listings: [],
      favorites: [],
      messages: [],
    };

    console.log('DashboardContent - Formatted user data:', formattedUserData);
    setUserData(formattedUserData);
  }, [router]);

  if (!userData) {
    console.log('DashboardContent - No user data, returning null');
    return null;
  }

  console.log('DashboardContent - Rendering with roles:', userData.roles);
  return (
    <RoleGuard roles={['admin', 'manager', 'user']}>
      <DashboardClient userData={userData} />
    </RoleGuard>
  );
}
