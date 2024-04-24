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
  opacity: string = "1";
  x: number = 0;
  y: number = 0;

  constructor(xPos: number, yPos: number, x: number, y: number) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.x = x;
    this.y = y;
  }

  draw(ctx: CanvasRenderingContext2D, rgb: string = "240, 237, 231") {
    ctx.fillStyle = `rgba(${rgb}, ${this.opacity})`;
    ctx.fillRect(this.xPos, this.yPos, SQUARE_SIZE, SQUARE_SIZE);
  }

  animate(ctx: CanvasRenderingContext2D, elapsed: number) {
    if (this.opacity !== "0.00") return;

    ctx.clearRect(this.xPos, this.yPos, SQUARE_SIZE, SQUARE_SIZE);

    this.opacity = lerp(
      0,
      1,
      Math.min(1, elapsed / ANIMATION_DURATION)
    ).toFixed(2);

    this.draw(ctx);
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
    const x = i % numX;
    const y = Math.floor(i / numX);
    const xPos = x * SQUARE_SIZE;
    const yPos = y * SQUARE_SIZE;
    const square = new Square(xPos, yPos, x, y);
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
  squares: React.MutableRefObject<Square[]>
) => {
  ctx.fillStyle = `rgba(240, 237, 231, 1)`;
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

    square.opacity = opacity;
    square.draw(ctx, "203, 193, 174");
  });
};

const animateRandomSquares = (
  randomSquares: Square[],
  ctx: CanvasRenderingContext2D,
  elapsed: number
) => {
  randomSquares.forEach((square) => {
    square.animate(ctx, elapsed);
  });
};

/**
 * Renders a hero background with animated squares on a canvas element.
 *
 * @returns The HeroBackground component.
 */
export const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const squares = useRef<Square[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    squares.current = resizeCanvas(canvas, ctx);
    const handleResize = () => {
      squares.current = resizeCanvas(canvas, ctx);
    };

    let start: DOMHighResTimeStamp | null = null;
    let randomSquares: Square[] = getRandomSquares(squares.current);

    (function redraw(time: DOMHighResTimeStamp = 0) {
      if (!start) {
        start = time;
      }

      const elapsed = time - start;

      drawHover(ctx, canvas, mousePos, squares);
      animateRandomSquares(randomSquares, ctx, elapsed);

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
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { nativeEvent } = event;
    mousePos.current = { x: nativeEvent.offsetX, y: nativeEvent.offsetY };
  };

  return <canvas ref={canvasRef} onMouseMove={handleMouseMove} />;
};
