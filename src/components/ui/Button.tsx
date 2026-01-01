'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-xl backdrop-blur-sm';

  const variants = {
    primary: 'bg-blue-400 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500 hover:shadow-blue-600/40 hover:-translate-y-0.5',
    secondary: 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 hover:shadow-indigo-600/40 hover:-translate-y-0.5',
    outline: 'border-2 border-blue-400 text-blue-400 bg-white/80 hover:bg-blue-50 hover:-translate-y-0.5 shadow-sm',
    ghost: 'text-slate-600 hover:bg-slate-100/80',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-8 py-3 text-sm',
    lg: 'px-10 py-4 text-base tracking-wide',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  );
}
