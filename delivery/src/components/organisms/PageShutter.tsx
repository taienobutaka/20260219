"use client";

import { useEffect, useRef, useState } from "react";
import BlackLogo from "@/assets/black_logo.svg";

const SHUTTER_OPEN_DELAY = 1000;

type PageShutterProps = {
  onPreload?: () => void;
  onShutterOpen?: () => void;
  onComplete?: () => void;
};

export const PageShutter = ({ onPreload, onShutterOpen, onComplete }: PageShutterProps) => {
  const [isActive, setIsActive] = useState(true);
  const preloadRef = useRef(onPreload);
  const openRef = useRef(onShutterOpen);

  useEffect(() => {
    preloadRef.current = onPreload;
  }, [onPreload]);

  useEffect(() => {
    openRef.current = onShutterOpen;
  }, [onShutterOpen]);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    preloadRef.current?.();
    const openTimer = window.setTimeout(() => {
      openRef.current?.();
    }, SHUTTER_OPEN_DELAY);

    return () => window.clearTimeout(openTimer);
  }, [isActive]);

  const handleAnimationEnd = () => {
    setIsActive(false);
    onComplete?.();
  };

  if (!isActive) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 flex animate-shutter-fade flex-col"
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="flex-1 bg-black animate-shutter-top" />
        <div className="flex-1 bg-black animate-shutter-bottom" />
      </div>
      <BlackLogo
        className="relative z-10 h-32 w-32 opacity-100 animate-shutter-icon"
        aria-hidden="true"
      />
    </div>
  );
};

export default PageShutter;
