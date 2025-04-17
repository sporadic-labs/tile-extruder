import { createGlslProgram } from "@/app/webgl/createShader";
import vertexShaderSource from "./vertexShader.glsl";
import fragmentShaderSource from "./fragmentShader.glsl";
import { makeSuccess, makeError, isError, Outcome } from "ts-outcome";
import { createTexture } from "@/app/webgl/createTexture";

export interface ShaderProgram {
  render: () => void;
  destroy: () => void;
}

interface ExtrusionOptions {
  tileWidth: number;
  tileHeight: number;
  extrusionAmount: number;
  margin: number;
  spacing: number;
}

export function createExtrusionProgram({
  gl,
  tilesetImage,
  options,
}: {
  gl: WebGL2RenderingContext;
  tilesetImage: HTMLImageElement;
  options: ExtrusionOptions;
}): Outcome<ShaderProgram, Error> {
  const programResult = createGlslProgram({ gl, vertexShaderSource, fragmentShaderSource });
  if (isError(programResult)) {
    return makeError(programResult.error);
  }

  let isDestroyed = false;
  const program = programResult.value;

  const tilesetImageTexture = createTexture({ gl, image: tilesetImage });

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
  const tilesetImageLocation = gl.getUniformLocation(program, "u_tilesetImage");
  const tileSizeLocation = gl.getUniformLocation(program, "u_tileSize");
  const extrusionLocation = gl.getUniformLocation(program, "u_extrusion");
  const canvasSizeLocation = gl.getUniformLocation(program, "u_canvasSize");
  const imageSizeLocation = gl.getUniformLocation(program, "u_imageSize");
  const spacingLocation = gl.getUniformLocation(program, "u_spacing");
  const marginLocation = gl.getUniformLocation(program, "u_margin");

  // Vertex positions for a quad covering the render area. (-1, -1) is the is
  // the bottom left in clip space.
  // Set up a new buffer on the GPU.
  const positionBuffer = gl.createBuffer();
  // Set that new position buffer as the active ARRAY_BUFFER.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // Upload vertex positions to active ARRAY_BUFFER to form a triangle strip.
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      // Bottom left
      -1, -1,
      // Bottom right
      1, -1,
      // Top left
      -1, 1,
      // Top right
      1, 1,
    ]),
    gl.STATIC_DRAW
  );

  // Matching texture coordinates for the positions. (0, 0) is the top left in
  // our fragment shader.
  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      // Bottom left
      0, 1,
      // Bottom right
      1, 1,
      // Top left
      0, 0,
      // Top right
      1, 0,
    ]),
    gl.STATIC_DRAW
  );

  // Object store for vertex data (in this case, positions & texture coords).
  const vertexArrayObject = gl.createVertexArray();
  // Set the VAO as active.
  gl.bindVertexArray(vertexArrayObject);

  // Set up position attribute in the VAO.
  gl.enableVertexAttribArray(positionLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  // Set up texture coordinate attribute in the VAO.
  gl.enableVertexAttribArray(texCoordLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

  return makeSuccess({
    render: () => {
      if (isDestroyed) {
        return;
      }

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindVertexArray(vertexArrayObject);

      // Bind the textures to slots 0 and 1.
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tilesetImageTexture);
      gl.uniform1i(tilesetImageLocation, 0);

      // Set uniforms
      gl.uniform2f(tileSizeLocation, options.tileWidth, options.tileHeight);
      gl.uniform1f(extrusionLocation, options.extrusionAmount);
      gl.uniform1f(spacingLocation, options.spacing);
      gl.uniform1f(marginLocation, options.margin);
      gl.uniform2f(canvasSizeLocation, gl.canvas.width, gl.canvas.height);
      gl.uniform2f(imageSizeLocation, tilesetImage.width, tilesetImage.height);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
    destroy: () => {
      if (isDestroyed) {
        return;
      }

      isDestroyed = true;
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(texCoordBuffer);
      gl.deleteVertexArray(vertexArrayObject);
      gl.deleteTexture(tilesetImageTexture);
      gl.deleteProgram(program);
    },
  });
}
