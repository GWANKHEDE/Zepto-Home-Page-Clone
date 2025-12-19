'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function CategoryTabs() {
    const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });
    const router = useRouter();
    const searchParams = useSearchParams();
    const selected = searchParams.get('category') || 'all';

    const setCat = (cat: string) => {
        const params = new URLSearchParams(searchParams);
        cat === 'all' ? params.delete('category') : params.set('category', cat);
        router.push(`/?${params.toString()}`);
    };

    return (
        <div className="sticky top-16 z-40 bg-background/5 border-b shadow-sm py-2 px-4 overflow-x-auto no-scrollbar flex gap-2">
            <Button variant={selected === 'all' ? 'default' : 'outline'} size="sm" className={cn("rounded-full capitalize", selected === 'all' && "bg-zinc-200 text-black hover:bg-zinc-300")} onClick={() => setCat('all')}>
                All
            </Button>
            {categories?.map((cat) => (
                <Button key={cat} variant={selected === cat ? 'default' : 'outline'} size="sm" className={cn("rounded-full capitalize whitespace-nowrap", selected === cat && "bg-zinc-200 text-black hover:bg-zinc-300")} onClick={() => setCat(cat)}>
                    {cat}
                </Button>
            ))}
        </div>
    );
}
