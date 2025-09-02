import { useDispatch } from 'react-redux';
import { addToCart } from '@/features/cart/cartSlice';
import type { Product } from '@/api/fakestore';

const FALLBACK_IMG = 'https://via.placeholder.com/300x300?text=No+Image';

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch();

  return (
    <div className="border rounded-xl p-4 bg-white flex flex-col">
      {/* Fixed square image area so cards are uniform */}
      <div className="aspect-square mb-3 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-contain"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            // guard to avoid infinite error loop
            if (img.src !== FALLBACK_IMG) {
              img.onerror = null;
              img.src = FALLBACK_IMG;
            }
          }}
        />
      </div>

      <h3 className="font-medium line-clamp-2 min-h-[3rem]">{product.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-3 flex-1">{product.description}</p>

      <div className="mt-3 flex items-center justify-between">
        <span className="font-semibold">${product.price.toFixed(2)}</span>
        <span className="text-xs bg-gray-100 rounded px-2 py-0.5">⭐ {product.rating?.rate ?? '—'}</span>
      </div>

      <button
        type="button"
        className="mt-3 w-full rounded-lg bg-black text-white py-2 hover:opacity-90"
        onClick={() => dispatch(addToCart(product))}
        aria-label={`Add ${product.title} to cart`}
      >
        Add to Cart
      </button>
    </div>
    );
  }