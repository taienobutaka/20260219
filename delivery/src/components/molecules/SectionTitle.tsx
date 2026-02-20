import type { HTMLAttributes } from "react";
import { Heading } from "@/components/atoms/Heading";
import { VerticalLine } from "@/components/atoms/VerticalLine";
import { cn } from "@/components/utils/cn";

type SectionTitleProps = {
  label: string;
  headingSizeClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

export function SectionTitle({
  label,
  headingSizeClassName = "text-2xl md:text-4xl lg:text-5xl",
  className,
  ...rest
}: SectionTitleProps) {
  return (
    <div className={cn("flex items-center", className)} {...rest}>
      <VerticalLine />
      <Heading
        as="h3"
        sizeClassName={cn("ml-3 uppercase", headingSizeClassName)}
        className="font-bold tracking-[0.4em] text-gray-900 kerning-auto"
      >
        {label}
      </Heading>
    </div>
  );
}
