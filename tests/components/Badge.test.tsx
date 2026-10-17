import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Badge } from '@/components/atoms/Badge';

describe('Badge Atom Component', () => {
  it('renders children correctly', () => {
    render(<Badge variant="emerald">Botanical Extract</Badge>);
    expect(screen.getByText('Botanical Extract')).toBeDefined();
  });

  it('applies variant styling', () => {
    const { container } = render(<Badge variant="gold">Certified</Badge>);
    const span = container.querySelector('span');
    expect(span?.className).toContain('bg-amber-500/15');
    expect(span?.className).toContain('border-amber-500/30');
  });
});
