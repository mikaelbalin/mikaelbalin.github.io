import { Canvas } from "#components/Hero/HeroBackground/Canvas";
import { SquareConfig, Square } from "#components/Hero/HeroBackground/Square";

/**
 * Represents a canvas for the blog background.
 */
export class BlogCanvas extends Canvas {
  constructor(canvas: HTMLCanvasElement, colorScheme: string) {
    super(canvas, colorScheme);
  }

  /**
   * Runs the animation loop for the BlogCanvas.
   * @param timeStamp - The current timestamp.
   * @param onAnimationFrameRequest - A callback function to request the next animation frame.
   */
  public override run(
    timeStamp: DOMHighResTimeStamp,
    onAnimationFrameRequest: (id: number) => void,
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
  private get startingX(): number {
    const minWidth = 320; // width at which x should be 0
    const maxWidth = 1400; // width at which x should be 1/3 of canvas width

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
    const pointsToCheck = [{ x: xPos, y: yPos + SquareConfig.squareSize / 2 }];

    for (const point of pointsToCheck) {
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
    this.ctx.moveTo(this.startingX, 0);
    this.ctx.quadraticCurveTo(
      this.cpx,
      this.cpy,
      this.canvas.width,
      this.canvas.height,
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
        Math.max(this.canvas.width, this.canvas.height) / 10,
      ),
    );
    let minDistance = Infinity;

    for (let i = 0; i <= samplePoints; i++) {
      const parameter = i / samplePoints;

      const curveX =
        Math.pow(1 - parameter, 2) * this.startingX +
        2 * (1 - parameter) * parameter * this.cpx +
        Math.pow(parameter, 2) * this.canvas.width;
      const curveY =
        Math.pow(1 - parameter, 2) * 0 +
        2 * (1 - parameter) * parameter * this.cpy +
        Math.pow(parameter, 2) * this.canvas.height;

      const distance = Math.sqrt(
        (xPos - curveX) * (xPos - curveX) + (yPos - curveY) * (yPos - curveY),
      );

      if (distance < minDistance) {
        minDistance = distance;
      }
    }

    return minDistance;
  }

  /**
   * Generates squares based on the reference shape and calculates their distance percentage.
   */
  public setSquares() {
    this.drawReferenceShape();

    const rows = this.canvas.height / SquareConfig.squareSize;
    const cols = this.canvas.width / SquareConfig.squareSize;

    let minDistance = Infinity;
    let maxDistance = -Infinity;

    const squares: Square[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const xPos = col * SquareConfig.squareSize;
        const yPos = row * SquareConfig.squareSize;

        if (this.isSquareInShape(xPos, yPos)) {
          const distance = this.getDistanceToCurve(
            xPos + SquareConfig.squareSize / 2,
            yPos + SquareConfig.squareSize / 2,
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
            }),
          );
        }
      }
    }

    squares.forEach((square) => {
      if (typeof square.distance !== "number") return;
      square.distancePercentage = Math.round(
        ((square.distance - minDistance) / (maxDistance - minDistance)) * 100,
      );
    });

    this.squares = squares;
  }

  /**
   * Animates the squares on the canvas.
   * @param timestamp - The current timestamp in milliseconds.
   */
  public animateSquares(timestamp: DOMHighResTimeStamp) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.squares.forEach((square) => {
      if (typeof square.distancePercentage !== "number") return;

      this.updateSquareAnimationState(square, timestamp);
      this.updateSquareOpacity(square, timestamp);
      square.draw(this.ctx, this.squareColor);
    });
  }

  /**
   * Determines if a square should start animating and updates its state.
   * @param square - The square to update.
   * @param timestamp - The current timestamp.
   */
  private updateSquareAnimationState(
    square: Square,
    timestamp: DOMHighResTimeStamp,
  ) {
    if (square.animating) return;

    const animationFrequency = (1 - square.distancePercentage! / 100) * 0.01;
    const shouldStartFirstAnimation =
      square.distancePercentage! >= 75 && square.firstAnimation;
    const shouldStartRegularAnimation =
      square.distancePercentage! < 75 && Math.random() < animationFrequency;

    if (shouldStartFirstAnimation || shouldStartRegularAnimation) {
      square.animating = true;
      square.animationStart = timestamp;
    }
  }

  /**
   * Updates the opacity of a square based on its animation state.
   * @param square - The square to update.
   * @param timestamp - The current timestamp.
   */
  private updateSquareOpacity(square: Square, timestamp: DOMHighResTimeStamp) {
    if (!square.animating || square.animationStart === null) return;

    const elapsedTime = (timestamp - square.animationStart) / 1000;
    const animationPhase = elapsedTime % 4;

    if (square.firstAnimation) {
      this.handleFirstAnimation(square, animationPhase);
    } else {
      this.handleRegularAnimation(square, animationPhase, elapsedTime);
    }
  }

  /**
   * Handles the first animation of a square.
   * @param square - The square to animate.
   * @param animationPhase - The current phase of the animation.
   */
  private handleFirstAnimation(square: Square, animationPhase: number) {
    square.opacity = Math.min(animationPhase / 2, 1); // Only increase opacity to 1 and then stop
    if (animationPhase >= 2) {
      square.animating = false;
      square.firstAnimation = false; // Set to false after first animation
    }
  }

  /**
   * Handles the regular animation of a square.
   * @param square - The square to animate.
   * @param animationPhase - The current phase of the animation.
   * @param elapsedTime - The elapsed time since the animation started.
   */
  private handleRegularAnimation(
    square: Square,
    animationPhase: number,
    elapsedTime: number,
  ) {
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
