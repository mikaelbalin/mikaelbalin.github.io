"use client";

import React, { useEffect, useRef } from "react";

const SQUARE_SIZE = 60;

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
    context.beginPath();
    context.rect(this.xPos, this.yPos, this.width, this.height);
    context.closePath();

    context.fillStyle = `rgba(240, 237, 231, ${this.opacity})`;
    context.fill();
  }
}

export const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const squares = useRef<Square[]>([]);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function getRandomSquares() {
      let squaresCopy = [...squares.current];
      for (let i = squaresCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [squaresCopy[i], squaresCopy[j]] = [squaresCopy[j], squaresCopy[i]];
      }
      return squaresCopy.slice(0, Math.floor(Math.random() * 11));
    }

    const animate = () => {
      let start: DOMHighResTimeStamp | null = null;
      let currentSquares: Square[] = getRandomSquares();

      const redraw = (time: DOMHighResTimeStamp) => {
        if (!start) {
          start = time;
        }

        const elapsed = time - start;

        currentSquares.forEach((currentSquare) => {
          ctx.clearRect(
            currentSquare.xPos,
            currentSquare.yPos,
            currentSquare.width,
            currentSquare.height
          );
          currentSquare.opacity = lerp(0, 1, Math.min(1, elapsed / 2000));
          currentSquare.draw(ctx);
        });

        if (elapsed < 2000) {
          animationFrameId.current = requestAnimationFrame(redraw);
        } else {
          currentSquares = getRandomSquares();
          start = null;
          redraw(0);
        }
      };

      redraw(0);
    };

    const drawSquares = () => {
      const numX = Math.ceil(canvas.width / SQUARE_SIZE);
      const numY = Math.ceil(canvas.height / SQUARE_SIZE);

      squares.current = [];

      for (let i = 0; i < numX; i++) {
        for (let j = 0; j < numY; j++) {
          const circle = new Square(i * SQUARE_SIZE, j * SQUARE_SIZE);
          squares.current.push(circle);
          circle.draw(ctx);
        }
      }
    };

    const resizeCanvas = (e?: UIEvent) => {
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight;

      drawSquares();
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas, false);
    return () => {
      window.removeEventListener("resize", resizeCanvas, false);
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} height={800} />;
};
