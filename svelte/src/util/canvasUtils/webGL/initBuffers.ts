export type Buffers = {
  position: WebGLBuffer;
  color: WebGLBuffer;
};

/**
 * Not fully sure what this actually does yet. Copied from
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context here}.
 */
export function initBuffers(gl: WebGL2RenderingContext): Buffers {
  const positionBuffer = initPositionBuffer(gl);
  const colorBuffer = initColorBuffer(gl);
  if (!colorBuffer) {
    throw new Error('Unable to create color buffer.');
  }

  return {
    position: positionBuffer,
    color: colorBuffer
  };
}

function initPositionBuffer(gl: WebGL2RenderingContext) {
  // Create a buffer for the square's positions.
  const positionBuffer = gl.createBuffer();
  if (!positionBuffer) {
    throw new Error('Unable to create position buffer.');
  }

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the square.
  const positions = [1.0, 1.0, -5, 2.5, 1.0, -1.0, -1.0, -1.0];

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return positionBuffer;
}

function initColorBuffer(gl: WebGL2RenderingContext) {
  const colors = [
    1.0,
    1.0,
    1.0,
    1.0, // white
    1.0,
    0.0,
    0.0,
    1.0, // red
    0.0,
    1.0,
    0.0,
    1.0, // green
    0.0,
    0.0,
    1.0,
    1.0 // blue
  ];

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
}
