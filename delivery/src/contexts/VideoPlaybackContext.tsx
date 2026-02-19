"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** ヘッダー動画（HeroBase）とボトム動画（Base）の再生位置を保持し、ページ遷移後も継続表示する */
type VideoPlaybackContextValue = {
  heroBaseTime: number;
  baseTime: number;
  setHeroBaseTime: (t: number) => void;
  setBaseTime: (t: number) => void;
};

const VideoPlaybackContext = createContext<VideoPlaybackContextValue | null>(null);

export function VideoPlaybackProvider({ children }: { children: ReactNode }) {
  const [heroBaseTime, setHeroBaseTimeState] = useState(0);
  const [baseTime, setBaseTimeState] = useState(0);

  const setHeroBaseTime = useCallback((t: number) => {
    setHeroBaseTimeState(t);
  }, []);
  const setBaseTime = useCallback((t: number) => {
    setBaseTimeState(t);
  }, []);

  const value = useMemo<VideoPlaybackContextValue>(
    () => ({
      heroBaseTime,
      baseTime,
      setHeroBaseTime,
      setBaseTime,
    }),
    [heroBaseTime, baseTime, setHeroBaseTime, setBaseTime],
  );

  return (
    <VideoPlaybackContext.Provider value={value}>
      {children}
    </VideoPlaybackContext.Provider>
  );
}

export function useVideoPlayback() {
  return useContext(VideoPlaybackContext);
}
