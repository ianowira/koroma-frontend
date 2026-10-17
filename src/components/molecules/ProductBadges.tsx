import { Check } from 'lucide-react';

import { Badge, type BadgeProps } from '@/components/atoms/Badge';

interface ProductBadgesProps {
    categoryName?: string;
    catVariant?: BadgeProps['variant'];
    isGeneric?: boolean;
}

export function ProductBadges({
                                  categoryName,
                                  catVariant = 'default',
                                  isGeneric,
                              }: Readonly<ProductBadgesProps>) {
    return (
        <div className="flex flex-wrap gap-2.5 mb-5">
            {categoryName && <Badge variant={catVariant}>{categoryName}</Badge>}
            {isGeneric && <Badge variant="muted">Generic</Badge>}
            <Badge variant="gold">
                <Check className="w-3 h-3" stroke="currentColor" strokeWidth={2} />
                SABS Certified
            </Badge>
        </div>
    );
}