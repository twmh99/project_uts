'use client';

import { ParticleBackground } from '@/app/ui/futuristic/particles';
import { HolographicAvatar } from '@/app/ui/futuristic/avatar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [tempProfile, setTempProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: string; text: string } | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (res.ok) {
        setProfile(data.user);
        setTempProfile(data.user);
      } else {
        // jika tidak login, redirect ke login
        router.push('/auth/login');
      }
    }
    fetchProfile();
  }, [router]);

  if (!profile) {
    return <p className="text-center py-24">Memuat profil...</p>;
  }

  const handleEditToggle = async () => {
    if (isEditing) {
      const res = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tempProfile),
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(data.user);
        setStatusMsg({ type: 'success', text: 'Profil berhasil diperbarui! ✅' });
      } else {
        setStatusMsg({ type: 'error', text: data.error });
      }
    }
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    document.cookie = `token=; Max-Age=0; path=/`;
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            {/* SIDEBAR PROFIL */}
            <div className="md:w-1/3">
              <div className="bg-black/50 border border-cyan-400/20 rounded-xl p-6 backdrop-blur-md">
                <HolographicAvatar src="/profile/avatar.png" name={profile.name} />
                {isEditing ? (
                  <input
                    type="text"
                    value={tempProfile.name}
                    onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    className="mt-4 w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-3 py-2 text-cyan-400"
                  />
                ) : (
                  <h2 className="text-2xl font-bold mt-4 text-cyan-400">{profile.name}</h2>
                )}
                <p className="text-cyan-300">@{profile.username}</p>
                <p className="mt-1 text-cyan-500">{profile.email}</p>

                <div className="mt-6 space-y-4">
                  <button
                    onClick={handleEditToggle}
                    className="w-full py-2 border border-cyan-400/50 rounded-lg hover:bg-cyan-400/10 transition-colors"
                  >
                    {isEditing ? 'Simpan Profil' : 'Edit Profil'}
                  </button>

                  {isEditing && (
                    <button
                      onClick={() => { setIsEditing(false); setTempProfile(profile); }}
                      className="w-full py-2 border border-red-400/50 rounded-lg hover:bg-red-400/10 transition-colors"
                    >
                      Batal
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full py-2 border border-gray-500 rounded-lg hover:bg-gray-500/10 transition-colors"
                  >
                    Logout
                  </button>

                  {statusMsg && (
                    <p
                      className={`text-sm font-medium px-4 py-2 rounded-lg ${
                        statusMsg.type === 'success' ? 'bg-green-600/20 text-green-300' : 'bg-red-600/20 text-red-300'
                      } mt-4`}
                    >
                      {statusMsg.text}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* RIWAYAT PESANAN */}
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-6 text-cyan-400">Riwayat Pesanan</h2>
              <div className="border border-cyan-400/20 rounded-xl overflow-hidden mb-12">
                <table className="w-full">
                  {/* Replace static orders dengan data nyata */}
                  <thead className="bg-cyan-900/10">
                    <tr>
                      <th className="p-4 text-left">ID Pesanan</th>
                      <th className="p-4 text-left">Tanggal</th>
                      <th className="p-4 text-left">Total</th>
                      <th className="p-4 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* TODO: fetch riwayat dari API */}
                    <tr className="border-t border-cyan-400/10">
                      <td colSpan={4} className="p-4 text-center text-cyan-400/60">Belum ada riwayat pesanan.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Pengaturan lain tetap bisa ditambahkan jika diperlukan */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
