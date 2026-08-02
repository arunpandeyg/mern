// components/AdminSidebar.tsx
"use client";
import Link from "next/link";
import React from "react";

export default function AdminSidebar({ active }: { readonly active?: string }) {
  return (
    <aside className="w-64 text-white border-r h-[473px] p-4 bg-gradient-to-b from-gray-500 to-gray-300">
      <div className="mb-6 text-xl font-bold">Admin</div>
      <nav className="flex flex-col gap-2">
        <Link
          href="/admin/create-product"
          className={`px-3 py-2 rounded ${active === "create-product" ? "bg-indigo-600 text-white" : "hover:bg-gray-400"}`}
        >
          Create Product
        </Link>
        <Link
          href="/admin/products"
          className={`px-3 py-2 rounded ${active === "products" ? "bg-indigo-600 text-white" : "hover:bg-gray-400"}`}
        >
          Products List
        </Link>
        <Link
          href="/admin/create-user"
          className={`px-3 py-2 rounded ${active === "create-user" ? "bg-indigo-600 text-white" : "hover:bg-gray-400"}`}
        >
          Create User
        </Link>
        <Link
          href="/admin/users"
          className={`px-3 py-2 rounded ${active === "users" ? "bg-indigo-600 text-white" : "hover:bg-gray-400"}`}
        >
          Users List
        </Link>
      </nav>
    </aside>
  );
}
