"use client";

import type { HTMLAttributes } from "react";
import { ServicesCard, ServicesCardProps } from "@/components/organisms/ServicesCard";
import { cn } from "@/components/utils/cn";
import { SectionLayout } from "@/components/organisms/SectionLayout";

export type ServicesSectionProps = {
  title?: string;
  description?: string;
  cards?: Array<ServicesCardProps>;
} & HTMLAttributes<HTMLElement>;

export function ServicesSection({
  title = "SERVICES",
  cards = [
    {
      titleLines: [" SNS運用・広告事業 ", " 企画~撮影、制作、運営 "],
      buttons: [{ label: "View More", href: "/services" }],
      imageUrl: "/images/bg_image_sky.jpg",
    },
    {
      titleLines: [" 外国人採用に特化 ", " 採用コンサルディング事業 "],
      buttons: [{ label: "Contact", href: "/services" }],
      imageUrl: "/images/bg_image_ground.jpg",
    },
    {
      titleLines: [" メディア運営事業 ", " 「ゼロイチメディア」 "],
      buttons: [
        { label: "Instagram", href: "/services" },
        { label: "TikTok", href: "/services" },
      ],
      imageUrl: "/images/bg_image_sky.jpg",
    },
    {
      titleLines: [" アパレル事業 ", " 「VALT」 "],
      buttons: [{ label: "View More", href: "/services" }],
      imageUrl: "/images/bg_image_ground.jpg",
    },
  ],
  className,
  ...rest
}: ServicesSectionProps) {
  return (
    <SectionLayout
      id="services"
      title={title}
      className={cn("md:py-24", className)}
      contentClassName="mt-8 space-y-12"
      {...rest}
    >
      <div className="space-y-4 md:space-y-10">
        {cards.map((card, index) => (
          <ServicesCard key={index} className="-mx-8" {...card} />
        ))}
      </div>
    </SectionLayout>
  );
}
