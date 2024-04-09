"use client";

import React, { useEffect, useRef } from "react";

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
  readonly width: number = SQUARE_SIZE;
  readonly height: number = SQUARE_SIZE;
  opacity: number = 1;

  constructor(xPos: number, yPos: number, width?: number, height?: number) {
    this.xPos = xPos;
    this.yPos = yPos;
    width && (this.width = width);
    height && (this.height = height);
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = `rgba(240, 237, 231, ${this.opacity})`;
    context.fillRect(this.xPos, this.yPos, this.width, this.height);
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
  canvas: HTMLCanvasElement
) => {
  const numX = Math.ceil(canvas.width / SQUARE_SIZE);
  const numY = Math.ceil(canvas.height / SQUARE_SIZE);

  return Array.from({ length: numX * numY }, (_, i) => {
    const x = (i % numX) * SQUARE_SIZE;
    const y = Math.floor(i / numX) * SQUARE_SIZE;
    const square = new Square(x, y);
    square.draw(ctx);
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
  ctx: CanvasRenderingContext2D
) => {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

  return drawSquares(ctx, canvas);
};

/**
 * Renders a hero background with animated squares on a canvas element.
 *
 * @returns The HeroBackground component.
 */
export const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    let squares = resizeCanvas(canvas, ctx);

    const animate = () => {
      let start: DOMHighResTimeStamp | null = null;
      let randomSquares: Square[] = getRandomSquares(squares);

      const redraw = (time: DOMHighResTimeStamp = 0) => {
        if (!start) {
          start = time;
        }

        const elapsed = time - start;

        randomSquares.forEach((square) => {
          ctx.clearRect(square.xPos, square.yPos, square.width, square.height);
          square.opacity = lerp(
            0,
            1,
            Math.min(1, elapsed / ANIMATION_DURATION)
          );
          square.draw(ctx);
        });

        if (elapsed < ANIMATION_DURATION) {
          animationFrameId.current = requestAnimationFrame(redraw);
        } else {
          randomSquares = getRandomSquares(squares);
          start = null;
          redraw();
        }
      };

      redraw();
    };

    const handleResize = () => {
      squares = resizeCanvas(canvas, ctx);
    };
    animate();

    window.addEventListener("resize", handleResize, false);
    return () => {
      window.removeEventListener("resize", handleResize, false);
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} />;
};
