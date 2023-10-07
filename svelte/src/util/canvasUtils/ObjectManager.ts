import type Moveable from './interfaces/Drawable';
import Dot from './objects/Dot';

/**
 * Responsible for managing all {@link Moveable} objects on the canvas.
 */
export default class ObjectManager implements Moveable {
  private objects: Moveable[] = [];

  /**
   * Adds a {@link Moveable} object to the canvas.
   */
  public addObject(object: Moveable): void {
    this.objects.push(object);
  }

  /**
   * Adds multiple {@link Moveable} objects to the canvas.
   */
  public addObjects(objects: Moveable[]): void {
    this.objects.push(...objects);
  }

  public continueMovement(): void {
    this.objects.forEach((object) => object.continueMovement());
  }

  /**
   * Just creates some random objects to play around with and adds them to the
   * set of objects to be drawn.
   */
  public createSomeObjects(ctx: CanvasRenderingContext2D) {
    this.addObjects([
      new Dot(ctx),
      new Dot(ctx, { xVelocity: -0.1, yVelocity: -0.1, color: 'red' })
    ]);
  }
}
