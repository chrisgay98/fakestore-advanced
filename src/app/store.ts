/** Redux store + sessionStorage persistence */
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/features/cart/cartSlice';
import type { CartState } from '@/features/cart/cartSlice';

export const CART_KEY = 'cart_v1';

function loadCart(): CartState | undefined {
  try {
    const raw = sessionStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartState) : undefined;
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: { cart: cartReducer },
  preloadedState: { cart: loadCart() ?? { items: [] } },
});

store.subscribe(() => {
  try {
    const state = store.getState();
    sessionStorage.setItem(CART_KEY, JSON.stringify(state.cart));
  } catch {
    // ignore storage errors
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
