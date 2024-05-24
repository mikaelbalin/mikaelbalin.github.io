import { alpha } from "@mantine/core";
import { ANIMATION_DURATION } from "./HeroBackground.constants";
import { lerp } from "../../utils";

export class Shared {
  static squareSize: number;

  static setSquareSize(size: number) {
    this.squareSize = size;
  }
}

const ANIMATION_MID_POINT = ANIMATION_DURATION / 2;

type SquareProperties = {
  xPos: number;
  yPos: number;
  x?: number;
  y?: number;
  distance?: number;
  opacity?: number;
  animating?: boolean;
  animationStart?: DOMHighResTimeStamp;
  firstAnimation?: boolean;
};

export class Square {
  public x?: number;
  public y?: number;
  public readonly xPos: number;
  public readonly yPos: number;
  public opacity: number = 1;
  public animationStart: DOMHighResTimeStamp | null = null;
  private hasHover: boolean = false;
  public distance?: number;
  public animating?: boolean;
  public distancePercentage?: number;
  public firstAnimation?: boolean;

  constructor({
    xPos,
    yPos,
    x,
    y,
    distance,
    opacity,
    animating,
    animationStart,
    firstAnimation,
  }: SquareProperties) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.x = x;
    this.y = y;
    this.distance = distance;
    this.animating = animating;
    this.firstAnimation = firstAnimation;
    if (typeof opacity === "number") {
      this.opacity = opacity;
    }
    if (typeof animationStart === "number") {
      this.animationStart = animationStart;
    }
  }

  public draw(ctx: CanvasRenderingContext2D, color: string, hasHover = false) {
    ctx.fillStyle = alpha(color, this.opacity);
    ctx.fillRect(this.xPos, this.yPos, Shared.squareSize, Shared.squareSize);
    this.hasHover = hasHover;
  }

  public animate(
    ctx: CanvasRenderingContext2D,
    timeStamp: DOMHighResTimeStamp,
    color: string,
    onAnimationEnd: () => void
  ) {
    if (this.hasHover) return;

    if (!this.animationStart) {
      this.animationStart = timeStamp;
    }

    const elapsed = this.animationStart ? timeStamp - this.animationStart : 0;

    if (elapsed < ANIMATION_DURATION) {
      ctx.clearRect(this.xPos, this.yPos, Shared.squareSize, Shared.squareSize);

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
      this.animationStart = null;
      onAnimationEnd();
    }
  }
}
