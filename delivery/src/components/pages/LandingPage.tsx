"use client";

import { LandingPageTemplate } from "@/components/templates/LandingPageTemplate";
import {
  HERO_LOGO,
  HERO_CATCH_LINES,
  NAV_ITEMS,
  ABOUT_TITLE,
  ABOUT_TOP_HIGHLIGHT,
  ABOUT_MID_HIGHLIGHT,
  ABOUT_LEFT_PARAGRAPHS,
  ABOUT_RIGHT_PARAGRAPHS,
  THEMA_TITLE,
  THEMA_HIGHLIGHT_LINES,
  THEMA_PARAGRAPHS,
  SERVICES_TITLE,
  SERVICES_CARDS,
  COMPANY_INFO,
  COMPANY_MAP_URL,
  NEWS_ITEMS,
  NEWS_ALL_LINK,
  FOOTER_COPYRIGHT,
} from "@/data/mainPageContent";

/**
 * メインページ。
 * 文言・写真は src/data/mainPageContent.ts で変更してください。
 */
export function LandingPage() {
  return (
    <LandingPageTemplate
      hero={{
        className: "z-100",
        logo: HERO_LOGO,
        navItems: NAV_ITEMS,
        catchLines: HERO_CATCH_LINES,
      }}
      about={{
        title: ABOUT_TITLE,
        topHighlightLines: ABOUT_TOP_HIGHLIGHT,
        midHighlightLines: ABOUT_MID_HIGHLIGHT,
        leftParagraphs: ABOUT_LEFT_PARAGRAPHS,
        rightParagraphs: ABOUT_RIGHT_PARAGRAPHS,
      }}
      thema={{
        title: THEMA_TITLE,
        highlightLines: THEMA_HIGHLIGHT_LINES,
        paragraphs: THEMA_PARAGRAPHS,
      }}
      services={{
        title: SERVICES_TITLE,
        cards: SERVICES_CARDS,
      }}
      company={{
        companyInfo: COMPANY_INFO,
        mapUrl: COMPANY_MAP_URL,
      }}
      news={{
        newsItems: NEWS_ITEMS,
        allLink: NEWS_ALL_LINK,
      }}
      footer={{
        onContactClick: () => alert("Contact us!"),
        navItems: NAV_ITEMS,
        copyrightText: FOOTER_COPYRIGHT,
        className: "z-100",
      }}
    />
  );
}
