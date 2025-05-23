"use client";

import { createContext, useContext } from "react";
import { Domine, Outfit } from "next/font/google";

export type FontContextType = {
  outfitFont: string;
  stylishFont: string;
};

const dom = Domine({
  subsets: ["latin"],
  variable: "--font-domine",
});
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const FontContext = createContext<FontContextType | undefined>(
  undefined,
);

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  const stylishFont = dom.className;
  const outfitFont = outfit.className;
  return (
    <FontContext.Provider value={{ outfitFont, stylishFont }}>
      {children}
    </FontContext.Provider>
  );
};
export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
};
