"use client";

import type { HTMLAttributes } from "react";
import { SectionLayout } from "@/components/organisms/SectionLayout";
import { cn } from "@/components/utils/cn";
import { NewsSectionContent } from "@/components/organisms/NewsSectionContent";

type NewsItem = {
  date: string;
  title: string;
  excerpt: string;
  imageUrl: string;
};

export type NewsSectionProps = {
  newsItems: NewsItem[];
  allLink: string;
} & HTMLAttributes<HTMLElement>;

export function NewsSection({ newsItems, allLink, className, ...rest }: NewsSectionProps) {
  const items = newsItems.slice(0, 2);

  return (
    <SectionLayout
      title="NEWS"
      id="news"
      className={cn("py-16", className)}
      contentClassName="mt-8 space-y-12"
      {...rest}
    >
      <NewsSectionContent items={items} allLink={allLink} />
    </SectionLayout>
  );
}
