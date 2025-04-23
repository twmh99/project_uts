'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
      const isUserAuthenticated = localStorage.getItem('isUserAuthenticated') === 'true';

      if (pathname.startsWith('/auth')) {
        setIsLoading(false);
        return;
      }

      if (isAdminAuthenticated) {
        if (!pathname.startsWith('/admin')) {
          router.push('/admin/dashboard');
        }
      } else if (isUserAuthenticated) {
        if (pathname.startsWith('/admin')) {
          router.push('/');
        }
      } else {
        router.push('/auth/login');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return <>{children}</>;
}