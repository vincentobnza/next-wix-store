import Link from "next/link";
import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client-server";
import ShoppingCartButton from "./ShoppingCartButton";

export default async function Navbar() {
  const wixClient = getWixServerClient();
  const cart = await getCart(await wixClient);

  return (
    <header className="sticky top-0 left-0 w-full bg-white border-b border-zinc-200 p-3 z-50">
      <div className="w-full max-w-screen-lg mx-auto flex justify-between items-center px-5">
        <div className="space-x-12 flex items-center">
          <Link href="/" className="text-md font-bold">
            TRENDORA
          </Link>
          <ul className="flex space-x-6 ">
            <li>
              <Link
                href="/"
                className="text-sm text-zinc-700 hover:text-zinc-900"
              >
                Featured
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-sm text-zinc-700 hover:text-zinc-900"
              >
                Store
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-sm text-zinc-700 hover:text-zinc-900"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        <ShoppingCartButton initialData={cart} />
      </div>
    </header>
  );
}
