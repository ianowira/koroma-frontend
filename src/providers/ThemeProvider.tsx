'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
  useCallback
} from 'react';

import {useIsHydrated} from "@/hooks/useIsHydrated";

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeCtx = createContext<ThemeContextValue>({ theme: 'light', toggle: () => {} });

export function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const isHydrated = useIsHydrated();

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    return (localStorage.getItem('koroma-theme') as Theme) ?? 'light';
  });

  useEffect(() => {
    // Keep DOM dataset synchronized with the current theme state
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prevTheme) => {
      const next: Theme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('koroma-theme', next);
      document.documentElement.dataset.theme = next;
      return next;
    });
  }, []);

  const ProviderValue = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  // Prevent flash — don't render children until hydrated on client
  if (!isHydrated) return null;

  return <ThemeCtx.Provider value={ProviderValue}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);