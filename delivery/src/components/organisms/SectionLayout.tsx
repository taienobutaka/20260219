"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { SectionTitle } from "@/components/molecules/SectionTitle";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/components/utils/cn";

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
  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      className={cn(
        className,
        "relative w-full max-w-full scroll-reveal",
        isVisible && "is-visible",
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
