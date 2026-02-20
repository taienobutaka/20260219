"use client";

import type { HTMLAttributes } from "react";
import { AlignLeftClassName, HighlightCopy } from "@/components/molecules/HighlightCopy";
import { cn } from "@/components/utils/cn";
import { SectionLayout } from "@/components/organisms/SectionLayout";
import { MultiText } from "@/components/atoms/MultiText";
import { useBreakpoints } from "@/hooks/useBreakpoints";

export type ThemaSectionProps = {
  title?: string;
  highlightLines?: string[];
  highlightSizeClassName?: string;
  paragraphs?: string[];
} & HTMLAttributes<HTMLElement>;

const DEFAULT_HIGHLIGHT_LINES = ["　世代、人種、性別、環境 ", "　隔てる壁を取り払う。 "];
const DEFAULT_PARAGRAPHS = [
  "次の世代が働きやすく、自由に生きる時代。\n時代が変わり私たちの世代は、ちょうど中間に位置する。",
  "そんな世代は、昔から引き継がれた「悪いこと」は排除する。\n「良いこと」は継承する。\n正しい搾取を行い、次の世代が働きやすく、自由に生きる時代を作ります。",
];

export function ThemaSection({
  title = "THEMA",
  highlightLines = DEFAULT_HIGHLIGHT_LINES,
  highlightSizeClassName = "text-white bg-black",
  paragraphs = DEFAULT_PARAGRAPHS,
  className,
  ...rest
}: ThemaSectionProps) {
  const { isMd } = useBreakpoints();
  return (
    <SectionLayout
      id="thema"
      title={title}
      className={cn("py-16", className)}
      contentClassName="mt-10 space-y-10"
      {...rest}
    >
      <div className="mb-6 md:mb-0 relative left-1/2 right-1/2 -ml-[50svw] -mr-[50svw] w-full-vw">
        <div className="flex justify-start md:justify-end">
          <HighlightCopy
            lines={highlightLines}
            textSizeClassName={"text-white kerning-auto md:justify-end"}
            className={cn("inline-flex kerning-auto md:text-right md:-mt-16", AlignLeftClassName)}
            reverse={isMd}
          />
        </div>
      </div>
      <div className="max-w-3xl space-y-4">
        {paragraphs.map((paragraph, index) => (
          <MultiText
            key={`${paragraph}-${index}`}
            className="text-sm mb-4 md:text-md lg:text-lg"
            text={paragraph}
          />
        ))}
      </div>
    </SectionLayout>
  );
}
