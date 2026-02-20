"use client";

import { useEffect, useRef, useState, type HTMLAttributes } from "react";
import { createPortal } from "react-dom";
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // 固定ナビを body 直下に portal し、スマホでスクロール時に消えないようにする
  const headerNode = (
    <Header
      logo={logo}
      navItems={navItems}
      isScrolled={isHeroVisible}
      scrolledClassName="bg-black/20 backdrop-blur-md"
      className={cn(isHeroVisible && "mix-blend-difference")}
    />
  );

  return (
    <>
      {/* ポータルで body 直下に描画し、祖先の overflow/transform の影響を受けずスクロール時も消えないようにする */}
      {isMounted && typeof document !== "undefined" && createPortal(headerNode, document.body)}
      <section
        ref={heroRef}
        className={cn(
          "relative flex h-dvh w-full items-center justify-center overflow-hidden bg-[#b3b3b3]",
          className,
        )}
        {...rest}
      >
        {/* key で役割を固定し、他ページからの戻り時に video DOM が再利用されないようにする */}
        <BackgroundVideo key="hero-background-video" type="HeroBase" className="object-top-left" />
        <div className="relative flex h-full w-full flex-col py-8">
          {/* ヘッダーは上記のポータルで描画するため、ここではスペースのみ（ナビは固定のため被らない） */}
          <div className={cn("relative z-10 px-10", overlayClassName)} aria-hidden="true" style={{ minHeight: "3.5rem" }} />
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
    </>
  );
}
