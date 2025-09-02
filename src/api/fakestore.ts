/** FakeStoreAPI fetchers + types */
export type Rating = { rate: number; count: number };

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

const BASE = 'https://fakestoreapi.com';

async function http<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = {
  categories: () => http<string[]>('/products/categories'),
  products: () => http<Product[]>('/products'),
  productsByCategory: (cat: string) =>
    http<Product[]>(`/products/category/${encodeURIComponent(cat)}`),
};
