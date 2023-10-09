import ObjectManager from './canvasUtils/ObjectManager';
import Ticker from './canvasUtils/Ticker';
import WebGLContext from './canvasUtils/webGL/WebGLContext';

export default function drawOnCanvas(canvasElement: HTMLCanvasElement, useWebGL = true) {
  if (useWebGL) {
    drawOnCanvasWithWebGL(canvasElement);
  } else {
    drawOnCanvasWithCanvasAPI(canvasElement);
  }
}

function drawOnCanvasWithWebGL(canvasElement: HTMLCanvasElement) {
  adjustCanvasForHighResolution(canvasElement);
  new WebGLContext(canvasElement);
}

/**
 * Takes a canvas context and draws some things on it! This is just for fun.
 */
function drawOnCanvasWithCanvasAPI(canvasElement: HTMLCanvasElement) {
  const ctx = canvasElement.getContext('2d');
  if (!ctx) {
    throw new Error('Unable to get canvas context.');
  }
  adjustCanvasForHighResolution(ctx.canvas, ctx);
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
function adjustCanvasForHighResolution(
  canvasElement: HTMLCanvasElement,
  ctx?: CanvasRenderingContext2D
) {
  // Get the DPR and size of the canvas
  const dpr = window.devicePixelRatio;
  const rect = canvasElement.getBoundingClientRect();

  // Set the "actual" size of the canvas
  canvasElement.width = rect.width * dpr;
  canvasElement.height = rect.height * dpr;

  // Scale the context to ensure correct drawing operations if the ctx
  // is provided
  if (ctx) {
    ctx.scale(dpr, dpr);
  }

  // Set the "drawn" size of the canvas
  canvasElement.style.width = `${rect.width}px`;
  canvasElement.style.height = `${rect.height}px`;
}
