import ObjectManager from './canvasUtils/ObjectManager';
import Ticker from './canvasUtils/Ticker';

/**
 * Takes a canvas context and draws some things on it! This is just for fun.
 */
export default function drawOnCanvasContext(ctx: CanvasRenderingContext2D) {
  adjustCanvasForHighResolution(ctx);
  const ticker = new Ticker();

  const objectManager = new ObjectManager();
  objectManager.createSomeObjects(ctx);

  ticker.subscribe(() => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    objectManager.continueMovement();
  });
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
