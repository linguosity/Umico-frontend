'use client'

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('ProtectedRoute rendered');
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    console.log('ProtectedRoute useEffect triggered', { user, isLoading, pathname });
    if (isLoading) {
      // If still loading authentication status, wait
      setLocalLoading(true);
    } else {
      // Authentication check completed
      if (!user && pathname !== '/login') {
        console.log('Redirecting to login');
        router.push('/login');
      } else {
        setLocalLoading(false);
      }
    }
  }, [user, isLoading, router, pathname]);

  if (localLoading) {
    console.log('Auth is loading');
    return <div>Loading...</div>;
  }

  if (pathname === '/login' || pathname === '/') {
    console.log('Rendering public route:', pathname);
    return <>{children}</>;
  }

  console.log('ProtectedRoute rendering children, user:', !!user);
  return user ? <>{children}</> : null;
};

export default ProtectedRoute;