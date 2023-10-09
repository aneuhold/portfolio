import { mat4 } from 'gl-matrix';
import type { ProgramInfo } from './WebGLContext';
import type { Buffers } from './initBuffers';

export default class SceneManager {
  constructor(
    private gl: WebGL2RenderingContext,
    private programInfo: ProgramInfo
  ) {}

  draw(buffers: Buffers) {
    this.clear();
    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    const fieldOfView = (45 * Math.PI) / 180; // in radians
    // The aspect ratio
    const aspect = this.gl.canvas.width / this.gl.canvas.height;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();

    // Now move the drawing position a bit to where we want to
    // start drawing the square.
    mat4.translate(
      modelViewMatrix, // destination matrix
      modelViewMatrix, // matrix to translate
      // The below -6 seems to be how far away from the object the camera is.
      // This could be a good place to start refactoring into a unified
      // coordinate system.
      [-0.0, 0.0, -6.0]
    ); // amount to translate

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    this.setPositionAttribute(buffers);
    this.setColorAttribute(buffers);

    // Tell WebGL to use our program when drawing
    this.gl.useProgram(this.programInfo.program);

    // Set the shader uniforms
    this.gl.uniformMatrix4fv(
      this.programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix
    );
    this.gl.uniformMatrix4fv(
      this.programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix
    );

    const offset = 0;
    const vertexCount = 4;
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, offset, vertexCount);
  }

  private clear() {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
    this.gl.clearDepth(1.0); // Clear everything
    this.gl.enable(this.gl.DEPTH_TEST); // Enable depth testing
    this.gl.depthFunc(this.gl.LEQUAL); // Near things obscure far things

    // Clear the canvas before we start drawing on it.
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  /**
   * Tell WebGL how to pull out the positions from the position
   * buffer into the vertexPosition attribute.
   */
  private setPositionAttribute(buffers: Buffers) {
    const numComponents = 2; // pull out 2 values per iteration
    const type = this.gl.FLOAT; // the data in the buffer is 32bit floats
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set of values to the next
    // 0 = use type and numComponents above
    const offset = 0; // how many bytes inside the buffer to start from
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffers.position);
    this.gl.vertexAttribPointer(
      this.programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
  }

  private setColorAttribute(buffers: Buffers) {
    const numComponents = 4;
    const type = this.gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffers.color);
    this.gl.vertexAttribPointer(
      this.programInfo.attribLocations.vertexColor,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexColor);
  }
}
