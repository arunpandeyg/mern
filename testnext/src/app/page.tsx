import Image from "next/image";


export default function Home() {
  return (
    <div className="relative aspect-[16/9] w-full h-[594px] z-0">
      <Image src="/lic/i5.png" alt="home" fill />
    </div>
  );
}
