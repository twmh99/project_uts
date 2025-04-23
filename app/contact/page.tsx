import { ParticleBackground } from '@/app/ui/futuristic/particles';

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            <ParticleBackground />
            <main className="container mx-auto px-4 py-24">
                <section className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-bold mb-12 text-center neon-text">
                        Hubungi Kami
                    </h1>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-cyan-400">Informasi Kontak</h3>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-lg font-medium text-cyan-300">Alamat</h4>
                                    <p className="text-cyan-100">
                                    Jl. Babarsari No. 123, Yogyakarta
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-lg font-medium text-cyan-300">Email</h4>
                                    <p className="text-cyan-100">
                                        info@futuretech.com
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-lg font-medium text-cyan-300">Telepon</h4>
                                    <p className="text-cyan-100">
                                        +62 123 4567 890
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-lg font-medium text-cyan-300">Jam Operasional</h4>
                                    <p className="text-cyan-100">
                                        Senin - Jumat: 09:00 - 17:00 WIB
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-cyan-400">Kirim Pesan</h3>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-cyan-300 mb-2">Nama</label>
                                    <input
                                        type="text"
                                        className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-4 py-2 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-cyan-300 mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-4 py-2 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-cyan-300 mb-2">Subjek</label>
                                    <input
                                        type="text"
                                        className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-4 py-2 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-cyan-300 mb-2">Pesan</label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-4 py-2 text-white"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:shadow-cyan-400/50 hover:shadow-lg transition-all"
                                >
                                    Kirim Pesan
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}