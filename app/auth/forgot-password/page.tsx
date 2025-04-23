'use client';

import { ParticleBackground } from '@/app/ui/futuristic/particles';
import { HolographicButton } from '@/app/ui/futuristic/button';

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen">
            <ParticleBackground />
            <main className="container mx-auto px-4 py-24">
                <div className="max-w-md mx-auto bg-black/50 border border-cyan-400/20 rounded-xl p-8 backdrop-blur-md">
                    <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400 neon-text">
                        Lupa Password
                    </h2>

                    <p className="text-cyan-300 mb-6 text-center">
                        Masukkan email Anda untuk menerima instruksi reset password
                    </p>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-cyan-300 mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>

                        <div className="pt-2">
                            <HolographicButton type="submit" className="w-full">
                                Kirim Instruksi
                            </HolographicButton>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-cyan-300">
                        <a href="/auth/login" className="text-cyan-400 hover:underline">
                            Kembali ke halaman login
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}