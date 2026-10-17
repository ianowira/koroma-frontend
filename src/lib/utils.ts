import { BASE_URL } from '@/constants/api';

/**
 * Resolves a Strapi media URL to an absolute URL.
 */
export function getStrapiMediaUrl(url?: string | null): string | null {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('//')) return url;
    return `${BASE_URL}${url}`;
}