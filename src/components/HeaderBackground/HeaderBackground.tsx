"use client";

import React, { useEffect, useRef } from "react";
import styles from "./HeaderBackground.module.css";

export const HeaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const resizeCanvas = (e?: UIEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = document.documentElement.clientWidth;
    };

    window.addEventListener("resize", resizeCanvas, false);

    // Initial resize
    resizeCanvas();

    // Cleanup function
    return () => {
      window.removeEventListener("resize", resizeCanvas, false);
    };
  }, []);

  return <canvas className={styles.canvas} ref={canvasRef} height={800} />;
};
