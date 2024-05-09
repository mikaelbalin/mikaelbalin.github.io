"use client";

import React, { useEffect, useRef } from "react";
import { useMantineColorScheme, useMantineTheme } from "@mantine/core";
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
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const squares = useRef<Square[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const squareColor =
      colorScheme === "light"
        ? theme.other.appLightColorBeige
        : theme.other.appDarkColorCoalBlack;

    squares.current = resizeCanvas(canvas, ctx, squareColor);
    const handleResize = () => {
      squares.current = resizeCanvas(canvas, ctx, squareColor);
    };

    // let addHover = false;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // addHover = !(x < 0 || y < 0 || x > rect.width || y > rect.height);

      // if (addHover) {
      mousePos.current = { x, y };
      // }
    };

    let start: DOMHighResTimeStamp | null = null;
    let randomSquares: Square[] = getRandomSquares(squares.current);

    (function redraw(time: DOMHighResTimeStamp = 0) {
      if (!start) {
        start = time;
      }

      const elapsed = time - start;

      // if (addHover) {
      drawHover(ctx, canvas, mousePos, squares, theme.other, colorScheme);
      // }
      animateRandomSquares(randomSquares, ctx, elapsed, squareColor);

      if (elapsed < ANIMATION_DURATION) {
        animationFrameId.current = requestAnimationFrame(redraw);
      } else {
        start = null;
        randomSquares = getRandomSquares(squares.current);
        redraw();
      }
    })();

    window.addEventListener("mousemove", handleMouseMove, false);
    window.addEventListener("resize", handleResize, false);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize, false);

      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [colorScheme, theme.other]);

  return (
    <div className={classes.root}>
      <canvas ref={canvasRef} className={classes.canvas} />
    </div>
  );
};
