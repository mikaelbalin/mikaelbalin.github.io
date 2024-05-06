"use client";

import React, { useEffect, useRef } from "react";
import { useMantineTheme } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import classes from "./HeroBackground.module.css";
import { Square } from "./Square";
import { ANIMATION_DURATION } from "./HeroBackground.constants";
import {
  animateRandomSquares,
  drawHover,
  getRandomSquares,
  resizeCanvas,
} from "./HeroBackground.utils";

export const HeroBackground = () => {
  const colorScheme = useColorScheme();
  const theme = useMantineTheme();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const squares = useRef<Square[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const color =
      colorScheme === "light"
        ? theme.other.appLightColorBeige
        : theme.other.appDarkColorCoalBlackLight;

    squares.current = resizeCanvas(canvas, ctx, color);
    const handleResize = () => {
      squares.current = resizeCanvas(canvas, ctx, color);
    };

    let start: DOMHighResTimeStamp | null = null;
    let randomSquares: Square[] = getRandomSquares(squares.current);

    (function redraw(time: DOMHighResTimeStamp = 0) {
      if (!start) {
        start = time;
      }

      const elapsed = time - start;

      drawHover(ctx, canvas, mousePos, squares, theme.other);
      animateRandomSquares(
        randomSquares,
        ctx,
        elapsed,
        theme.other.appLightColorBeige
      );

      if (elapsed < ANIMATION_DURATION) {
        animationFrameId.current = requestAnimationFrame(redraw);
      } else {
        start = null;
        randomSquares = getRandomSquares(squares.current);
        redraw();
      }
    })();

    window.addEventListener("resize", handleResize, false);
    return () => {
      window.removeEventListener("resize", handleResize, false);
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [colorScheme, theme.other]);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { nativeEvent } = event;
    mousePos.current = { x: nativeEvent.offsetX, y: nativeEvent.offsetY };
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      className={classes.canvas}
    />
  );
};
