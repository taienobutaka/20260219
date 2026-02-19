import { gsap } from "gsap";

export interface BurstDotsConfig {
  count?: number;
  distance?: [number, number];
  size?: [number, number];
  color?: string;
  delay?: number;
}

const DOCUMENT_REF: Document | null = typeof document === "undefined" ? null : document;
const WINDOW_REF: Window | null = typeof window === "undefined" ? null : window;

export class DotBurst {
  constructor(private config: BurstDotsConfig = {}) {}

  burst(target: HTMLElement) {
    if (!target || !DOCUMENT_REF || !WINDOW_REF) return;
    const options: Required<BurstDotsConfig> = {
      count: 3,
      distance: [60, 180],
      size: [10, 22],
      delay: 0,
      ...this.config,
    } as Required<BurstDotsConfig>;

    const rect = target.getBoundingClientRect();
    const originX = rect.left + rect.width / 2 + (WINDOW_REF.scrollX ?? 0);
    const originY = rect.top + rect.height / 2 + (WINDOW_REF.scrollY ?? 0);

    for (let i = 0; i < options.count; i += 1) {
      const dot = DOCUMENT_REF.createElement("span");
      dot.classList.add("dot");
      if (options.color === "white") {
        dot.classList.add("bg-white");
      } else {
        dot.classList.add("bg-black");
      }
      DOCUMENT_REF.body.appendChild(dot);

      const distance = gsap.utils.random(options.distance[0], options.distance[1]);
      const angle = gsap.utils.random(0, Math.PI * 2);
      const size = gsap.utils.random(options.size[0], options.size[1]);

      gsap.set(dot, {
        left: originX,
        top: originY,
        width: size,
        height: size,
        xPercent: -50,
        yPercent: -50,
        scale: gsap.utils.random(0.85, 1.3),
        opacity: 1,
      });

      const run = () => {
        gsap.to(dot, {
          left: originX + Math.cos(angle) * distance,
          top: originY + Math.sin(angle) * distance,
          scale: 0,
          opacity: 0,
          duration: gsap.utils.random(0.85, 1.5),
          ease: "power2.out",
          onComplete: () => dot.remove(),
        });
      };

      if (options.delay > 0) {
        gsap.delayedCall(options.delay, run);
      } else {
        run();
      }
    }
  }
}
