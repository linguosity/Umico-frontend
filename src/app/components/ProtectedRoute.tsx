import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('ProtectedRoute rendered');
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);  // Line added

  useEffect(() => {
    console.log('ProtectedRoute useEffect triggered', { user, isLoading, pathname });
    if (!isLoading && !user && pathname !== '/login') {
      console.log('Redirecting to login');
      router.push('/login');
    } else {
      setLoading(false);  // Line updated
    }
  }, [user, isLoading, router, pathname]);

  if (loading) {  // Line updated
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