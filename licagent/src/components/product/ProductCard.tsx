// components/ProductCard.tsx
"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  image: string;
  description: string;
  category?: string;
};

export default function ProductCard({ product }: { readonly product: Product }) {
  const short =
    product.description.length > 100
      ? product.description.slice(0, 100) + "..."
      : product.description;

  return (
    <article className="rounded-2xl shadow-md overflow-hidden bg-gray-590 hover:shadow-lg transition-shadow duration-300">
      <Link
        href={`/products/${product._id}`}
        className="block w-full h-48 relative"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover rounded-lg"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{short}</p>
        <div className="flex items-center justify-between">
          <Link
            href={`/products/${product._id}`}
            className="text-sm font-medium underline"
          >
            Know more
          </Link>
          <span className="text-xs text-gray-400">{product.category}</span>
        </div>
      </div>
    </article>
  );
}
