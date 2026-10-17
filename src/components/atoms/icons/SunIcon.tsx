
import { cn } from '@/lib/tailwindMerge';
import {IconProps} from "@/types/atoms";

export function SunIcon({
                            size = 24,
                            strokeWidth = 1.5,
                            className,
                            ...props
                        }: Readonly<IconProps>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn('shrink-0', className)}
            {...props}
        >
            <path d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.02 12.02.707.707M3 12h1m16 0h1M4.927 19.073l.707-.707M18.364 5.636l.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
        </svg>
    );
}