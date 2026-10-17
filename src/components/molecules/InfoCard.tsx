import type { ReactNode } from 'react';

interface InfoCardProps {
    title: string;
    content: string;
    icon: ReactNode;
}

export function InfoCard({ title, content, icon }: Readonly<InfoCardProps>) {
    return (
        <div className="rounded-2xl p-6 transition-all duration-200 bg-info-card border border-border shadow-card">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-botanical-icon text-accent">
                    {icon}
                </div>
                <h2 className="font-bold text-sm uppercase tracking-wider text-primary">{title}</h2>
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-line text-secondary">{content}</p>
        </div>
    );
}