import Link from "next/link";
// import { getCart } from "@/wix-api/cart";

export default async function Navbar() {
  // const cart = await getCart();
  // const totalQuantity =
  //   cart?.lineItems?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;
  return (
    <header className="w-full border-b border-zinc-200 p-5">
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center px-5">
        <Link href="/" className="text-md font-bold">
          TRENDORA
        </Link>
      </div>
    </header>
  );
}
