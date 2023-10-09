export default interface Moveable {
  /**
   * Continues the movement of the current Moveable object by drawing
   * it's next position on the canvas.
   */
  continueMovement: () => void;
}
