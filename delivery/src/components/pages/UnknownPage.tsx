"use client";
import { UnknownPageTemplate } from "@/components/templates/UnknownPageTemplate";

export function UnknownPage() {
  return (
    <UnknownPageTemplate
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
      }}
    />
  );
}
