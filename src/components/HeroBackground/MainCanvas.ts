import { MantineColorScheme } from "@mantine/core";
import { theme } from "../../theme";
import { Shared } from "./Square";
import { SQUARE_SIZE_SMALL } from "./HeroBackground.constants";
import { Canvas, MousePosition } from "./Canvas";

export class MainCanvas extends Canvas {
  constructor(
    canvas: HTMLCanvasElement,
    colorScheme: MantineColorScheme,
    mousePos?: MousePosition
  ) {
    super(canvas, colorScheme, mousePos);
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

  public setActiveSquares() {
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

  public override run(
    timeStamp: DOMHighResTimeStamp,
    onAnimationFrameRequest: (id: number) => void
  ) {
    this.drawHover();
    this.animateSquares(timeStamp);
    super.tick(onAnimationFrameRequest);
  }

  private drawHover() {
    this.ctx.fillStyle = this.squareColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (!this.mousePos) return;
    const { x, y } = this.mousePos;
    const hoverColor =
      this._colorScheme === "light"
        ? theme.other.appLightColorBeigeDark
        : theme.other.appDarkColorCoalBlackLight;

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
