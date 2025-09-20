import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/data/products";

export type CartItem = { product: Product; qty: number };
type CartState = { items: CartItem[] };

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ product: Product; qty?: number }>) => {
      const { product, qty = 1 } = action.payload;
      const idx = state.items.findIndex(i => i.product.id === product.id);
      if (idx >= 0) state.items[idx].qty += qty;
      else state.items.push({ product, qty });
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.product.id !== action.payload);
    },
    clear: (state) => { state.items = []; },
  },
});

export const { addItem, removeItem, clear } = cartSlice.actions;

// Selectores
export const selectItems = (s: { cart: CartState }) => s.cart.items;
export const selectTotalItems = (s: { cart: CartState }) => s.cart.items.reduce((a, i) => a + i.qty, 0);
export const selectTotalAmount = (s: { cart: CartState }) => s.cart.items.reduce((a, i) => a + i.qty * i.product.price, 0);

export default cartSlice.reducer;
