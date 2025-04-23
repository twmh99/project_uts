'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ParticleBackground } from '@/app/ui/futuristic/particles';
import { HolographicButton } from '@/app/ui/futuristic/button';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const ADMIN_CREDENTIALS = {
    username: 'admin123',
    password: '12345'
  };

  const USER_CREDENTIALS = {
    username: 'user123',
    password: '12345'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username dan password harus diisi');
      return;
    }

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem('isAdminAuthenticated', 'true');
      localStorage.removeItem('isUserAuthenticated');
      router.push('/admin/dashboard');
    } else if (username === USER_CREDENTIALS.username && password === USER_CREDENTIALS.password) {
      localStorage.setItem('isUserAuthenticated', 'true');
      localStorage.removeItem('isAdminAuthenticated');
      router.push('/');
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-md mx-auto bg-black/50 border border-cyan-400/20 rounded-xl p-8 backdrop-blur-md">
          <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400 neon-text">
            Masuk ke FutureTech
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-400/50 rounded-lg text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-cyan-300 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Masukkan username"
              />
            </div>

            <div>
              <label className="block text-cyan-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Masukkan password"
              />
            </div>

            <div className="pt-2">
              <HolographicButton type="submit" className="w-full">
                Masuk
              </HolographicButton>
            </div>
          </form>

          <div className="mt-6 text-center text-cyan-300 space-y-3">
            <p>
              Belum punya akun?{' '}
              <a href="/auth/register" className="text-cyan-400 hover:underline">
                Daftar disini
              </a>
            </p>
            <p>
              <a href="/auth/forgot-password" className="text-cyan-400 hover:underline">
                Lupa password?
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}