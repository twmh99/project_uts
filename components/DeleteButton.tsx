'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await fetch(`/api/products/${id}/delete`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setShowModal(false);
      router.refresh();
    } else {
      alert('❌ Gagal menghapus produk. Coba lagi.');
    }
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-3 py-1 bg-red-900/20 border border-red-400/30 rounded-lg hover:bg-red-800/30 transition-all"
      >
        Hapus
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-red-950 to-red-900 border border-red-500/30 rounded-2xl p-6 shadow-xl text-white w-[90%] max-w-md animate-fade-in">
            <h2 className="text-lg font-bold mb-2">Konfirmasi Penghapusan</h2>
            <p className="text-sm text-red-300 mb-4">
              Apakah kamu yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-1 text-sm rounded-lg bg-red-600 hover:bg-red-700 transition-all"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
              <button
                className="px-4 py-1 text-sm rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 transition-all"
                onClick={() => setShowModal(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
