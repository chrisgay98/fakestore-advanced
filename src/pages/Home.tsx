import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/fakestore';
import type { Product } from '@/api/fakestore';
import CategorySelect from '@/components/CategorySelect';
import ProductCard from '@/components/ProductCard';

export default function Home({ goCart }: { goCart: () => void }) {
  const [category, setCategory] = useState('');

  const queryKey = category ? ['products', 'category', category] : ['products', 'all'];
  const queryFn = () => (category ? api.productsByCategory(category) : api.products());

  const { data, isLoading, error } = useQuery<Product[]>({ queryKey, queryFn });

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <CategorySelect value={category} onChange={setCategory} />
        <button className="rounded border px-3 py-1" onClick={goCart}>
          Go to Cart
        </button>
      </div>

      {isLoading && <p>Loading products…</p>}
      {error && <p className="text-red-600">Failed to load products.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
