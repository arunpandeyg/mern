// app/admin/login/page.tsx
"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Logged in");
      router.push("/admin");
    } catch (err: any) {
      console.error(err);
      toast.error("Login failed");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={submit}
        className="p-6 bg-white rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <div className="mb-3">
          <label className="block text-sm">Email</label>
          <input
            className="mt-1 block w-full rounded border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm">Password</label>
          <input
            type="password"
            className="mt-1 block w-full rounded border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-indigo-600 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}
