import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/components/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variantClassName?: string;
};

const BASE_BUTTON_CLASS =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] transition-colors";

export function Button({
  className,
  variantClassName = "bg-black text-white hover:bg-black/80",
  ...rest
}: ButtonProps) {
  return <button className={cn(BASE_BUTTON_CLASS, variantClassName, className)} {...rest} />;
}
