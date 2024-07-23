'use client'

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      // If still loading authentication status, wait
      setLocalLoading(true);
    } else {
      // Authentication check completed
      if (!user && pathname !== '/login') {
        router.push('/login');
      } else {
        setLocalLoading(false);
      }
    }
  }, [user, isLoading, router, pathname]);

  if (localLoading) {
    return (
        <div className="loading-screen">
          <div className="modal show">
            <p>Loading...</p>
          </div>
        </div>
      );
  }

  if (pathname === '/login' || pathname === '/') {
    return <>{children}</>;
  }

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;