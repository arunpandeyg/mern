// app/admin/edit-user/[id]/page.tsx
import React from "react";
import UserForm from "@/components/admin/UserForm";

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export default async function EditUserPage({
  params,
}: {
  readonly params: Promise<{ readonly id: string }>;
}) {
  const { id } = await params;
  const baseUrl = getBaseUrl();

  try {
    const res = await fetch(`${baseUrl}/api/users/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch user: ${res.status}`);
    }

    const data = await res.json();

    return (
      <div className="w-full h-[470px] bg-gradient-to-b from-gray-500 to-gray-300">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Edit User</h1>
        {/* @ts-expect-error */}
        <UserForm initial={data.user} />
      </div>
    );
  } catch (err) {
    console.error("Error fetching user:", err);
    return (
      <div >
        <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
      </div>
    );
  }
}









// // app/admin/edit-user/[id]/page.tsx
// import React from "react";
// import UserForm from "@/components/admin/UserForm";

// export default async function EditUserPage({
//   params,
// }: {
//   readonly params: { readonly id: string };
// }) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/users/${params.id}`
//   );
//   const json = await res.json();
//   const initial = json.user;
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Edit User</h1>
//       {/* @ts-ignore */}
//       <UserForm initial={initial} />
//     </div>
//   );
// }
