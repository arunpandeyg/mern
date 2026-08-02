"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border rounded-full px-3 py-1 bg-white shadow-sm"
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="flex-1 px-2 py-1 focus:outline-none"
      />
      <button type="submit" aria-label="Search">
        <Search size={18} className="text-gray-500 cursor-pointer" />
      </button>
    </form>
  );
}
