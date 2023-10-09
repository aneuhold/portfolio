import SceneManager from './SceneManager';
import { initBuffers } from './initBuffers';

/**
 * The source code for the vertex shader. This is responsible for determining
 * the position of each vertex.
 */
const VERTEX_SHADER_SOURCE = `
  attribute vec4 aVertexPosition;
  attribute vec4 aVertexColor;
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying lowp vec4 vColor;

  void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vColor = aVertexColor;
  }
`;

/**
 * The source code for the fragment shader. This is responsible for determining
 * the color of each pixel.
 */
const FRAGMENT_SHADER_SOURCE = `
  varying lowp vec4 vColor;

  void main() {
    gl_FragColor = vColor;
  }
`;

export type ProgramInfo = {
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: number;
    vertexColor: number;
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation;
    modelViewMatrix: WebGLUniformLocation;
  };
};

/**
 * A class which helps interact with a WebGL context. This provides methods
 * which are useful for drawing on a canvas using WebGL.
 */
export default class WebGLContext {
  private gl: WebGL2RenderingContext;
  private programInfo: ProgramInfo;
  private sceneManager: SceneManager;

  /**
   * Creates a new WebGL Context which can be used to draw on the provided
   * canvas.
   */
  constructor(canvas: HTMLCanvasElement) {
    this.gl =
      canvas.getContext('webgl2') ||
      (canvas.getContext('experimental-webgl') as WebGL2RenderingContext);
    if (!this.gl) {
      throw new Error('WebGL is not supported in this browser.');
    }
    this.programInfo = this.createShaderProgram();
    const buffers = initBuffers(this.gl);
    this.sceneManager = new SceneManager(this.gl, this.programInfo);
    this.sceneManager.draw(buffers);
  }

  clearCanvas() {
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  /**
   * Creates the shader program which will be used to draw on the canvas. This
   * creates two shaders, a vertex shader and a fragment shader.
   *
   * - The vertex shader is responsible for determining the position of each
   * vertex.
   * - The fragment shader is responsible for determining the color of each
   * pixel.
   *
   * This only needs to be done once it seems like.
   */
  private createShaderProgram(): ProgramInfo {
    const vertexShader = this.loadShader(this.gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    const program = this.gl.createProgram();
    if (!program) {
      throw new Error('Unable to create shader program.');
    }
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);
    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      throw new Error(
        `Unable to initialize the shader program: ${this.gl.getProgramInfoLog(program)}`
      );
    }
    const projectionMatrix = this.gl.getUniformLocation(program, 'uProjectionMatrix');
    const modelViewMatrix = this.gl.getUniformLocation(program, 'uModelViewMatrix');
    if (!projectionMatrix || !modelViewMatrix) {
      throw new Error('Unable to get uniform locations.');
    }
    return {
      program: program,
      attribLocations: {
        vertexPosition: this.gl.getAttribLocation(program, 'aVertexPosition'),
        vertexColor: this.gl.getAttribLocation(program, 'aVertexColor')
      },
      uniformLocations: {
        projectionMatrix,
        modelViewMatrix
      }
    };
  }

  /**
   * Creates a shader of the given type, uploads the source, and compiles it.
   */
  private loadShader(type: number, source: string): WebGLShader {
    const shader = this.gl.createShader(type);

    if (!shader) {
      throw new Error('Unable to create shader.' + JSON.stringify({ type, source }));
    }

    // Send the source to the shader object
    this.gl.shaderSource(shader, source);

    // Compile the shader program
    this.gl.compileShader(shader);

    // See if it compiled successfully
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      const errorInfo = `An error occurred compiling the shaders: ${this.gl.getShaderInfoLog(
        shader
      )}`;
      this.gl.deleteShader(shader);
      throw new Error(errorInfo);
    }

    return shader;
  }
}
