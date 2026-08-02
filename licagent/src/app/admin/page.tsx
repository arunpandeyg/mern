import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import AdminSidebar from "@/components/admin/AdminSidebar";

const JWT_SECRET = process.env.JWT_SECRET as string;

export default async function AdminPage({
  children,
}: {
  children?: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    // No token → redirect to home
    redirect("/");
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { role?: string };

    if (payload.role !== "admin") {
      // Not admin → redirect
      redirect("/");
    }

    // Admin authorized → render page
    return (
      <div className="w-full min-h-[473px] flex bg-gradient-to-b from-gray-500 to-gray-300">
        <AdminSidebar />
        <main className="flex-1 p-6">
          {children || <div className="text-2xl font-bold text-center text-white ">Welcome to Admin</div>}
        </main>
      </div>
    );
  } catch (err) {
    console.error(err);
    // Invalid token → redirect
    redirect("/");
  }
}

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { verifyToken } from "@/lib/auth";

// export default async function AdminPage() {
//   const cookieStore = cookies();
//   const token = await cookieStore.then(
//     (cookies) => cookies.get("token")?.value
//   );
//   if (!token) redirect("/signin");

//   try {
//     const payload = verifyToken(token);
//     if (payload.role !== "admin") redirect("/");
//   } catch (e) {
//     console.error(e);
//     redirect("/signin");
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//       <p className="mt-4">Only visible to admins.</p>
//     </div>
//   );
// }
