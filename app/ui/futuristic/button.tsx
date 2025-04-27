'use client';

import Link from 'next/link';

type HolographicButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'default' | 'outline';
};

export function HolographicButton({
  children,
  href,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  variant = 'default'
}: HolographicButtonProps) {
  const baseClasses = `px-6 py-3 rounded-lg hover:shadow-lg transition-all text-lg ${variant === 'outline'
      ? 'border border-cyan-400 text-cyan-400 hover:bg-cyan-900/20'
      : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-cyan-400/50'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

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
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}