import { MantineColorScheme } from "@mantine/core";
import { Canvas, MousePosition } from "./Canvas";
import { Shared } from "./Square";

export class BlogCanvas extends Canvas {
  private filteredSquares: {
    xPos: number;
    yPos: number;
    distance: number;
    opacity: number;
    animating: boolean;
    animationStart: number;
  }[] = [];

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
    this.animateSquares(timeStamp);
    // this.draw();
    super.tick(onAnimationFrameRequest);
  }

  private get cpx() {
    return this.canvas.width * 0.5;
  }

  private get cpy() {
    return this.canvas.height * 0.75;
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

  // Function to check if a square is within the shape
  private isSquareInShape(xPos: number, yPos: number) {
    const pointsToCheck = [{ x: xPos, y: yPos }];

    for (let point of pointsToCheck) {
      if (this.ctx.isPointInPath(point.x, point.y)) {
        return true;
      }
    }
    return false;
  }

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

    this.ctx.strokeStyle = "red";

    this.ctx.stroke();
  }

  // Function to calculate distance to the quadratic curve (approximation)
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

  public getFilteredSquares() {
    this.drawReferenceShape();
    const rows = this.canvas.height / Shared.squareSize;
    const cols = this.canvas.width / Shared.squareSize;

    const filteredSquares = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const xPos = col * Shared.squareSize;
        const yPos = row * Shared.squareSize;

        if (this.isSquareInShape(xPos, yPos)) {
          const distance = this.getDistanceToCurve(
            xPos + Shared.squareSize / 2,
            yPos + Shared.squareSize / 2
          );
          filteredSquares.push({
            xPos,
            yPos,
            distance,
            opacity: 1,
            animating: false,
            animationStart: 0,
          });
        }
      }
    }

    this.filteredSquares = filteredSquares;
  }

  public animateSquares(timestamp: DOMHighResTimeStamp) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawReferenceShape(); // Redraw the shape to clear the canvas

    this.filteredSquares.forEach((square) => {
      const normalizedDistance = Math.min(
        square.distance / (this.canvas.width / 2),
        1
      );
      const maxOpacity = 1 - normalizedDistance;

      // Randomly start animation
      if (!square.animating && Math.random() < 0.01) {
        square.animating = true;
        square.animationStart = timestamp;
      }

      // Handle animation
      if (square.animating) {
        const elapsedTime = (timestamp - square.animationStart) / 1000; // time in seconds
        const animationPhase = elapsedTime % 4; // 4-second cycle

        if (animationPhase < 2) {
          // Decrease opacity
          square.opacity = maxOpacity * (1 - animationPhase / 2);
        } else {
          // Increase opacity
          square.opacity = maxOpacity * ((animationPhase - 2) / 2);
        }

        if (elapsedTime >= 4) {
          // End animation cycle
          square.animating = false;
        }
      }

      this.ctx.fillStyle = `rgba(240, 237, 231, ${square.opacity})`;
      this.ctx.fillRect(
        square.xPos,
        square.yPos,
        Shared.squareSize,
        Shared.squareSize
      );

      this.ctx.fillStyle = "black";
      this.ctx.fillText(
        square.distance.toFixed(2),
        square.xPos + 5,
        square.yPos + 15
      );
    });
  }

  public draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawReferenceShape();

    const rows = this.canvas.height / Shared.squareSize;
    const cols = this.canvas.width / Shared.squareSize;

    const filteredSquares = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const xPos = col * Shared.squareSize;
        const yPos = row * Shared.squareSize;
        if (this.isSquareInShape(xPos, yPos)) {
          filteredSquares.push({ xPos, yPos });
        }
      }
    }

    filteredSquares.forEach((square) => {
      const distance = this.getDistanceToCurve(square.xPos, square.yPos);

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
        square.xPos,
        square.yPos,
        Shared.squareSize,
        Shared.squareSize
      );

      this.ctx.fillStyle = "black";
      this.ctx.fillText(distance.toFixed(2), square.xPos + 5, square.yPos + 15);
    });
  }
}
