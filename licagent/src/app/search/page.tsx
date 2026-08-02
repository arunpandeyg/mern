import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/User";

export default async function SearchPage({
  searchParams,
}: {
  readonly searchParams: { readonly q?: string };
}) {
  const query = searchParams.q?.trim() || "";
  let results: any[] = [];

  if (query) {
    await connectToMongoDB();
    results = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
      ],
    }).select("name email phone image role");
  }

  return (
    <div>
      <main className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        {query ? (
          results.length > 0 ? (
            <ul className="space-y-4">
              {results.map((user) => (
                <li
                  key={user._id}
                  className="flex items-center gap-4 border p-4 rounded-lg"
                >
                  <img
                    src={user.image || "/placeholder.png"}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:gap-40">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    {user.phone && (
                      <p className="text-sm text-gray-500">{user.phone}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found for "{query}"</p>
          )
        ) : (
          <p className="text-gray-600">Enter a search term above.</p>
        )}
      </main>
    </div>
  );
}

