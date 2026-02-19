"use client";

import { Footer } from "@/components/organisms/Footer";
import type { FooterProps } from "@/components/organisms/Footer";
import type { UnknownSectionProps } from "@/components/organisms/UnknownSection";
import { UnknownSection } from "@/components/organisms/UnknownSection";
import type { NewsSectionProps } from "@/components/organisms/NewsSection";
import { NewsSection } from "@/components/organisms/NewsSection";

type UnknownPageTemplateProps = {
  unknown?: UnknownSectionProps;
  news?: NewsSectionProps;
  footer?: FooterProps;
};

export function UnknownPageTemplate({ unknown, news, footer }: UnknownPageTemplateProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <UnknownSection {...unknown} />
      <main className="flex-1 pt-10 md:pt-20 bg-[#fbfbfb]">
        {news ? <NewsSection {...news} /> : null}
      </main>
      {footer ? <Footer {...footer} /> : null}
    </div>
  );
}
