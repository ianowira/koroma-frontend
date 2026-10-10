/**
 * Strapi v5 response types — flat format (no `attributes` wrapper).
 * v5 returns objects directly: { id, documentId, name, ... }
 */

export interface Botanical {
    id: number;
    documentId: string;
    name: string;
    scientificName?: string;
    description?: unknown;
    publishedAt?: string;
}

export interface Category {
    id: number;
    documentId: string;
    name: string;
}

export interface StrapiMediaFormat {
    url: string;
    width: number;
    height: number;
}

export interface StrapiMedia {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
    formats?: {
        thumbnail?: StrapiMediaFormat;
        small?: StrapiMediaFormat;
        medium?: StrapiMediaFormat;
        large?: StrapiMediaFormat;
    };
}

export interface Product {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    indication: string;
    activeIngredients: string;
    pharmacologicalEffects: string;
    outcome?: string;
    isGeneric?: boolean;
    cover?: StrapiMedia | null;
    category?: Category | null;
    botanicals?: Botanical[];
    publishedAt?: string;
    createdAt?: string;
    updatedAt?: string;
}

/** Generic Strapi v5 list response */
export interface StrapiResponse<T> {
    data: T;
    meta: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}