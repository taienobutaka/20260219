"use client";

import { useEffect, useRef, useState } from "react";
import type { AboutSectionProps } from "@/components/organisms/AboutSection";
import { AboutSection } from "@/components/organisms/AboutSection";
import { CompanySection } from "@/components/organisms/CompanySection";
import type { CompanySectionProps } from "@/components/organisms/CompanySection";
import { Footer } from "@/components/organisms/Footer";
import type { FooterProps } from "@/components/organisms/Footer";
import type { HeroSectionProps } from "@/components/organisms/HeroSection";
import { HeroSection } from "@/components/organisms/HeroSection";
import type { NewsSectionProps } from "@/components/organisms/NewsSection";
import { NewsSection } from "@/components/organisms/NewsSection";
import type { ServicesSectionProps } from "@/components/organisms/ServicesSection";
import { ServicesSection } from "@/components/organisms/ServicesSection";
import type { ThemaSectionProps } from "@/components/organisms/ThemaSection";
import { ThemaSection } from "@/components/organisms/ThemaSection";
import { Header } from "@/components/molecules/Header";
import { cn } from "@/components/utils/cn";
import BackgroundVideo from "../atoms/BackgroundVideo";

type LandingPageTemplateProps = {
  hero?: HeroSectionProps;
  about?: AboutSectionProps;
  thema?: ThemaSectionProps;
  services?: ServicesSectionProps;
  news?: NewsSectionProps;
  company: CompanySectionProps;
  footer?: FooterProps;
};

/**
 * ランディングページのレイアウト。
 * 固定ナビはヒーロー外で描画し、スクロール時も消えないようにする（スマホ含む）。
 */
export function LandingPageTemplate({
  hero,
  about,
  thema,
  services,
  news,
  company,
  footer,
}: LandingPageTemplateProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const target = heroRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "-50px 0px 0px 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      {/* 固定ナビはヒーロー外に置き、スクロールで消えないようにする */}
      <Header
        logo={hero?.logo ?? "IN BRAND"}
        navItems={hero?.navItems}
        isScrolled={isHeroVisible}
        scrolledClassName="bg-black/20 backdrop-blur-md"
        className={cn(isHeroVisible && "mix-blend-difference")}
      />
      <HeroSection ref={heroRef} {...hero} />
      <main className="flex-1 pt-10 md:pt-20 bg-[#fbfbfb] relative">
        <BackgroundVideo />
        <AboutSection {...about} />
        <ThemaSection {...thema} />
        <ServicesSection {...services} />
        <CompanySection {...company} />
        {news ? <NewsSection {...news} /> : null}
      </main>
      {footer ? <Footer {...footer} /> : null}
    </div>
  );
}
