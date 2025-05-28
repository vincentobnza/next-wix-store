import NotFound from "@/components/NotFound";
import { getProductsBySlug } from "@/wix-api/products";
import ProductDetails from "./ProductDetails";
import { Metadata } from "next";
import { delay } from "@/lib/utils";
import { getWixServerClient } from "@/lib/wix-client-server";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const wixClient = await getWixServerClient();
  const product = await getProductsBySlug(wixClient, slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

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

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  await delay(5000);
  const wixClient = await getWixServerClient();
  const product = await getProductsBySlug(wixClient, slug);

  if (!product?._id) {
    return <NotFound />;
  }

  return (
    <main className="mx-auto w-full max-w-screen-lg space-y-12 px-5 py-10">
      <ProductDetails product={product} />
    </main>
  );
}
