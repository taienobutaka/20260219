"use client";

import { useEffect, useRef, useState, type HTMLAttributes } from "react";
import { HighlightCopy } from "@/components/molecules/HighlightCopy";
import { Header, type HeaderNavItem } from "@/components/molecules/Header";
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

export function HeroSection({
  logo = "IN BRAND",
  navItems = DEFAULT_NAV_ITEMS,
  catchLines = DEFAULT_CATCH_LINES,
  overlayClassName,
  className,
  ...rest
}: HeroSectionProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const target = heroRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "-50px 0px 0px 0px",
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className={cn(
        "relative flex h-dvh w-full items-center justify-center overflow-hidden bg-[#b3b3b3]",
        className,
      )}
      {...rest}
    >
      <BackgroundVideo type="HeroBase" className="object-top-left" />
      <div className="relative flex h-full w-full flex-col py-8">
        <div className={cn("relative z-10 px-10", overlayClassName)}>
          <Header
            logo={logo}
            navItems={navItems}
            isScrolled={isHeroVisible}
            scrolledClassName="bg-black/20 backdrop-blur-md"
            className={cn(isHeroVisible && "mix-blend-difference")}
          />
        </div>
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
}
