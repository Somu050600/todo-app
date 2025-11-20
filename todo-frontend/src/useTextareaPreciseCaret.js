import { useEffect, useRef } from "react";

export function useTextareaPreciseCaret() {
  const mirrorRef = useRef(null);
  const cachedStyleRef = useRef(null);

  // Cleanup mirror on unmount
  useEffect(() => {
    return () => {
      if (mirrorRef.current) {
        document.body.removeChild(mirrorRef.current);
        mirrorRef.current = null;
      }
    };
  }, []);

  const getMirror = () => {
    if (mirrorRef.current) return mirrorRef.current;

    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = "-9999px";
    div.style.top = "-9999px";
    div.style.visibility = "hidden";
    div.style.whiteSpace = "pre-wrap";
    div.style.wordWrap = "break-word";

    mirrorRef.current = div;
    document.body.appendChild(div);
    return div;
  };

  const syncMirrorStyles = (mirror, textarea) => {
    const style = window.getComputedStyle(textarea);

    const properties = [
      "fontFamily", "fontSize", "fontWeight", "fontStyle",
      "letterSpacing", "textTransform", "lineHeight",
      "paddingTop", "paddingLeft", "paddingRight", "paddingBottom",
      "border", "boxSizing", "whiteSpace",
      "wordBreak", "width"
    ];

    properties.forEach((p) => {
      mirror.style[p] = style[p];
    });
  };

  const getCaretIndexFromClick = (textarea, text, clickEvent) => {
    const rect = textarea.getBoundingClientRect();

    // include scroll offsets
    const clickX = clickEvent.clientX - rect.left + textarea.scrollLeft;
    const clickY = clickEvent.clientY - rect.top + textarea.scrollTop;

    const mirror = getMirror();

    // cache styles for performance
    if (!cachedStyleRef.current || cachedStyleRef.current.element !== textarea) {
      syncMirrorStyles(mirror, textarea);
      cachedStyleRef.current = { element: textarea };
    }

    let low = 0;
    let high = text.length;

    // Binary search for rough line
    while (low < high) {
      const mid = (low + high) >> 1;
      mirror.textContent = text.substring(0, mid);
      const r = mirror.getBoundingClientRect();

      if (r.height < clickY) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    // Local precision refinement
    let bestIndex = low;
    let bestDistance = Infinity;
    const windowSize = 12;

    const start = Math.max(0, low - windowSize);
    const end = Math.min(text.length, low + windowSize);

    for (let i = start; i <= end; i++) {
      mirror.textContent = text.substring(0, i);
      const r = mirror.getBoundingClientRect();

      const dx = clickX - r.width;
      const dy = clickY - r.height;
      const dist = dx * dx + dy * dy;

      if (dist < bestDistance) {
        bestDistance = dist;
        bestIndex = i;
      }
    }

    return Math.max(0, Math.min(text.length, bestIndex));
  };

  return { getCaretIndexFromClick };
}

