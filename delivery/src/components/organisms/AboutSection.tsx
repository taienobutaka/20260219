"use client";

import type { HTMLAttributes } from "react";
import { AlignLeftClassName, HighlightCopy } from "@/components/molecules/HighlightCopy";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/components/utils/cn";
import { SectionLayout } from "@/components/organisms/SectionLayout";
import { useBreakpoints } from "@/hooks/useBreakpoints";

export type AboutSectionProps = {
  title?: string;
  leftParagraphs?: string[];
  rightParagraphs?: string[];
  topHighlightLines?: string[];
  midHighlightLines?: string[];
} & HTMLAttributes<HTMLElement>;

const DEFAULT_LEFT_PARAGRAPHS = [
  "「良い商品も知られなければ意味がない。」ご依頼いただくお客様にとって最も効果的で効率的な方法を論理的に提案し満足・ご理解いただける内容で支援を行う。",
  "消費者にとって、必要であるべきもの市場にとって必要でないものを適切に判断し、それをお客様と一緒に消費者へお届けする。",
  "「値段」での販売ではなく「価値」の販売で事業者、消費者共に市場価値を引き上げていくことが私達のミッションである。",
];

const DEFAULT_RIGHT_PARAGRAPHS = [
  "私たちは障害や国籍、地域など就労にとって壁となるものを適切な方法と提案で課題解決を行う。",
  "社内就労の中でも次世代の働き方や新しい可能性を導くため新たな取り組みを試作し、より良い環境を全世代、全業種へ適応できるよう仕組み化に力を入れています。",
  "事業に価値を出し、売上をあげる。人材課題を解決し持続させる。",
  "私たちは「価値」と「持続」を柱に事業を行います。",
];

const DEFAULT_TOP_HIGHLIGHT = ["　価値を見つける。 ", "　価値を広げる。 "];
const DEFAULT_MID_HIGHLIGHT = ["　雇用の新たな取り組みで ", "　企業課題を解決。 "];

export function AboutSection({
  title = "ABOUT",
  leftParagraphs = DEFAULT_LEFT_PARAGRAPHS,
  rightParagraphs = DEFAULT_RIGHT_PARAGRAPHS,
  topHighlightLines = DEFAULT_TOP_HIGHLIGHT,
  midHighlightLines = DEFAULT_MID_HIGHLIGHT,
  className,
  ...rest
}: AboutSectionProps) {
  const { isMd } = useBreakpoints();
  return (
    <SectionLayout
      id="about"
      title={title}
      className={cn("md:py-16", className)}
      innerClassName="relative"
      // contentClassName="md:mt-12 md:grid md:grid-cols-8 md:grid-rows-3 md:gap-0 md:relative"
      {...rest}
    >
      <div className="mb-6 md:mb-0 relative left-1/2 right-1/2 -ml-[50svw] -mr-[50svw] w-full-vw">
        <div className="flex justify-start md:justify-end">
          <HighlightCopy
            lines={topHighlightLines}
            className={cn("inline-flex md:text-right md:items-end", AlignLeftClassName)}
            textSizeClassName={"text-white kerning-auto md:justify-end"}
            reverse={isMd}
          />
        </div>
      </div>
      <div className="mb-6 kerning-auto md:w-1/2 md:mb-16 md:row-start-1 md:col-start-1 md:col-span-4">
        {leftParagraphs.map((paragraph, index) => (
          <Text key={`${paragraph}-${index}`} className="text-sm mb-4 md:text-md lg:text-lg">
            {paragraph}
          </Text>
        ))}
      </div>

      <div className="mb-6 md:mb-10 relative left-1/2 right-1/2 -ml-[50svw] -mr-[50svw] w-full-vw">
        <div className="flex justify-start">
          <HighlightCopy
            lines={midHighlightLines}
            className="inline-flex"
            textSizeClassName={"text-white kerning-auto"}
          />
        </div>
      </div>
      <div className="md:grid md:grid-cols-8">
        <div className="md:row-start-3 md:col-start-5 md:col-span-3 kerning-auto">
          {rightParagraphs.map((paragraph, index) => (
            <Text
              key={`${paragraph}-${index}`}
              className={cn(
                "text-sm md:text-md lg:text-lg",
                index >= rightParagraphs.length - 1 ? "" : "mb-4",
              )}
            >
              {paragraph}
            </Text>
          ))}
        </div>
      </div>
      {/* <EllipseCollapseText text="abcde" /> */}
    </SectionLayout>
  );
}
