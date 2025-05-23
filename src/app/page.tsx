import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-10 px-5 py-10">
      <div className="flex items-center md:h-96 bg-zinc-50">
        <div className="space-y-7 p-10 text-center md:w-1/2"></div>
        <div className="hidden md:block w-1/2 h-full">
          <Image
            src="/banner.jpg"
            width={1000}
            height={1000}
            priority
            alt="Trendora Banner"
            className="h-full object-cover"
          />
        </div>
      </div>
    </main>
  );
}
