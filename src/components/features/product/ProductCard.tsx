'use client';

import { Product } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Plus, Minus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { addToCart, removeFromCart, updateQuantity } from '@/lib/store/slices/cartSlice';
import Image from 'next/image';

export default function ProductCard({ product }: { product: Product }) {
    const dispatch = useAppDispatch();
    const qty = useAppSelector((s) => s.cart.items.find((i) => i.id === product.id)?.quantity || 0);

    return (
        <Card className="flex flex-col h-full border-none shadow-sm hover:shadow-md">
            <div className="relative pt-[70%] bg-white p-4">
                <Image src={product.image} alt={product.title} fill className="object-contain p-4 hover:scale-105 transition-transform" />
            </div>
            <CardContent className="p-3 flex-1">
                <div className="text-[10px] text-muted-foreground uppercase font-bold">{product.category}</div>
                <h3 className="font-medium text-sm line-clamp-2 leading-tight mt-1">{product.title}</h3>
            </CardContent>
            <CardFooter className="p-3 pt-0 flex justify-between items-center mt-auto">
                <div className="font-bold text-sm">₹{product.price}</div>
                {qty === 0 ? (
                    <Button variant="outline" size="sm" className="h-8 text-[#ff3269] border-[#ff3269] font-bold text-xs bg-white uppercase" onClick={() => dispatch(addToCart(product))}>
                        Add
                    </Button>
                ) : (
                    <div className="flex items-center bg-[#ff3269] text-white rounded-lg h-8">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/20" onClick={() => qty > 1 ? dispatch(updateQuantity({ id: product.id, quantity: qty - 1 })) : dispatch(removeFromCart(product.id))}><Minus className="h-3 w-3" /></Button>
                        <span className="w-6 text-center text-sm font-bold">{qty}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/20" onClick={() => dispatch(updateQuantity({ id: product.id, quantity: qty + 1 }))}><Plus className="h-3 w-3" /></Button>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}
