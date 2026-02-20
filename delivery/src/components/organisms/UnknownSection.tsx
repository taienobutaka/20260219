"use client";

import { useEffect, useRef, useState, type HTMLAttributes } from "react";
import { Header, type HeaderNavItem } from "@/components/molecules/Header";
import { cn } from "@/components/utils/cn";
import { MultiText } from "../atoms/MultiText";

export type UnknownSectionProps = {
  logo?: string;
  navItems?: HeaderNavItem[];
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

const sentences: string[] = [
  "This page is currently being adjusted.\nI'm sorry, but please wait a little longer.",
  "現在こちらのページは調整中となっております。\n申し訳ございませんが、今しばらくお待ちください",
];

const DEFAULT_CATCH_LINES = ["事業に価値を、", "事業に持続を。"];

export function UnknownSection({
  logo = "IN BRAND",
  navItems = DEFAULT_NAV_ITEMS,
  catchLines = DEFAULT_CATCH_LINES,
  overlayClassName,
  className,
  ...rest
}: UnknownSectionProps) {
  const unknownRef = useRef<HTMLElement | null>(null);
  const [isUnknownVisible, setIsUnknownVisible] = useState(true);

  useEffect(() => {
    const target = unknownRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsUnknownVisible(entry.isIntersecting);
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
      ref={unknownRef}
      className={cn(
        "relative flex h-dvh w-full items-center justify-center overflow-hidden bg-[#b3b3b3]",
        className,
      )}
      {...rest}
    >
      <div className="py-8 h-full w-full flex flex-col justify-between relative">
        <div className={cn("relative z-10 px-10", overlayClassName)}>
          <Header
            logo={logo}
            navItems={navItems}
            isScrolled={isUnknownVisible}
            scrolledClassName="bg-black/20 backdrop-blur-md"
          />
        </div>
        <div className="my-auto mx-auto text-center">
          {sentences.map((sentence, index) => {
            return (
              <MultiText
                key={index}
                text={sentence}
                className="mb-6"
                sizeClassName="text-lg sm:text-2xl md:text-3xl"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
