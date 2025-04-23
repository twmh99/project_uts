'use client';

import Link from 'next/link';

export function HolographicButton({ 
  children, 
  href,
  className = '',
  onClick 
}: { 
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}) {
  const baseClasses = 'px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:shadow-cyan-400/50 hover:shadow-lg transition-all text-lg';

  if (href) {
    return (
      <Link 
        href={href}
        className={`${baseClasses} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </button>
  );
}