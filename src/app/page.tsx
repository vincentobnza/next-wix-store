import { Heading, SubHeading } from "@/components/typography/typography";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-10 px-5 py-10">
      <div className="flex items-center md:h-96 bg-emerald-50">
        <div className="flex flex-col gap-5 p-10 text-center md:text-left md:w-1/2">
          <Heading>Your Everyday Style, Reinvented</Heading>
          <SubHeading className="mb-10">
            Explore premium picks designed to match your unique lifestyle.
          </SubHeading>
          <Link
            href="/"
            className={`${buttonVariants({ variant: "default" })} self-center md:self-start`}
          >
            SHOP ON TRENDORA
            <ArrowRight />
          </Link>
        </div>
        <div className="relative hidden md:block w-1/2 h-full">
          <Image
            src="/banner.jpg"
            width={1000}
            height={1000}
            priority
            alt="Trendora Banner"
            className="h-full object-cover"
          />
          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-transparent to-transparent"></div>
        </div>
      </div>
    </main>
  );
}
