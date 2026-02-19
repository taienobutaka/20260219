"use client";

import { useEffect, useRef } from "react";
import { SmartVideo } from "@/components/atoms/SmartVideo";
import { useVideoPlayback } from "@/contexts/VideoPlaybackContext";
import { cn } from "@/components/utils/cn";

export type MovieType = "Base" | "HeroBase";

const movieMapper: { [key in MovieType]: string } = {
  Base: "bg.mp4",
  HeroBase: "opening_bg.mp4",
};

/**
 * 背景動画。ページ遷移時に再生位置を Context に保存し、
 * メインページに戻ったときに同じ位置から再生を継続する。
 */
export default function BackgroundVideo({
  type = "Base",
  className = undefined,
}: {
  type?: MovieType;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playback = useVideoPlayback();
  const videoSrc = `/videos/${movieMapper[type]}`;

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !playback) return;

    const savedTime = type === "HeroBase" ? playback.heroBaseTime : playback.baseTime;
    const setTime = type === "HeroBase" ? playback.setHeroBaseTime : playback.setBaseTime;

    const handleLoaded = () => {
      if (savedTime > 0) el.currentTime = savedTime;
    };

    el.addEventListener("loadedmetadata", handleLoaded);
    if (el.readyState >= 1 && savedTime > 0) el.currentTime = savedTime;

    return () => {
      el.removeEventListener("loadedmetadata", handleLoaded);
      setTime(el.currentTime);
    };
  }, [type, playback]);

  return (
    <SmartVideo
      ref={videoRef}
      src={videoSrc}
      className={cn("absolute top-0 left-0 w-full h-full object-cover", className)}
      autoPlay
      loop
      muted
      playsInline
    />
  );
}
