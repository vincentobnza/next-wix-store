import { Heading, SubHeading } from "@/components/typography/typography";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import Product from "@/components/Product";
import { Skeleton } from "@/components/ui/skeleton";
import { getCollectionsBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-screen-xl space-y-12 px-5 py-10">
      <div className="flex items-center md:h-96 bg-zinc-200">
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
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 via-transparent to-transparent"></div>
        </div>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </main>
  );
}

async function FeaturedProducts() {
  const collection = await getCollectionsBySlug("featured-products");

  if (!collection) {
    return null;
  }

  const featuredProducts = await queryProducts({
    collectionIds:
      typeof collection._id === "string" ? collection._id : undefined,
  });

  if (!featuredProducts.items.length) {
    return null;
  }
  return (
    <div className="w-full">
      <SubHeading>Featured Products</SubHeading>
      <div className="mt-8 grid grid-cols-2 sm:grid gap-3 md:gap-5 md:grid-cols-3 lg:grid-cols-5">
        {featuredProducts.items.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="w-full">
      <SubHeading>Featured Products</SubHeading>
      <div className="mt-8 grid grid-cols-2 sm:grid gap-3 md:gap-5 md:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-4">
            <Skeleton className="h-60 w-full" />
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
