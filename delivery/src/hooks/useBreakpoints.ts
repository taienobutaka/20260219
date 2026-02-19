import { useBreakpointValue } from "@/utils/useBreakpointValue";
import { BREAKPOINTS } from "@/utils/breakpoints";

// Tailwind のブレークポイント判定をまとめて扱うための状態型
export interface BreakpointsState {
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2xl: boolean;
}

// Tailwind CSS のブレークポイントに同期した判定結果を返すカスタムフック
export const useBreakpoints = (): BreakpointsState => {
  const isSm = useBreakpointValue(`(min-width: ${BREAKPOINTS.sm}px)`);
  const isMd = useBreakpointValue(`(min-width: ${BREAKPOINTS.md}px)`);
  const isLg = useBreakpointValue(`(min-width: ${BREAKPOINTS.lg}px)`);
  const isXl = useBreakpointValue(`(min-width: ${BREAKPOINTS.xl}px)`);
  const is2xl = useBreakpointValue(`(min-width: ${BREAKPOINTS["2xl"]}px)`);

  return { isSm, isMd, isLg, isXl, is2xl };
};
