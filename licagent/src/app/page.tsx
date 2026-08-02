import InfiniteScroll from "@/components/InfiniteScroll";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-[474px] font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center  gap-4 sm:p-10 bg-gradient-to-b from-gray-500 to-gray-300">
      <InfiniteScroll />
      <Link
        href="/products"
        className="text-4xl font-bold text-white cursor-pointer"
      >
        Jai Shri Krishna
      </Link>
    </div>
  );
}
