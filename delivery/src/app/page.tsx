"use client";

import { useCallback, useEffect, useState } from "react";
import { LandingPage } from "@/components/pages/LandingPage";
import { PageShutter } from "@/components/organisms/PageShutter";
import { HighlightAnimationProvider } from "@/contexts/HighlightAnimationContext";

export default function Page() {
  const [isContentMounted, setIsContentMounted] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [areHighlightsActive, setAreHighlightsActive] = useState(false);

  useEffect(() => {
    const updateVw = () => {
      const vw = document.documentElement.clientWidth * 0.01;
      document.documentElement.style.setProperty("--vw", `${vw}px`);
    };

    updateVw();
    window.addEventListener("resize", updateVw);

    return () => window.removeEventListener("resize", updateVw);
  }, []);

  const handlePreload = useCallback(() => {
    setIsContentMounted(true);
  }, []);

  const handleShutterOpen = useCallback(() => {
    setIsContentVisible(true);
  }, []);

  const handleShutterComplete = useCallback(() => {
    setAreHighlightsActive(true);
  }, []);

  return (
    <>
      <PageShutter
        onPreload={handlePreload}
        onShutterOpen={handleShutterOpen}
        onComplete={handleShutterComplete}
      />

      {isContentMounted ? (
        <HighlightAnimationProvider value={areHighlightsActive}>
          <div className={isContentVisible ? "visible" : "invisible"}>
            <LandingPage />
          </div>
        </HighlightAnimationProvider>
      ) : null}
    </>
  );
}
