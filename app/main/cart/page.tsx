'use client';

import { useCart } from '../../context/cart-context';
import { ParticleBackground } from '../../ui/futuristic/particles';
import { HolographicButton } from '../../ui/futuristic/button';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      
      <main className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold mb-12 neon-text">
          KERANJANG ANDA
        </h2>
        
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Keranjang Anda kosong</h3>
            <p className="mb-6">Jelajahi katalog kami untuk menemukan produk-produk luar biasa!</p>
            <HolographicButton href="/main/catalogue">
              Jelajahi Produk
            </HolographicButton>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="border border-cyan-400/20 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-cyan-900/10">
                    <tr>
                      <th className="p-4 text-left">Produk</th>
                      <th className="p-4 text-left">Harga</th>
                      <th className="p-4 text-left">Jumlah</th>
                      <th className="p-4 text-left">Total</th>
                      <th className="p-4 text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id} className="border-t border-cyan-400/10 hover:bg-cyan-900/10">
                        <td className="p-4">
                          <div className="flex items-center">
                            <div className="w-16 h-16 bg-cyan-900/10 rounded-lg mr-4 overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-cyan-400">{item.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">${item.price}</td>
                        <td className="p-4">
                        <div className="flex items-center border border-cyan-400/30 rounded-lg overflow-hidden" style={{ maxWidth: '100px' }}> {}
                            <button 
                              className="px-3 py-1 bg-cyan-900/20 hover:bg-cyan-800/30"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button 
                              className="px-3 py-1 bg-cyan-900/20 hover:bg-cyan-800/30"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-4">${(item.price * item.quantity).toFixed(2)}</td>
                        <td className="p-4">
                          <button 
                            className="text-cyan-400 hover:text-cyan-300"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <div className="border border-cyan-400/20 rounded-xl p-6 bg-black/50 backdrop-blur-md">
                <h3 className="text-xl font-bold mb-6 text-cyan-400">Ringkasan Pesanan</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pengiriman</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pajak</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-cyan-400/20 pt-4 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <HolographicButton className="w-full py-4 text-lg">
                  Lanjut ke Pembayaran
                </HolographicButton>
                
                <div className="mt-6 text-sm text-cyan-400">
                  <p>Pemrosesan pembayaran yang aman</p>
                  <div className="flex mt-2 space-x-4">
                    <span>🔒</span>
                    <span>💳</span>
                    <span>🪙</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}