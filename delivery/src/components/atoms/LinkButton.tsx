"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/components/utils/cn";

type LinkButtonProps = {
  text: string;
  onClick: () => void;
  textColorClassName?: string;
  baselineColorClassName?: string;
  highlightColorClassName?: string;
  backgroundClassName?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className" | "onClick">;

const BASE_BUTTON_CLASS =
  "group inline-flex flex-col items-start text-sm font-semibold uppercase tracking-[0.3em] md:text-md lg:text-lg";

export function LinkButton({
  text,
  onClick,
  textColorClassName = "text-gray-900",
  baselineColorClassName = "bg-[#cccccc]",
  highlightColorClassName = "bg-white",
  backgroundClassName = "bg-transparent",
  type = "button",
  ...rest
}: LinkButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(BASE_BUTTON_CLASS, backgroundClassName)}
      {...rest}
    >
      <span className={cn(textColorClassName)}>{text}</span>
      <span className={cn("relative mt-1 block h-px w-full md:mt-2", baselineColorClassName)}>
        <span
          className={cn(
            "absolute right-0 top-1/2 block h-[2px] w-full -translate-y-1/2 origin-right scale-x-[0.2] transition-transform duration-300 ease-out group-hover:scale-x-100",
            highlightColorClassName,
          )}
        />
      </span>
    </button>
  );
}
