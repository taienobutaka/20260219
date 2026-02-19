import React, { forwardRef } from "react";

export interface SmartVideoProps {
  src: string;
  className?: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

// 拡張子を差し替えて WebM パスを導出する
function getWebmPath(originalSrc: string) {
  const lastSlashIndex = originalSrc.lastIndexOf("/");
  const lastDotIndex = originalSrc.lastIndexOf(".");

  if (lastDotIndex === -1 || lastDotIndex < lastSlashIndex) {
    return `${originalSrc}.webm`;
  }

  return `${originalSrc.slice(0, lastDotIndex)}.webm`;
}

/** ref で video 要素を親に渡し、再生位置の保存・復元に利用する */
export const SmartVideo = forwardRef<HTMLVideoElement, SmartVideoProps>(
  function SmartVideo(
    {
      src,
      className,
      poster,
      autoPlay = true,
      loop = true,
      muted = true,
      playsInline = true,
    },
    ref,
  ) {
    const webmSrc = getWebmPath(src);

    return (
      <video
        ref={ref}
        className={className}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
      >
        {/* 先に WebM を提示し、対応していない環境は MP4 へフォールバックする */}
        <source src={webmSrc} type="video/webm" />
        <source src={src} type="video/mp4" />
      </video>
    );
  },
);

