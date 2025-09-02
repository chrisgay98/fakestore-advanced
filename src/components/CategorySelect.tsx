import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/fakestore';

type Props = { value: string; onChange: (v: string) => void };

export default function CategorySelect({ value, onChange }: Props) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: api.categories,
  });

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm">Category:</label>
      <select
        className="border rounded px-2 py-1"
        disabled={isLoading || !!error}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        {data?.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {isLoading && <span className="text-sm opacity-60">Loading…</span>}
      {error && <span className="text-sm text-red-600">Failed to load</span>}
    </div>
  );
}
