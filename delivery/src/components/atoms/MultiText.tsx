import type { HTMLAttributes, ElementType } from "react";
import { cn } from "@/components/utils/cn";

const DEFAULT_TEXT_CLASS = "text-base leading-relaxed text-gray-700";

// HTMLタグのみを許可（<p> <span> <div>など）
type HTMLTextTag = "p" | "span" | "div" | "li" | "strong" | "em";

type TextProps<T extends HTMLTextTag = "p"> = {
  as?: T;
  sizeClassName?: string;
  className?: string;
  text: string;
} & HTMLAttributes<HTMLElement>;

export function MultiText<T extends HTMLTextTag = "p">({
  as,
  sizeClassName = "",
  className,
  text,
  ...rest
}: TextProps<T>) {
  const Component = (as || "p") as ElementType;

  return (
    <Component className={cn(DEFAULT_TEXT_CLASS, className)} {...rest}>
      {text.split("\n").map((line, i) => (
        <span key={i} className={sizeClassName}>
          {line}
          {i !== text.split("\n").length - 1 && <br />}
        </span>
      ))}
    </Component>
  );
}
