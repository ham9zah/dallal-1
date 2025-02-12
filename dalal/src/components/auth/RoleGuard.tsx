'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';

interface RoleGuardProps {
  roles?: string[];
  children: React.ReactNode;
  redirectTo?: string;
}

export default function RoleGuard({ roles, children, redirectTo = '/unauthorized' }: RoleGuardProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const verifyAccess = async () => {
      if (!user) {
        if (mounted) {
          setIsLoading(false);
          router.replace('/login');
        }
        return;
      }

      if (roles && roles.length > 0) {
        const hasRequiredRole = roles.some(role => user.roles?.includes(role));
        if (!hasRequiredRole) {
          if (mounted) {
            setIsLoading(false);
            router.replace(redirectTo);
          }
          return;
        }
      }

      if (mounted) {
        setIsLoading(false);
      }
    };

    verifyAccess();

    return () => {
      mounted = false;
    };
  }, [user, roles, redirectTo, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#f5ca58] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || (roles && roles.length > 0 && !roles.some(role => user.roles?.includes(role)))) {
    return null;
  }

  return <>{children}</>;
}
