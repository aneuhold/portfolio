import type Moveable from '../interfaces/Drawable';

export type DotOptions = {
  x?: number;
  xVelocity?: number;
  y?: number;
  yVelocity?: number;
  radius?: number;
  color?: string;
};

/**
 * A representation of a dot on a canvas which can move around.
 */
export default class Dot implements Moveable {
  private x: number;
  private xVelocity: number;
  private y: number;
  private yVelocity: number;
  private readonly radius: number;
  private readonly color: string;
  private readonly ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D, dotOptions: DotOptions = {}) {
    this.ctx = ctx;
    this.x = dotOptions.x || ctx.canvas.width / 2;
    this.xVelocity = dotOptions.xVelocity || 0.5;
    this.y = dotOptions.y || ctx.canvas.height / 2;
    this.yVelocity = dotOptions.yVelocity || 0.5;
    this.radius = dotOptions.radius || 10;
    this.color = dotOptions.color || 'white';
    this.draw();
  }

  continueMovement() {
    let nextX = this.x + this.xVelocity;
    let nextY = this.y + this.yVelocity;
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
    this.draw();
  }

  public currentPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
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
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
