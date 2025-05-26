import Link from "next/link";
// import { getCart } from "@/wix-api/cart";

export default async function Navbar() {
  // const cart = await getCart();
  // const totalQuantity =
  //   cart?.lineItems?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;
  return (
    <header className="sticky top-0 left-0 w-full bg-white border-b border-zinc-200 p-5 z-50">
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center px-5">
        <div className="space-x-12 flex items-center">
          <Link href="/" className="text-md font-bold">
            TRENDORA
          </Link>

          <ul className="flex space-x-6 ">
            <li>
              <Link
                href="/"
                className="text-sm text-zinc-600 hover:text-zinc-900 font-semibold"
              >
                Featured
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-sm text-zinc-600 hover:text-zinc-900 font-semibold"
              >
                Store
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-sm text-zinc-600 hover:text-zinc-900 font-semibold"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
