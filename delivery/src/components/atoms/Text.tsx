import type { HTMLAttributes, ElementType, ReactNode } from "react";
import { cn } from "@/components/utils/cn";

const DEFAULT_TEXT_CLASS = "text-base leading-relaxed text-gray-700";

// 許可するHTMLタグを制限（安全）
type HTMLTextTag = "p" | "span" | "div" | "li" | "strong" | "em";

type TextProps<T extends HTMLTextTag = "p"> = {
  as?: T;
  sizeClassName?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export function Text<T extends HTMLTextTag = "p">({
  as,
  sizeClassName = "",
  className,
  children,
  ...rest
}: TextProps<T>) {
  const Component = (as || "p") as ElementType;

  return (
    <Component className={cn(DEFAULT_TEXT_CLASS, sizeClassName, className)} {...rest}>
      {children}
    </Component>
  );
}
