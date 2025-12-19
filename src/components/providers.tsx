'use client';

import { useRef, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/lib/store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setCart } from '@/lib/store/slices/cartSlice';

export default function Providers({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore | null>(null);
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    const [queryClient] = useState(() => new QueryClient());

    useEffect(() => {
        if (storeRef.current) {
            try {
                const saved = localStorage.getItem('cartState');
                if (saved) storeRef.current.dispatch(setCart(JSON.parse(saved)));
            } catch (e) {
                console.error("Cart load error", e);
            }

            const unsub = storeRef.current.subscribe(() => {
                const state = storeRef.current?.getState();
                if (state) localStorage.setItem('cartState', JSON.stringify(state.cart));
            });

            return () => unsub();
        }
    }, []);

    return (
        <Provider store={storeRef.current}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </Provider>
    );
}
