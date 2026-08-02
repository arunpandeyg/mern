// app/admin/products/page.tsx
import React from "react";
import ProductList from "@/components/admin/ProductList";

export default function AdminProductsPage() {
  return (
    <div className="w-full min-h-[474px]">
      <ProductList />
    </div>
  );
}
