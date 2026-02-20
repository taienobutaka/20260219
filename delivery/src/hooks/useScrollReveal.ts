"use client";

import { useEffect, useRef, useState } from "react";

/**
 * スクロールでビューポートに入ったら true になるフック。
 * セクションのフェードイン・スライドアップなどに利用。
 */
export function useScrollReveal(options?: {
  /** 交差率の閾値（0〜1）。デフォルト 0.1 */
  threshold?: number;
  /** 発火を早める/遅らせるマージン。デフォルトで下方向に -40px（少し手前で発火） */
  rootMargin?: string;
  /** 一度 true になったら永続する（再スクロールで消さない）。デフォルト true */
  once?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  const {
    threshold = 0.1,
    rootMargin = "0px 0px -40px 0px",
    once = true,
  } = options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (!once) setIsInView(false);
          return;
        }
        setIsInView(true);
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}
