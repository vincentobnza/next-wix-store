import NotFound from "@/components/NotFound";
import { getProductsBySlug } from "@/wix-api/products";
import ProductDetails from "./ProductDetails";
import { Metadata } from "next";
import { delay } from "@/lib/utils";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const product = await getProductsBySlug(slug);
  if (!product) <NotFound />;

  const mainImage = product?.media?.mainMedia?.image;

  return {
    title: product?.name ?? "Product",
    description: "Get the latest trends in fashion, technology, and more.",
    openGraph: {
      images: mainImage?.url
        ? [
            {
              url: mainImage.url,
              width: mainImage.width,
              height: mainImage.height,
              alt: mainImage.altText || "",
            },
          ]
        : undefined,
    },
  };
}

export default async function Page({ params: { slug } }: PageProps) {
  await delay(5000);
  const product = await getProductsBySlug(slug);
  if (!product?._id) {
    return <NotFound />;
  }
  return (
    <main className="mx-auto w-full max-w-screen-xl space-y-12 px-5 py-10">
      <ProductDetails product={product} />
    </main>
  );
}
