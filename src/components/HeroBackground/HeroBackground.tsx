"use client";

import React, { useEffect, useRef } from "react";
import classes from "./HeroBackground.module.css";
import { MantineThemeOther, alpha, useMantineTheme } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";

const SQUARE_SIZE = 60;
const ANIMATION_DURATION = 2000;

/**
 * Linearly interpolates between two values.
 *
 * @param start - The starting value.
 * @param end - The ending value.
 * @param t - The interpolation factor, ranging from 0 to 1.
 * @returns The interpolated value.
 */
const lerp = (start: number, end: number, t: number) =>
  start * (1 - t) + end * t;

class Square {
  readonly xPos: number;
  readonly yPos: number;
  opacity: number = 1;
  x: number = 0;
  y: number = 0;

  constructor(xPos: number, yPos: number, x: number, y: number) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.x = x;
    this.y = y;
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.fillStyle = alpha(color, this.opacity);
    ctx.fillRect(this.xPos, this.yPos, SQUARE_SIZE, SQUARE_SIZE);

    // add text
    // ctx.fillStyle = "black";
    // ctx.font = "bold 12px Arial";
    // ctx.textAlign = "center";
    // ctx.fillText(
    //   `${this.opacity}`,
    //   this.xPos + SQUARE_SIZE / 2,
    //   this.yPos + SQUARE_SIZE / 2
    // );
  }

  animate(ctx: CanvasRenderingContext2D, elapsed: number, color: string) {
    if (this.opacity !== 0) return;

    ctx.clearRect(this.xPos, this.yPos, SQUARE_SIZE, SQUARE_SIZE);

    this.opacity = Number(
      lerp(0, 1, Math.min(1, elapsed / ANIMATION_DURATION)).toFixed(2)
    );

    this.draw(ctx, color);
  }
}

/**
 * Returns a random selection of squares from the given array.
 * @param squares - An array of squares.
 * @returns A random selection of squares.
 */
const getRandomSquares = (squares: Square[]) => {
  let squaresCopy = [...squares];
  for (let i = squaresCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [squaresCopy[i], squaresCopy[j]] = [squaresCopy[j], squaresCopy[i]];
  }
  return squaresCopy.slice(0, Math.floor(Math.random() * 11));
};

/**
 * Draws squares on the canvas.
 *
 * @param ctx - The rendering context of the canvas.
 * @param canvas - The HTML canvas element.
 * @returns An array of Square objects that were drawn on the canvas.
 */
const drawSquares = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  color: string
) => {
  const numX = Math.ceil(canvas.width / SQUARE_SIZE);
  const numY = Math.ceil(canvas.height / SQUARE_SIZE);

  return Array.from({ length: numX * numY }, (_, i) => {
    const x = i % numX;
    const y = Math.floor(i / numX);
    const xPos = x * SQUARE_SIZE;
    const yPos = y * SQUARE_SIZE;
    const square = new Square(xPos, yPos, x, y);
    square.draw(ctx, color);
    return square;
  });
};

/**
 * Resizes the canvas element and redraws the squares.
 *
 * @param canvas - The canvas element to resize.
 * @param ctx - The 2D rendering context of the canvas.
 * @returns The result of the drawSquares function.
 */
const resizeCanvas = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  color: string
) => {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

  return drawSquares(ctx, canvas, color);
};

/**
 * Draws the hover effect on the canvas.
 *
 * @param ctx - The canvas rendering context.
 * @param canvas - The HTML canvas element.
 * @param mousePos - A mutable ref object containing the current mouse position.
 * @param squares - A mutable ref object containing an array of Square objects.
 */
const drawHover = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  mousePos: React.MutableRefObject<{ x: number; y: number }>,
  squares: React.MutableRefObject<Square[]>,
  colors: MantineThemeOther
) => {
  ctx.fillStyle = colors.appLightColorBeige;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const { x, y } = mousePos.current;

  squares.current.forEach((square) => {
    // Calculate the distance between the mouse and the center of the square.
    const dx = (x - square.xPos - SQUARE_SIZE / 2) / 1.5;
    const dy = (y - square.yPos - SQUARE_SIZE / 2) / 1.5;

    // Calculate the distance between two points using the Pythagorean theorem.
    const distance = Math.round(Math.sqrt(dx * dx + dy * dy));

    // Calculate the opacity based on the distance
    const opacity = Math.max(0, 1 - distance / 100).toFixed(2);

    square.opacity = Number(opacity);
    square.draw(ctx, colors.appLightColorBeigeDark);
  });
};

const animateRandomSquares = (
  randomSquares: Square[],
  ctx: CanvasRenderingContext2D,
  elapsed: number,
  color: string
) => {
  randomSquares.forEach((square) => {
    square.animate(ctx, elapsed, color);
  });
};

/**
 * Renders a hero background with animated squares on a canvas element.
 *
 * @returns The HeroBackground component.
 */
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
