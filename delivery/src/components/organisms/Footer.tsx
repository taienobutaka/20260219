"use client";

import Link from "next/link";
import type { HTMLAttributes } from "react";
import { LinkButton } from "@/components/atoms/LinkButton";
import { cn } from "@/components/utils/cn";
import BackgroundVideo from "../atoms/BackgroundVideo";
import Logo from "../icons/logo";

type FooterNavItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export type FooterProps = {
  onContactClick: () => void;
  navItems?: FooterNavItem[];
  copyrightText?: string;
} & HTMLAttributes<HTMLElement>;

const DEFAULT_NAV_ITEMS: FooterNavItem[] = [
  { label: "ABOUT", href: "/#about" },
  { label: "THEMA", href: "/#thema" },
  { label: "SERVICES", href: "/#services" },
  { label: "COMPANY", href: "/#company" },
  { label: "NEWS", href: "/#news" },
];

const DEFAULT_COPYRIGHT = "© 2025 IN BRAND All Rights Reserved.";

export function Footer({
  onContactClick,
  navItems = DEFAULT_NAV_ITEMS,
  copyrightText = DEFAULT_COPYRIGHT,
  className,
  ...rest
}: FooterProps) {
  return (
    <footer className={cn("tmp-background text-gray-base relative", className)} {...rest}>
      {/* key で役割を固定し、他ページからの戻り時に video DOM が再利用されないようにする */}
      <BackgroundVideo key="footer-background-video" type="HeroBase" className="object-top-left" />
      <div className="mx-auto max-w-[80dvw] px-8 py-12 relative">
        <div className="flex items-start justify-between gap-20">
          <div className="flex-1">
            <div className="text-lg font-semibold uppercase tracking-[0.4em] text-gray-base h-6">
              <Logo className="text-black" />
            </div>
            <div className="mt-4 w-fit min-w-100svw md:min-w-0">
              <nav className="flex flex-col md:flex-row gap-2 text-xs uppercase tracking-[0.3em] text-gray-base md:gap-6">
                {navItems.map((item) => {
                  const key = item.label;
                  if (item.onClick) {
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={item.onClick}
                        className="transition-colors duration-200 hover:text-gray-900 hover:underline"
                      >
                        {item.label}
                      </button>
                    );
                  }
                  if (item.href) {
                    return (
                      <Link
                        key={key}
                        href={item.href}
                        className="transition-colors duration-200 hover:text-gray-900 hover:underline"
                      >
                        {item.label}
                      </Link>
                    );
                  }
                  return (
                    <span key={key} className="text-gray-400">
                      {item.label}
                    </span>
                  );
                })}
              </nav>
              <div className="mt-24 w-[80dvw] m-w-[50svw] md:w-full">
                <LinkButton
                  text="CONTACT"
                  onClick={onContactClick}
                  baselineColorClassName="bg-gray-300"
                  highlightColorClassName="bg-gray-900"
                  backgroundClassName="bg-transparent w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-xs flex text-gray-600 items-start justify-center">
          {copyrightText}
        </div>
      </div>
    </footer>
  );
}
