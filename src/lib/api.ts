import { Product, StrapiResponse } from '@/types/strapi';

const BASE  = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? 'http://localhost:1337';
const TOKEN = process.env.STRAPI_API_TOKEN;

function authHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      `${BASE}/api/products?populate[category]=true&populate[botanicals]=true&populate[cover]=true&sort=name:asc`,
      { headers: authHeaders(), next: { revalidate: 60 } },
    );
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const json: StrapiResponse<Product[]> = await res.json();
    return json.data ?? [];
  } catch (err) {
    console.error('[api] getProducts:', err);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${BASE}/api/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[category]=true&populate[botanicals]=true&populate[cover]=true`,
      { headers: authHeaders(), next: { revalidate: 60 } },
    );
    if (!res.ok) return null;
    const json: StrapiResponse<Product[]> = await res.json();
    return json.data?.[0] ?? null;
  } catch (err) {
    console.error('[api] getProductBySlug:', err);
    return null;
  }
}