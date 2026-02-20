"use client";

import { useRouter } from "next/navigation";
import { BaseImage } from "@/components/atoms/BaseImage";
import { LinkButton } from "@/components/atoms/LinkButton";
import { cn } from "@/components/utils/cn";
import { RectangleMask } from "../atoms/RectangleMask";

type NewsItem = {
  date: string;
  title: string;
  excerpt: string;
  imageUrl: string;
};

type NewsSectionContentProps = {
  items: NewsItem[];
  allLink: string;
};

export function NewsSectionContent({ items, allLink }: NewsSectionContentProps) {
  const router = useRouter();

  const handleAllClick = () => {
    if (allLink.startsWith("http")) {
      window.location.href = allLink;
      return;
    }
    router.push(allLink);
  };

  return (
    <>
      <div className="grid grid-cols-8 gap-8 grid-rows-7 md:grid-rows-4">
        {items.map((item, index) => (
          <article
            key={`${item.title}-${index}`}
            className={cn(
              "flex flex-col col-span-8 row-span-3 md:col-span-4 md:row-start-1 lg:col-span-3",
              `row-start-${3 * index + 1} md:col-start-${1 + 4 * index} lg:col-start-${3 * index + 2}`,
            )}
          >
            <div className="group relative aspect-video overflow-hidden z-1">
              <RectangleMask className="w-full h-full" maskPosition="bottom left">
                <div className="w-full h-full tmp-background">
                  {item.imageUrl ? (
                    <BaseImage
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 480px, 100vw"
                      containerClassName="w-full h-full"
                    />
                  ) : null}
                </div>
              </RectangleMask>
            </div>
            <div className="flex flex-col w-5/6 bg-transparent -mt-12 z-2 py-2">
              <span className="mt-2 text-xs text-gray-500">{item.date}</span>
              <span className="mt-1 text-xl font-bold text-gray-900 transition-colors duration-300 hover:text-gray-600 kering-auto">
                {item.title}
              </span>
            </div>
            <p className="mt-1 whitespace-pre-line text-sm text-gray-700">{item.excerpt}</p>
          </article>
        ))}
        <LinkButton
          text="All View"
          onClick={handleAllClick}
          baselineColorClassName="bg-gray-300"
          highlightColorClassName="bg-gray-900"
          backgroundClassName="bg-transparent col-start-1 row-start-7 col-span-8 md:col-start-1 md:col-span-4 md:row-start-4 lg:col-start-2 lg:col-span-3"
        />
      </div>
    </>
  );
}
