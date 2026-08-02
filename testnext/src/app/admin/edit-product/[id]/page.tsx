// app/admin/edit-product/[id]/page.tsx
import React from "react";
import ProductForm from "@/components/admin/ProductForm";
import axios from "axios";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  // server-side fetch product for initial
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products/${params.id}`
  );
  const json = await res.json();
  const initial = json.product;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      {/* ProductForm is client component; pass initial via props */}
      {/* @ts-ignore */}
      <ProductForm initial={initial} />
    </div>
  );
}
