"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/components/utils/cn";
import { ElementResolver } from "@/lib/elementResolver";
import { LetterAnimator } from "@/lib/letterAnimator";
import { DotBurst } from "@/lib/dotBurst";

export type EllipseCollapseTextProps = {
  text: string;
  reverse: boolean;
  white: boolean;
  className?: string;
  letterClassName?: string;
  charClassName?: string;
  shouldAnimate?: boolean;
};

export function EllipseCollapseText({
  text,
  reverse = false,
  white = false,
  className,
  letterClassName,
  charClassName,
  shouldAnimate = true,
}: EllipseCollapseTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    const previousMinWidth = node.style.minWidth;
    const previousMinHeight = node.style.minHeight;

    const measureLayout = () => {
      const doc = node.ownerDocument;
      if (!doc) return;

      const placeholder = doc.createElement("span");
      placeholder.textContent = text;
      placeholder.setAttribute("aria-hidden", "true");
      const placeholderClass = cn(
        "pointer-events-none select-none whitespace-pre",
        letterClassName,
        charClassName,
      );
      if (placeholderClass) {
        placeholder.className = placeholderClass;
      }
      placeholder.style.visibility = "hidden";
      placeholder.style.display = "inline-flex";

      node.appendChild(placeholder);
      const { width, height } = placeholder.getBoundingClientRect();
      if (width > 0) {
        node.style.minWidth = `${width}px`;
      }
      if (height > 0) {
        node.style.minHeight = `${height}px`;
      }
      node.removeChild(placeholder);
    };

    measureLayout();

    const letters = ElementResolver.separateText(node, text);

    let hasPlayed = false;
    let observer: IntersectionObserver | null = null;
    let resizeHandler: (() => void) | null = null;

    const animators = letters.map((letter, i) => {
      const char = letter.querySelector<HTMLElement>(".char")!;
      if (charClassName !== undefined) {
        char.classList.add(...charClassName.split(" "));
      }

      letter.classList.add("inline-flex");
      if (letterClassName) letter.classList.add(...letterClassName.split(" "));
      if (white) {
        letter.classList.add("text-black");
        letter.classList.add("bg-white");
      } else {
        letter.classList.add("text-white");
        letter.classList.add("bg-black");
      }

      const pattern = /([「」、。])/g;
      if (pattern.test(char.textContent)) {
        char.classList.add("tight");
      }
      const dotAnimation = new DotBurst({ color: white ? "white" : undefined });
      const animator = new LetterAnimator(letter, char, {
        onBackgroundComplete: () => dotAnimation.burst(letter),
      });

      return animator.buildAnimation(reverse ? (letters.length - i) * 0.05 : i * 0.05, reverse);
    });

    const playAnimations = () => {
      if (hasPlayed) return;
      measureLayout();
      animators.forEach((animator) => {
        animator.play();
      });
      hasPlayed = true;
    };

    const isInViewport = () => {
      const rect = node.getBoundingClientRect();
      const viewHeight = window.innerHeight || document.documentElement.clientHeight;
      const viewWidth = window.innerWidth || document.documentElement.clientWidth;

      return rect.top < viewHeight && rect.bottom > 0 && rect.left < viewWidth && rect.right > 0;
    };

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playAnimations();
          }
        });
      });
      observer.observe(node);

      if (isInViewport()) {
        playAnimations();
      }

      resizeHandler = () => {
        measureLayout();
      };
      window.addEventListener("resize", resizeHandler);
    } else {
      playAnimations();
    }
    node.setAttribute("data-text", text);

    return () => {
      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
      }
      observer?.disconnect();
      if (animators) {
        animators.forEach((tl) => tl.kill());
      }
      node.innerHTML = "";
      node.textContent = text;
      node.style.minWidth = previousMinWidth;
      node.style.minHeight = previousMinHeight;
      node.setAttribute("data-text", text);
    };
  }, [text, charClassName, letterClassName, shouldAnimate]);

  return (
    <span
      ref={containerRef}
      className={cn(
        "inline-flex text-5xl min-h-[1px] min-w-[1px]",
        !shouldAnimate && "opacity-0",
        className,
      )}
      aria-label={text}
    />
  );
}
