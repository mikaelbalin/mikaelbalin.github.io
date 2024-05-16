import { alpha } from "@mantine/core";
import { ANIMATION_DURATION, SQUARE_SIZE } from "./HeroBackground.constants";
import { lerp } from "../../utils";

const ANIMATION_MID_POINT = ANIMATION_DURATION / 2;

export class Square {
  public x: number;
  public y: number;
  public readonly xPos: number;
  public readonly yPos: number;
  public opacity: number = 1;
  private start: DOMHighResTimeStamp | null = null;
  private hasHover: boolean = false;

  constructor(xPos: number, yPos: number, x: number, y: number) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.x = x;
    this.y = y;
  }

  public draw(ctx: CanvasRenderingContext2D, color: string, hasHover = false) {
    ctx.fillStyle = alpha(color, this.opacity);
    ctx.fillRect(this.xPos, this.yPos, SQUARE_SIZE, SQUARE_SIZE);
    this.hasHover = hasHover;
  }

  public animate(
    ctx: CanvasRenderingContext2D,
    timeStamp: DOMHighResTimeStamp,
    color: string,
    onAnimationEnd: () => void
  ) {
    if (this.hasHover) return;

    if (!this.start) {
      this.start = timeStamp;
    }

    const elapsed = this.start ? timeStamp - this.start : 0;

    if (elapsed < ANIMATION_DURATION) {
      ctx.clearRect(this.xPos, this.yPos, SQUARE_SIZE, SQUARE_SIZE);

      if (elapsed <= ANIMATION_MID_POINT) {
        this.opacity = Number(
          lerp(1, 0, Math.min(1, elapsed / ANIMATION_MID_POINT)).toFixed(2)
        );
      } else {
        this.opacity = Number(
          lerp(
            0,
            1,
            Math.max(0, (1 - elapsed / ANIMATION_MID_POINT) * -1)
          ).toFixed(2)
        );
      }

      this.draw(ctx, color);
    } else {
      this.start = null;
      onAnimationEnd();
    }
  }
}
