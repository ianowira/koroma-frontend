import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/tailwindMerge';

interface BackLinkProps {
    href?: string;
    label?: string;
    className?: string;
    id?: string;
}

export function BackLink({
                             href = '/products',
                             label = 'All Products',
                             className,
                             id = 'product-back-link',
                         }: Readonly<BackLinkProps>) {
    return (
        <Link
            href={href}
            id={id}
            className={cn(
                'inline-flex items-center gap-2 text-sm transition-colors mb-8 group text-muted hover:text-primary',
                className
            )}
        >
            <ChevronLeft className="w-4 h-4" stroke="currentColor" strokeWidth={2} />
            {label}
        </Link>
    );
}