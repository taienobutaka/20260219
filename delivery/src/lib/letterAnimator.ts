import { gsap } from "gsap";

export type LetterOptions = {
  onBackgroundStart?: () => void;
  onBackgroundComplete?: () => void;
  onCharStart?: () => void;
  onCharComplete?: () => void;
};

export class LetterAnimator {
  constructor(
    private ellipseEl: HTMLElement,
    private charEl: HTMLElement,
    private options: LetterOptions = {},
  ) {}

  buildAnimation(delay: number = 0, reverse: boolean = false) {
    const baseConfig = Object.assign({
      letterDuration: 0.1,
      staggerInterval: 0.1,
      charOffset: 0.1,
      charDuration: 0.3,
      charEase: "power2.out",
    });

    const tl = gsap.timeline({ defaults: { ease: "sine.inOut" }, paused: true, delay });
    tl.fromTo(
      this.ellipseEl,
      {
        opacity: 0,
        scaleX: 2,
        scaleY: 2,
        x: reverse ? 100 : -100,
        // rotation: gsap.utils.random(30, 60),
        display: "none",
        borderRadius: "100%",
        onComplete: () => {
          this.options.onBackgroundStart?.();
        },
      },
      {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        x: 0,
        rotation: 0,
        display: "inline-flex",
        borderRadius: "0%",
        duration: baseConfig.letterDuration,
        onComplete: () => {
          this.options.onBackgroundComplete?.();
        },
      },
      baseConfig.staggerInterval,
    ).fromTo(
      this.charEl,
      {
        opacity: 0,
        // scale: 10,
        // rotation: gsap.utils.random(30, 60),
        onComplete: () => {
          this.options.onCharStart?.();
        },
      },
      {
        opacity: 1,
        // scale: 1,
        // rotation: 0,
        duration: baseConfig.charDuration,
        ease: baseConfig.charEase,
      },
      baseConfig.staggerInterval + baseConfig.charOffset,
    );

    return tl;
  }
}
