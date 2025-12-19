'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { toggleCart, removeFromCart, updateQuantity } from '@/lib/store/slices/cartSlice';
import { Plus, Minus } from 'lucide-react';
import Image from 'next/image';

export default function CartSheet() {
    const dispatch = useAppDispatch();
    const { items, isOpen } = useAppSelector((s) => s.cart);
    const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

    return (
        <Sheet open={isOpen} onOpenChange={(o) => dispatch(toggleCart(o))}>
            <SheetContent className="w-full sm:max-w-md flex flex-col p-0" side="right">
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>Cart ({items.length} items)</SheetTitle>
                </SheetHeader>
                {!items.length ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                        <div className="text-4xl mb-4">🛒</div>
                        <p>Your cart is empty</p>
                        <Button className="mt-4" onClick={() => dispatch(toggleCart(false))}>Start Shopping</Button>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 p-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 mb-4 border-b pb-4 last:border-0">
                                    <div className="h-16 w-16 border rounded p-1 relative">
                                        <Image src={item.image} alt={item.title} fill className="object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                                        <p className="text-xs text-muted-foreground my-1">₹{item.price} x {item.quantity}</p>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center bg-[#ff3269] text-white rounded h-7">
                                                <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-white/20" onClick={() => item.quantity > 1 ? dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 })) : dispatch(removeFromCart(item.id))}><Minus className="h-3 w-3" /></Button>
                                                <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                                                <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-white/20" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}><Plus className="h-3 w-3" /></Button>
                                            </div>
                                            <div className="font-bold text-sm">₹{(item.price * item.quantity).toFixed(2)}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                        <div className="p-4 border-t">
                            <div className="flex justify-between mb-4 font-bold text-lg"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
                            <Button className="w-full bg-[#ff3269] hover:bg-[#ff3269]/90 font-bold h-12 text-md">Pay Now</Button>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
