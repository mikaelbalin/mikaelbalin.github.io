import { theme } from "@/theme";
import { alpha, MantineColorScheme } from "@mantine/core";
import { Canvas, MousePosition } from "./Canvas";
import {
  HOVER_ANIMATION_DURATION,
  LINE_ANIMATION_DURATION,
  SQUARE_SIZE_SMALL,
} from "./HeroBackground.constants";
import { Shared, Square } from "./Square";

export class MainCanvas extends Canvas {
  private startTime: DOMHighResTimeStamp = 0;
  /**
   * A factor used to adjust the duration of animations or transitions.
   * This value is used to scale the base duration to achieve the desired timing effect.
   */
  private readonly durationFactor = 3;
  fadeInStartTime: number | null = null;
  fadeOutStartTime: number | null = null;

  constructor(
    canvas: HTMLCanvasElement,
    colorScheme: MantineColorScheme,
    mousePos?: MousePosition,
  ) {
    super(canvas, colorScheme, mousePos);
  }

  /**
   * Runs the animation loop for the MainCanvas.
   * @param timeStamp - The current timestamp.
   * @param onAnimationFrameRequest - A callback function to request the next animation frame.
   */
  public override run(
    timeStamp: DOMHighResTimeStamp,
    onAnimationFrameRequest: (id: number) => void,
  ) {
    if (!this.startTime) {
      this.startTime = timeStamp;
    }

    const elapsedTime = timeStamp - this.startTime;

    if (elapsedTime <= LINE_ANIMATION_DURATION / this.durationFactor) {
      this.animateLines(elapsedTime);
    } else {
      this.drawHover(timeStamp);
      this.animateSquares(timeStamp);
    }

    super.tick(onAnimationFrameRequest);
  }

  /**
   * Returns a random group of squares based on certain conditions.
   * @returns {Square[]} The random group of squares.
   */
  private get randomSquaresGroup(): Square[] {
    const randomNumber = Math.floor(Math.random() * this.squares.length);
    const randomSquare = this.squares[randomNumber];
    const x = randomSquare.x;
    const y = randomSquare.y;

    if (!x || !y) {
      return [];
    }

    const filterSquares = (condition: (square: Square) => boolean) =>
      this.squares.filter(condition);

    const groupSquare = filterSquares(
      (square) =>
        (square.x === x && square.y === y) ||
        (square.x === x + 1 && square.y === y) ||
        (square.x === x && square.y === y + 1) ||
        (square.x === x + 1 && square.y === y + 1),
    );

    const groupX = filterSquares(
      (square) =>
        (square.x === x && square.y === y) ||
        (square.x === x + 1 && square.y === y),
    );

    const groupY = filterSquares(
      (square) =>
        (square.x === x && square.y === y) ||
        (square.x === x && square.y === y + 1),
    );

    const groups = [groupSquare, groupX, groupY];
    const randomGroup = groups[Math.floor(Math.random() * groups.length)];

    return randomGroup;
  }

  private get hoverColor(): string {
    return this.colorScheme === "light"
      ? theme.other.appLightColorBeigeDark
      : theme.other.appDarkColorCoalBlackLight;
  }

  /**
   * Sets active squares at regular intervals.
   * @returns {number} The ID of the interval timer.
   */
  public setActiveSquares(): NodeJS.Timeout {
    return setInterval(() => {
      if (!this.squares.length) return;
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

  /**
   * Draws the hover effect on the canvas.
   */
  private drawHover(timeStamp: DOMHighResTimeStamp) {
    this.ctx.fillStyle = this.squareColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (!this.mousePos) return;
    const { x, y } = this.mousePos;

    const elapsedSinceFadeInStart = this.fadeInStartTime
      ? timeStamp - this.fadeInStartTime
      : HOVER_ANIMATION_DURATION;
    const elapsedSinceFadeOutStart = this.fadeOutStartTime
      ? timeStamp - this.fadeOutStartTime
      : HOVER_ANIMATION_DURATION;

    this.squares.forEach((square) => {
      // Calculate the distance between the mouse and the center of the square.
      const sizeRatio = Shared.squareSize / SQUARE_SIZE_SMALL;
      const dx = (x - square.xPos - Shared.squareSize / 2) / sizeRatio;
      const dy = (y - square.yPos - Shared.squareSize / 2) / sizeRatio;

      // Calculate the distance between two points using the Pythagorean theorem.
      const distance = Math.round(Math.sqrt(dx * dx + dy * dy));

      // Calculate the opacity based on the distance
      const opacity = Math.max(0, 1 - distance / 100);
      const hasHover = !!opacity;

      if (hasHover && elapsedSinceFadeInStart < HOVER_ANIMATION_DURATION) {
        // Draw the hover effect on the canvas if the mouse is over the canvas. The effect fades in from 0 to `square.opacity`.
        square.opacity = Math.min(
          opacity,
          (1 - distance / 100) *
            (elapsedSinceFadeInStart / HOVER_ANIMATION_DURATION),
        );
      } else if (elapsedSinceFadeOutStart < HOVER_ANIMATION_DURATION) {
        // Draw the hover effect on the canvas if the mouse is out of the canvas. The effect fades out from `square.opacity` to 0.
        square.opacity = Math.max(
          0,
          opacity - elapsedSinceFadeOutStart / HOVER_ANIMATION_DURATION,
        );
      } else if (this.fadeInStartTime) {
        square.opacity = opacity || 1;
      }

      square.draw(
        this.ctx,
        opacity ? this.hoverColor : this.squareColor,
        hasHover,
      );
    });
  }

  /**
   * Animates the active squares on the canvas.
   * @param timeStamp - The current timestamp.
   */
  private animateSquares(timeStamp: DOMHighResTimeStamp) {
    [...this.activeSquares].forEach((square) => {
      square.animate(this.ctx, timeStamp, this.squareColor, () => {
        this.activeSquares = this.activeSquares.filter(
          (activeSquare) => activeSquare !== square,
        );
      });
    });
  }

  /**
   * Draws the squares on the canvas.
   */
  public setSquares() {
    const numX = Math.ceil(this.canvas.width / Shared.squareSize);
    const numY = Math.ceil(this.canvas.height / Shared.squareSize);

    this.squares = Array.from({ length: numX * numY }, (_, i) => {
      const x = i % numX;
      const y = Math.floor(i / numX);
      const xPos = x * Shared.squareSize;
      const yPos = y * Shared.squareSize;
      const animatingSquare = this.activeSquares.find(
        (square) => square.x === x && square.y === y,
      );
      const square = animatingSquare || new Square({ xPos, yPos, x, y });
      square.draw(this.ctx, this.squareColor);
      return square;
    });
  }

  /**
   * Draws a horizontal line on the canvas with the specified opacity.
   */
  private drawLine(i: number, opacity: number) {
    const { width } = this.canvas;
    const lineHeight = Shared.squareSize;
    const color =
      this.colorScheme === "light"
        ? theme.other.appLightColorBeige
        : theme.other.appDarkColorCoalBlack;

    this.ctx.fillStyle = alpha(color, opacity);
    this.ctx.fillRect(0, i * Shared.squareSize, width, lineHeight);
  }

  /**
   * Animates lines on the canvas based on the elapsed time.
   *
   * This method clears the canvas and then draws lines with varying opacity
   * depending on their progress through the animation duration.
   */
  private animateLines(elapsedTime: DOMHighResTimeStamp) {
    const { width, height } = this.canvas;
    const lineHeight = Shared.squareSize;
    const lineCount = Math.ceil(height / lineHeight);
    const lineDuration = LINE_ANIMATION_DURATION / lineCount;

    this.ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < lineCount; i++) {
      const lineStartTime = (i * lineDuration) / this.durationFactor;
      const timeSinceStart = elapsedTime - lineStartTime;
      const lineProgress = timeSinceStart / lineDuration;

      const opacity = Math.min(1, Math.max(0, lineProgress));

      this.drawLine(i, opacity);
    }
  }
}
