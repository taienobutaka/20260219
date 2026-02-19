"use client";

import { VideoPlaybackProvider } from "@/contexts/VideoPlaybackContext";

/** ルートレイアウトから動画再生位置の Context を提供するためのラッパー */
export function VideoPlaybackProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <VideoPlaybackProvider>{children}</VideoPlaybackProvider>;
}
