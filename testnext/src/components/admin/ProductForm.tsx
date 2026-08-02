// components/ProductForm.tsx
"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

export default function ProductForm({ initial }: { initial?: any }) {
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [image, setImage] = useState<string | null>(initial?.image || null);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  async function uploadToCloudinary(file: File) {
    // Example: unsigned upload (ensure you set the upload preset in Cloudinary)
    const form = new FormData();
    form.append("file", file);
    form.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    );
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    const res = await axios.post(url, form);
    return res.data.secure_url;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      let imageUrl = image;
      if (file) {
        imageUrl = await uploadToCloudinary(file);
      }
      const payload = { name, description, image: imageUrl };
      if (initial && initial._id) {
        await axios.put(`/api/products/${initial._id}`, payload, {
          headers: authHeader(),
        });
        toast.success("Product updated");
      } else {
        await axios.post("/api/products", payload, { headers: authHeader() });
        toast.success("Product created");
      }
      router.push("/admin/products");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.error || String(err));
    }
  }
  function authHeader() {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  return (
    <form onSubmit={submit} className="w-1/2 mx-auto space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded border p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded border p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Image</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mt-1"
        />
        {image && (
          <Image
            src={image}
            alt="preview"
            width={48}
            height={32}
            className="mt-2 w-48 h-32 object-cover rounded"
          />
        )}
      </div>
      <div className="flex gap-2 ">
        <button
          type="submit"
          className="w-full px-6 py-2 rounded bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
        >
          Save
        </button>
      </div>
    </form>
  );
}
