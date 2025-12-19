'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/lib/api';
import ProductCard from './ProductCard';
import { useSearchParams } from 'next/navigation';

export default function ProductGrid() {
    const cat = useSearchParams().get('category');
    const { data: products, isLoading } = useQuery({ queryKey: ['products', cat], queryFn: () => fetchProducts(cat || undefined) });

    if (isLoading) return <div className="text-center py-10">Loading Products...</div>;
    if (!products?.length) return <div className="text-center py-10 text-muted-foreground">No products found.</div>;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-20">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
    );
}
