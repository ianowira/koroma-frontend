import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/tailwindMerge';

interface BackCtaProps {
    href: string;
    label: string;
    className?: string;
}

export function BackCta({
                            href,
                            label,
                            className,
                        }: Readonly<BackCtaProps>) {
    return (
        <div className={cn('mt-10', className)}>
            <Link
                href={href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 bg-pill border border-border text-secondary hover:border-border-hover hover:text-primary"
            >
                <ArrowLeft className="w-4 h-4" strokeWidth={2} />
                {label}
            </Link>
        </div>
    );
}