'use client';

export function NeonGlowBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black"></div>
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl opacity-50"></div>
    </div>
  );
}