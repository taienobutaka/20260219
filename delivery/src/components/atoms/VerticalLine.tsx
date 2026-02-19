import type { HTMLAttributes } from "react";
import { cn } from "@/components/utils/cn";

type VerticalLineProps = HTMLAttributes<HTMLSpanElement>;

export function VerticalLine({ className, ...rest }: VerticalLineProps) {
  return <span className={cn("h-8 w-1 bg-black md:h-10 lg:h-12", className)} {...rest} />;
}
