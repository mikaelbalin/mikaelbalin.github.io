"use client";

import { useMantineColorScheme } from "@mantine/core";
import { useEffect, useRef } from "react";
import classes from "./HeroBackground.module.css";
import { BackgroundUtils, type MousePosition } from "./BackgroundUtils";

export const HeroBackground = () => {
  const { colorScheme } = useMantineColorScheme();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const mousePos = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const utils = new BackgroundUtils(canvas, colorScheme, mousePos.current);
    utils.colorScheme = colorScheme;

    const handleResize = () => {
      utils.resizeCanvas();
    };

    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = utils.setMousePos(event.clientX, event.clientY);
    };

    utils.tick(0, (id) => {
      animationFrameIdRef.current = id;
    });

    window.addEventListener("mousemove", handleMouseMove, false);
    window.addEventListener("resize", handleResize, false);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove, false);
      window.removeEventListener("resize", handleResize, false);

      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [colorScheme]);

  return (
    <div className={classes.root}>
      <canvas ref={canvasRef} className={classes.canvas} />
    </div>
  );
};
