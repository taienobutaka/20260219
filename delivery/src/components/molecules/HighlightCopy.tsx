"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/components/utils/cn";
import { useHighlightAnimation } from "@/contexts/HighlightAnimationContext";
import { EllipseCollapseText } from "./EllipseCollapseText";

export type HighlightCopyProps = {
  lines: string[];
  textSizeClassName?: string;
  charClassName?: string;
  white?: boolean;
  reverse?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const BaseTextClassName: string =
  "text-2xl py-2 font-semibold sm:text-4xl sm:py-4 md:text-5xl md:py-4 lg:text-6xl size-fit kerning-auto";

export const AlignLeftClassName: string = "md:items-end";

export function HighlightCopy({
  lines,
  textSizeClassName = undefined,
  charClassName = undefined,
  reverse,
  white,
  className,
  ...rest
}: HighlightCopyProps) {
  const highlightActive = useHighlightAnimation();

  return (
    <div className={cn("flex flex-col", className)} {...rest}>
      {lines.map((line, index) => (
        <EllipseCollapseText
          key={`${line}-${index}`}
          className={textSizeClassName ?? "font-semibold tracking-[0.35em]"}
          charClassName={cn(BaseTextClassName, charClassName)}
          text={line}
          white={white ?? false}
          reverse={reverse ?? false}
          shouldAnimate={highlightActive}
        />
      ))}
    </div>
  );
}
