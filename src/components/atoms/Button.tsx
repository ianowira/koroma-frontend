import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const variants = {
  primary: 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5',
  outline: 'border border-emerald-500/40 hover:border-emerald-500 text-emerald-400 hover:text-white hover:bg-emerald-500/10',
  ghost:   'text-slate-300 hover:text-white hover:bg-white/5',
};

const sizes = {
  sm: 'px-4 py-2    text-sm  rounded-lg',
  md: 'px-5 py-2.5  text-sm  rounded-xl',
  lg: 'px-7 py-3.5  text-base rounded-xl',
};

const base =
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

export function Button({
  children, href, onClick, variant = 'primary', size = 'md',
  className = '', type = 'button', disabled,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}
