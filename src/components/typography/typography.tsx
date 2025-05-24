"use client";

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
    <Component
      className={cn(
        stylishFont,
        "text-4xl font-medium leading-snug",
        className,
      )}
    >
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
  return <Component className={cn("text-lg", className)}>{children}</Component>;
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
  return (
    <Component className={cn("text-base", className)}>{children}</Component>
  );
};
