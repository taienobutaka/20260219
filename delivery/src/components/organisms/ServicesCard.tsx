"use client";

import type { HTMLAttributes } from "react";
import { ServicesCardButtons } from "@/components/organisms/ServicesCardButtons";
import { cn } from "@/components/utils/cn";
import { BaseTextClassName, HighlightCopy } from "@/components/molecules/HighlightCopy";
import { BaseImage } from "../atoms/BaseImage";

export type ServicesCardProps = {
  titleLines?: string[];
  imageUrl?: string;
  buttons?: Array<{
    label: string;
    href: string;
  }>;
} & HTMLAttributes<HTMLElement>;

const DEFAULT_TITLE_LINES = ["SNS運用・企画支援", "最新トレンド戦略"];

export function ServicesCard({
  titleLines = DEFAULT_TITLE_LINES,
  imageUrl,
  buttons = [],
  className,
  ...rest
}: ServicesCardProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden tmp-background relative left-1/2 right-1/2 -ml-[50svw] -mr-[50svw] w-full-vw",
        className,
      )}
      {...rest}
    >
      <div className="relative flex w-full aspect-5/6 md:aspect-3/2 lg:aspect-5/2 items-center">
        {imageUrl ? (
          <BaseImage
            src={imageUrl}
            alt={titleLines[0]}
            fill
            sizes="(min-width: 1024px) 480px, 100vw"
            containerClassName="w-full h-full"
          />
        ) : null}
        <HighlightCopy
          lines={titleLines}
          className="absolute left-0 top-8 md:top-16 text-left"
          charClassName={cn("bg-white text-black kerning-auto", BaseTextClassName)}
          white={true}
        />

        {buttons.length > 0 ? <ServicesCardButtons buttons={buttons} /> : null}
      </div>
    </section>
  );
}
