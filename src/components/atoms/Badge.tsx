import { ReactNode } from 'react';

export type BadgeVariant = 'emerald' | 'gold' | 'indigo' | 'violet' | 'amber' | 'muted' | 'sky';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  emerald: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30',
  gold:    'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30',
  indigo:  'bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border-indigo-500/30',
  violet:  'bg-violet-500/15 text-violet-800 dark:text-violet-300 border-violet-500/30',
  amber:   'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30',
  muted:   'bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-400 border-black/10 dark:border-white/10',
  sky:     'bg-sky-500/15 text-sky-800 dark:text-sky-300 border-sky-500/30',
};

export function Badge({ children, variant = 'emerald', className = '' }: Readonly<BadgeProps>) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
