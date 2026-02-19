"use client";

import { cn } from "@/components/utils/cn";
import { SmartImage } from "./SmartImage";

type BaseImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  fill?: boolean;
  sizes?: string;
};

export function BaseImage({
  containerClassName,
  className,
  fill = false,
  width,
  height,
  alt,
  src,
}: BaseImageProps) {
  const imageClassName = cn(
    "object-cover",
    fill ? "absolute inset-0 h-full w-full" : undefined,
    className,
  );

  return (
    <div className={cn("relative", containerClassName)}>
      <SmartImage
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={imageClassName}
      />
    </div>
  );
}
