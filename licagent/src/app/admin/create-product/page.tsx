// app/admin/create-product/page.tsx
import React from "react";
import ProductForm from "@/components/admin/ProductForm";

export default function CreateProductPage() {
  return (
    <div className="w-full h-[425px]">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <ProductForm />
    </div>
  );
}
