"use client";
import { LandingPageTemplate } from "@/components/templates/LandingPageTemplate";

export function LandingPage() {
  return (
    <LandingPageTemplate
      hero={{ className: "z-100" }}
      about={{}}
      thema={{}}
      services={{}}
      company={{
        companyInfo: [
          { label: "会社名", value: "株式会社 IN BRAND" },
          { label: "設立日", value: "2025 年 3 月 10 日" },
          { label: "資本金", value: "5,000,000 円" },
          { label: "代表取締役", value: "山田 太郎" },
          {
            label: "所在地",
            value: "〒150-0041\n東京都渋谷区神南 1-11-4 FPG リンクス 神南 5F",
          },
        ],
        mapUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d340.730158740525!2d139.70069673682!3d35.6624759905885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d0033869157%3A0x625da5789760bb02!2z44Os44K-44OK44Oz44K5IOOCs-ODr-ODvOOCreODs-OCsOa4i-iwt-W6lw!5e0!3m2!1sen!2sjp!4v1759300194570!5m2!1sen!2sjp",
      }}
      news={{
        newsItems: [
          {
            date: "Mar 10, 2025",
            title: "設立のお知らせ",
            excerpt:
              "2025 年 3 月 10 日より株式会社 IN BRAND を設立し、代表取締役として上田 純平が就任いたしました。",
            imageUrl: "/images/bg_image_ground.jpg",
          },
          {
            date: "Mar 10, 2025",
            title: "設立のお知らせ",
            excerpt:
              "2025 年 3 月 10 日より株式会社 IN BRAND を設立し、代表取締役として上田 純平が就任いたしました。",
            imageUrl: "/images/bg_image_sky.jpg",
          },
        ],
        allLink: "/news",
      }}
      footer={{
        onContactClick: () => {
          alert("Contact us!");
        },
        className: "z-100",
      }}
    />
  );
}
