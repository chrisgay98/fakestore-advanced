/** Redux Toolkit slice: shopping cart items and quantities */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/api/fakestore';

export type CartItem = { product: Product; quantity: number };
export type CartState = { items: CartItem[] };

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const p = action.payload;
      const existing = state.items.find(i => i.product.id === p.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ product: p, quantity: 1 });
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.product.id !== action.payload);
    },
    increment(state, action: PayloadAction<number>) {
      const it = state.items.find(i => i.product.id === action.payload);
      if (it) it.quantity += 1;
    },
    decrement(state, action: PayloadAction<number>) {
      const it = state.items.find(i => i.product.id === action.payload);
      if (it) it.quantity = Math.max(1, it.quantity - 1);
    },
    setQuantity(state, action: PayloadAction<{ id: number; qty: number }>) {
      const it = state.items.find(i => i.product.id === action.payload.id);
      if (it) it.quantity = Math.max(1, Math.floor(action.payload.qty));
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, increment, decrement, setQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
