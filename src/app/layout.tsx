import type { Metadata } from "next";
import "./globals.css";
import { FontProvider } from "@/context/FontContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReactQueryProvider from "../ReactQueryProvider";
import { Toaster } from "sonner";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Trendora",
    absolute: "Trendora",
  },
  description:
    "Trendora is a platform that provides real-time data and insights on the latest trends in the world of finance, technology, and more. Stay ahead of the curve with our comprehensive analysis and expert commentary.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${outfit.className}`}>
        <ReactQueryProvider>
          <FontProvider>
            <Navbar />
            <main>{children}</main>

            <Footer />
          </FontProvider>

          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
