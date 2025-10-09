import React from "react";

const BASE_FONT_SIZE = 16;

export const useRootFontSize = () => {
  const getRootFontSize = React.useCallback(() => {
    if (typeof window === "undefined") return BASE_FONT_SIZE;
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
  }, []);

  const [rootFontSize, setRootFontSize] = React.useState(() =>
    getRootFontSize(),
  );

  React.useEffect(() => {
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
  }, [getRootFontSize]);

  return rootFontSize;
};
