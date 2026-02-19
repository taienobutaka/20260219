import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/components/utils/cn";

type InfoRowProps = {
  label: string;
  value: string | string[] | ReactNode;
  labelClassName?: string;
  valueClassName?: string;
  noBorder?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function InfoRow({
  label,
  value,
  className,
  labelClassName,
  valueClassName,
  noBorder = false,
  ...rest
}: InfoRowProps) {
  const lines =
    typeof value === "string" ? value.split(/\r?\n/) : Array.isArray(value) ? value : null;

  return (
    <div
      className={cn(
        "grid grid-cols-8 py-2 px-6 md:py-4 md:px-16",
        noBorder ? "" : "border-b border-[#474747]",
        className,
      )}
      {...rest}
    >
      <span className={cn("col-span-3 text-sm text-gray-500 md:w-32", labelClassName)}>
        {label}
      </span>
      <div className={cn("col-span-5 text-sm font-medium text-black", valueClassName)}>
        {lines
          ? lines.map((line, index) => (
              <span key={`${line}-${index}`} className={index > 0 ? "mt-1 block" : "block"}>
                {line}
              </span>
            ))
          : value}
      </div>
    </div>
  );
}
