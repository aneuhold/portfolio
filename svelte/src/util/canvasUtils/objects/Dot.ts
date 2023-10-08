import type Moveable from '../interfaces/Drawable';
import { getRandomColor, getRandomInt, getRandomNumber } from '../mathTools';

export type DotOptions = {
  x?: number;
  xVelocity?: number;
  y?: number;
  yVelocity?: number;
  radius?: number;
  color?: string;
  /**
   * The factor of trailing length that should be applied to the dot. This
   * should be an integer.
   */
  trailingFactor?: number;
};

/**
 * A representation of a dot on a canvas which can move around.
 */
export default class Dot implements Moveable {
  private x: number;
  private xVelocity: number;
  private y: number;
  private yVelocity: number;
  private trailingFactor: number;
  private readonly radius: number;
  private readonly color: string;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly trailMaxLength: number;
  private readonly trailCoords: { x: number; y: number }[] = [];
  private readonly trailPaths: Path2D[] = [];

  constructor(ctx: CanvasRenderingContext2D, dotOptions: DotOptions = {}) {
    this.ctx = ctx;
    this.x = dotOptions.x || getRandomInt(ctx.canvas.width);
    this.xVelocity = dotOptions.xVelocity || getRandomNumber(10);
    this.y = dotOptions.y || getRandomInt(ctx.canvas.height);
    this.yVelocity = dotOptions.yVelocity || getRandomNumber(10);
    this.radius = dotOptions.radius || 10;
    this.color = dotOptions.color || getRandomColor();
    this.trailingFactor = dotOptions.trailingFactor || 50;
    this.trailMaxLength = this.trailingFactor;
    this.draw();
  }

  continueMovement() {
    let nextX = this.x + this.xVelocity;
    let nextY = this.y + this.yVelocity;
    // Handle velocity changes
    if (this.ctx.canvas.width < nextX || 0 > nextX) {
      this.xVelocity = -this.xVelocity;
      nextX = this.x + this.xVelocity;
    }
    if (this.ctx.canvas.height < nextY || 0 > nextY) {
      this.yVelocity = -this.yVelocity;
      nextY = this.y + this.yVelocity;
    }
    this.x = nextX;
    this.y = nextY;

    // Handle the trailing
    this.trailPaths.unshift(this.createDotPath(this.x, this.y, this.radius));
    if (this.trailPaths.length > this.trailMaxLength) {
      this.trailPaths.pop();
    }

    this.draw();
  }

  /**
   * Moves the dot the desired amount of pixels from its current position and
   * sets the velocity to the amount moved.
   */
  public moveDot(x: number, y: number): void {
    this.xVelocity = x - this.x;
    this.yVelocity = y - this.y;
    this.continueMovement();
  }

  private draw(): void {
    this.drawTrails();
    this.drawIndividualDot(this.x, this.y, this.radius, this.color);
  }

  private drawTrails() {
    const trailLength = this.trailCoords.length;
    // Draw trails starting from the back and going forward so they stack
    for (let trailIndex = trailLength - 1; trailIndex >= 0; trailIndex--) {
      const trailCoord = this.trailCoords[trailIndex];
      const trailAlpha = 1 - (trailIndex + 1) / this.trailMaxLength;
      const trailRadius = this.radius * trailAlpha;
      this.drawIndividualDot(trailCoord.x, trailCoord.y, trailRadius, this.color, trailAlpha);
    }
  }

  private drawIndividualDot(
    x: number,
    y: number,
    radius: number,
    color: string,
    alpha: number = 1
  ) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = color;
    this.ctx.globalAlpha = alpha;
    this.ctx.fill();
    this.ctx.closePath();
    // Restore the state
    this.ctx.restore();
  }

  private createDotPath(x: number, y: number, radius: number): Path2D {
    const dotPath = new Path2D();
    dotPath.arc(x, y, radius, 0, Math.PI * 2);
    return dotPath;
  }
}
