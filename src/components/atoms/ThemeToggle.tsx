'use client';

import { Moon, Sun } from "lucide-react";

import { cn } from '@/lib/tailwindMerge';
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
            className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 shrink-0 cursor-pointer"
        >
            {/* Track */}
            <div
                className={cn(
                    "relative w-[38px] h-[22px] rounded-full transition-all duration-300 border",
                    isDark
                        ? "bg-[#00C896]/30 border-[#00C896]/40"
                        : "bg-[#2D6A4F]/15 border-[#2D6A4F]/25"
                )}
            >
                {/* Thumb */}
                <span
                    className={cn(
                        "absolute top-0.5 flex items-center justify-center w-4 h-4 rounded-full transition-all duration-300",
                        isDark
                            ? "left-[calc(100%-18px)] bg-[#00C896]"
                            : "left-[2px] bg-[#2D6A4F]"
                    )}
                >
          {isDark ? (
              <Moon width={8} height={8} fill="white" />
          ) : (
              <Sun width={8} height={8} fill="white" />
          )}
        </span>
            </div>
        </button>
    );
}