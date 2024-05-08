import { MantineThemeOther } from "@mantine/core";
import { SQUARE_SIZE } from "./HeroBackground.constants";
import { Square } from "./Square";

/**
 * Returns a random selection of squares from the given array.
 *
 * @param squares - An array of squares.
 * @returns A random selection of squares.
 */
export const getRandomSquares = (squares: Square[]) => {
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
export const drawSquares = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  color: string
) => {
  const numX = Math.ceil(canvas.width / SQUARE_SIZE);
  const numY = Math.ceil(canvas.height / SQUARE_SIZE);

  return Array.from({ length: numX * numY }, (_, i) => {
    const xPos = (i % numX) * SQUARE_SIZE;
    const yPos = Math.floor(i / numX) * SQUARE_SIZE;
    const square = new Square(xPos, yPos);
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
export const resizeCanvas = (
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
export const drawHover = (
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

export const animateRandomSquares = (
  randomSquares: Square[],
  ctx: CanvasRenderingContext2D,
  elapsed: number,
  color: string
) => {
  randomSquares.forEach((square) => {
    square.animate(ctx, elapsed, color);
  });
};
