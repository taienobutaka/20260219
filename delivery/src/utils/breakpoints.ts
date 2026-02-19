// Tailwind CSS のブレークポイントを TypeScript でも共有するための定義
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// ブレークポイント名を型として再利用できるようにする
export type BreakpointKey = keyof typeof BREAKPOINTS;
