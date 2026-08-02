// components/ProductList.tsx
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    try {
      const res = await axios.get("/api/products", { headers: authHeader() });
      setProducts(res.data.products || res.data);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Failed to load products");
    }
  }

  function authHeader() {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    try {
      await axios.delete(`/api/products/${id}`, { headers: authHeader() });
      toast.success("Deleted");
      fetchList();
    } catch (err: any) {
      console.error(err);
      toast.error("Delete failed");
    }
  }

  return (
    <div>
      <div className="w-full h-  flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Products</h2>
        <Link
          href="/admin/create-product"
          className="px-3 py-2 rounded bg-green-600 text-white"
        >
          Create
        </Link>
      </div>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left">
            <th className="border p-2">Image</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td className="border p-2">
                <Image src={p.image} alt={p.name} width={24} height={16} className="w-24 h-16 object-cover rounded-sm" />
              </td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.description.slice(0, 80)}...</td>
              <td className="border p-2 space-x-2">
                <Link
                  href={`/admin/edit-product/${p._id}`}
                  className="px-2 py-1 rounded bg-blue-600 text-white"
                >
                  Edit
                </Link>
                <button
                  onClick={() => remove(p._id)}
                  className="px-2 py-1 rounded bg-red-600 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
