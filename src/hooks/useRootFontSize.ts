import { useEffect, useState } from "react";

const BASE_FONT_SIZE = 16;

export const useRootFontSize = () => {
  const [rootFontSize, setRootFontSize] = useState(BASE_FONT_SIZE);

  useEffect(() => {
    const getRootFontSize = () => {
      if (typeof window === "undefined") return BASE_FONT_SIZE;
      return parseFloat(getComputedStyle(document.documentElement).fontSize);
    };

    setRootFontSize(getRootFontSize());

    // Watch for style attribute changes
    const mutationObserver = new MutationObserver(() => {
      setRootFontSize(getRootFontSize());
    });

    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    // Watch for browser zoom changes
    const mediaQuery = window.matchMedia("(resolution: 1dppx)");
    const handleZoom = () => setRootFontSize(getRootFontSize());
    mediaQuery.addEventListener("change", handleZoom);

    return () => {
      mutationObserver.disconnect();
      mediaQuery.removeEventListener("change", handleZoom);
    };
  }, []);

  return rootFontSize;
};
