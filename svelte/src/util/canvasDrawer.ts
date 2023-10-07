import ObjectManager from './canvasUtils/ObjectManager';

const FRAMES_PER_SECOND = 60;

/**
 * Takes a canvas context and draws some things on it! This is just for fun.
 */
export default function drawOnCanvasContext(ctx: CanvasRenderingContext2D) {
  adjustCanvasForHighResolution(ctx);
  const msToPassBetweenFrames = 1000 / FRAMES_PER_SECOND;

  /**
   * The previous time stamp. This is used to calculate the time difference
   * between frames. This is a double with the integer value being in ms.
   */
  let previousTimeStamp: DOMHighResTimeStamp = performance.now();

  const objectManager = new ObjectManager();
  objectManager.createSomeObjects(ctx);

  /**
   * The main animation loop for the canvas.
   *
   * @param timeStamp the time stamp from the requestAnimationFrame callback.
   * This is in milliseconds.
   */
  function drawLoop(timeStamp: DOMHighResTimeStamp) {
    if (timeStamp - previousTimeStamp >= msToPassBetweenFrames) {
      previousTimeStamp = timeStamp;
      drawThings();
    }
    window.requestAnimationFrame(drawLoop);
  }

  function drawThings() {
    // Clear the canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    objectManager.continueMovement();
  }

  // Start the drawing
  window.requestAnimationFrame(drawLoop);
}

/**
 * Adjust the provided canvas so it is high resolution based on the device.
 */
function adjustCanvasForHighResolution(ctx: CanvasRenderingContext2D) {
  // Get the DPR and size of the canvas
  const dpr = window.devicePixelRatio;
  const rect = ctx.canvas.getBoundingClientRect();

  // Set the "actual" size of the canvas
  ctx.canvas.width = rect.width * dpr;
  ctx.canvas.height = rect.height * dpr;

  // Scale the context to ensure correct drawing operations
  ctx.scale(dpr, dpr);

  // Set the "drawn" size of the canvas
  ctx.canvas.style.width = `${rect.width}px`;
  ctx.canvas.style.height = `${rect.height}px`;
}
