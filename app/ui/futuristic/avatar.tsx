'use client';

import Image from 'next/image';

export function HolographicAvatar({ src, name }: { src: string; name: string }) {
  return (
    <div className="relative w-32 h-32 mx-auto mb-6 group">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 opacity-30 blur-md group-hover:opacity-40 transition-opacity duration-300"></div>

      <div className="relative rounded-full overflow-hidden border-2 border-cyan-400/50 w-full h-full group-hover:border-cyan-400/70 transition-all duration-300">
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          style={{
            objectPosition: 'center center',
            transformOrigin: 'center center'
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="absolute -inset-0 rounded-full border-2 border-cyan-400/20 pointer-events-none group-hover:border-cyan-400/30 transition-all duration-300"></div>
    </div>
  );
}