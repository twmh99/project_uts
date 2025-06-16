'use client'

import { useState } from 'react'
import { ParticleBackground } from '@/app/ui/futuristic/particles'
import { HolographicAvatar } from '@/app/ui/futuristic/avatar'
import { HolographicButton } from '@/app/ui/futuristic/button'

export default function AdminProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Admin Future',
    email: 'admin@futuretech.com',
    joinDate: 'Maret 2024',
    location: 'Yogyakarta',
    role: 'Administrator',
  })

  const [isEditing, setIsEditing] = useState(false)
  const [tempProfile, setTempProfile] = useState({ ...profile })

  const handleEditProfile = () => {
    if (isEditing) {
      setProfile(tempProfile)
      alert('Profil admin diperbarui!')
    }
    setIsEditing(!isEditing)
  }

  const handleChangePassword = () => {
    const newPassword = prompt("Masukkan password admin baru:");
    if (newPassword) {
      alert("Password berhasil diubah.");
    }
  }

  const handleManageAccess = () => {
    alert("Membuka halaman pengaturan akses admin...");
  }

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar Profil */}
            <div className="md:w-1/3">
              <div className="bg-black/50 border border-cyan-400/20 rounded-xl p-6 backdrop-blur-md">
                <HolographicAvatar 
                  src="/profile/avatar.png"
                  name={profile.name}
                />

                {isEditing ? (
                  <div className="mt-4 space-y-3">
                    <input
                      type="text"
                      value={tempProfile.name}
                      onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                      className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-3 py-2 text-cyan-400"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mt-4 text-cyan-400">{profile.name}</h2>
                    <p className="text-cyan-300">{profile.role}</p>
                  </>
                )}

                <div className="mt-6 space-y-4 text-cyan-300 text-sm">
                  <div>
                    <h3 className="text-cyan-500 text-xs">EMAIL</h3>
                    {isEditing ? (
                      <input
                        type="email"
                        value={tempProfile.email}
                        onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                        className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-3 py-1 text-white"
                      />
                    ) : (
                      <p>{profile.email}</p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-cyan-500 text-xs">BERGABUNG</h3>
                    <p>{profile.joinDate}</p>
                  </div>

                  <div>
                    <h3 className="text-cyan-500 text-xs">LOKASI</h3>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempProfile.location}
                        onChange={(e) => setTempProfile({ ...tempProfile, location: e.target.value })}
                        className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-3 py-1 text-white"
                      />
                    ) : (
                      <p>{profile.location}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:w-2/3">
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-cyan-400">Pengaturan Admin</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Profil */}
                  <div className="border border-cyan-400/20 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 text-cyan-400">Profil</h3>
                    <HolographicButton onClick={handleEditProfile}>
                      {isEditing ? 'Simpan Perubahan' : 'Edit Profil'}
                    </HolographicButton>
                    {isEditing && (
                      <HolographicButton
                        variant="outline"
                        className="mt-2"
                        onClick={() => {
                          setTempProfile(profile)
                          setIsEditing(false)
                        }}
                      >
                        Batal
                      </HolographicButton>
                    )}
                  </div>

                  {/* Keamanan */}
                  <div className="border border-cyan-400/20 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 text-cyan-400">Keamanan</h3>
                    <HolographicButton onClick={handleChangePassword}>
                      Ganti Password
                    </HolographicButton>
                  </div>

                  {/* Akses */}
                  <div className="border border-cyan-400/20 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 text-cyan-400">Manajemen Akses</h3>
                    <HolographicButton onClick={handleManageAccess}>
                      Kelola Akses Admin
                    </HolographicButton>
                  </div>

                  {/* Reserved Future Feature */}
                  <div className="border border-cyan-400/20 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 text-cyan-400">Preferensi</h3>
                    <HolographicButton variant="outline" disabled>
                      Pengaturan Tema (Segera Hadir)
                    </HolographicButton>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
