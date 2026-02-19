"use client";

import { createContext, useContext } from "react";

const HighlightAnimationContext = createContext<boolean>(true);

export const HighlightAnimationProvider = HighlightAnimationContext.Provider;

export const useHighlightAnimation = () => useContext(HighlightAnimationContext);
