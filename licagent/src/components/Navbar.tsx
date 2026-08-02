"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogIn, LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import SearchBox from "./SearchBox";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ name?: string; role?: string } | null>(
    null
  );

  useEffect(() => {
    // read token info from cookie/localStorage (simple client check)
    try {
      const raw = localStorage.getItem("authUser");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      setUser(null);
    }
  }, [pathname]);

  const handleSignOut = async () => {
    // call signout API
    await fetch("/api/auth/signout", { method: "POST" });
    localStorage.removeItem("authUser");
    setUser(null);
    toast.success("Signed out");
    router.push("/signin");
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-sm shadow-sm bg-gradient-to-b from-gray-500 to-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
             <Image src='/logo.png' alt='logo' width={30} height={30} className='cursor-pointer rounded-full'/>
              {/* <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
                AP
              </div> */}
              <span className="font-semibold">Arun Pandey</span>
            </Link>
          </div>

          <div className="flex-1 px-4">
            <div className="max-w-xl mx-auto relative">
              {/* <input
                aria-label="Search"
                placeholder="Search..."
                className="w-full rounded-full px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              /> */}
              <div className="w-full rounded-full px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"> 
                <SearchBox />              
                {/* <Search size={16} /> */}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Button
                  onClick={() =>
                    router.push(user.role === "admin" ? "/admin" : "/")
                  }
                  className="flex items-center gap-2"
                >
                  <User size={18} /> <span>{user.name ?? "Account"}</span>
                </Button>
                <Button
                  onClick={handleSignOut}
                  className="flex items-center gap-2"
                >
                  <LogOut size={18} /> <span>Sign out</span>
                </Button>
              </>
            ) : (
              <Link href="/signin" className="flex items-center gap-2">
                <LogIn size={18} /> <span>Sign in</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
