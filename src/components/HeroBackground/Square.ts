import { alpha } from "@mantine/core";
import { ANIMATION_DURATION, SQUARE_SIZE } from "./HeroBackground.constants";
import { lerp } from "../../utils";

export class Square {
  readonly xPos: number;
  readonly yPos: number;
  opacity: number = 1;

  constructor(xPos: number, yPos: number) {
    this.xPos = xPos;
    this.yPos = yPos;
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.fillStyle = alpha(color, this.opacity);
    ctx.fillRect(this.xPos, this.yPos, SQUARE_SIZE, SQUARE_SIZE);

    // add text
    // ctx.fillStyle = "black";
    // ctx.font = "bold 12px Arial";
    // ctx.textAlign = "center";
    // ctx.fillText(
    //   `${this.opacity}`,
    //   this.xPos + SQUARE_SIZE / 2,
    //   this.yPos + SQUARE_SIZE / 2
    // );
  }

  animate(ctx: CanvasRenderingContext2D, elapsed: number, color: string) {
    if (this.opacity !== 0) return;

    ctx.clearRect(this.xPos, this.yPos, SQUARE_SIZE, SQUARE_SIZE);

    this.opacity = Number(
      lerp(0, 1, Math.min(1, elapsed / ANIMATION_DURATION)).toFixed(2)
    );

    this.draw(ctx, color);
  }
}
