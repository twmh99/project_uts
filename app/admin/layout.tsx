'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FloatingNav } from '@/app/ui/futuristic/navbar';
import { ParticleBackground } from '@/app/ui/futuristic/particles';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('isAdminAuthenticated') === 'true';
      setIsAuthenticated(auth);
      if (!auth) {
        router.push('/auth/login');
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-cyan-400 text-lg">
        Memeriksa akses admin...
      </div>
    );
  }

  if (!isAuthenticated) return null; // akan redirect

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <FloatingNav />
      <main className="container mx-auto px-4 pt-32 pb-12">
        {children}
      </main>
    </div>
  );
}
