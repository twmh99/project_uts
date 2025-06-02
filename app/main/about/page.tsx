import { ParticleBackground } from '../../ui/futuristic/particles';
import Image from 'next/image';
import { FiLinkedin, FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Willy Hutagalung',
      position: 'CEO & Founder',
      image: '/team/willy.jpg',
      bio: 'Ahli teknologi dengan visi futuristik dan pengalaman 10 tahun di industri AI',
      social: [
        { icon: <FiInstagram />, url: 'https://www.instagram.com/willyhutagalung99?igsh=MXZnZm84ZTlpdWJhcQ%3D%3D&utm_source=qr' },
      ]
    },
    {
      name: 'Yoel Samosir',
      position: 'CTO',
      image: '/team/yoel.jpg',
      bio: 'Spesialis pengembangan produk dan arsitektur sistem',
      social: [
        { icon: <FiInstagram />, url: 'https://www.instagram.com/oel.mosir?igsh=MXIyOHl6anl0cmgzeg==' },
      ]
    },
    {
      name: 'Chardo Silalahi',
      position: 'Lead Designer',
      image: '/team/chardo.jpg',
      bio: 'Desainer produk dengan pendekatan human-centered design',
      social: [
        { icon: <FiInstagram />, url: 'https://www.instagram.com/kardo__766hi?igsh=MXByc2hkZ24wZjg2NQ==' },
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      
      <main className="container mx-auto px-4 py-24">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-12 text-center neon-text">
            Tentang FutureTech
          </h1>
          
          {/* Bagian Misi dan Visi */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Misi Kami</h3>
              <p className="mb-6 text-cyan-100">
                Untuk menghadirkan teknologi masa depan kepada konsumen saat ini, menjembatani kesenjangan antara
                konsep futuristik dan produk praktis yang dapat digunakan.
              </p>
              
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Visi Kami</h3>
              <p className="mb-6 text-cyan-100">
                Dunia di mana teknologi canggih dapat diakses oleh semua orang, meningkatkan kehidupan sehari-hari melalui inovasi dan desain yang cerdas.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Teknologi</h3>
              <p className="mb-6 text-cyan-100">
                Menggunakan material mutakhir, integrasi AI, dan proses manufaktur berkelanjutan untuk menciptakan produk yang tidak hanya canggih, tetapi juga ramah lingkungan.
              </p>
              
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Nilai Inti</h3>
              <ul className="text-cyan-100 space-y-2">
                <li>• Inovasi tanpa kompromi</li>
                <li>• Desain berpusat pada manusia</li>
                <li>• Keberlanjutan lingkungan</li>
                <li>• Transparansi penuh</li>
              </ul>
            </div>
          </div>

          {/* Bagian Tim */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold mb-12 text-center text-cyan-400">Tim Inti</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center bg-black/50 border border-cyan-400/20 rounded-xl p-6 hover:shadow-cyan-500/20 hover:shadow-lg transition-all">
                  <div className="relative w-40 h-40 mx-auto mb-4 group">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 opacity-30 blur-md group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative rounded-full overflow-hidden border-2 border-cyan-400/50 w-full h-full">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -inset-2 rounded-full border-2 border-cyan-400/20 pointer-events-none"></div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-cyan-300">{member.name}</h4>
                  <p className="text-cyan-400 mb-2">{member.position}</p>
                  <p className="text-cyan-100 text-sm mb-3">{member.bio}</p>
                  
                  <div className="flex justify-center space-x-3">
                    {member.social.map((social, i) => (
                      <a 
                        key={i} 
                        href={social.url} 
                        className="text-cyan-400 hover:text-cyan-300 hover:scale-110 transition-transform"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Bagian Sejarah */}
          <section className="mt-20">
            <h3 className="text-3xl font-bold mb-12 text-center text-cyan-400">Sejarah Kami</h3>
            <div className="relative">
              <div className="absolute left-1/2 h-full w-0.5 bg-gradient-to-b from-cyan-500 to-purple-600"></div>
              
              {[
                { year: '2020', event: 'Perusahaan Didirikan', detail: 'FutureTech resmi berdiri dengan 3 orang founder' },
                { year: '2021', event: 'Produk Pertama Diluncurkan', detail: 'Quantum Headset X1 memulai revolusi audio' },
                { year: '2022', event: 'Penghargaan untuk Inovasi', detail: 'Memenangkan Tech Innovation Award 2022' },
                { year: '2023', event: 'Ekspansi Global', detail: 'Berkantor di 5 negara dengan 100+ karyawan' },
                { year: '2024', event: 'Integrasi AI', detail: 'Meluncurkan produk dengan teknologi AI generatif' },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`mb-8 w-full ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}
                >
                  <div className="inline-block p-6 rounded-lg bg-black border border-cyan-400/20 shadow-lg shadow-cyan-500/10 max-w-md hover:bg-black/70 transition-colors">
                    <h4 className="text-2xl font-bold text-cyan-400 mb-1">{item.year}</h4>
                    <p className="text-lg font-medium text-cyan-300 mb-2">{item.event}</p>
                    <p className="text-cyan-100 text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}