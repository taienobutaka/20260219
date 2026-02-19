"use client";

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

export function LandingPageTemplate({
  hero,
  about,
  thema,
  services,
  news,
  company,
  footer,
}: LandingPageTemplateProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <HeroSection {...hero} />
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
