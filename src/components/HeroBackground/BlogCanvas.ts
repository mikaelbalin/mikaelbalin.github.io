import { MantineColorScheme } from "@mantine/core";
import { Canvas, MousePosition } from "./Canvas";
import { Shared, Square } from "./Square";

/**
 * Represents a canvas for the blog background.
 */
export class BlogCanvas extends Canvas {
  constructor(
    canvas: HTMLCanvasElement,
    colorScheme: MantineColorScheme,
    mousePos?: MousePosition
  ) {
    super(canvas, colorScheme, mousePos);
  }

  /**
   * Runs the animation loop for the BlogCanvas.
   * @param timeStamp - The current timestamp.
   * @param onAnimationFrameRequest - A callback function to request the next animation frame.
   */
  public override run(
    timeStamp: DOMHighResTimeStamp,
    onAnimationFrameRequest: (id: number) => void
  ) {
    this.animateSquares(timeStamp);
    super.tick(onAnimationFrameRequest);
  }

  private get cpx() {
    return this.canvas.width * 0.5;
  }

  private get cpy() {
    return this.canvas.height * 0.75;
  }

  /**
   * Calculates the starting x-coordinate for the canvas.
   * The x-coordinate is determined based on the canvas width.
   * If the canvas width is less than or equal to the minimum width, the x-coordinate is 0.
   * If the canvas width is greater than or equal to the maximum width, the x-coordinate is 1/3 of the canvas width.
   * For canvas widths between the minimum and maximum, the x-coordinate is interpolated between 0 and 1/3 of the canvas width.
   * @returns The starting x-coordinate for the canvas.
   */
  private calculateStartingX(): number {
    const minWidth = 320; // width at which x should be 0
    const maxWidth = 1440; // width at which x should be 1/3 of canvas width

    if (this.canvas.width <= minWidth) return 0;
    if (this.canvas.width >= maxWidth) return this.canvas.width / 3;

    // Interpolate between 0 and 1/3 of canvas width
    const ratio = (this.canvas.width - minWidth) / (maxWidth - minWidth);

    return ratio * (this.canvas.width / 3);
  }

  /**
   * Checks if a square is within the shape.
   * @param xPos - The x-coordinate of the square.
   * @param yPos - The y-coordinate of the square.
   * @returns A boolean indicating whether the square is within the shape.
   */
  private isSquareInShape(xPos: number, yPos: number): boolean {
    const pointsToCheck = [{ x: xPos, y: yPos + Shared.squareSize / 2 }];

    for (let point of pointsToCheck) {
      if (this.ctx.isPointInPath(point.x, point.y)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Draws the reference shape on the canvas.
   */
  private drawReferenceShape() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.calculateStartingX(), 0);
    this.ctx.quadraticCurveTo(
      this.cpx,
      this.cpy,
      this.canvas.width,
      this.canvas.height
    );
    this.ctx.lineTo(this.canvas.width, 0);
    this.ctx.closePath();
  }

  /**
   * Calculates the minimum distance between a given point and a quadratic curve (approximation).
   * @param xPos The x-coordinate of the point.
   * @param yPos The y-coordinate of the point.
   * @returns The minimum distance between the point and the curve.
   */
  private getDistanceToCurve(xPos: number, yPos: number) {
    const minSamplePoints = 50; // Minimum number of sample points to ensure reasonable accuracy
    const maxSamplePoints = 500; // Maximum number of sample points to limit computation
    const samplePoints = Math.min(
      maxSamplePoints,
      Math.max(
        minSamplePoints,
        Math.max(this.canvas.width, this.canvas.height) / 10
      )
    );
    let minDistance = Infinity;

    for (let i = 0; i <= samplePoints; i++) {
      const parameter = i / samplePoints;

      const curveX =
        Math.pow(1 - parameter, 2) * this.calculateStartingX() +
        2 * (1 - parameter) * parameter * this.cpx +
        Math.pow(parameter, 2) * this.canvas.width;
      const curveY =
        Math.pow(1 - parameter, 2) * 0 +
        2 * (1 - parameter) * parameter * this.cpy +
        Math.pow(parameter, 2) * this.canvas.height;

      const distance = Math.sqrt(
        (xPos - curveX) * (xPos - curveX) + (yPos - curveY) * (yPos - curveY)
      );

      if (distance < minDistance) {
        minDistance = distance;
      }
    }

    return minDistance;
  }

  /**
   * Retrieves squares based on the reference shape and calculates their distance percentage.
   */
  public setSquares() {
    this.drawReferenceShape();
    const rows = this.canvas.height / Shared.squareSize;
    const cols = this.canvas.width / Shared.squareSize;

    let minDistance = Infinity;
    let maxDistance = -Infinity;
    const squares: Square[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const xPos = col * Shared.squareSize;
        const yPos = row * Shared.squareSize;

        if (this.isSquareInShape(xPos, yPos)) {
          const distance = this.getDistanceToCurve(
            xPos + Shared.squareSize / 2,
            yPos + Shared.squareSize / 2
          );

          if (distance < minDistance) minDistance = distance;
          if (distance > maxDistance) maxDistance = distance;

          squares.push(
            new Square({
              xPos,
              yPos,
              distance,
              opacity: 0,
              animating: false,
              firstAnimation: true,
            })
          );
        }
      }
    }

    squares.forEach((square) => {
      if (typeof square.distance !== "number") return;
      square.distancePercentage = Math.round(
        ((square.distance - minDistance) / (maxDistance - minDistance)) * 100
      );
    });

    this.squares = squares;
  }

  private isMouseOverSquare(
    mouseX: number,
    mouseY: number,
    square: Square
  ): boolean {
    const squareLeft = square.xPos;
    const squareRight = square.xPos + Shared.squareSize;
    const squareTop = square.yPos;
    const squareBottom = square.yPos + Shared.squareSize;

    if (
      mouseX >= squareLeft &&
      mouseX <= squareRight &&
      mouseY >= squareTop &&
      mouseY <= squareBottom
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Animates the squares on the canvas.
   * @param timestamp - The current timestamp in milliseconds.
   */
  public animateSquares(timestamp: DOMHighResTimeStamp) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.squares.forEach((square) => {
      if (typeof square.distancePercentage !== "number") return;
      const animationFrequency = (1 - square.distancePercentage / 100) * 0.01;

      if (
        !square.animating &&
        ((square.distancePercentage! >= 75 && square.firstAnimation) ||
          (square.distancePercentage! < 75 &&
            Math.random() < animationFrequency))
      ) {
        square.animating = true;
        square.animationStart = timestamp;
      }

      if (square.animating && square.animationStart !== null) {
        const elapsedTime = (timestamp - square.animationStart) / 1000;
        const animationPhase = elapsedTime % 4;
        if (square.firstAnimation) {
          square.opacity = Math.min(animationPhase / 2, 1); // Only increase opacity to 1 and then stop
          if (animationPhase >= 2) {
            square.animating = false;
            square.firstAnimation = false; // Set to false after first animation
          }
        } else {
          if (animationPhase < 2) {
            // Decrease opacity
            square.opacity = 1 - animationPhase / 2;
          } else {
            // Increase opacity
            square.opacity = (animationPhase - 2) / 2;
          }
          if (elapsedTime >= 4) {
            square.animating = false;
          }
        }
      }

      square.draw(this.ctx, this.squareColor);
    });
  }
}
