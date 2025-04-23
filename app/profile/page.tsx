"use client";

import { ParticleBackground } from '../ui/futuristic/particles';
import { HolographicAvatar } from '../ui/futuristic/avatar';
import { useState } from 'react';

export default function ProfilePage() {
  const orders = [
    { id: '#FT-1001', date: '2023-10-15', total: 548, status: 'Dikirimkan' },
    { id: '#FT-0987', date: '2023-09-22', total: 299, status: 'Dikirimkan' },
    { id: '#FT-0876', date: '2023-08-05', total: 798, status: 'Dalam Pengiriman' },
  ];

  const [profile, setProfile] = useState({
    name: "Lemon Future",
    email: "filemon@futuretech.com",
    joinDate: "January 2022",
    location: "Yogyakarta"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({...profile});

  const handleEditProfile = () => {
    if (isEditing) {
      setProfile(tempProfile);
      alert('Profil berhasil diperbarui!');
    }
    setIsEditing(!isEditing);
  };

  const handleChangePassword = () => {
    const newPassword = prompt("Masukkan password baru:");
    if (newPassword) {
      alert(`Password berhasil diubah!`);
    }
  };

  // Fungsi untuk tombol Pengaturan Pemberitahuan
  const handleNotificationSettings = () => {
    alert("Membuka halaman pengaturan notifikasi");
  };

  // Fungsi untuk tombol Upgrade ke Pro
  const handleUpgradePro = () => {
    const confirmUpgrade = confirm("Apakah Anda yakin ingin upgrade ke versi Pro?");
    if (confirmUpgrade) {
      alert("Upgrade ke versi Pro berhasil!");
      // Proses pembayaran atau perubahan status membership
    }
  };

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
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
                      onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
                      className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-3 py-2 text-cyan-400"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mt-4 text-cyan-400">{profile.name}</h2>
                    <p className="text-cyan-300">Member Premium</p>
                  </>
                )}
                
                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-sm text-cyan-500">EMAIL</h3>
                    {isEditing ? (
                      <input
                        type="email"
                        value={tempProfile.email}
                        onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})}
                        className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-3 py-1 text-white"
                      />
                    ) : (
                      <p>{profile.email}</p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm text-cyan-500">BERGABUNG</h3>
                    <p>{profile.joinDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-cyan-500">LOKASI</h3>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempProfile.location}
                        onChange={(e) => setTempProfile({...tempProfile, location: e.target.value})}
                        className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-3 py-1 text-white"
                      />
                    ) : (
                      <p>{profile.location}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-cyan-400">Riwayat Pesanan</h2>
                <div className="border border-cyan-400/20 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-cyan-900/10">
                      <tr>
                        <th className="p-4 text-left">ID Pesanan</th>
                        <th className="p-4 text-left">Tanggal</th>
                        <th className="p-4 text-left">Total</th>
                        <th className="p-4 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-t border-cyan-400/10 hover:bg-cyan-900/10">
                          <td className="p-4">{order.id}</td>
                          <td className="p-4">{order.date}</td>
                          <td className="p-4">${order.total}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs ${
                              order.status === 'Dikirimkan' 
                                ? 'bg-green-900/30 text-green-400' 
                                : 'bg-cyan-900/30 text-cyan-400'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
              
              <section>
                <h2 className="text-3xl font-bold mb-6 text-cyan-400">Pengaturan Akun</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-cyan-400/20 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 text-cyan-400">Info Pribadi</h3>
                    <button 
                      onClick={handleEditProfile}
                      className="w-full py-2 border border-cyan-400/50 rounded-lg hover:bg-cyan-400/10 transition-colors"
                    >
                      {isEditing ? "Simpan Perubahan" : "Edit Profil"}
                    </button>
                    {isEditing && (
                      <button 
                        onClick={() => {
                          setIsEditing(false);
                          setTempProfile({...profile});
                        }}
                        className="w-full mt-2 py-2 border border-red-400/50 rounded-lg hover:bg-red-400/10 transition-colors"
                      >
                        Batal
                      </button>
                    )}
                  </div>
                  
                  <div className="border border-cyan-400/20 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 text-cyan-400">Keamanan</h3>
                    <button 
                      onClick={handleChangePassword}
                      className="w-full py-2 border border-cyan-400/50 rounded-lg hover:bg-cyan-400/10 transition-colors"
                    >
                      Ganti Password
                    </button>
                  </div>
                  
                  <div className="border border-cyan-400/20 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 text-cyan-400">Preferensi</h3>
                    <button 
                      onClick={handleNotificationSettings}
                      className="w-full py-2 border border-cyan-400/50 rounded-lg hover:bg-cyan-400/10 transition-colors"
                    >
                      Pengaturan Pemberitahuan
                    </button>
                  </div>
                  
                  <div className="border border-cyan-400/20 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 text-cyan-400">Membership</h3>
                    <button 
                      onClick={handleUpgradePro}
                      className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:shadow-cyan-400/50 hover:shadow-lg transition-all"
                    >
                      Tingkatkan ke Versi Pro
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}