import type { Metadata } from "next";
import "./globals.css";
import { FontProvider } from "@/context/FontContext";
import Navbar from "./Navbar";
import { Quicksand } from "next/font/google";

const quick_sand = Quicksand({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
      <body className={`antialiased ${quick_sand.className}`}>
        <FontProvider>
          <Navbar />
          <main>{children}</main>
        </FontProvider>
      </body>
    </html>
  );
}
