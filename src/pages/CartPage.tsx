import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, removeFromCart, clearCart, setQuantity } from '@/features/cart/cartSlice';
import { selectCartItems, selectCartCount, selectCartTotal } from '@/features/cart/selectors';
import { CART_KEY } from '@/app/store';

export default function CartPage({ onBack }: { onBack: () => void }) {
  const d = useDispatch();
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);

  const checkout = () => {
    d(clearCart());
    try { sessionStorage.removeItem(CART_KEY); } catch {}
    alert('✅ Checkout complete! Your cart has been cleared.');
    onBack();
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <button className="rounded border px-3 py-1" onClick={onBack}>
          ← Continue Shopping
        </button>
        <div className="text-sm opacity-70">Items: {count} • Total: ${total.toFixed(2)}</div>
      </div>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-3">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-3 items-center border rounded-lg p-3 bg-white">
              <img
                src={product.image}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/80?text=No+Image'; }}
                className="w-20 h-20 object-contain"
                alt={product.title}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{product.title}</div>
                <div className="text-sm opacity-70">${product.price.toFixed(2)}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="border rounded px-2" onClick={() => d(decrement(product.id))}>-</button>
                <input
                  type="number"
                  min={1}
                  className="w-16 border rounded px-2 py-1 text-center"
                  value={quantity}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    if (!Number.isFinite(n) || n < 1) return;
                    d(setQuantity({ id: product.id, qty: n }));
                  }}
                />
                <button className="border rounded px-2" onClick={() => d(increment(product.id))}>+</button>
              </div>
              <button className="ml-2 text-red-600" onClick={() => d(removeFromCart(product.id))}>Remove</button>
            </div>
          ))}
        </div>
      )}

          
      <div className="sticky bottom-0 bg-white/90 backdrop-blur border-t p-3 flex items-center justify-end gap-3">
        <div className="text-lg font-semibold">Total: ${total.toFixed(2)}</div>
        <button
          className="rounded-lg bg-black text-white px-4 py-2 disabled:opacity-50"
          disabled={!items.length}
          onClick={checkout}
        >
          Checkout
        </button>
      </div>

    </section>
  );
}
