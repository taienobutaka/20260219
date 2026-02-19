"use client";

import { CSSProperties, PropsWithChildren } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import RectMaskSvg from "@/assets/rect.svg";
import { cn } from "@/components/utils/cn";

type Dimension = number | string | undefined;

export type RectangleMaskProps = PropsWithChildren<{
  className?: string;
  style?: CSSProperties;
  containerWidth?: Dimension;
  containerHeight?: Dimension;
  maskPosition?: CSSProperties["maskPosition"];
  holeWidth?: Dimension;
  holeHeight?: Dimension;
  offsetX?: number;
  offsetY?: number;
}>;

const MASK_IMAGE_URL = `data:image/svg+xml;utf8,${encodeURIComponent(renderToStaticMarkup(<RectMaskSvg />))}`;

const keywordToPercent = (value: string | undefined, fallback: string): string => {
  if (!value) {
    return fallback;
  }

  const normalized = value.toLowerCase();

  switch (normalized) {
    case "left":
    case "top":
      return "0%";
    case "center":
      return "50%";
    case "right":
    case "bottom":
      return "100%";
    default:
      return value;
  }
};

const extractMaskPosition = (value?: string): [string, string] => {
  if (!value) {
    return ["50%", "50%"];
  }

  const parts = value.trim().split(/\s+/).filter(Boolean);

  let horizontal: string | undefined;
  let vertical: string | undefined;

  for (const part of parts) {
    const lower = part.toLowerCase();

    if (!horizontal && (lower === "left" || lower === "center" || lower === "right")) {
      horizontal = part;
      continue;
    }

    if (!vertical && (lower === "top" || lower === "center" || lower === "bottom")) {
      vertical = part;
      continue;
    }

    if (!horizontal) {
      horizontal = part;
      continue;
    }

    if (!vertical) {
      vertical = part;
    }
  }

  if (!horizontal) {
    horizontal = parts[0];
  }

  if (!vertical) {
    vertical = parts[1] ?? parts[0];
  }

  const resolvedHorizontal = keywordToPercent(horizontal, "50%");
  const resolvedVertical = keywordToPercent(vertical, "50%");

  return [resolvedHorizontal, resolvedVertical];
};

const toCssDimension = (value: Dimension): string | undefined => {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === "number" ? `${value}px` : value;
};

const resolveMaskPosition = (
  maskPosition?: CSSProperties["maskPosition"],
  offsetX?: number,
  offsetY?: number,
): CSSProperties["maskPosition"] => {
  const position = typeof maskPosition === "string" ? maskPosition : undefined;
  const [baseX, baseY] = extractMaskPosition(position);

  const x = offsetX !== undefined ? `calc(${baseX} + ${offsetX}px)` : baseX;
  const y = offsetY !== undefined ? `calc(${baseY} + ${offsetY}px)` : baseY;

  return `${x} ${y}`.trim();
};

const buildMaskSize = (width?: Dimension, height?: Dimension): string => {
  const widthValue = toCssDimension(width);
  const heightValue = toCssDimension(height);

  const resolvedWidth = widthValue ?? "100%";
  const resolvedHeight = heightValue ?? "100%";

  return `${resolvedWidth} ${resolvedHeight}`;
};

export function RectangleMask({
  className,
  style,
  containerWidth,
  containerHeight,
  maskPosition,
  holeWidth,
  holeHeight,
  offsetX,
  offsetY,
  children,
}: RectangleMaskProps) {
  const maskImageValue = `url("${MASK_IMAGE_URL}")`;
  const resolvedMaskPosition = resolveMaskPosition(maskPosition, offsetX, offsetY);
  const maskSizeValue = buildMaskSize(holeWidth, holeHeight);

  const combinedStyle: CSSProperties = {
    ...style,
  };

  if (maskImageValue) {
    combinedStyle.WebkitMaskImage = maskImageValue;
    combinedStyle.maskImage = maskImageValue;
    combinedStyle.WebkitMaskRepeat = "no-repeat";
    combinedStyle.maskRepeat = "no-repeat";
  }

  combinedStyle.WebkitMaskSize = maskSizeValue;
  combinedStyle.maskSize = maskSizeValue;

  if (resolvedMaskPosition) {
    combinedStyle.WebkitMaskPosition = resolvedMaskPosition;
    combinedStyle.maskPosition = resolvedMaskPosition;
  }

  const widthValue = toCssDimension(containerWidth);
  const heightValue = toCssDimension(containerHeight);

  if (widthValue) {
    combinedStyle.width = widthValue;
  }

  if (heightValue) {
    combinedStyle.height = heightValue;
  }

  return (
    <div className={cn("block", className)} style={combinedStyle}>
      {children}
    </div>
  );
}
