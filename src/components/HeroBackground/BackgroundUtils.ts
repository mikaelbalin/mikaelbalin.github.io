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
  private mousePos?: MousePosition;
  private _colorScheme!: MantineColorScheme;
  private squareColor!: string;
  private activeSquares: Square[] = [];

  constructor(
    canvas: HTMLCanvasElement,
    colorScheme: MantineColorScheme,
    mousePos?: MousePosition
  ) {
    this.canvas = canvas;
    this.ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
    this.colorScheme = colorScheme;
    this.mousePos = mousePos;
    this.resizeCanvas();
    this.addActiveSquare();
  }

  private get randomSquares() {
    let squaresCopy = [...this.squares];
    for (let i = squaresCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [squaresCopy[i], squaresCopy[j]] = [squaresCopy[j], squaresCopy[i]];
    }
    return squaresCopy.slice(0, Math.floor(Math.random() * 5));
  }

  private addActiveSquare() {
    const intervalID = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * this.squares.length);
      const randomSquare = this.squares[randomNumber];

      if (this.activeSquares.length < 10) {
        this.activeSquares.push(randomSquare);
      }
    }, 1000);
  }

  public set colorScheme(colorScheme: MantineColorScheme) {
    this._colorScheme = colorScheme;
    this.squareColor =
      colorScheme === "light"
        ? theme.other.appLightColorBeige
        : theme.other.appDarkColorCoalBlack;
  }

  public tick(
    timeStamp: DOMHighResTimeStamp = 0,
    onAnimationFrameRequested: (id: number) => void
  ) {
    this.drawHover();
    this.animateSquares(timeStamp);

    onAnimationFrameRequested(
      requestAnimationFrame((time) =>
        this.tick(time, onAnimationFrameRequested)
      )
    );
  }

  public resizeCanvas() {
    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight;

    this.drawSquares();
  }

  public setMousePos(mousePosition?: {
    clientX: number;
    clientY: number;
  }): MousePosition | undefined {
    if (mousePosition) {
      const { clientX, clientY } = mousePosition;
      const rect = this.canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      this.mousePos = { x, y };
      return this.mousePos;
    }

    this.mousePos = undefined;
    return undefined;
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

  private drawHover() {
    const hoverColor =
      this._colorScheme === "light"
        ? theme.other.appLightColorBeigeDark
        : theme.other.appDarkColorCoalBlackLight;

    this.ctx.fillStyle = this.squareColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (!this.mousePos) return;
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

  private animateSquares(timeStamp: DOMHighResTimeStamp) {
    this.activeSquares.forEach((square) => {
      if (!square.start) {
        square.start = timeStamp;
      }

      square.animate(this.ctx, timeStamp, this.squareColor);
    });
  }
}
