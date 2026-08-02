// components/UserForm.tsx

"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

type UserFormProps = {
  readonly initial?: {
    readonly _id?: string;
    readonly name?: string;
    readonly email?: string;
    readonly image?: string | null;
  };
};

export default function UserForm({ initial }: UserFormProps) {
  const [name, setName] = useState(initial?.name || "");
  const [email, setEmail] = useState(initial?.email || "");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(initial?.image || null);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  async function uploadToCloudinary(file: File) {
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

  function authHeader() {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      let imageUrl = image;
      if (file) imageUrl = await uploadToCloudinary(file);
      const payload: any = { name, email, image: imageUrl };
      if (password) payload.password = password;
      if (initial && initial._id) {
        await axios.put(`/api/users/${initial._id}`, payload, {
          headers: authHeader(),
        });
        toast.success("User updated");
      } else {
        await axios.post("/api/users", payload, { headers: authHeader() });
        toast.success("User created");
      }
      router.push("/admin/users");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Failed");
    }
  }
  return (
    <form onSubmit={submit} className="w-1/2 mx-auto space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded border p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded border p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        {image && <Image src={image} alt="User Image" className="mt-2 w-32 h-24 object-cover" />}
      </div>
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 rounded bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
        >
          Save
        </button>
      </div>
    </form>
  );
}
