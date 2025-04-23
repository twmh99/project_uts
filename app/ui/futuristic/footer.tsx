import { FiLinkedin, FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';

export function Footer() {
    return (
        <footer className="bg-black/80 border-t border-cyan-400/20 py-12 mt-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-cyan-400">FutureTech</h3>
                        <p className="text-cyan-300">
                            Menghadirkan teknologi masa depan untuk kehidupan yang lebih baik.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4 text-cyan-400">Tautan Cepat</h4>
                        <ul className="space-y-2 text-cyan-300">
                            <li><a href="/" className="hover:text-cyan-400">Beranda</a></li>
                            <li><a href="/catalogue" className="hover:text-cyan-400">Produk</a></li>
                            <li><a href="/about" className="hover:text-cyan-400">Tentang Kami</a></li>
                            <li><a href="/contact" className="hover:text-cyan-400">Kontak</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4 text-cyan-400">Bantuan</h4>
                        <ul className="space-y-2 text-cyan-300">
                            <li><a href="#" className="hover:text-cyan-400">FAQ</a></li>
                            <li><a href="#" className="hover:text-cyan-400">Pengiriman</a></li>
                            <li><a href="#" className="hover:text-cyan-400">Pengembalian</a></li>
                            <li><a href="#" className="hover:text-cyan-400">Kebijakan Privasi</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4 text-cyan-400">Hubungi Kami</h4>
                        <div className="space-y-2 text-cyan-300">
                            <p>info@futuretech.com</p>
                            <p>+62 123 4567 890</p>
                            <p>Jl. Babarsari No. 123, Yogyakarta</p>
                            <div className="flex space-x-4 mt-3">
                                <a href="https://www.instagram.com/0 hover:text-cyan-300">
                                    <FiInstagram size={20} />
                                </a>
                                <a href="https://x.com/?lang=en-id00 hover:text-cyan-300">
                                    <FiTwitter size={20} />
                                </a>
                                <a href="https://www.linkedin.com/00 hover:text-cyan-300">
                                    <FiLinkedin size={20} />
                                </a>
                                <a href="https://github.com/cyan-400 hover:text-cyan-300">
                                    <FiGithub size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-cyan-400/20 mt-12 pt-6 text-center text-cyan-400">
                    <p>&copy; {new Date().getFullYear()} FutureTech. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}