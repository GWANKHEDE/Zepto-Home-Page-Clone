import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/lib/api';

export interface CartItem extends Product {
    quantity: number;
}

export interface CartState {
    items: CartItem[];
    isOpen: boolean;
}

const initialState: CartState = {
    items: [],
    isOpen: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCart: (state, action: PayloadAction<boolean | undefined>) => {
            state.isOpen = action.payload ?? !state.isOpen;
        },
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item) {
                if (quantity <= 0) {
                    state.items = state.items.filter((i) => i.id !== id);
                } else {
                    item.quantity = quantity;
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
        setCart: (state, action: PayloadAction<CartState>) => {
            state.items = action.payload.items;
            state.isOpen = action.payload.isOpen;
        }
    },
});

export const { toggleCart, addToCart, removeFromCart, updateQuantity, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
