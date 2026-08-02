// app/products/[id]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import Product from "@/models/Product";
import { connectToMongoDB } from "@/lib/mongodb";
import Image from "next/image";

type Props = { params: { id: string } };

export default async function ProductPage({ params }: Props) {
  await connectToMongoDB();
  const product = await Product.findById(params.id).lean();
  if (!product) notFound();

  return (
    <main className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="relative h-80 w-full">
          {/* Next/Image in server components requires special setup; replace with img for simplicity */}
          <Image
            fill
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-80 rounded-lg"
          />
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-3">{product.name}</h1>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>
    </main>
  );
}
