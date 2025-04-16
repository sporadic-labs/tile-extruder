#version 300 es

precision highp float;

in vec2 v_texCoord;

uniform sampler2D u_tilesetImage;
uniform vec2 u_tileSize;
uniform float u_extrusion;
uniform vec2 u_canvasSize;
uniform vec2 u_imageSize;
uniform float u_margin;
uniform float u_spacing;

out vec4 fragColor;

void main() {
  // Calculate pixel position
  vec2 pixelPos = v_texCoord * u_canvasSize;

  // Adjust for margin
  pixelPos -= vec2(u_margin);

  // Calculate tile position
  vec2 totalTileSize = u_tileSize + 2.0f * u_extrusion + u_spacing;
  vec2 tilePos = floor(pixelPos / totalTileSize);

  // Calculate position within the tile
  vec2 tilePixelPos = pixelPos - tilePos * totalTileSize - u_extrusion;

  // Calculate source UV
  vec2 sourceUV;

  // Handle corners first
  if(tilePixelPos.x < 0.0f && tilePixelPos.y < 0.0f) {
      // Top-left corner
    sourceUV = (tilePos * u_tileSize + vec2(0.0f, 0.0f)) / u_imageSize;
  } else if(tilePixelPos.x >= u_tileSize.x && tilePixelPos.y < 0.0f) {
      // Top-right corner
    sourceUV = (tilePos * u_tileSize + vec2(u_tileSize.x - 1.0f, 0.0f)) / u_imageSize;
  } else if(tilePixelPos.x < 0.0f && tilePixelPos.y >= u_tileSize.y) {
      // Bottom-left corner
    sourceUV = (tilePos * u_tileSize + vec2(0.0f, u_tileSize.y - 1.0f)) / u_imageSize;
  } else if(tilePixelPos.x >= u_tileSize.x && tilePixelPos.y >= u_tileSize.y) {
      // Bottom-right corner
    sourceUV = (tilePos * u_tileSize + vec2(u_tileSize.x - 1.0f, u_tileSize.y - 1.0f)) / u_imageSize;
  } else if(tilePixelPos.x < 0.0f) {
      // Left edge
    sourceUV = (tilePos * u_tileSize + vec2(0.0f, tilePixelPos.y)) / u_imageSize;
  } else if(tilePixelPos.x >= u_tileSize.x) {
      // Right edge
    sourceUV = (tilePos * u_tileSize + vec2(u_tileSize.x - 1.0f, tilePixelPos.y)) / u_imageSize;
  } else if(tilePixelPos.y < 0.0f) {
      // Top edge
    sourceUV = (tilePos * u_tileSize + vec2(tilePixelPos.x, 0.0f)) / u_imageSize;
  } else if(tilePixelPos.y >= u_tileSize.y) {
      // Bottom edge
    sourceUV = (tilePos * u_tileSize + vec2(tilePixelPos.x, u_tileSize.y - 1.0f)) / u_imageSize;
  } else {
      // Main tile area
    sourceUV = (tilePos * u_tileSize + tilePixelPos) / u_imageSize;
  }

  vec4 texColor = texture(u_tilesetImage, sourceUV);

  fragColor = texColor;
}