'use client';

import { Suspense } from 'react';
import Header from "@/components/layout/Header";
import CategoryTabs from "@/components/features/category/CategoryTabs";
import ProductGrid from "@/components/features/product/ProductGrid";
import CartSheet from "@/components/features/cart/CartSheet";
import { Skeleton } from "@/components/ui/skeleton";

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2 p-3 border rounded-xl bg-white">
          <Skeleton className="w-full aspect-3/4 rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}

function CategoryTabsSkeleton() {
  return (
    <div className="sticky top-16 z-40 bg-background border-b py-2 px-4 shadow-sm">
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-full shrink-0" />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      <Suspense fallback={<CategoryTabsSkeleton />}>
        <CategoryTabs />
      </Suspense>
      <main className="container mx-auto px-4 py-6">
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid />
        </Suspense>
      </main>
      <CartSheet />
    </div>
  );
}
