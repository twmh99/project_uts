import { ParticleBackground } from '@/app/ui/futuristic/particles';
import { ContactForm } from '@/app/ui/futuristic/contact-form';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl font-bold mb-6 neon-text">Hubungi Kami</h1>
            <p className="text-xl text-cyan-200 mb-8">
              Punya pertanyaan atau butuh bantuan? Tim FutureTech siap membantu Anda.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="text-cyan-400 text-2xl">📍</div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-300 mb-1">Lokasi</h3>
                  <p className="text-cyan-100">Jl. Babarsari No. 123, Yogyakarta</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-cyan-400 text-2xl">📧</div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-300 mb-1">Email</h3>
                  <p className="text-cyan-100">info@futuretech.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-cyan-400 text-2xl">📞</div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-300 mb-1">Telepon</h3>
                  <p className="text-cyan-100">+62 123 4567 890</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-cyan-400 text-2xl">⏱️</div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-300 mb-1">Jam Operasional</h3>
                  <p className="text-cyan-100">Senin - Jumat: 09.00 - 18.00 WIB</p>
                  <p className="text-cyan-100">Sabtu: 10.00 - 15.00 WIB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/50 border border-cyan-400/20 rounded-xl p-8 backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">Kirim Pesan</h2>
            <ContactForm />
          </div>
        </div>
      </main>
    </div>
  );
}