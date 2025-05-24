import NotFound from "@/components/NotFound";
import { getProductsBySlug } from "@/wix-api/products";
import ProductDetails from "./ProductDetails";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params: { slug } }: PageProps) {
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
