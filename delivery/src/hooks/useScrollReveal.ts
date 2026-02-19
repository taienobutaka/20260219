"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 要素がビューポートに入ったら isVisible を true にする。
 * スクロール連動の表示アニメーション用（一度 true になったら維持）。
 */
export function useScrollReveal(options?: {
  threshold?: number;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      {
        threshold: options?.threshold ?? 0.1,
        rootMargin: options?.rootMargin ?? "0px 0px -10% 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible, options?.threshold, options?.rootMargin]);

  return [ref, isVisible] as const;
}
