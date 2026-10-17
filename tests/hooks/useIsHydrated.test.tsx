import { renderHook } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';

import { useIsHydrated } from '@/hooks/useIsHydrated';

describe('useIsHydrated', () => {
    it('returns true on client hydration', () => {
        const { result } = renderHook(() => useIsHydrated());

        expect(result.current).toBe(true);
    });

    it('returns false during server-side rendering', () => {
        let serverValue: boolean | null = null;

        function TestComponent() {
            serverValue = useIsHydrated();
            return null;
        }

        // Simulate Server-Side Rendering
        renderToString(<TestComponent />);

        expect(serverValue).toBe(false);
    });
});