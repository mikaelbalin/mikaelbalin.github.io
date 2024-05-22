import { MantineColorScheme } from "@mantine/core";
import { Canvas, MousePosition } from "./Canvas";

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
}
