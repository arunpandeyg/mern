// components/UserList.tsx
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

export default function UserList() {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    fetchList();
  }, []);
  async function fetchList() {
    try {
      const res = await axios.get("/api/users", { headers: authHeader() });
      setUsers(res.data.users || res.data);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load users");
    }
  }

  function authHeader() {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async function remove(id: string) {
    if (!confirm("Delete user?")) return;
    try {
      await axios.delete(`/api/users/${id}`, { headers: authHeader() });
      toast.success("Deleted");
      fetchList();
    } catch (err: any) {
      console.error(err);
      toast.error("Delete failed");
    }
  }

  return (
    <div className="w-full h-[470px] bg-gradient-to-b from-gray-500 to-gray-300">
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-xl font-bold text-white">Users</h2>
        <Link
          href="/admin/create-user"
          className="px-3 py-2 rounded bg-green-600 text-white"
        >
          Create
        </Link>
      </div>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left">
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Message</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="border p-2">
                <Image
                  width={24}
                  height={16}
                  alt={u.name}
                  src={u.image}
                  className="w-24 h-16 object-cover rounded-lg"
                />
              </td>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.message?.slice(0, 60)}</td>
              <td className="border p-2 space-x-2">
                <Link
                  href={`/admin/edit-user/${u._id}`}
                  className="px-2 py-1 rounded bg-blue-600 text-white"
                >
                  Edit
                </Link>
                <button
                  onClick={() => remove(u._id)}
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
