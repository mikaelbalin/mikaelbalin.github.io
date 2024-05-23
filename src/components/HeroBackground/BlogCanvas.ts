import { MantineColorScheme } from "@mantine/core";
import { Canvas, MousePosition } from "./Canvas";
import { Shared } from "./Square";

export class BlogCanvas extends Canvas {
  constructor(
    canvas: HTMLCanvasElement,
    colorScheme: MantineColorScheme,
    mousePos?: MousePosition
  ) {
    super(canvas, colorScheme, mousePos);
  }

  public override run(
    timeStamp: DOMHighResTimeStamp,
    onAnimationFrameRequest: (id: number) => void
  ) {
    // super.tick(onAnimationFrameRequest);
  }

  private calculateStartingX() {
    const minWidth = 320; // width at which x should be 0
    const maxWidth = 1440; // width at which x should be 1/3 of canvas width

    if (this.canvas.width <= minWidth) return 0;
    if (this.canvas.width >= maxWidth) return this.canvas.width / 3;

    // Interpolate between 0 and 1/3 of canvas width
    const ratio = (this.canvas.width - minWidth) / (maxWidth - minWidth);
    return ratio * (this.canvas.width / 3);
  }

  public drawReferenceShape() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.calculateStartingX(), 0);
    this.ctx.quadraticCurveTo(
      this.canvas.width * 0.5,
      this.canvas.height * 0.75,
      this.canvas.width,
      this.canvas.height
    );
    this.ctx.lineTo(this.canvas.width, 0);
    this.ctx.closePath();

    this.ctx.strokeStyle = "red";

    this.ctx.stroke();
  }

  // Function to check if a square is within the shape
  private isSquareInShape(x: number, y: number) {
    const pointsToCheck = [{ x: x, y: y }];

    for (let point of pointsToCheck) {
      if (this.ctx.isPointInPath(point.x, point.y)) {
        return true;
      }
    }
    return false;
  }

  // Function to calculate distance to the quadratic curve (approximation)
  private getDistanceToCurve(x: number, y: number) {
    const samplePoints = 100;
    let minDistance = Infinity;

    for (let i = 0; i <= samplePoints; i++) {
      const t = i / samplePoints;
      const curveX =
        (1 - t) * (1 - t) * 100 + 2 * (1 - t) * t * 200 + t * t * 500;
      const curveY =
        (1 - t) * (1 - t) * 0 + 2 * (1 - t) * t * 300 + t * t * 500;
      const distance = Math.sqrt(
        (x - curveX) * (x - curveX) + (y - curveY) * (y - curveY)
      );
      if (distance < minDistance) {
        minDistance = distance;
      }
    }

    return minDistance;
  }

  public draw() {
    const rows = this.canvas.height / Shared.squareSize;
    const cols = this.canvas.width / Shared.squareSize;

    const filteredSquares = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * Shared.squareSize;
        const y = row * Shared.squareSize;
        if (this.isSquareInShape(x, y)) {
          filteredSquares.push({ x, y });
        }
      }
    }

    filteredSquares.forEach((square) => {
      const distance = this.getDistanceToCurve(square.x, square.y);
      let color;
      if (distance < 100) {
        color = "rgba(255, 0, 0, 0.5)"; // Close to the curve: red
      } else if (distance < 200) {
        color = "rgba(0, 255, 0, 0.5)"; // Intermediate distance: green
      } else {
        color = "rgba(0, 0, 255, 0.5)"; // Far from the curve: blue
      }
      this.ctx.fillStyle = color;
      this.ctx.fillRect(
        square.x,
        square.y,
        Shared.squareSize,
        Shared.squareSize
      );
    });
  }
}
