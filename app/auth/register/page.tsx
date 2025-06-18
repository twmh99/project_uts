'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ParticleBackground } from '@/app/ui/futuristic/particles';
import { HolographicButton } from '@/app/ui/futuristic/button';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Terjadi kesalahan.');
    } else {
      setSuccess('Berhasil daftar! Silakan login.');
      setTimeout(() => router.push('/auth/login'), 1500);
    }
  };

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-md mx-auto bg-black/50 border border-cyan-400/20 rounded-xl p-8 backdrop-blur-md">
          <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400">Daftar Akun Baru</h2>

          {error && <div className="mb-4 p-3 bg-red-900/40 border border-red-400/50 rounded-lg text-red-300">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-900/40 border border-green-400/50 rounded-lg text-green-300">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {['name', 'email', 'username', 'password'].map((field, i) => (
              <div key={i}>
                <label className="block text-cyan-300 mb-2 capitalize">{field}</label>
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  name={field}
                  value={(form as any)[field]}
                  onChange={handleChange}
                  required
                  className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder={`Masukkan ${field}`}
                />
              </div>
            ))}

            <HolographicButton type="submit" className="w-full">Daftar</HolographicButton>
          </form>
          <div className="mt-6 text-center text-cyan-300">
            <p>Sudah punya akun? <a href="/auth/login" className="text-cyan-400 hover:underline">Masuk disini</a></p>
          </div>
        </div>
      </main>
    </div>
  );
}
