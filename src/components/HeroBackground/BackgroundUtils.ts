import { MantineColorScheme } from "@mantine/core";
import { theme } from "../../theme";
import { ANIMATION_DURATION, SQUARE_SIZE } from "./HeroBackground.constants";
import { Square } from "./Square";

export interface MousePosition {
  x: number;
  y: number;
}

export class BackgroundUtils {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private squares: Square[] = [];
  private mousePos: MousePosition = { x: 0, y: 0 };
  private randomSquares: Square[] = [];
  private _colorScheme!: MantineColorScheme;
  private squareColor!: string;
  private start: DOMHighResTimeStamp | null = null;

  constructor(
    canvas: HTMLCanvasElement,
    colorScheme: MantineColorScheme,
    mousePos?: MousePosition
  ) {
    this.canvas = canvas;
    this.ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
    this.colorScheme = colorScheme;
    this.resizeCanvas();
    this.getRandomSquares();
    this.mousePos = mousePos || this.mousePos;
  }

  public set colorScheme(colorScheme: MantineColorScheme) {
    this._colorScheme = colorScheme;
    this.squareColor =
      colorScheme === "light"
        ? theme.other.appLightColorBeige
        : theme.other.appDarkColorCoalBlack;
  }

  tick(
    timeStamp: DOMHighResTimeStamp = 0,
    onAnimationFrameRequested: (id: number) => void
  ) {
    if (!this.start) {
      this.start = timeStamp;
    }

    const elapsed = timeStamp - this.start;

    this.drawHover();
    this.animateRandomSquares(elapsed);

    if (elapsed < ANIMATION_DURATION) {
      const id = requestAnimationFrame((time) =>
        this.tick(time, onAnimationFrameRequested)
      );
      onAnimationFrameRequested(id);
    } else {
      this.start = null;
      this.getRandomSquares();
      this.tick(timeStamp, onAnimationFrameRequested);
    }
  }

  public getRandomSquares() {
    let squaresCopy = [...this.squares];

    for (let i = squaresCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [squaresCopy[i], squaresCopy[j]] = [squaresCopy[j], squaresCopy[i]];
    }

    this.randomSquares = squaresCopy.slice(0, Math.floor(Math.random() * 11));
  }

  private drawSquares() {
    const numX = Math.ceil(this.canvas.width / SQUARE_SIZE);
    const numY = Math.ceil(this.canvas.height / SQUARE_SIZE);

    this.squares = Array.from({ length: numX * numY }, (_, i) => {
      const xPos = (i % numX) * SQUARE_SIZE;
      const yPos = Math.floor(i / numX) * SQUARE_SIZE;
      const square = new Square(xPos, yPos);
      square.draw(this.ctx, this.squareColor);
      return square;
    });
  }

  public resizeCanvas() {
    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight;

    this.drawSquares();
  }

  public drawHover() {
    const hoverColor =
      this._colorScheme === "light"
        ? theme.other.appLightColorBeigeDark
        : theme.other.appDarkColorCoalBlackLight;

    this.ctx.fillStyle = this.squareColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const { x, y } = this.mousePos;

    this.squares.forEach((square) => {
      // Calculate the distance between the mouse and the center of the square.
      const dx = (x - square.xPos - SQUARE_SIZE / 2) / 1.5;
      const dy = (y - square.yPos - SQUARE_SIZE / 2) / 1.5;

      // Calculate the distance between two points using the Pythagorean theorem.
      const distance = Math.round(Math.sqrt(dx * dx + dy * dy));

      // Calculate the opacity based on the distance
      const opacity = Number(Math.max(0, 1 - distance / 100).toFixed(2));

      square.opacity = opacity || 1;
      square.draw(this.ctx, opacity ? hoverColor : this.squareColor, !!opacity);
    });
  }

  public animateRandomSquares(elapsed: number) {
    this.randomSquares.forEach((square) => {
      square.animate(this.ctx, elapsed, this.squareColor);
    });
  }

  public setMousePos(clientX: number, clientY: number): MousePosition {
    const rect = this.canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    this.mousePos = { x, y };
    return this.mousePos;
  }
}
