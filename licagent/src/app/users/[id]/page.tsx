import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import Image from "next/image";

export default async function UserPage({ params }: { params: { id: string } }) {
  await connectToMongoDB();
  const user = await User.findById(params.id).select("-password");
  if (!user)
    return (
      <div>
        <main className="p-8">User not found</main>
      </div>
    );

  return (
    <div>
      <main className="max-w-3xl mx-auto p-8">
        <div className="flex items-center gap-6">
          <Image
            src={user.image || "/placeholder.png"}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            {user.phone && <p className="text-gray-600">{user.phone}</p>}
          </div>
        </div>
      </main>
    </div>
  );
}
