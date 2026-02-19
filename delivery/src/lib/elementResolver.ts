const DOCUMENT_REF: Document | null = typeof document === "undefined" ? null : document;
export type ElementTarget = string | HTMLElement | null | undefined;

export class ElementResolver {
  static resolve(target: ElementTarget): HTMLElement | null {
    if (!DOCUMENT_REF || !target) return null;
    if (typeof target === "string") return DOCUMENT_REF.querySelector<HTMLElement>(target);
    if (target instanceof HTMLElement) return target;
    return null;
  }

  static separateText(target: ElementTarget, text: string): HTMLElement[] {
    const element = ElementResolver.resolve(target);
    if (!element || !DOCUMENT_REF) return [];

    element.setAttribute("data-text", text);
    element.innerHTML = "";

    for (const char of text.split("")) {
      const span = DOCUMENT_REF.createElement("span");
      span.classList.add("letter");
      if (char === " " || char === "　") {
        span.classList.add("w-[1ch]");
      }
      const charWrap = DOCUMENT_REF.createElement("span");
      charWrap.classList.add("char");
      charWrap.textContent = char;

      span.appendChild(charWrap);
      element.appendChild(span);
    }

    return Array.from(element.querySelectorAll<HTMLElement>(".letter"));
  }
}
