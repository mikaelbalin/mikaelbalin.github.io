import { alpha, lerp } from "#lib/utils";
import { ANIMATION_DURATION } from "#components/Hero/HeroBackground/HeroBackground.constants";

export class SquareConfig {
  private static _squareSize: number = 50; // Default size

  static get squareSize(): number {
    return this._squareSize;
  }

  static set squareSize(size: number) {
    this._squareSize = size;
  }
}

const ANIMATION_MIDDLE_POINT = ANIMATION_DURATION / 2;

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
  private _opacity: number = 1;
  public animationStart: DOMHighResTimeStamp | null = null;
  public hasHover: boolean = false;
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

  public set opacity(opacity: number) {
    this._opacity = Number(opacity.toFixed(2));
  }

  public get opacity() {
    return this._opacity;
  }

  public draw(ctx: CanvasRenderingContext2D, color: string, hasHover = false) {
    ctx.fillStyle = alpha(color, this._opacity);
    ctx.fillRect(
      this.xPos,
      this.yPos,
      SquareConfig.squareSize,
      SquareConfig.squareSize,
    );
    this.hasHover = hasHover;
  }

  public animate(
    ctx: CanvasRenderingContext2D,
    timeStamp: DOMHighResTimeStamp,
    color: string,
    onAnimationEnd: () => void,
  ) {
    if (this.hasHover) return;

    if (!this.animationStart) {
      this.animationStart = timeStamp;
    }

    const elapsed = this.animationStart ? timeStamp - this.animationStart : 0;

    if (elapsed < ANIMATION_DURATION) {
      ctx.clearRect(
        this.xPos,
        this.yPos,
        SquareConfig.squareSize,
        SquareConfig.squareSize,
      );

      if (elapsed <= ANIMATION_MIDDLE_POINT) {
        this.opacity = lerp(
          1,
          0,
          Math.min(1, elapsed / ANIMATION_MIDDLE_POINT),
        );
      } else {
        this.opacity = lerp(
          0,
          1,
          Math.max(0, (1 - elapsed / ANIMATION_MIDDLE_POINT) * -1),
        );
      }

      this.draw(ctx, color);
    } else {
      this.animationStart = null;
      onAnimationEnd();
    }
  }
}
