// app/products/page.tsx
"use client";
import React, { useState } from "react";
import ProductMenu from "@/components/product/ProductMenu";
import ProductList from "@/components/product/ProductList";

export default function ProductsPageClient() {
  const [category, setCategory] = useState("allproduct");

  return (
    <div className="w-full h-[474px] items-center justify-items-center  bg-gradient-to-b from-gray-500 to-gray-300">
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <ProductMenu active={category} onChange={(c) => setCategory(c)} />

      {/* Use a key to remount ProductList when category changes so it resets state cleanly */}
      <ProductList key={category + "-list"} initialCategory={category} />
    </main>
    </div>
  );
}

