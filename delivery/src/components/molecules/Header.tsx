"use client";

import Link from "next/link";
import { useState, type HTMLAttributes } from "react";
import { cn } from "@/components/utils/cn";
import NavButton from "@/components/atoms/NavButton";
import Logo from "../icons/logo";

export type HeaderNavItem = {
  label: string;
  href: string;
};

export type HeaderProps = {
  logo: string;
  navItems?: HeaderNavItem[];
  scrolledClassName?: string;
  isScrolled?: boolean;
} & HTMLAttributes<HTMLElement>;

export function Header({
  logo,
  navItems = [],
  className,
  scrolledClassName,
  isScrolled = true,
  ...rest
}: HeaderProps) {
  const [isNavOpen, setOpenNav] = useState(false);
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex w-full-vw items-center justify-between px-10 py-4 text-white transition-colors duration-300",
        className,
        !isScrolled && scrolledClassName,
      )}
      {...rest}
    >
      <span className="text-sm font-semibold tracking-[0.55em] h-4 sm:h-5 md:h-6">
        <Logo />
      </span>
      <nav className="hidden md:flex items-end gap-3 text-xs font-semibold tracking-[0.35em] md:text-md lg:text-lg lg:flex-row lg:items-center lg:gap-6">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="transition-opacity hover:opacity-80">
            {item.label}
          </Link>
        ))}
      </nav>
      <NavButton open={isNavOpen} setOpen={setOpenNav} className="md:hidden z-2" />
      <div
        className={cn(
          "-my-8 absolute top-0 right-0 bg-black/50 shadow-md h-dvh w-full-vw z-1 md:hidden",
          isNavOpen ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col items-end px-8 pt-24 gap-2 opacity-100">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-opacity hover:opacity-80">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
