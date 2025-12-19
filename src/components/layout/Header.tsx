'use client';

import { ShoppingCart, Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { toggleCart } from '@/lib/store/slices/cartSlice';

export default function Header() {
    const dispatch = useAppDispatch();
    const cartCount = useAppSelector((state) => state.cart.items.reduce((acc, i) => acc + i.quantity, 0));

    return (
        <header className="sticky top-0 z-50 w-full border-b  backdrop-blur px-4 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-[#950EDB]">Zepto</div>
                <div className="hidden md:flex items-center text-sm font-medium text-black hover:text-[#950EDB] cursor-pointer">
                    <MapPin className="mr-1 h-4 w-4" /> Ambegaon Budruk, Pune, Maharashtra 411041
                </div>
            </div>

            <div className="flex-1 max-w-xl relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-6 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="pl-9 bg-muted/50" />
            </div>

            <Button variant="ghost" size="icon" onClick={() => dispatch(toggleCart(true))} className="relative">
                <ShoppingCart className="h-6 w-6 text-black" />
                {cartCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5  flex items-center justify-center p-0 text-[10px]">
                        {cartCount}
                    </Badge>
                )}
            </Button>
        </header>
    );
}
