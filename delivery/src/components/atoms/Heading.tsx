import type { HTMLAttributes, ReactNode, ElementType } from "react";
import { cn } from "@/components/utils/cn";

type HTMLHeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div" | "span";

type HeadingProps<T extends HTMLHeadingTag = "h2"> = {
  as?: T;
  sizeClassName?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export function Heading<T extends HTMLHeadingTag = "h2">({
  as,
  sizeClassName = "text-2xl",
  className,
  children,
  ...rest
}: HeadingProps<T>) {
  const Component = (as || "h2") as ElementType;
  return (
    <Component className={cn("font-semibold text-gray-900", sizeClassName, className)} {...rest}>
      {children}
    </Component>
  );
}
