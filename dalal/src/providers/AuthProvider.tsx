'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types/auth';
import { authService } from '@/services/auth.service';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
  checkAuth: async () => false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const currentUser = authService.getCurrentUser();
      console.log('AuthProvider - Current user:', currentUser);

      if (currentUser) {
        setUser(currentUser);
        return true;
      }

      return false;
    } catch (error) {
      console.error('AuthProvider - Error checking auth:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('AuthProvider - Checking auth on mount');
    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    setUser,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
