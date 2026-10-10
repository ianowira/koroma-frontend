'use client';

import { useTheme } from '@/providers/ThemeProvider';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      id="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 shrink-0"
      style={{
        background: 'var(--bg-toggle)',
        border: '1px solid var(--border-default)',
        color: 'var(--text-secondary)',
      }}
    >
      {/* Track */}
      <div
        className="relative w-11 h-6 rounded-full transition-all duration-300"
        style={{
          background: isDark ? 'rgba(0,200,150,0.3)' : 'rgba(45,106,79,0.15)',
          border: `1px solid ${isDark ? 'rgba(0,200,150,0.4)' : 'rgba(45,106,79,0.25)'}`,
          width: '38px',
          height: '22px',
          position: 'relative',
          borderRadius: '999px',
        }}
      >
        {/* Thumb */}
        <span
          className="absolute top-0.5 transition-all duration-300 flex items-center justify-center rounded-full"
          style={{
            width: '16px',
            height: '16px',
            left: isDark ? 'calc(100% - 18px)' : '2px',
            background: isDark ? '#00C896' : '#2D6A4F',
            borderRadius: '999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isDark ? (
            /* Moon */
            <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
            </svg>
          ) : (
            /* Sun */
            <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="21" x2="12" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="1" y1="12" x2="3" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="21" y1="12" x2="23" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </span>
      </div>
    </button>
  );
}
