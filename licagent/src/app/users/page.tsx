import Navbar from "@/components/Navbar";
import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import Image from "next/image";
import Link from "next/link";

export default async function UsersListPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const limit = 5;
  await connectToMongoDB();
  const skip = (page - 1) * limit;
  const [total, users] = await Promise.all([
    User.countDocuments({}),
    User.find({})
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
  ]);
  const pages = Math.ceil(total / limit) || 1;

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Users</h1>
          <Link
            href="/users/create"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Create user
          </Link>
        </div>

        <ul className="space-y-3">
          {users.map((u: any) => (
            <li
              key={u._id}
              className="flex items-center justify-between border p-3 rounded"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={u.image || "/placeholder.png"}
                  alt={u.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">{u.name}</div>
                  <div className="text-sm text-gray-500">{u.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/users/${u._id}`}
                  className="px-3 py-1 border rounded"
                >
                  View
                </Link>
                <Link
                  href={`/users/${u._id}/edit`}
                  className="px-3 py-1 border rounded"
                >
                  Edit
                </Link>
                <form
                  action={`/api/users/${u._id}`}
                  method="post"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!confirm("Delete user?")) return;
                    const res = await fetch(`/api/users/${u._id}`, {
                      method: "DELETE",
                    });
                    if (res.ok) location.reload();
                    else alert("Delete failed");
                  }}
                >
                  <button
                    type="submit"
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <Link
              key={i}
              href={`/users?page=${i + 1}`}
              className={`px-3 py-1 border rounded ${i + 1 === page ? "bg-gray-100" : ""}`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
