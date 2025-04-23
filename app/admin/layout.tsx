'use client';

import { FloatingNav } from '@/app/ui/futuristic/navbar';
import { ParticleBackground } from '@/app/ui/futuristic/particles';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const isAuthenticated = typeof window !== 'undefined'
    ? localStorage.getItem('isAdminAuthenticated') === 'true'
    : false;

  if (!isAuthenticated) {
    router.push('/auth/login');
    return <div>Redirecting to login...</div>;
  }

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