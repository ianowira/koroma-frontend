import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import {BreadcrumbItem} from "@/types/molecules";

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: Readonly<BreadcrumbProps>) {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6 text-sm text-muted">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={item.label} className="flex items-center gap-2">
                        {index > 0 && <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />}
                        {isLast || !item.href ? (
                            <span className="text-primary font-medium">{item.label}</span>
                        ) : (
                            <Link href={item.href} className="hover:text-secondary transition-colors">
                                {item.label}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}