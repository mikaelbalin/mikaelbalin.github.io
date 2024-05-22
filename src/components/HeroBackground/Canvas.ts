import { MantineColorScheme } from "@mantine/core";
import { theme } from "../../theme";
import { Shared, Square } from "./Square";

export type BackgroundVariant = "default" | "blog";

export interface MousePosition {
  x: number;
  y: number;
}

export abstract class Canvas {
  protected readonly canvas: HTMLCanvasElement;
  protected readonly ctx: CanvasRenderingContext2D;
  protected squares: Square[] = [];
  protected mousePos?: MousePosition;
  protected _colorScheme!: MantineColorScheme;
  protected squareColor!: string;
  protected activeSquares: Square[] = [];

  constructor(
    canvas: HTMLCanvasElement,
    colorScheme: MantineColorScheme,
    mousePos?: MousePosition
  ) {
    this.canvas = canvas;
    this.ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
    this.colorScheme = colorScheme;
    this.mousePos = mousePos;
  }

  private set colorScheme(colorScheme: MantineColorScheme) {
    this._colorScheme = colorScheme;
    this.squareColor =
      colorScheme === "light"
        ? theme.other.appLightColorBeige
        : theme.other.appDarkColorCoalBlack;
  }

  protected abstract run(
    timeStamp: DOMHighResTimeStamp,
    onAnimationFrameRequest: (id: number) => void
  ): void;

  protected tick(onAnimationFrameRequest: (id: number) => void) {
    onAnimationFrameRequest(
      requestAnimationFrame((time) => this.run(time, onAnimationFrameRequest))
    );
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

  public drawSquares() {
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
}
