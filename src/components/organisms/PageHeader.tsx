import type { BreadcrumbItem } from "@/types/molecules";
import type { ReactNode } from 'react';

import { Breadcrumb } from '@/components/molecules/Breadcrumb';

interface PageHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
    sectionLabel?: string;
    title: ReactNode;
    description?: ReactNode;
}

export function PageHeader({
                               breadcrumbs,
                               sectionLabel,
                               title,
                               description,
                           }: Readonly<PageHeaderProps>) {
    return (
        <section className="relative pt-32 pb-16 overflow-hidden">
            <div className="absolute inset-0 mesh-bg dot-grid opacity-70" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumb items={breadcrumbs} />}

                <span className="accent-line mb-4" />
                {sectionLabel && <p className="section-label">{sectionLabel}</p>}

                <h1 className="font-display font-black text-4xl lg:text-5xl mb-4 leading-tight text-primary">
                    {title}
                </h1>

                {description && (
                    <p className="text-lg max-w-xl leading-relaxed text-secondary">
                        {description}
                    </p>
                )}
            </div>
        </section>
    );
}