import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full relative items-center justify-items-center min-[580px]:h-[465px] overflow-hidden bg-gradient-to-b from-orange-400 to-orange-200">
      <h1 className="absolute text-4xl font-bold text-white z-100 top-20 ">
        Welcome to Shubh Vivah
      </h1>
      <Link
        href="/users/signup"
        className="text-lg text-white font-bold absolute top-70 left-1/2 -translate-x-1/2 z-20"
      >
        Create Profile
      </Link>
      <Image
        src="/images/v12.png"
        alt="Wedding"
        fill
        className="object-cover z- -1 "
      />
    </div>
  );
}
