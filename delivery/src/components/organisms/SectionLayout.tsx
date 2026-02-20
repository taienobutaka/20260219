"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { SectionTitle } from "@/components/molecules/SectionTitle";
import { cn } from "@/components/utils/cn";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type SectionLayoutProps = {
  title: string;
  headingSizeClassName?: string;
  titleClassName?: string;
  titleWrapperClassName?: string;
  innerClassName?: string;
  contentClassName?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export function SectionLayout({
  title,
  headingSizeClassName,
  titleClassName,
  titleWrapperClassName = "mb-8",
  innerClassName,
  contentClassName,
  className,
  children,
  ...rest
}: SectionLayoutProps) {
  const { ref, isInView } = useScrollReveal({ threshold: 0.08, rootMargin: "0px 0px -50px 0px", once: true });

  return (
    <section
      ref={ref}
      className={cn(
        className,
        "relative w-full max-w-full scroll-reveal",
        isInView && "scroll-reveal-in"
      )}
      {...rest}
    >
      <div className={cn("mx-auto w-full md:px-8", "max-w-[80dvw]", innerClassName)}>
        <div className={cn(titleWrapperClassName)}>
          <SectionTitle
            label={title}
            headingSizeClassName={headingSizeClassName}
            className={titleClassName}
          />
        </div>
        <div className={cn("mt-8", contentClassName)}>{children}</div>
      </div>
    </section>
  );
}
