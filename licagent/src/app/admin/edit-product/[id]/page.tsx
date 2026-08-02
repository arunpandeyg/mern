// app/admin/edit-product/[id]/page.tsx
import React from "react";
import ProductForm from "@/components/admin/ProductForm";

function getBaseUrl() {
  // Use NEXT_PUBLIC_BASE_URL in .env.local for local development
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  // Production (Vercel)
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  // Default fallback (local dev)
  return "http://localhost:3000";
}

export default async function EditProductPage({
  params,
}: {
  readonly params: Promise<{ readonly id: string }>;
}) {
  const { id } = await params;
  const baseUrl = getBaseUrl();

  try {
    const res = await fetch(`${baseUrl}/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`);
    }

    const data = await res.json();

    if (!data?.product) {
      throw new Error("Product not found in response");
    }

    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
        {/* @ts-expect-error client component props */}
        <ProductForm initial={data.product} />
      </div>
    );
  } catch (err) {
    console.error("Error fetching product:", err);
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p>Unable to load product data. Please try again later.</p>
      </div>
    );
  }
}








// // app/admin/edit-product/[id]/page.tsx
// import React from "react";
// import ProductForm from "@/components/admin/ProductForm";
// import axios from "axios";

// export default async function EditProductPage({
//   params,
// }: {
//   readonly params: { readonly id: string };
// }) {
//   // server-side fetch product for initial
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products/${params.id}`
//   );
  
//   const json = await res.json();
//   const initial = json.product;
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
//       {/* ProductForm is client component; pass initial via props */}
//       {/* @ts-ignore */}
//       <ProductForm initial={initial} />
//     </div>
//   );
// }
