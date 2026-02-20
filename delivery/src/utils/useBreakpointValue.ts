import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const getMatchMedia = (query: string) => {
  if (typeof window === "undefined") {
    return undefined;
  }
  return window.matchMedia(query);
};

// 指定したメディアクエリに合致するかどうかをリアルタイムに判定する共通フック
export const useBreakpointValue = (query: string): boolean => {
  const mediaQueryList = useMemo(() => getMatchMedia(query), [query]);
  const getInitialValue = useCallback(() => mediaQueryList?.matches ?? false, [mediaQueryList]);
  const [matches, setMatches] = useState<boolean>(() => getInitialValue());

  useIsomorphicLayoutEffect(() => {
    const currentMedia = mediaQueryList;
    if (!currentMedia) {
      return;
    }

    const handleChange = () => setMatches(currentMedia.matches);

    handleChange(); // 初期描画前に最新値へ同期
    currentMedia.addEventListener("change", handleChange);

    return () => {
      currentMedia.removeEventListener("change", handleChange);
    };
  }, [mediaQueryList]);

  return matches;
};
