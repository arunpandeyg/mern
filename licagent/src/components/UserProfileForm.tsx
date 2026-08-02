"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";

export default function UserProfileForm({ userId }: { readonly userId: string }) {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${userId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed");
        setName(data.name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setImageUrl(data.image || "");
      } catch (err: any) {
        toast.error(err.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Upload failed");
    return data.url as string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalImage = imageUrl;
      if (imageFile) finalImage = await uploadImage(imageFile);

      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, image: finalImage }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Update failed");
      toast.success("Profile updated");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-xl font-semibold">Edit profile</h2>
      <div>
        <Label className="block text-sm">Name</Label>
        <Input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <Label className="block text-sm">Email (read-only)</Label>
        <Input
          value={email}
          readOnly
          className="w-full px-3 py-2 border rounded bg-gray-50"
        />
      </div>
      <div>
        <Label className="block text-sm">Phone number</Label>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <Label className="block text-sm">Profile image</Label>
        {imageUrl && (
          <Image
            width={96}
            height={96}
            src={imageUrl}
            alt="profile"
            className="w-24 h-24 rounded-full mb-2 object-cover"
          />
        )}
        <Input
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          type="file"
          className="w-full"
        />
      </div>
      <Button
        disabled={loading}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded"
      >
        {loading ? "Updating..." : "Update profile"}
      </Button>
    </form>
  );
}
