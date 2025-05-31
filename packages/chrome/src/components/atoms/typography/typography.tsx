import React from "react";
import { cn } from "@/lib/utils";

type VariantType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "blockquote"
  | "small"
  | "lead";

type ElementType = Extract<
  keyof JSX.IntrinsicElements,
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "blockquote"
  | "small"
  | "div"
  | "span"
>;

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "as"> {
  variant?: VariantType;
  as?: ElementType;
  className?: string;
  children: React.ReactNode;
}

const variantClassMap: Record<VariantType, string> = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  h5: "scroll-m-20 text-lg font-semibold tracking-tight",
  h6: "scroll-m-20 text-base font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  blockquote: "mt-6 border-l-2 border-slate-300 pl-6 italic",
  small: "text-sm font-medium leading-none",
  lead: "text-xl text-muted-foreground",
};

const variantElementMap: Record<VariantType, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  blockquote: "blockquote",
  small: "small",
  lead: "p",
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant = "p", as, className, children, ...props }, ref) => {
    const Component = as || variantElementMap[variant];

    return React.createElement(
      Component,
      {
        ref,
        className: cn(variantClassMap[variant], className),
        ...props,
      },
      children,
    );
  },
);

Typography.displayName = "Typography";
