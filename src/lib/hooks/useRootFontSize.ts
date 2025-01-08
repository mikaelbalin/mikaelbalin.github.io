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

    const observer = new ResizeObserver(() => {
      setRootFontSize(getRootFontSize());
    });

    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, []);

  return rootFontSize;
};
