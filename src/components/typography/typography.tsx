import { useFont } from "@/context/FontContext";
import * as React from "react";
import { cn } from "@/lib/utils";

export const Heading = ({
  children,
  className,
  as: Component = "h1",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<unknown>;
}) => {
  const { stylishFont } = useFont();
  return (
    <Component className={cn(stylishFont, "text-3xl font-bold", className)}>
      {children}
    </Component>
  );
};

export const SubHeading = ({
  children,
  className,
  as: Component = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<unknown>;
}) => {
  const { outfitFont } = useFont();
  return (
    <Component className={cn(outfitFont, "text-xl font-semibold", className)}>
      {children}
    </Component>
  );
};

export const Text = ({
  children,
  className,
  as: Component = "p",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<unknown>;
}) => {
  const { outfitFont } = useFont();
  return (
    <Component className={cn(outfitFont, "text-base", className)}>
      {children}
    </Component>
  );
};
