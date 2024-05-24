import { MantineColorScheme } from "@mantine/core";
import { theme } from "../../theme";
import { Shared, Square } from "./Square";

export type BackgroundVariant = "default" | "blog";

export interface MousePosition {
  x: number;
  y: number;
}

/**
 * Represents an abstract base class for a canvas element.
 */
export abstract class Canvas {
  protected readonly canvas: HTMLCanvasElement;
  protected readonly ctx: CanvasRenderingContext2D;
  protected squares: Square[] = [];
  protected mousePos?: MousePosition;
  private _colorScheme!: MantineColorScheme;
  protected squareColor!: string;
  protected activeSquares: Square[] = [];

  /**
   * Creates a new instance of the Canvas class.
   * @param canvas - The HTMLCanvasElement to be used as the canvas.
   * @param colorScheme - The MantineColorScheme to be used for the canvas.
   * @param mousePos - The initial mouse position on the canvas.
   */
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

  protected get colorScheme() {
    return this._colorScheme;
  }

  /**
   * Runs the animation loop for the canvas.
   * @param timeStamp - The current timestamp.
   * @param onAnimationFrameRequest - A callback function to request the next animation frame.
   */
  protected abstract run(
    timeStamp: DOMHighResTimeStamp,
    onAnimationFrameRequest: (id: number) => void
  ): void;

  /**
   * Starts the animation loop for the canvas.
   * @param onAnimationFrameRequest - A callback function to request the next animation frame.
   */
  protected tick(onAnimationFrameRequest: (id: number) => void) {
    onAnimationFrameRequest(
      requestAnimationFrame((time) => this.run(time, onAnimationFrameRequest))
    );
  }

  /**
   * Sets the mouse position on the canvas.
   * @param mousePosition - The clientX and clientY coordinates of the mouse position.
   * @returns The updated MousePosition object or undefined if mousePosition is not provided.
   */
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
}
