import { useSyncExternalStore } from 'react';

/**
 * Helper to subscribe to client-side hydration status
 */
const subscribe = () => () => {};

export function useIsHydrated(): boolean {
    return useSyncExternalStore(
        subscribe,
        () => true,  // Client snapshot
        () => false  // Server snapshot
    );
}