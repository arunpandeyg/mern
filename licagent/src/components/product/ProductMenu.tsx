// components/ProductMenu.tsx
"use client";
import React from "react";

const categories = [
  "allproduct",
  "product1",
  "product2",
  "product3",
  "product4",
];

export default function ProductMenu({
  active,
  onChange,
}: {
  active: string;
  onChange: (c: string) => void;
}) {
  return (
    <nav className="flex gap-2 flex-wrap mb-4">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`px-3 py-1 rounded-full transition-colors border ${c === active ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-700 border-gray-200"}`}
        >
          {c}
        </button>
      ))}
    </nav>
  );
}
