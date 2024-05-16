import { MantineColorScheme } from "@mantine/core";
import { theme } from "../../theme";
import { Shared, Square } from "./Square";
import { SQUARE_SIZE_SMALL } from "./HeroBackground.constants";

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

  private get randomSquaresGroup() {
    const randomNumber = Math.floor(Math.random() * this.squares.length);
    const randomSquare = this.squares[randomNumber];
    const x = randomSquare.x;
    const y = randomSquare.y;

    const filterSquares = (condition: (square: any) => boolean) =>
      this.squares.filter(condition);

    const groupSquare = filterSquares(
      (square) =>
        (square.x === x && square.y === y) ||
        (square.x === x + 1 && square.y === y) ||
        (square.x === x && square.y === y + 1) ||
        (square.x === x + 1 && square.y === y + 1)
    );

    const groupX = filterSquares(
      (square) =>
        (square.x === x && square.y === y) ||
        (square.x === x + 1 && square.y === y)
    );

    const groupY = filterSquares(
      (square) =>
        (square.x === x && square.y === y) ||
        (square.x === x && square.y === y + 1)
    );

    const groups = [groupSquare, groupX, groupY];
    const randomGroup = groups[Math.floor(Math.random() * groups.length)];

    return randomGroup;
  }

  private addActiveSquare() {
    const intervalID = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * this.squares.length);
      const randomSquare = this.squares[randomNumber];

      if (this.activeSquares.length < 10) {
        if (Math.random() < 0.2) {
          this.activeSquares.push(...this.randomSquaresGroup);
        } else {
          this.activeSquares.push(randomSquare);
        }
      }
    }, 500);
  }

  private set colorScheme(colorScheme: MantineColorScheme) {
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
    const numX = Math.ceil(this.canvas.width / Shared.squareSize);
    const numY = Math.ceil(this.canvas.height / Shared.squareSize);

    this.squares = Array.from({ length: numX * numY }, (_, i) => {
      const x = i % numX;
      const y = Math.floor(i / numX);
      const xPos = x * Shared.squareSize;
      const yPos = y * Shared.squareSize;
      const animatingSquare = this.activeSquares.find(
        (square) => square.x === x && square.y === y
      );
      const square = animatingSquare || new Square(xPos, yPos, x, y);
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
      const sizeRatio = Shared.squareSize / SQUARE_SIZE_SMALL;
      const dx = (x - square.xPos - Shared.squareSize / 2) / sizeRatio;
      const dy = (y - square.yPos - Shared.squareSize / 2) / sizeRatio;

      // Calculate the distance between two points using the Pythagorean theorem.
      const distance = Math.round(Math.sqrt(dx * dx + dy * dy));

      // Calculate the opacity based on the distance
      const opacity = Number(Math.max(0, 1 - distance / 100).toFixed(2));

      square.opacity = opacity || 1;
      square.draw(this.ctx, opacity ? hoverColor : this.squareColor, !!opacity);
    });
  }

  private animateSquares(timeStamp: DOMHighResTimeStamp) {
    [...this.activeSquares].forEach((square) => {
      square.animate(this.ctx, timeStamp, this.squareColor, () => {
        this.activeSquares = this.activeSquares.filter(
          (activeSquare) => activeSquare !== square
        );
      });
    });
  }
}
