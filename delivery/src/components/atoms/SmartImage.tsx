import React from "react";

export interface SmartImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

// 受け取ったパスから拡張子を取り除き、派生フォーマット用のベースパスを作る
function getBasePath(originalSrc: string) {
  const lastSlashIndex = originalSrc.lastIndexOf("/");
  const lastDotIndex = originalSrc.lastIndexOf(".");

  if (lastDotIndex === -1 || lastDotIndex < lastSlashIndex) {
    return originalSrc;
  }

  return originalSrc.slice(0, lastDotIndex);
}

export function SmartImage({ src, alt, width, height, className }: SmartImageProps) {
  const basePath = getBasePath(src);
  const avifSrc = `${basePath}.avif`;
  const webpSrc = `${basePath}.webp`;

  return (
    <picture>
      {/* 先に高圧縮フォーマットを提示し、ブラウザが対応フォーマットを選択できるようにする */}
      <source srcSet={avifSrc} type="image/avif" />
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

