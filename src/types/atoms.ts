import type { ComponentPropsWithRef } from 'react';

export type BadgeVariant =
    | 'emerald'
    | 'gold'
    | 'indigo'
    | 'violet'
    | 'amber'
    | 'muted'
    | 'sky'
    | 'default';

export interface IconProps extends ComponentPropsWithRef<'svg'> {
    size?: number | string;
}