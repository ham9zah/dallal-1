'use client';

import DashboardContent from '@/components/dashboard/DashboardContent';
import RoleGuard from '@/components/auth/RoleGuard';
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function DashboardPage() {
  return (
    <RoleGuard>
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    </RoleGuard>
  );
}
