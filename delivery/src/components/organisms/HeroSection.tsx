"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { HighlightCopy } from "@/components/molecules/HighlightCopy";
import { type HeaderNavItem } from "@/components/molecules/Header";
import { cn } from "@/components/utils/cn";
import BackgroundVideo from "../atoms/BackgroundVideo";

export type HeroSectionProps = {
  logo?: string;
  navItems?: HeaderNavItem[];
  videoSrc?: string;
  videoType?: string;
  catchLines?: string[];
  overlayClassName?: string;
} & HTMLAttributes<HTMLElement>;

const DEFAULT_NAV_ITEMS: HeaderNavItem[] = [
  { label: "ABOUT", href: "/#about" },
  { label: "THEMA", href: "/#thema" },
  { label: "SERVICES", href: "/#services" },
  { label: "COMPANY", href: "/#company" },
  { label: "NEWS", href: "/#news" },
];

const DEFAULT_CATCH_LINES = ["　事業に価値を、　", "　事業に持続を。　"];

/** ヒーローセクション（ファーストビュー）。ref はテンプレートでスクロール判定に使用。 */
export const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
  function HeroSection(
    {
      logo = "IN BRAND",
      navItems = DEFAULT_NAV_ITEMS,
      catchLines = DEFAULT_CATCH_LINES,
      overlayClassName,
      className,
      ...rest
    },
    ref,
  ) {
    return (
      <section
        ref={ref}
        className={cn(
          "relative flex h-dvh w-full items-center justify-center overflow-hidden bg-[#b3b3b3]",
          className,
        )}
        {...rest}
      >
        <BackgroundVideo type="HeroBase" className="object-top-left" />
        <div className="relative flex h-full w-full flex-col py-8">
          <div className="mt-auto flex justify-start absolute bottom-0 left-0 pb-24 md:pb-12">
            <HighlightCopy
              lines={catchLines}
              className="gap-2"
              charClassName={
                "bg-white text-black text-4xl py-2 font-bold md:text-6xl kerning-auto lg:text-7xl"
              }
              white={true}
            />
          </div>
        </div>
      </section>
    );
  },
);
