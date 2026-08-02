"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Signin failed");

      // store basic user info client-side
      localStorage.setItem(
        "authUser",
        JSON.stringify({ name: data.user.name, role: data.user.role })
      );
      toast.success("Signed in");

      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err.message || "Signin failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-xl font-semibold">Sign in</h2>
      <div>
        <Label className="block text-sm">Email</Label>
        <Input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <Label className="block text-sm">Password</Label>
        <Input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        disabled={loading}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded"
      >
        {loading ? "Signing..." : "Sign in"}
      </button>
      <p className="text-sm">
        New to app?{" "}
        <a href="/signup" className="text-indigo-600">
          Signup please
        </a>
      </p>
    </form>
  );
}
